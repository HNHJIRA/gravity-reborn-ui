"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, User, UserCheck } from "lucide-react";

export default function AiSalesAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Greetings, Excellency. I am your Royal Atelier Stylist & Sales Agent. How may I assist you with your wedding attire requirements today?",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const newUserMsg = {
      id: Date.now(),
      sender: "user",
      text: text,
      time: "Just now",
    };
    setMessages((prev) => [...prev, newUserMsg]);
    if (!textToSend) setInputText("");

    setIsTyping(true);

    try {
      // 1. Attempt to call real backend server
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: data.reply,
            time: "Just now",
          },
        ]);
        return;
      }
    } catch (error) {
      console.warn("[Atelier AI]: Backend server offline. Falling back to local intelligence simulation.");
    }

    // 2. Local Fallback simulation if backend server is unreachable
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("budget") || lowerText.includes("discount") || lowerText.includes("price") || lowerText.includes("expensive")) {
        replyText = "I completely understand that organizing the wedding party attire is a significant investment. Since you are coordinating a Groom's Party order (5 or more suits/Sherwanis), I am authorized to apply an exclusive 10% Royal Privilege discount, or append complimentary custom silk pocket squares to your order. Which would you prefer?";
      } else if (lowerText.includes("10%") || lowerText.includes("discount") && (lowerText.includes("prefer") || lowerText.includes("yes") || lowerText.includes("privilege"))) {
        replyText = "Excellent choice. I have successfully applied the 10% Groom's Party discount to your custom order payload. Before finalizing the payment, would you like me to instantly transfer this session to a Human Style Consultant for the final bespoke verification?";
      } else if (lowerText.includes("human") || lowerText.includes("consultant") || lowerText.includes("transfer") || lowerText.includes("yes")) {
        replyText = "Understood. Reconnecting you with Senior Style Consultant Victor... You will be connected in just a moment. They will verify your measurements and wedding themes.";
      } else if (lowerText.includes("sherwani") || lowerText.includes("nikah") || lowerText.includes("reception")) {
        replyText = "For a classic Nikah ceremony, our Maharaja Cream Sherwani with Champagne Gold Zardosi is highly recommended. For the Reception, the Midnight Blue Prince Suit is an absolute masterpiece. Would you like to check the fabric detail or request size negotiation?";
      } else {
        replyText = "I am at your service. Whether you require styling recommendations, specific fabric insights, or dynamic pricing options for group orders, let me know how I can elevate your style.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: replyText,
          time: "Just now",
        },
      ]);
    }, 1200);
  };

  const presetQueries = [
    { text: "Is there a Groom's Party discount?", label: "Group Discount" },
    { text: "Suggest an outfit for Muslim Nikah", label: "Nikah Outfit" },
    { text: "Connect me to a Style Consultant", label: "Talk to Human" },
  ];

  return (
    <>
      {/* Sticky Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] rounded-2xl border border-primary/30 bg-black/90 backdrop-blur-xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-primary/20 bg-gradient-to-r from-zinc-900 to-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center bg-zinc-900 text-primary">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">Atelier AI Stylist</h4>
                <p className="text-[10px] text-primary font-medium tracking-widest uppercase">Sales Agent</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-black font-semibold rounded-tr-none"
                      : "bg-zinc-900/80 border border-primary/10 text-zinc-100 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === "user" ? "text-black/60" : "text-zinc-500"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-900/80 border border-primary/10 text-zinc-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-4 py-2 border-t border-primary/10 bg-zinc-950/60 flex flex-wrap gap-2">
            {presetQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(query.text)}
                className="text-[10px] bg-zinc-900 border border-primary/20 hover:border-primary hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all duration-200"
              >
                {query.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-primary/20 bg-zinc-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for styling or group discounts..."
              className="flex-1 bg-zinc-900 border border-primary/20 focus:border-primary focus:outline-none rounded-lg px-3 py-2.5 text-xs text-white placeholder-zinc-500"
            />
            <button
              type="submit"
              className="bg-primary text-black p-2.5 rounded-lg hover:scale-105 transition-transform"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
