import React, { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm Bloom, your pregnancy companion. How can I help today?" }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "ai", text: "Thanks for your message. I’m still learning, but soon I’ll give great answers!" }
      ]);
    }, 600);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "2rem" }}>
      <h2>🤖 Ask Bloom</h2>
      <div ref={chatRef} style={{
        border: "1px solid #ccc",
        padding: "1rem",
        height: "300px",
        overflowY: "scroll",
        backgroundColor: "#f9f9f9",
        marginBottom: "1rem"
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "0.5rem"
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#e2e3e5"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={handleSend} style={{ marginLeft: "1rem" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;