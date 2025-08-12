import { useState, useEffect, useRef } from "react";

export default function AIAssistant({ aiUsage }) {
  const [isSending, setIsSending] = useState(false);
  const [usage, setUsage] = useState(aiUsage);
  const chatContainerRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const addMessage = (sender, text) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");
    avatar.textContent = sender === "user" ? "👤" : "🤖";

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.innerHTML = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);

    if (chatContainerRef.current) {
      chatContainerRef.current.appendChild(messageDiv);
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const message = messageInputRef.current?.value.trim();
    if (!message || usage.current >= usage.limit || isSending) {
      if (usage.current >= usage.limit) {
        alert(`You've reached your monthly limit of ${usage.limit} AI chats. Upgrade your plan for more.`);
      }
      return;
    }

    addMessage("user", message);
    messageInputRef.current.value = "";
    setIsSending(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Server response error");
      }

      const data = await response.json();
      addMessage("ai", data.response);

      setUsage(prev => ({
        ...prev,
        current: prev.current + 1
      }));
    } catch (error) {
      addMessage("ai", `⚠️ Error: ${error.message}. Please try again.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="ai-assistant">
      <div className="chat-header">
        <h1>AI Assistant</h1>
        <p>Get expert advice for your YouTube channel</p>
        <div className="credits-display">
          <span className="credits-label">AI Chats this month:</span>
          <span className="credits-value">
            {usage.current}/{usage.limit}
          </span>
        </div>
      </div>

      <div ref={chatContainerRef} className="chat-container">
        <div className="message ai">
          <div className="avatar">🤖</div>
          <div className="bubble">
            Hello! I'm your YouTube expert assistant. I can help you with:
            <ul>
              <li>Subscriber growth strategies</li>
              <li>Title and description optimization</li>
              <li>Content trend analysis</li>
              <li>Engagement improvement ideas</li>
            </ul>
            Each query counts toward your monthly limit of {usage.limit} chats. How can I help you today?
          </div>
        </div>
      </div>

      <div className="input-area">
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Type your message..."
          disabled={usage.current >= usage.limit || isSending}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          disabled={usage.current >= usage.limit || isSending}
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}