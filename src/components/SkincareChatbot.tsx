import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles, Send, X, AlertCircle, ShoppingBag, Eye, Loader2, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";
import { PRODUCTS, Product } from "../products";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SkincareChatbotProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  setActiveTab: (tab: string) => void;
}

const SKIN_TYPES = [
  { id: "Oily", label: "Oily Skin", desc: "Excess sebum, shiny surface" },
  { id: "Dry", label: "Dry Skin", desc: "Flaky, tight, lacks hydration" },
  { id: "Combination", label: "Combination", desc: "Oily T-zone, dry cheeks" },
  { id: "Sensitive", label: "Sensitive", desc: "Easily irritated, reactive" },
  { id: "Normal", label: "Normal Skin", desc: "Balanced moisture & oil" }
];

const SKIN_CONCERNS = [
  { id: "Acne", label: "Acne & Pimples", desc: "Breakouts, clogged pores" },
  { id: "Dehydration", label: "Dehydration", desc: "Fine dry lines, thirsting surface" },
  { id: "Large Pores", label: "Enlarged Pores", desc: "Congested, visible pores" },
  { id: "Aging", label: "Aging & Wrinkles", desc: "Fine lines, loss of firmness" },
  { id: "Dullness", label: "Dull Complexion", desc: "Tiredness, dark hyperpigmentation" }
];

