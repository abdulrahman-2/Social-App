import { noAvatar } from "@/assets";
import { isValidImageUrl } from "@/lib/utils";
import { Comment } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const CommentRenderer = ({ comments }: { comments: Comment[] }) => (
  <div className="my-5 px-3 flex flex-col gap-5">
    {comments.length > 0 ? (
      comments.map((comment) => (
        <div key={comment.id}>
          <div className="flex items-start gap-3">
            <Link href={`/profile/${comment.author.id}`}>
              <Image
                src={
                  (isValidImageUrl(comment.author?.profile_image) &&
                    comment.author?.profile_image) ||
                  noAvatar
                }
                alt={comment.author.name}
                width={35}
                height={35}
                className="w-[32px] h-[32px] cursor-pointer rounded-full border-[3px] border-border"
              />
            </Link>
            <div className="flex flex-col gap-1">
              <h3 className="text-primary text-lg font-semibold">
                {comment.author.name}
              </h3>
              <p className="text-secondary">{comment.body}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-secondary text-center text-lg">
        No comments available.
      </p>
    )}
  </div>
);

export default CommentRenderer;
