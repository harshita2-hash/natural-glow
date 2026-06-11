import React, { useState } from "react";
import { User, Package, MapPin, Bell, Clock, RefreshCw, Key, ShieldCheck, CheckCircle, Info, Sparkles, Phone, Mail, X } from "lucide-react";

interface Order {
  id: string;
  items: Array<{ name: string; qty: number; price: number }>;
  totalAmount: number;
  date: string;
}

interface DashboardProps {
  userEmail: string;
  orderHistory: Order[];
  onUpdateEmail: (email: string) => void;
  onLogout: () => void;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({
  userEmail,
  orderHistory,
  onUpdateEmail,
  onLogout,
  setActiveTab
}: DashboardProps) {
  const [activePane, setActivePane] = useState<"profile" | "orders" | "addresses" | "returns">("orders");
  const [editingProfile, setEditingProfile] = useState(false);
  const [emailInput, setEmailInput] = useState(userEmail);
  const [fullNameInput, setFullNameInput] = useState("Aditi Sharma");
  const [phoneInput, setPhoneInput] = useState("+91 9876543210");
  const [addresses, setAddresses] = useState([
    { id: 1, type: "🏡 Default Home Address", details: "Apt 4B, Emerald luxury Meadows, Phase 2, Mumbai - 400001" },
    { id: 2, type: "🏢 Work Desk", details: "Floor 12, Elite Technopark, Sector 44, Bengaluru, Karnataka - 560001" }
  ]);
  const [newAddressInput, setNewAddressInput] = useState("");
  const [showNotificationAlert, setShowNotificationAlert] = useState(true);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEmail(emailInput);
    setEditingProfile(false);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressInput.trim()) return;
    setAddresses([
      ...addresses,
      { id: Date.now(), type: "📍 Secondary Location", details: newAddressInput }
    ]);
    setNewAddressInput("");
  };

  const handleReturnRequest = (orderId: string) => {
    alert(`Return request registered for ${orderId}. Our Courier Partner will arrive in 48 working hours for verification.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up text-left">
      <div className="flex justify-between items-center mb-8 pb-3 border-b border-brand-beige">
        <div>
          <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#D8A47F]">Welcome Back</span>
          <h1 className="text-3xl font-serif text-brand-charcoal font-bold mt-0.5">{fullNameInput}</h1>
          <p className="text-xs text-brand-charcoal/50 font-sans">Access your biological diagnostic plans, transit orders, and chemical diagnostics ledger.</p>
        </div>
        <button 
          onClick={onLogout}
          className="px-5 py-2 hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors text-xs font-bold uppercase tracking-widest border border-red-200 rounded-full cursor-pointer"
        >
          Customer Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* left menu sidebar selectors */}
        <aside className="space-y-2">
          {[
            { id: "orders", label: "📦 Cargo Shipments Log", icon: Package },
            { id: "profile", label: "👤 Core Cabinet Credentials", icon: User },
            { id: "addresses", label: "📍 Shipping Coordinates", icon: MapPin },
            { id: "returns", label: "🔄 Returns & Claims Desk", icon: RefreshCw },
          ].map((pane) => {
            const Icon = pane.icon;
            return (
              <button
                key={pane.id}
                onClick={() => setActivePane(pane.id as any)}
                className={`w-full text-left py-3.5 px-5 font-sans font-semibold text-xs uppercase tracking-wider rounded-2xl flex items-center space-x-3 transition-colors border cursor-pointer ${
                  activePane === pane.id 
                    ? "bg-brand-charcoal text-white border-brand-charcoal shadow-md" 
                    : "bg-white text-brand-charcoal/70 border-brand-beige/50 hover:bg-brand-cream/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{pane.label}</span>
              </button>
            );
          })}

          <div className="p-4 bg-[#FFF5E6] rounded-2xl border border-[#D8A47F]/20 text-[11px] text-brand-charcoal/70 leading-relaxed font-sans font-medium">
             🎓 <strong>Glow Loyalty Club Card:</strong> active <br />
             ⭐ <strong>Diagnostic Level:</strong> Platinum Tier <br />
             ⭐️ <strong>Active Reward Points:</strong> 420 (₹42 discount credit)
          </div>
        </aside>

        {/* Right workspace panels */}
        <main className="lg:col-span-3 bg-white border border-brand-beige p-6 sm:p-8 rounded-3xl min-h-[400px]">
          
          {/* Notification Alert widget banner */}
          {showNotificationAlert && (
            <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-start justify-between">
              <div className="flex items-start space-x-2.5">
                <Bell className="w-5 h-5 shrink-0 animate-bounce mt-0.5" />
                <div className="text-left font-sans">
                  <header className="font-bold">Active Skin Alarm (Dermal Hydration Routine Logged)</header>
                  <p className="mt-0.5 leading-relaxed">Your custom diagnostic routine results calculated in the Skincare Builder was logged under this account cabinet. You can directly browse and purchase them with 15% discount packages at any time!</p>
                </div>
              </div>
              <button onClick={() => setShowNotificationAlert(false)} className="text-green-900 bg-white/50 hover:bg-white rounded p-1 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {activePane === "orders" && (
            <div className="space-y-6">
              <header className="border-b border-brand-beige pb-3 text-left">
                <h2 className="text-base font-bold uppercase tracking-wider text-brand-charcoal">Cargo Shipping and Receipt Logs</h2>
              </header>

              {orderHistory.length > 0 ? (
                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="p-5 border border-brand-beige rounded-2xl space-y-4">
                      
                      {/* Order top specs */}
                      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3.5 border-b border-brand-beige pb-3 text-xs font-sans">
                        <div>
                          <p><strong>Tracking No:</strong> <code className="font-mono font-bold text-brand-charcoal tracking-wide bg-brand-cream/30 px-2 py-1 rounded">{order.id}</code></p>
                          <p className="mt-1 text-brand-charcoal/50">Purchased on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p><strong>Payment Status:</strong> <span className="text-green-700 font-bold uppercase">SECURED</span></p>
                          <p className="mt-1 font-extrabold text-brand-rosegold">Charge Total: ₹{order.totalAmount}</p>
                        </div>
                      </div>

                      {/* List items ordered */}
                      <div className="space-y-2.5 text-xs font-sans text-left">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-brand-charcoal/80">
                            <span>{item.name} <strong>(Qty {item.qty}x)</strong></span>
                            <span>₹{item.price * item.qty}</span>
                          </div>
                        ))}
                      </div>

                      {/* Fake progressive package milestone tracker */}
                      <div className="pt-3 border-t border-brand-beige/50">
                        <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase text-brand-charcoal/50 mb-2">
                          <span>📦 Molecule Cooling Packaged</span>
                          <span>🚚 Courier En route</span>
                          <span>🏡 Parcel Deployed</span>
                        </div>
                        {/* Visual bar tracker */}
                        <div className="h-2 bg-brand-beige rounded-full overflow-hidden">
                          <div className="h-full bg-brand-gold rounded-full w-2/3"></div>
                        </div>
                        <p className="text-[10px] text-brand-charcoal/50 font-sans mt-2">📍 Estimated cargo landing within 48 to 72 working hours.</p>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* Empty orders list */
                <div className="py-12 text-center space-y-4 text-xs font-sans text-brand-charcoal/40">
                  <div className="w-12 h-12 rounded-full border border-dashed border-brand-beige flex items-center justify-center mx-auto">
                    <Clock className="w-5 h-5 text-brand-charcoal/30" />
                  </div>
                  <h3 className="font-bold text-brand-charcoal/60 lowercase">No pending e-commerce orders mapped</h3>
                  <p className="max-w-md mx-auto leading-relaxed">You haven't checked out any beauty formulas under this account cabinet session yet. Place a new order inside our boutique shop catalog to activate automatic step-by-step cargo mapping tracking details.</p>
                  <button
                    onClick={() => setActiveTab("shop")}
                    className="px-6 py-2.5 bg-brand-charcoal text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-rosegold cursor-pointer"
                  >
                    Browse formulas
                  </button>
                </div>
              )}
            </div>
          )}

          {activePane === "profile" && (
            <div className="space-y-6">
              <header className="border-b border-brand-beige pb-3 text-left flex justify-between items-center">
                <h2 className="text-base font-bold uppercase tracking-wider text-brand-charcoal">Account Cabinet Credentials</h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="text-xs font-sans font-bold text-brand-rosegold uppercase underline cursor-pointer hover:text-brand-gold"
                >
                  {editingProfile ? "Cancel Profile Edit" : "Edit Account Details"}
                </button>
              </header>

              {!editingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-left">
                  <div className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl">
                    <p className="font-bold text-brand-charcoal/40 uppercase">Full Profile Name</p>
                    <p className="text-sm font-bold text-brand-charcoal mt-1">{fullNameInput}</p>
                  </div>
                  
                  <div className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl">
                    <p className="font-bold text-brand-charcoal/40 uppercase">Assigned Email</p>
                    <p className="text-sm font-bold text-brand-charcoal mt-1">{userEmail}</p>
                  </div>

                  <div className="p-4 bg-brand-cream/10 border border-brand-beige rounded-2xl">
                    <p className="font-bold text-brand-charcoal/40 uppercase">Mobile Number</p>
                    <p className="text-sm font-bold text-brand-charcoal mt-1">{phoneInput}</p>
                  </div>

                  <div className="p-4 bg-[#FFF5E6]/40 border border-brand-beige rounded-2xl">
                    <p className="font-bold text-brand-charcoal/40 uppercase">Security Protection Mode</p>
                    <p className="text-[11px] font-bold text-brand-charcoal mt-1 text-green-700">✓ Biometric Login Connected</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs font-sans text-left animate-fade-in-up">
                  <div className="space-y-1">
                    <label className="font-bold text-brand-charcoal uppercase">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-xl"
                      value={fullNameInput}
                      onChange={(e) => setFullNameInput(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-brand-charcoal uppercase">Email coordinates</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-xl"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-brand-charcoal uppercase">Mobile</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-xl"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-charcoal text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-brand-rosegold cursor-pointer"
                    id="save-profile-btn"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          )}

          {activePane === "addresses" && (
            <div className="space-y-6">
              <header className="border-b border-brand-beige pb-3 text-left">
                <h2 className="text-base font-bold uppercase tracking-wider text-brand-charcoal">Saved Area coordinates Book</h2>
              </header>

              <div className="space-y-3.5 text-xs font-sans text-left">
                {addresses.map((adr) => (
                  <div key={adr.id} className="p-4 bg-brand-ivory border border-brand-beige rounded-2xl shadow-xs">
                    <h4 className="font-bold text-brand-rosegold">{adr.type}</h4>
                    <p className="text-brand-charcoal/70 mt-1 leading-relaxed">{adr.details}</p>
                  </div>
                ))}
              </div>

              {/* Add secondary address */}
              <form onSubmit={handleCreateAddress} className="pt-4 border-t border-brand-beige text-xs font-sans text-left space-y-2.5">
                <h4 className="font-bold text-brand-charcoal uppercase tracking-wider">Expand Coordinates Book</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Office desk, tower C, floor 8, tech park block..."
                    value={newAddressInput}
                    onChange={(e) => setNewAddressInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 border rounded-xl text-xs outline-none hover:border-brand-rosegold/50 focus:border-brand-rosegold bg-brand-cream/5"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-charcoal text-white font-bold rounded-xl uppercase tracking-wider hover:bg-brand-rosegold cursor-pointer"
                    id="add-address-btn"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          )}

          {activePane === "returns" && (
            <div className="space-y-6">
              <header className="border-b border-brand-beige pb-3 text-left">
                <h2 className="text-base font-bold uppercase tracking-wider text-[#2B2B2B]">molecule Returns and Refund Desk</h2>
              </header>

              <div className="space-y-4 text-xs font-sans text-left">
                <div className="p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-200 leading-relaxed">
                  📢 <strong>14-Day Molecule Vitality Insurance Program.</strong> We accept absolute physical item returns if your raw compound experiences discolorations, or triggers unforeseen allergic flares upon clinical diagnosis within 14 calendar days of mail courier delivery.
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-brand-charcoal pb-1 border-b border-brand-beige uppercase">Eligible Shipments</h4>
                  {orderHistory.length > 0 ? (
                    orderHistory.map((order) => (
                      <div key={order.id} className="p-3.5 border border-brand-beige rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-bold text-brand-charcoal">{order.id}</p>
                          <p className="text-[10px] text-brand-charcoal/40">Purchased on {order.date}</p>
                        </div>
                        <button
                          onClick={() => handleReturnRequest(order.id)}
                          className="px-4 py-1.5 bg-brand-charcoal text-white rounded-lg font-bold uppercase text-[10px] hover:bg-brand-rosegold cursor-pointer"
                          id={`refund-btn-${order.id}`}
                        >
                          Request Refund
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-brand-charcoal/40 font-medium italic">No active billing records detected on this account session.</div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