export default function SkincareChatbot({ onSelectProduct, onAddToCart, setActiveTab }: SkincareChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your AI Skincare Advisor. 🌟 Tell me about your skin type (Oily, Dry, Combination, Sensitive) and any skin concerns you have, or choose your profile in the diagnostics tab below to get instantly curated recommendations from the Natural Glow catalog!"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabPanel, setActiveTabPanel] = useState<"chat" | "diagnose">("chat");

  // Selection state for quick diagnostics
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const newMessages = [...messages, { role: "user", content: textToSend } as Message];
    setMessages(newMessages);
    setInputVal("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error("Failed to receive server diagnostics.");
      }

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: `System Error: ${data.error}` }]);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am facing a connection issue while preparing your skincare advice. Please verify your GEMINI_API_KEY is configured in your Secrets panel under Settings."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  // Run structured diagnostics
  const handleGenerateDiagnosis = () => {
    if (!selectedSkinType) {
      alert("Please select your Skin Type to start the diagnosis.");
      return;
    }

    const concernsText = selectedConcerns.length > 0 
      ? `My main skin problems/concerns are: ${selectedConcerns.join(", ")}.`
      : "I don't have severe concerns, but I want a healthy radiant routine.";

    const diagnosticPrompt = `I would like a custom diagnosis.
Skin Type: ${selectedSkinType}.
Concerns: ${concernsText}
Could you diagnose my skin issues and recommend the absolute best products from your boutique catalog for me? please specify their morning (AM) and evening (PM) routines.`;

    setActiveTabPanel("chat");
    handleSendMessage(diagnosticPrompt);
  };

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const resetDiagnostics = () => {
    setSelectedSkinType(null);
    setSelectedConcerns([]);
  };

  // Helper patterns to parse double bracketed product recommendation tags: e.g. [[vit-c-serum]]
  const getProductIdsFromText = (text: string): string[] => {
    const matches = [...text.matchAll(/\[\[(.*?)\]\]/g)];
    return Array.from(new Set(matches.map(m => m[1].trim())));
  };

  // Remove [[tags]] for normal speech bubble display
  const cleanMessageText = (text: string): string => {
    return text.replace(/\[\[.*?\]\]/g, "").replace(/\s+/g, " ").trim();
  };

  return (
    <>
      {/* Floating Action Circle Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-brand-rosegold to-brand-gold text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center border border-white/20 hover:shadow-brand-rosegold/40"
        id="skincare-chatbot-toggle"
        title="Consult Skincare AI"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-spin-once" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-white animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Floating Chat Drawer container */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-40 bg-white border border-brand-beige rounded-3xl shadow-2xl w-[92vw] sm:w-[420px] h-[550px] flex flex-col overflow-hidden animate-fade-in-up font-sans"
          id="skincare-chatbot-drawer"
        >
          {/* Header */}
          <header className="bg-gradient-to-r from-brand-charcoal to-[#3D2B24] text-white p-4 flex justify-between items-center relative select-none">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-full bg-gradient-to-tr from-brand-rosegold to-brand-gold">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm tracking-wide">Skincare AI Advisor</h3>
                <p className="text-[10px] text-brand-gold font-sans uppercase font-bold tracking-wider">Natural Glow Laboratory</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* Subheader Switch Tabs */}
          <div className="flex border-b border-brand-beige bg-brand-cream text-xs font-bold font-sans">
            <button
              onClick={() => setActiveTabPanel("chat")}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer uppercase tracking-wider ${
                activeTabPanel === "chat" 
                  ? "border-brand-rosegold text-brand-rosegold bg-white" 
                  : "border-transparent text-brand-charcoal/40 hover:text-brand-charcoal/70"
              }`}
            >
              💬 Advisor Chat
            </button>
            <button
              onClick={() => setActiveTabPanel("diagnose")}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer uppercase tracking-wider ${
                activeTabPanel === "diagnose" 
                  ? "border-brand-rosegold text-brand-rosegold bg-white" 
                  : "border-transparent text-brand-charcoal/40 hover:text-brand-charcoal/70"
              }`}
            >
              🔬 Diagnostics
            </button>
          </div>

          {/* Content Main Body Slots */}
          <div className="flex-grow overflow-y-auto bg-brand-ivory p-4 space-y-4">
            
            {activeTabPanel === "chat" ? (
              /* CHAT SESSION LIST */
              <>
                {messages.map((message, index) => {
                  const isAssistant = message.role === "assistant";
                  const parsedIds = isAssistant ? getProductIdsFromText(message.content) : [];
                  const cleanText = isAssistant ? cleanMessageText(message.content) : message.content;
                  const matchingProducts = PRODUCTS.filter(p => parsedIds.includes(p.id));

                  return (
                    <div 
                      key={index}
                      className={`flex flex-col space-y-1.5 ${isAssistant ? "items-start text-left" : "items-end text-left"}`}
                    >
                      {/* Message Bubble */}
                      <div 
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-sans leading-relaxed shadow-xs ${
                          isAssistant 
                            ? "bg-white text-brand-charcoal border border-brand-beige" 
                            : "bg-brand-charcoal text-white"
                        }`}
                      >
                        <p className="whitespace-pre-line">{cleanText}</p>
                        
                        {/* Interactive Curated Product cards Carousel below assistant messages */}
                        {isAssistant && matchingProducts.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-brand-beige space-y-2 select-none">
                            <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#D8A47F] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-brand-gold" /> AI Recommended Formulas:
                            </p>
                            
                            <div className="space-y-2">
                              {matchingProducts.map(p => (
                                <div 
                                  key={p.id}
                                  className="flex items-center justify-between p-2 rounded-xl bg-brand-cream/10 border border-brand-beige hover:border-brand-rosegold/30 transition-all gap-2"
                                >
                                  <div 
                                    onClick={() => {
                                      onSelectProduct(p);
                                      setActiveTab("details");
                                      setIsOpen(false);
                                    }}
                                    className="flex items-center space-x-2 cursor-pointer flex-grow min-w-0"
                                  >
                                    <div className="w-7 h-7 bg-white rounded border flex items-center justify-center shrink-0">
                                      <span className="text-[11px] font-sans">🧴</span>
                                    </div>
                                    <div className="min-w-0 text-left">
                                      <h4 className="text-[11px] font-bold text-brand-charcoal truncate leading-tight hover:text-brand-rosegold">{p.name}</h4>
                                      <span className="text-[9px] text-[#D8A47F] font-bold">₹{p.price} • {p.size}</span>
                                    </div>
                                  </div>

                                  <div className="flex space-x-1 shrink-0">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onAddToCart(p, 1);
                                      }}
                                      className="p-1 px-1.5 bg-brand-charcoal text-white rounded text-[10px] uppercase font-bold hover:bg-brand-rosegold tracking-tighter"
                                      title="Add to basket"
                                    >
                                      + Bag
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Message Author label */}
                      <span className="text-[9px] text-brand-charcoal/30 px-1 font-bold tracking-wider uppercase font-sans">
                        {isAssistant ? "System Advisor" : "Client profile"}
                      </span>
                    </div>
                  );
                })}

                {/* Shimmer botanical dots loader state */}
                {isLoading && (
                  <div className="flex flex-col items-start space-y-1.5">
                    <div className="bg-white text-brand-charcoal border border-brand-beige rounded-2xl p-3 flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 text-brand-rosegold animate-spin" />
                      <span className="text-xs text-brand-charcoal/50 font-bold tracking-wide">Formulating routine diagnostics...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            ) : (
              /* DIAGNOSTIC FORM PANEL EXCLUSIVES */
              <div className="space-y-5 text-left font-sans animate-fade-in-up">
                <div className="p-3 bg-[#FFF5E6] border border-[#C9A227]/20 rounded-2xl flex items-start space-x-2.5">
                  <span className="text-lg">🧪</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">Fast Diagnostic Setup</h4>
                    <p className="text-[10px] text-brand-charcoal/60 leading-relaxed mt-0.5">Toggle skin attributes below and dispatch them to generate a personalized timeline routine instantly!</p>
                  </div>
                </div>

                {/* 1. SKIN TYPES SELECTOR */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/50">1. What is your Skincare Type?</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {SKIN_TYPES.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedSkinType(type.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer transition-all ${
                          selectedSkinType === type.id 
                            ? "bg-brand-rosegold text-white border-brand-rosegold" 
                            : "bg-white border-brand-beige hover:border-brand-rosegold/40 text-brand-charcoal"
                        }`}
                      >
                        <p className="text-[11px] font-bold">{type.label}</p>
                        <p className={`text-[8px] line-clamp-1 mt-0.5 ${selectedSkinType === type.id ? "text-white/80" : "text-brand-charcoal/40"}`}>{type.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. SKIN CONCERNS SELECTOR */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/50">2. Select Your Specific Problems / Concerns ({selectedConcerns.length} selected)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {SKIN_CONCERNS.map(concern => {
                      const isSelected = selectedConcerns.includes(concern.id);
                      return (
                        <button
                          key={concern.id}
                          onClick={() => toggleConcern(concern.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer transition-all ${
                            isSelected 
                              ? "bg-brand-charcoal text-white border-brand-charcoal" 
                              : "bg-white border-brand-beige hover:border-brand-rosegold/40 text-brand-charcoal"
                          }`}
                        >
                          <p className="text-[11px] font-bold">{concern.label}</p>
                          <p className={`text-[8px] line-clamp-1 mt-0.5 ${isSelected ? "text-white/80" : "text-brand-charcoal/40"}`}>{concern.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Diagnostic Submit and Clear panel */}
                <div className="pt-4 border-t border-brand-beige flex gap-2">
                  <button
                    onClick={resetDiagnostics}
                    className="flex-1 p-2 bg-white text-brand-charcoal border border-brand-beige text-[11px] uppercase tracking-wider font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  
                  <button
                    onClick={handleGenerateDiagnosis}
                    className={`flex-2 p-2.5 bg-gradient-to-r from-brand-rosegold to-brand-gold text-white text-[11px] uppercase tracking-wider font-extrabold rounded-xl hover:opacity-90 flex items-center justify-center space-x-1 cursor-pointer ${
                      !selectedSkinType ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!selectedSkinType}
                  >
                    <span>Run Diagnosis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Input Box Form for Chat */}
          {activeTabPanel === "chat" && (
            <form 
              onSubmit={handleInputSubmit}
              className="p-3 border-t border-brand-beige bg-white flex gap-2 font-sans select-none"
            >
              <input
                type="text"
                placeholder="Type your skincare concerns..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isLoading}
                className="flex-grow px-4 py-2.5 rounded-xl border border-brand-beige bg-brand-cream/10 text-xs focus:outline-none focus:border-brand-rosegold text-brand-charcoal disabled:opacity-50 font-medium"
              />
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="p-2.5 bg-brand-charcoal text-white rounded-xl hover:bg-brand-rosegold transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      )}
    </>
  );
}
