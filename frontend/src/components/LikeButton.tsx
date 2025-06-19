import { Heart, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  liked: boolean;
  likesCount: number;
  onClick: () => void;
}

const LikeButton = ({ liked, likesCount, onClick }: LikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex items-center gap-1 text-red-500 hover:bg-red-100"
    >
      {liked ? <HeartIcon fill="currentColor" /> : <Heart />}
      <span>{likesCount}</span>
    </Button>
  );
};

export default LikeButton;
