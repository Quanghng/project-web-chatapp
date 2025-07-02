import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useGetMessagesByConversationQuery, useSendMessageMutation, useMessageSentSubscription } from "@/gql/generated";

const Conversation = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const convId = Number(conversationId);
  const shouldSkip = !conversationId || isNaN(convId);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Query: historique des messages
  const { data, loading, error} = useGetMessagesByConversationQuery({
    variables: { conversationId: convId },
    skip: shouldSkip,
  });

  // Mutation: envoi de message
  const [sendMessage] = useSendMessageMutation();

  // Subscription: temps réel
  useMessageSentSubscription({
    variables: { conversationId: convId },
    onData: ({ data }) => {
      if (data.data?.messageSent) {
        const msg = data.data.messageSent;
        if (msg.user && !msg.user.id && msg.user.id) {
          msg.user.id = msg.user.id;
        }
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
        scrollToBottom();
      }
    },
  });

  useEffect(() => {
    if (data?.getMessagesByConversation) {
      setMessages(data.getMessagesByConversation);
      scrollToBottom();
    }
  }, [data]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!content.trim() || !userId) return;
    await sendMessage({
      variables: {
        inputs: {
          content,
          userId: Number(userId),
          conversationId: convId,
        },
      },
    });
    setContent("");
  };

  if (shouldSkip) return <p className="text-center mt-10 text-red-500">Erreur : identifiant de conversation manquant ou invalide.</p>;
  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error.message}</p>;

  const userId = Number(localStorage.getItem("userId"));

  // Récupérer la liste des participants à partir des messages (si possible)
  const participants = Array.from(
    new Set(messages.map((msg) => msg.user?.email).filter(Boolean))
  );

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          {/* En-tête participants */}
          <div className="mb-2 text-sm text-gray-700 dark:text-gray-200 font-medium">
            Participants : {participants.join(", ")}
          </div>
          <CardContent className="h-[60vh] overflow-y-auto flex flex-col gap-2">
            {messages.map((msg) => {
              if (msg.user && !msg.user.id && msg.userId) {
                msg.user.id = msg.userId;
              }
              const myEmail = localStorage.getItem("email");
              const isMe = (msg.user?.id ?? msg.userId) === userId || msg.user?.email === myEmail;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col mb-2 ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className={`text-xs ${isMe ? 'text-blue-500' : 'text-gray-500'}`}>{msg.user?.email}</span>
                  <span
                    className={`rounded-lg px-3 py-2 mt-1 max-w-xs break-words '
                      ${isMe ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'}`}
                    style={{ alignSelf: isMe ? 'flex-end' : 'flex-start' }}
                  >
                    {msg.content}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </CardContent>
          <form onSubmit={handleSend} className="flex gap-2 mt-4">
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écris ton message..."
              className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-md">
              Envoyer
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Conversation; 