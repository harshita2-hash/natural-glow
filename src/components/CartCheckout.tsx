import React, { useState } from "react";
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, CreditCard, Sparkles, Check, ChevronRight, Truck, Info, AlertTriangle } from "lucide-react";
import { Product } from "../products";
import { ProductSVG } from "./ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartCheckoutProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
  onRegisterNewOrder: (order: { id: string; items: any[]; totalAmount: number; date: string }) => void;
  setActiveTab: (tab: string) => void;
}

type CheckoutStep = "cart" | "shipping" | "payment" | "review" | "success";

export default function CartCheckout({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedPromo,
  onApplyPromo,
  onRegisterNewOrder,
  setActiveTab
}: CartCheckoutProps) {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    landmark: "",
    pincode: "",
    paymentMethod: "upi",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [placementOrderNumber, setPlacementOrderNumber] = useState("");

  // Subtotals and Delivery rates
  const shippingCharge = appliedPromo === "FREESHIP" ? 0 : 99;
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Compute coupon markdown
  const discountAmount = useMemoSubtotalDiscount(subtotal, appliedPromo);
  const gstTax = Math.round((subtotal - discountAmount) * 0.05); // 5% GST simulated
  const grandTotal = subtotal - discountAmount + gstTax + shippingCharge;

  function useMemoSubtotalDiscount(sub: number, promo: string) {
    if (promo === "GLOW20") return Math.round(sub * 0.20);
    if (promo === "WELCOME15") return Math.round(sub * 0.15);
    return 0;
  }

  // Form Validations
  const validateShippingForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Recipient name required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid customer email required";
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = "Valid 10-digit mobile number required";
    if (!formData.street.trim()) errors.street = "Mailing street address required";
    if (!formData.city.trim()) errors.city = "Shipping City required";
    if (!formData.pincode.trim() || formData.pincode.length < 6) errors.pincode = "Valid 6-digit area PIN required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const cleaned = couponInput.trim().toUpperCase();
    if (cleaned === "GLOW20" || cleaned === "FREESHIP" || cleaned === "WELCOME15") {
      onApplyPromo(cleaned);
      setCouponInput("");
    } else {
      setCouponError("Invalid promotional coupon code.");
    }
  };

  const handleNextStep = () => {
    if (step === "cart") {
      if (cartItems.length === 0) return;
      setStep("shipping");
    } else if (step === "shipping") {
      if (validateShippingForm()) {
        setStep("payment");
      }
    } else if (step === "payment") {
      setStep("review");
    }
  };

  const handlePlaceOrder = () => {
    // Generate an authentic tracking reference
    const orderNo = `NGL-${Math.floor(100000 + Math.random() * 900000)}-IND`;
    setPlacementOrderNumber(orderNo);

    // Save order history object
    onRegisterNewOrder({
      id: orderNo,
      items: cartItems.map(i => ({ name: i.product.name, qty: i.quantity, price: i.product.price })),
      totalAmount: grandTotal,
      date: new Date().toISOString().split('T')[0]
    });

    setStep("success");
    onClearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up text-left">
      
      {/* Checkout step pipeline headers state display */}
      {step !== "success" && (
        <div className="mb-12 max-w-2xl mx-auto flex items-center justify-between font-sans">
          {[
            { id: "cart", label: "Shopping Bag" },
            { id: "shipping", label: "Address Setup" },
            { id: "payment", label: "Secure Pay" },
            { id: "review", label: "Order Verify" }
          ].map((s, idx) => {
            const steps = ["cart", "shipping", "payment", "review"];
            const currentIdx = steps.indexOf(step);
            const active = steps.indexOf(s.id) <= currentIdx;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-colors ${
                    active ? "bg-brand-rosegold text-white border-brand-rosegold shadow-md" : "bg-white text-brand-charcoal/30 border-brand-beige"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider mt-1.5 hidden sm:inline ${active ? "text-brand-rosegold" : "text-brand-charcoal/40"}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                    currentIdx > idx ? "bg-brand-rosegold" : "bg-brand-beige"
                  }`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Main stepping switch logic */}
      {step === "cart" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cart item listing panel */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-serif text-brand-charcoal font-bold mb-4">Your Selected Dermal Formulas</h2>
            
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="p-5 bg-white border border-brand-beige rounded-3xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 hover:border-brand-rosegold/30 transition-colors"
                >
                  <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setActiveTab("shop")}>
                    <div className={`w-14 h-16 ${item.product.bgDecorative} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden ${item.product.image ? "" : "p-2"}`}>
                      {item.product.image ? (
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="scale-60">
                          <ProductSVG shapeType={item.product.shapeType} gradientFrom={item.product.gradientFrom} gradientTo={item.product.gradientTo} name={item.product.name} />
                        </div>
                      )}
                    </div>
                    <div className="text-left font-sans">
                      <h3 className="text-xs font-bold text-brand-charcoal leading-snug line-clamp-1">{item.product.name}</h3>
                      <p className="text-[10px] text-brand-charcoal/40 font-semibold mt-0.5">{item.product.categoryLabel} • {item.product.size}</p>
                      <span className="text-xs font-bold text-brand-rosegold block mt-1">₹{item.product.price} each</span>
                    </div>
                  </div>

                  {/* Qty update row & Delete */}
                  <div className="flex items-center justify-between sm:justify-end space-x-6">
                    <div className="flex items-center border border-brand-beige rounded-full p-0.5 bg-brand-ivory/40">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full hover:bg-white text-brand-charcoal font-bold text-xs cursor-pointer"
                        id={`cart-dec-${item.product.id}`}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-sans font-bold text-brand-charcoal">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full hover:bg-white text-brand-charcoal font-bold text-xs cursor-pointer"
                        id={`cart-inc-${item.product.id}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="font-sans font-bold text-sm text-brand-charcoal w-16 text-right">
                      ₹{item.product.price * item.quantity}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 hover:bg-red-50 text-brand-charcoal/40 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Clear item"
                      id={`cart-del-${item.product.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              /* Empty cart drawer feedback */
              <div className="border border-brand-beige rounded-3xl p-12 text-center space-y-4 bg-white/50 max-w-md mx-auto">
                <div className="w-16 h-16 bg-brand-pink/30 rounded-full flex items-center justify-center mx-auto text-brand-rosegold">
                  <ShoppingBag className="w-8 h-8 font-light" />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-charcoal">Your Shopping Bag is empty</h3>
                <p className="text-xs text-brand-charcoal/50 leading-relaxed">
                  Discover customized beauty formulations prepared in our clinical labs, or browse our bestseller serums to start your treatment routine today.
                </p>
                <button
                  onClick={() => setActiveTab("shop")}
                  className="px-6 py-2.5 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Pricing Checkout Summaries Block */}
          {cartItems.length > 0 && (
            <aside className="space-y-6">
              
              {/* Promo Code entry element */}
              <div className="bg-white border border-brand-beige p-5 rounded-3xl text-left">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-rosegold">Voucher Redeeming</span>
                <h4 className="text-xs font-bold text-brand-charcoal mt-0.5">Have a skin code?</h4>
                
                <form onSubmit={handleApplyCouponSubmit} className="flex mt-3 gap-2">
                  <input
                    type="text"
                    placeholder="e.g., GLOW20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3.5 py-1.5 border rounded-xl text-xs bg-brand-cream/10 border-brand-beige uppercase font-mono tracking-widest outline-none focus:bg-white focus:border-brand-rosegold text-brand-charcoal font-bold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-brand-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-rosegold cursor-pointer"
                    id="apply-coupon-btn"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-[10px] text-red-500 font-medium mt-1">{couponError}</p>}
                
                {/* Visual applied promo tag details */}
                {appliedPromo && (
                  <div className="mt-3 p-2.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-center justify-between font-bold uppercase tracking-wider">
                    <span>Active Voucher: {appliedPromo}</span>
                    <button 
                      onClick={() => onApplyPromo("")}
                      className="p-1 text-green-900 bg-green-200/50 hover:bg-green-200 rounded-full cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <span className="text-[9px] text-brand-charcoal/40 block mt-2 leading-tight">Try spins on the homepage promo wheel for up to 20% flat savings.</span>
              </div>

              {/* pricing Summary checkout details */}
              <div className="bg-brand-cream/20 border border-brand-beige p-6 rounded-3xl space-y-4">
                <h3 className="text-xs uppercase font-bold tracking-widest text-[#D8A47F]">Cost Audit</h3>
                
                <div className="space-y-2.5 text-xs text-brand-charcoal/70 font-sans border-b border-brand-beige/60 pb-4">
                  <div className="flex justify-between">
                    <span>Retail Items Subtotal</span>
                    <span className="font-bold text-brand-charcoal">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Applied Promo Deductions</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Simulated GST Tax (5%)</span>
                    <span>+₹{gstTax}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Mailing & Courier Insurance</span>
                    <span>
                      {shippingCharge === 0 ? (
                        <span className="text-green-700 font-bold uppercase tracking-wider">Free (Promo waived)</span>
                      ) : (
                        `₹${shippingCharge}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline font-sans">
                  <span className="text-brand-charcoal text-xs uppercase font-extrabold tracking-wider">Est. Checkout Total</span>
                  <span className="text-brand-charcoal text-2xl font-black">₹{grandTotal}</span>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full cursor-pointer py-4 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-lg shadow-brand-rosegold/20 hover:shadow-brand-rosegold/40 flex items-center justify-center space-x-2"
                  id="checkout-step-1"
                >
                  <span>Secured Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-[10px] text-brand-charcoal/40 flex items-center justify-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>256-Bit SSL Encryption Protection</span>
                </div>
              </div>

            </aside>
          )}
        </div>
      )}

      {/* Shipping Address Forms */}
      {step === "shipping" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white border border-brand-beige p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-serif text-brand-charcoal font-bold mb-4 border-b border-brand-beige pb-3">Recipient & Delivery Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-brand-charcoal">Recipient Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aditi Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl hover:border-brand-rosegold/40 outline-none text-brand-charcoal font-medium bg-brand-cream/5"
                />
                {formErrors.fullName && <p className="text-[10px] text-red-500 font-bold">{formErrors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-brand-charcoal">Customer Email (For digital invoice)</label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl hover:border-brand-rosegold/40 outline-none text-brand-charcoal font-medium bg-brand-cream/5"
                />
                {formErrors.email && <p className="text-[10px] text-red-500 font-bold">{formErrors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-brand-charcoal">Mobile Contact No</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-2 border rounded-xl hover:border-brand-rosegold/40 outline-none text-brand-charcoal font-medium bg-brand-cream/5"
                />
                {formErrors.phone && <p className="text-[10px] text-red-500 font-bold">{formErrors.phone}</p>}
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold uppercase tracking-wider text-brand-charcoal">Complete Street Address (Building, Sector)</label>
                <input
                  type="text"
                  placeholder="e.g. Apt 4B, Emerald luxury Meadows, Phase 2"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl hover:border-brand-rosegold/40 outline-none text-brand-charcoal font-medium bg-brand-cream/5"
                />
                {formErrors.street && <p className="text-[10px] text-red-500 font-bold">{formErrors.street}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-brand-charcoal">City</label>
                <input
                  type="text"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl hover:border-brand-rosegold/40 outline-none text-brand-charcoal font-medium bg-brand-cream/5"
                />
                {formErrors.city && <p className="text-[10px] text-red-500 font-bold">{formErrors.city}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-brand-charcoal">Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="Near Botanical Garden"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-4 py-2 border rounded-xl hover:border-brand-rosegold/40 outline-none text-[#2B2B2B] font-medium bg-brand-cream/5"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-brand-charcoal">Zip/Pincode</label>
                <input
                  type="text"
                  placeholder="400001"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-4 py-2 border rounded-xl hover:border-brand-rosegold/40 outline-none text-brand-charcoal font-medium bg-brand-cream/5"
                />
                {formErrors.pincode && <p className="text-[10px] text-red-500 font-bold">{formErrors.pincode}</p>}
              </div>

            </div>

            <div className="pt-4 flex justify-between space-x-3 text-xs">
              <button
                onClick={() => setStep("cart")}
                className="px-6 py-3 border border-brand-beige rounded-full font-bold uppercase tracking-widest text-brand-charcoal/70 hover:bg-brand-cream/20 cursor-pointer"
              >
                Back to bag
              </button>
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center space-x-1.5 cursor-pointer shadow-md"
                id="shipping-next-to-pay"
              >
                <span>Proceed to Payment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick order Summary Column */}
          <aside className="bg-brand-cream/20 border border-brand-beige p-6 rounded-3xl space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#D8A47F]">Delivery Overview</h3>
            <div className="space-y-3 font-sans text-xs">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-brand-charcoal/80">
                  <span className="truncate max-w-[150px] font-medium">{item.product.name} ({item.quantity}x)</span>
                  <span className="font-bold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-brand-beige/50 pt-3 text-xs flex justify-between items-baseline font-sans text-brand-charcoal">
                <span>Grand Summary</span>
                <span className="text-base font-bold text-brand-rosegold">₹{grandTotal}</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Secured Payment Selection */}
      {step === "payment" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white border border-brand-beige p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-serif text-brand-charcoal font-bold mb-4 border-b border-brand-beige pb-3">Secure Skincare Gateways</h2>
            
            <div className="space-y-4">
              {[
                { id: "upi", title: "UPI (Google Pay, PhonePe, Paytm, BHIM)", desc: "Simulate zero-latency immediate UPI billing." },
                { id: "card", title: "Secure Debit / Credit Card", desc: "Supports Visa, Mastercard, RuPay, Amex." },
                { id: "cod", title: "Cash on Delivery (COD)", desc: "Pay physically upon cargo parcel arrival. No pre-billing." }
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, paymentMethod: opt.id })}
                  className={`p-4 rounded-3xl border-2 cursor-pointer transition-luxury flex items-start space-x-3 ${
                    formData.paymentMethod === opt.id ? "bg-brand-cream/20 border-brand-rosegold" : "bg-white border-brand-beige"
                  }`}
                >
                  <input
                    type="radio"
                    checked={formData.paymentMethod === opt.id}
                    onChange={() => {}}
                    className="text-brand-rosegold focus:ring-brand-rosegold h-4 w-4 mt-0.5"
                    id={`pay-method-${opt.id}`}
                  />
                  <div className="text-left font-sans">
                    <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">{opt.title}</h4>
                    <p className="text-[11px] text-brand-charcoal/50">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* If Credit Card is Selected show input fields */}
            {formData.paymentMethod === "card" && (
              <div className="p-5 bg-brand-cream/10 border border-brand-beige rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans animate-fade-in-up">
                
                <div className="space-y-1 text-left">
                  <label className="font-bold text-brand-charcoal/80 uppercase">Name On Card</label>
                  <input
                    type="text"
                    placeholder="Aditi Sharma"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="font-bold text-brand-charcoal/80 uppercase">Card Serial Number</label>
                  <input
                    type="text"
                    placeholder="4321 5678 9876 5432"
                    maxLength={19}
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim() })}
                    className="w-full px-3 py-1.5 border rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="font-bold text-brand-charcoal/80 uppercase">Expiry Cycle</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={formData.cardExpiry}
                    onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="font-bold text-brand-charcoal/80 uppercase">Security Code (CVV)</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={3}
                    value={formData.cardCVV}
                    onChange={(e) => setFormData({ ...formData, cardCVV: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-1.5 border rounded-xl outline-none"
                  />
                </div>

              </div>
            )}

            <div className="pt-4 flex justify-between space-x-3 text-xs">
              <button
                onClick={() => setStep("shipping")}
                className="px-6 py-3 border border-brand-beige rounded-full font-bold uppercase tracking-widest text-[#2B2B2B]/70 hover:bg-brand-cream/20 cursor-pointer"
              >
                Back to shipping
              </button>
              <button
                onClick={handleNextStep}
                className="px-9 py-3 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center space-x-1.5 cursor-pointer shadow-md"
                id="payment-next-to-review"
              >
                <span>Navigate to Review</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick sidebar pricing summary */}
          <aside className="bg-brand-cream/20 border border-brand-beige p-6 rounded-3xl space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#D8A47F]">Secured Transit</h3>
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-center space-x-2 text-brand-charcoal/60">
                <Truck className="w-4 h-4 text-brand-rosegold" />
                <span>Express courier tracking generated.</span>
              </div>
              <p className="text-[11px] leading-relaxed text-brand-charcoal/60">Your skincare cargo is dispatched from our lab in moisture-balanced coolers to guarantee complete molecule vitality upon delivery address reach.</p>
            </div>
          </aside>
        </div>
      )}

      {/* Review Final checkout step */}
      {step === "review" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white border border-brand-beige p-6 sm:p-8 rounded-3xl space-y-6 text-left">
            <h2 className="text-xl font-serif text-brand-charcoal font-bold mb-4 border-b border-[#F4EDE4] pb-3">Final Order Review</h2>
            
            {/* Split information sectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
              
              <div className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl relative">
                <h4 className="font-bold text-brand-charcoal uppercase tracking-wider mb-2">Recipient Coordinates</h4>
                <div className="space-y-1 text-brand-charcoal/80">
                  <p><strong>Name:</strong> {formData.fullName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>
              </div>

              <div className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl relative">
                <h4 className="font-bold text-brand-charcoal uppercase tracking-wider mb-2">Mailing Destination</h4>
                <div className="space-y-1 text-brand-charcoal/80">
                  <p><strong>Street:</strong> {formData.street}</p>
                  <p><strong>City/Pin:</strong> {formData.city} - {formData.pincode}</p>
                  {formData.landmark && <p><strong>Landmark:</strong> {formData.landmark}</p>}
                </div>
              </div>

              <div className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl relative sm:col-span-2">
                <h4 className="font-bold text-[#2B2B2B] uppercase tracking-wider mb-2">Secured Compound gateway</h4>
                <p className="text-brand-charcoal/80 font-medium">
                  💳 Selected Billing: <span className="font-bold uppercase tracking-wider text-brand-rosegold">{formData.paymentMethod} Payment Method</span>
                </p>
                <p className="text-[10px] text-brand-charcoal/40 mt-1">Guarantees zero additional hidden commission values. Pre-authorized by bank systems.</p>
              </div>

            </div>

            {/* List reviewed cart items */}
            <div className="space-y-3.5 border-t border-brand-beige pt-5 text-xs font-sans">
              <h4 className="font-bold text-[#2B2B2B] uppercase tracking-wider">Formula cargo manifest</h4>
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between p-3.5 bg-brand-cream/5 border border-brand-beige/40 rounded-xl">
                  <span className="font-bold text-brand-charcoal">{item.product.name} <span className="text-brand-charcoal/50 text-[10px] font-normal">({item.quantity}x)</span></span>
                  <span className="font-bold text-brand-rosegold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Actions triggers */}
            <div className="pt-4 flex justify-between space-x-3 text-xs">
              <button
                onClick={() => setStep("payment")}
                className="px-6 py-3 border border-brand-beige rounded-full font-bold uppercase tracking-widest text-[#2B2B2B]/70 hover:bg-brand-cream/20 cursor-pointer"
              >
                Back to gateway
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-10 py-3 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold uppercase tracking-widest hover:scale-[1.01] transition-transform rounded-full flex items-center space-x-2 cursor-pointer shadow-md"
                id="place-order-endpoint-btn"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Place Botanical Order (₹{grandTotal})</span>
              </button>
            </div>
          </div>

          {/* Checkout final math calculations sidebar */}
          <aside className="bg-brand-cream/20 border border-brand-beige p-6 rounded-3xl space-y-4 text-left">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#D8A47F]">Cost Audit Statement</h3>
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Rebates</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST Tax</span>
                <span>+₹{gstTax}</span>
              </div>
              <div className="flex justify-between">
                <span>Courier Transits</span>
                <span>₹{shippingCharge === 0 ? "Waived" : `₹${shippingCharge}`}</span>
              </div>
              <div className="border-t border-brand-beige/50 pt-3 flex justify-between items-baseline font-bold text-brand-charcoal">
                <span>TOTAL DUE</span>
                <span className="text-xl text-brand-rosegold">₹{grandTotal}</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Success checkout panel */}
      {step === "success" && (
        <section className="max-w-md mx-auto text-center p-8 bg-white border border-brand-beige rounded-3xl shadow-2xl space-y-6 animate-fade-in-up">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border-4 border-green-100 shadow-md">
            <Check className="w-8 h-8 font-black shrink-0" />
          </div>

          <div className="space-y-2">
            <span className="inline-block bg-[#FFF5E6] text-[#C9A227] font-sans font-bold text-[9px] px-3 py-1 rounded uppercase tracking-widest">
              Authorized transaction
            </span>
            <h2 className="text-2xl font-serif text-brand-charcoal font-bold">Your skin is on its way to glow!</h2>
            <p className="text-xs text-brand-charcoal/60 leading-relaxed font-sans max-w-sm mx-auto">
              Our clinical beauty lab of <strong>Natural Glow</strong> has authorized receipt of your payment. Your organic skin solutions are currently packaged in molecular coolers to avoid thermal oxidization.
            </p>
          </div>

          <div className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl relative text-left font-sans text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="font-bold text-brand-charcoal/50 uppercase">Order Reference:</span>
              <code className="font-mono font-bold text-brand-charcoal tracking-wider">{placementOrderNumber}</code>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-brand-charcoal/50 uppercase">Mailing To:</span>
              <span className="text-brand-charcoal/80 font-bold max-w-[180px] truncate text-right">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-brand-charcoal/50 uppercase">Estimated Delivery:</span>
              <span className="text-brand-charcoal/80 font-bold">3 Working Days</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setStep("cart");
                setActiveTab("dashboard");
              }}
              className="w-full py-3 bg-brand-charcoal text-white font-bold uppercase tracking-wider text-xs rounded-full hover:bg-brand-rosegold transition-colors cursor-pointer shadow-md"
              id="success-to-dashboard"
            >
              Inspect Skin Cabinet (Dashboard)
            </button>
            <button
              onClick={() => {
                setStep("cart");
                setActiveTab("shop");
              }}
              className="w-full py-3 border border-brand-beige text-[#2B2B2B] font-bold uppercase tracking-wider text-xs rounded-full hover:bg-brand-cream/20 transition-colors cursor-pointer"
            >
              Continue exploring formulations
            </button>
          </div>
          
          <div className="text-[10px] text-brand-charcoal/40 font-sans flex items-center justify-center space-x-1 border-t border-brand-beige/50 pt-4">
            <Info className="w-3.5 h-3.5 text-brand-rosegold" />
            <span>Digital invoice statement copy is forwarded to {formData.email || "your inbox"}</span>
          </div>
        </section>
      )}

    </div>
  );
}
