"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Plus, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Quelles sont les 15 configurations BMS Gen11 ?",
  "Comment commander un nouveau BMS ?",
  "Quel stockage choisir pour mon BMS ?",
  "BMS vs VM vs Container ?",
  "Quels OS sont supportés Gen11 ?",
  "Architecture réseau BMS",
  "BMS GPU pour l'IA",
  "Benchmarks BMS vs OVH/AWS",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Erreur API");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Pas de stream");

      const decoder = new TextDecoder();
      let assistantContent = "";
      setMessages([...newMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                assistantContent += delta;
                setMessages([...newMessages, { role: "assistant", content: assistantContent }]);
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Désolé, une erreur est survenue. Veuillez réessayer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] lg:h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Assistant BMS</h1>
            <p className="text-xs text-muted-foreground">Expert Bare Metal Server</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={resetChat} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau chat
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Comment puis-je vous aider ?</h2>
            <p className="text-sm text-muted-foreground mb-8 text-center max-w-md">
              Je suis votre assistant expert BMS. Posez-moi vos questions sur les Bare Metal Servers, l&apos;infrastructure Cloud Avenue, ou le provisioning.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 max-w-lg w-full">
              {suggestions.map((suggestion) => (
                <Card
                  key={suggestion}
                  className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => sendMessage(suggestion)}
                >
                  <p className="text-sm">{suggestion}</p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className="flex gap-4">
                <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                  <AvatarFallback className={msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted"}>
                    {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {msg.role === "assistant" ? "Assistant BMS" : "Vous"}
                  </p>
                  <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content || "..."}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-4">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 pt-2">
                  <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question sur les BMS..."
            className="min-h-[44px] max-h-[200px] resize-none"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Assistant IA propulsé par OpenRouter — réponses basées sur la documentation BMS
        </p>
      </div>
    </div>
  );
}
