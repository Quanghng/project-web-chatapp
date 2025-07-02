import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useGetConversationsByUserQuery } from "@/gql/generated";

const ConversationsList = () => {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const { data, loading, error, refetch } = useGetConversationsByUserQuery({
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    refetch();
  }, []);

  if (!userId) return <Layout><p className="text-center mt-10">Connecte-toi pour voir tes conversations.</p></Layout>;
  if (loading) return <Layout><p className="text-center mt-10">Chargement...</p></Layout>;
  if (error) return <Layout><p className="text-center text-red-500">Erreur : {error.message}</p></Layout>;

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mes conversations</h2>
          <Button onClick={() => navigate("/conversations/new")}>+ Nouvelle conversation</Button>
        </div>
        <ul className="space-y-4">
          {data?.getConversationsByUser.length === 0 && (
            <li className="text-gray-500">Aucune conversation pour l'instant.</li>
          )}
          {data?.getConversationsByUser.map((conv) => {
            // Trouver l'autre participant (pour une conversation à 2)
            const other = conv.participants.find(p => p.user.id !== userId)?.user;
            const initials = other ? (other.firstName?.[0] || other.email[0]).toUpperCase() : '?';
            const displayName = conv.name || `Conversation n°${conv.id}`;
            return (
              <li
                key={conv.id}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition"
                onClick={() => navigate(`/conversation/${conv.id}`)}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-100">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">
                    {displayName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Participants : {conv.participants.map(p => p.user.email).join(", ")}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default ConversationsList; 