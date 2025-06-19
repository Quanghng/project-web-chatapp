import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import CreateThreadModel from "./CreateThread";
import { MessageCircle } from "lucide-react";
import CommentSection from "@/components/CommentSection";
import Layout from "@/components/Layout";
import { useGetThreadsQuery } from "@/gql/generated";
import { useThreadActions } from "@/lib/hooks/useThreadActions";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  useNavigate();

  // Set up the query hook
  const { data, loading, error, refetch } = useGetThreadsQuery();
  const threads = data?.getThreads;
  
  // Set up the thread actions
  const { getLocalLiked,toggleLikeThread, commentThread } = useThreadActions();

  const handleLike = async (threadId: string, liked: boolean) => {
    // Update database and local storate
    await toggleLikeThread(Number(threadId), liked);
  };

  const handleAddComment = async (userId: string, threadId: string, content: string) => {
    await commentThread(Number(userId), Number(threadId), content);
    // Refetch the thread to include the new comment (or update local state)
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading threads</p>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm transition-colors">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-600 text-transparent bg-clip-text tracking-tight mb-8 text-center">
          Eatstagram 
        </h1>
        <div className="flex gap-2 mb-6">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search threads..."
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition">
            🔍 Search
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...(threads ?? [])]
          .filter(thread =>
            thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            thread.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => a.id - b.id)
          .map((thread: any) => (
            <Card
              key={thread.id}
              className="flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:shadow-md transition duration-200"
            >
                <div className="flex w-full">
                <Link to={`/thread/${thread.id}`} className="flex-1">
                  <CardHeader>
                  <CardTitle>{thread.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <CardDescription>{thread.content.substring(0, 100)}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-2 text-gray-600 dark:text-gray-300">
                    by {thread.user.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    at {new Date(thread.createdAt).toLocaleString()}
                  </p>
                  </CardContent>
                </Link>

                <Link to={`/thread/${thread.id}`} className="w-1/2 h-full gap-4 px-4 pb-4">
                  {thread.imageUrl && (
                  <img
                    src={thread.imageUrl}
                    alt="Thread Image"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  )}
                </Link>
                </div>

              <div className="flex items-center justify-end gap-4 px-4 pb-4">
                <LikeButton
                  liked={getLocalLiked(thread.id)}
                  likesCount={thread.likes}
                  onClick={() => handleLike(thread.id, getLocalLiked(thread.id))}
                />
                <button
                  onClick={() => setOpenComments(openComments === thread.id ? null : thread.id)}
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{thread.comments.length}</span>
                </button>
              </div>

              {openComments === thread.id && (
                <CommentSection
                  userId={thread.user.id}
                  threadId={thread.id}
                  comments={thread.comments.map((c: any) => ({
                    id: c.id,
                    author: c.user.email,
                    content: c.content,
                    createdAt: c.createdAt
                  }))}
                  onAddComment={handleAddComment}
                />
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Ready to share your ideas?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join the community and publish your first thread.
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 text-lg rounded-full shadow hover:shadow-xl transition"
          >
            Post your Thread
          </Button>
        </div>
        <CreateThreadModel open={modalOpen} onClose={() => setModalOpen(false)} refetchThreads={refetch} />
      </div>
    </Layout>
  );
};

export default Home;
