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
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Query: historique des messages
  const { data, loading, error, refetch } = useGetMessagesByConversationQuery({
    variables: { conversationId: convId },
  });

  // Mutation: envoi de message
  const [sendMessage] = useSendMessageMutation();

  // Subscription: temps réel
  useMessageSentSubscription({
    variables: { conversationId: convId },
    onData: ({ data }) => {
      if (data.data?.messageSent) {
        setMessages((prev) => [...prev, data.data.messageSent]);
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
    refetch();
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error.message}</p>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          <CardContent className="h-[60vh] overflow-y-auto flex flex-col gap-2">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col items-start mb-2">
                <span className="text-xs text-gray-500">{msg.user?.email}</span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg px-3 py-2 mt-1">
                  {msg.content}
                </span>
                <span className="text-[10px] text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</span>
              </div>
            ))}
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