import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  userId: string,
  threadId: string;
  comments: Comment[];
  onAddComment: (userId: string, threadId: string, content: string) => void;
}

const CommentSection = ({ userId, threadId, comments, onAddComment }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");

  const handleSend = () => {
    onAddComment(userId, threadId, commentText);
    setCommentText("");
  };

  return (
    <div className="px-4 pb-4">
      <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 space-y-2">
        <div className="flex gap-2">
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
            placeholder="Write a comment..."
            className="flex-grow"
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
        {comments.map((c) => (
          <div key={c.id} className="text-sm text-gray-700 dark:text-gray-200">
            <span className="font-medium">{c.author}:</span> {c.content}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right ml-auto">
             at {new Date(c.createdAt).toLocaleString()}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
