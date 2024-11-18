import { Tag } from "@/types/types";

const TagRenderer = ({ tags }: { tags: Tag[] }) => (
  <div className="flex items-center gap-2">
    {tags.map((tag) => (
      <span
        className="text-primary py-1 px-2 rounded-lg bg-secondary"
        key={tag.name}
      >
        {tag.name}
      </span>
    ))}
  </div>
);

export default TagRenderer;
