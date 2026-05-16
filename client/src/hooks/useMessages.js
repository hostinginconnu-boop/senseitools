import { useState } from "react";

const DEFAULT_MESSAGES = [
  { id: 1, text: "Hey! Are you coming tonight? 🎉", sender: "contact", time: "19:42", status: "read" },
  { id: 2, text: "Of course! Wouldn't miss it 😄 What should I bring?", sender: "me", time: "19:44", status: "read" },
  { id: 3, text: "Just bring yourself haha 🥂 We have everything covered", sender: "contact", time: "19:45", status: "read" },
  { id: 4, text: "Okay perfect 👌 I'll be there around 8pm", sender: "me", time: "19:47", status: "delivered" },
  { id: 5, text: "Can't wait! It's going to be so much fun 🔥✨", sender: "contact", time: "19:48", status: "read" },
];

export function useMessages() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now() + Math.random() }]);
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const reorder = (fromIdx, toIdx) => {
    setMessages((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  };

  const reset = () => setMessages([]);

  const loadTemplate = (templateMessages) => {
    setMessages(templateMessages.map((m) => ({ ...m, id: Date.now() + Math.random() })));
  };

  return { messages, addMessage, removeMessage, reorder, reset, loadTemplate };
}

