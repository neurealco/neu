// src/components/AIAssistant.jsx
import { useState, useEffect, useRef } from "react";

export default function AIAssistant({ initialCredits }) {
  const [currentCredits, setCurrentCredits] = useState(initialCredits);
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    // Scroll al fondo del chat cuando se añaden mensajes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
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
      // Scroll al último mensaje
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const message = messageInputRef.current?.value.trim();
    if (!message || currentCredits < 100 || isSending) return;

    // Añadir mensaje del usuario
    addMessage("user", message);
    messageInputRef.current.value = "";
    setIsSending(true);

    try {
      // Enviar mensaje al backend
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();

      // Añadir respuesta de la IA
      addMessage("ai", data.response);

      // Actualizar créditos
      setCurrentCredits((prev) => prev - 100);
    } catch (error) {
      addMessage(
        "ai",
        `⚠️ Error: ${error.message}. Por favor intenta nuevamente.`
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="ai-assistant">
      <div className="chat-header">
        <h1>Asistente de IA</h1>
        <p>Consulta estrategias para mejorar tu canal de YouTube</p>
        <div className="credits-display">
          <span className="credits-label">Créditos disponibles:</span>
          <span className="credits-value">
            {currentCredits.toLocaleString()}
          </span>
        </div>
      </div>

      <div ref={chatContainerRef} className="chat-container">
        <div className="message ai">
          <div className="avatar">🤖</div>
          <div className="bubble">
            ¡Hola! Soy tu asistente especializado en YouTube. Puedo ayudarte
            con:
            <ul>
              <li>Estrategias para aumentar suscriptores</li>
              <li>Optimización de títulos y descripciones</li>
              <li>Análisis de tendencias de contenido</li>
              <li>Ideas para mejorar el engagement</li>
            </ul>
            Cada consulta cuesta 100 créditos. ¿En qué puedo ayudarte hoy?
          </div>
        </div>
      </div>

      <div className="input-area">
        <input
          ref={messageInputRef}
          type="text"
          id="message-input"
          placeholder="Escribe tu mensaje..."
          disabled={currentCredits < 100 || isSending}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          id="send-button"
          className="btn"
          disabled={currentCredits < 100 || isSending}
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
