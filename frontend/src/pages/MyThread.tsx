import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetUserWithThreadsQuery, useModifyThreadMutation, useDeleteThreadMutation, useModifyUserMutation } from "@/gql/generated";
import Layout from "@/components/Layout";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useThreadActions } from "@/lib/hooks/useThreadActions";
import CreateThreadModal from "./CreateThread";

const MyThreads: React.FC = () => {
  const location = useLocation();

  // Refresh the page when navigated to
  useEffect(() => {
    refetch();
  }, [location]);

  // 1. read userId
  const userId = Number(localStorage.getItem("userId"));

  // 2. request user and Threads
  const { data, loading, error, refetch } = useGetUserWithThreadsQuery({
    variables: { id: userId },
  });

  // 3. Hooks： openComments、searchTerm,deleteId、editThread, threadActions, searchTerm
  const [modalOpen, setModalOpen] = useState(false);
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editThread, setEditThread] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);


  // Set up the thread actions
  const { getLocalLiked,toggleLikeThread, commentThread } = useThreadActions();

  // 4. useMutation
  const [deleteThreadMutation] = useDeleteThreadMutation();
  const [modifyThreadMutation] = useModifyThreadMutation();
  const [modifyUserMutation] = useModifyUserMutation()

  // 5. error handling
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  // 6. fetch user data
  const user = data?.getUser;

  // 7. Like button handler
  const handleLike = async (threadId: number, liked: boolean) => {
    // Update database and local storate
    await toggleLikeThread(Number(threadId), liked);
    refetch();
  };

  // 8. comment handler
  const handleAddComment = async (userId: number, threadId: number, content: string) => {
    await commentThread(userId, threadId, content);
    // Refetch the thread to include the new comment (or update local state)
    refetch();
  };

  // 9. search handler
  const handleSearchClick = () => {
  };

  // 10. handle user modify mutation
  const handleModifyUser = async () => {
    if (user) {
      await modifyUserMutation({
        variables: {
          inputs: {
            userId: user.id,
            firstName: userFirstName,
            lastName: userLastName,
          }
        }
      });
      // After modifying user, refetch the user data to reflect changes
      refetch();
    }
  };
  
  return (
    <Layout>
     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-sm transition-colors">
        <div className="mb-10 border-b border-gray-300 dark:border-gray-700 pb-6">
          <h2 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-300">
            🧑‍🍳 My Profile
          </h2>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user?.email}</p>

            {isEditingProfile ? (
              <>
                <p><strong>First Name:</strong> 
                  <Input
                    value={userFirstName || ""}
                    onChange={(e) => setUserFirstName(e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="First Name"
                  />
                </p>
                <p><strong>Last Name:</strong> 
                  <Input
                    value={userLastName || ""}
                    onChange={(e) => setUserLastName(e.target.value)}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Last Name"
                  />
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={async () => {
                      await handleModifyUser();
                      setIsEditingProfile(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setIsEditingProfile(false)}
                    variant="outline"
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition">
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p><strong>First Name:</strong> {user?.firstName}</p>
                <p><strong>Last Name:</strong> {user?.lastName}</p>
                <Button
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition"
                >
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 dark:text-indigo-300">
          🍳 My Threads
        </h2>
        <div className="flex gap-2 mb-6">
            <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchClick(); 
                    }
                  }}
                placeholder="Search your threads..."
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
            <Button 
            onClick={handleSearchClick}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition">
                🔍 Search
            </Button>
        </div>
        {user?.getThreads?.length === 0 ? (
          <Card className="relative hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <CardHeader className="flex justify-between items-start">
                <p className="text-gray-500">You haven’t posted anything yet.</p>
                <Button
                    onClick={() => setModalOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 text-lg rounded-full shadow hover:shadow-xl transition"
                >
                    Post your Thread
                </Button>
                    <CreateThreadModal open={modalOpen} onClose={() => setModalOpen(false)} refetchThreads={refetch} />
            </CardHeader>
        </Card>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...(user?.getThreads ?? [])]
            .filter((thread) =>
                thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                thread.content.toLowerCase().includes(searchTerm.toLowerCase())
              )
            .sort((a, b) => a.id - b.id)
            .map((thread) => (
              <Card
                key={thread.id}
                className="relative hover:shadow-md transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <CardHeader className="flex justify-between items-start">
                  <Link to={`/thread/${thread.id}`}>
                    <CardTitle>{thread.title}</CardTitle>
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setEditThread({
                          id: thread.id,
                          title: thread.title,
                          content: thread.content,
                        })
                      }
                      className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteId(thread.id)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-row gap-4">
                  <div className="flex-1">
                  <Link to={`/thread/${thread.id}`}>
                    <CardDescription>
                    {thread.content.substring(0, 100)}...
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2 text-gray-600 dark:text-gray-300">
                    by you
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    at {new Date(thread.createdAt).toLocaleString()}
                    </p>
                  </Link>
                  </div>
                  {thread.imageUrl && (
                  <div className="w-1/2 h-full">
                    <Link to={`/thread/${thread.id}`}>
                    <img
                      src={thread.imageUrl}
                      alt="Thread Image"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    </Link>
                  </div>
                  )}
                </CardContent>
                <div className="flex items-center justify-end gap-4 px-4 pb-4">
                  <LikeButton
                    liked={getLocalLiked(thread.id)}
                    likesCount={thread.likes}
                    onClick={() => handleLike(thread.id, getLocalLiked(thread.id))}
                  />
                  <button
                    onClick={() =>
                      setOpenComments(openComments === thread.id ? null : thread.id)
                    }
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{thread.comments?.length ?? 0}</span>
                  </button>
                </div>

                {openComments === thread.id && (
                  <CommentSection
                    userId={userId.toString()}
                    threadId={thread.id.toString()}
                    comments={(thread.comments ?? []).map((c) => ({
                      id: c.id.toString(),
                      author: c.user.email,
                      content: c.content,
                      createdAt: c.createdAt,
                    }))}
                    onAddComment={(userIdStr, threadIdStr, content) =>
                      handleAddComment(Number(userIdStr) ,Number(threadIdStr), content)
                    }
                  />
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* dialog for deleting thread */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Are you sure you want to delete this thread?</h2>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white"
              onClick={async () => {
                if (deleteId !== null) {
                  await deleteThreadMutation({ variables: { id: deleteId } });
                  await refetch();
                  setDeleteId(null);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* dialog for editing thread */}
      <Dialog open={editThread !== null} onOpenChange={() => setEditThread(null)}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-2">Edit Thread</h2>
        {editThread && (
            <form
            onSubmit={async (e) => {
                e.preventDefault();
                await modifyThreadMutation({
                variables: {
                    inputs: {
                    threadId: editThread.id,
                    title: editThread.title,
                    content: editThread.content,
                    },
                },
                });
                await refetch();
                setEditThread(null);
            }}
            className="space-y-4"
            >
            <Input
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={editThread.title}
                onChange={(e) =>
                setEditThread((prev) => prev && { ...prev, title: e.target.value })
                }
                placeholder="Title"
            />
            <Input
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={editThread.content}
                onChange={(e) =>
                setEditThread((prev) => prev && { ...prev, content: e.target.value })
                }
                placeholder="Content"
            />
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setEditThread(null)}>
                Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 text-white">
                Save
                </Button>
            </div>
            </form>
        )}
       </DialogContent>

      </Dialog>
    </Layout>
  );
};

export default MyThreads;
