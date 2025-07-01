import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useGetUsersQuery, useCreateConversationMutation } from "@/gql/generated";

const CreateConversation = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useGetUsersQuery();
  const [createConversation, { loading: creating }] = useCreateConversationMutation();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || selected.length === 0) return;
    // Ajoute toujours l'utilisateur courant
    const participantIds = Array.from(new Set([...selected, userId]));
    const res = await createConversation({
      variables: { inputs: { name, participantIds } },
    });
    const convId = res.data?.createConversation.id;
    if (convId) navigate(`/conversation/${convId}`);
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Nouvelle conversation</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Nom (optionnel)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700"
              placeholder="Nom de la conversation"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Participants</label>
            {loading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p className="text-red-500">Erreur : {error.message}</p>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-2">
                {data?.users.filter(u => u.id !== userId).map((user) => (
                  <label key={user.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() => handleToggle(user.id)}
                    />
                    <span>{user.email} {user.firstName || ""} {user.lastName || ""}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={creating || selected.length === 0}>
            {creating ? "Création..." : "Créer la conversation"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateConversation; 