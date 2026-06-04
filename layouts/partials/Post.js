import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import Link from "next/link";

const Post = ({ post, i }) => {
  const { summary_length, blog_folder } = config.settings;
  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      {post.frontmatter.image && (
        <Link href={`/${blog_folder}/${post.slug}`}>
          <ImageFallback
            className="w-full object-cover"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-8 pb-0">
        <h2 className="h4">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="block hover:text-primary hover:underline"
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-4">
          {post.content.slice(0, Number(summary_length))}...
        </p>
      </div>

      {/* Footer com franja dourada diagonal */}
      <div className="relative mt-6 h-[90px] overflow-hidden">
        {/* Fundo diagonal dourado */}
        <div
          className="absolute inset-0 bg-[#d4a017]"
          style={{ clipPath: "polygon(0 38%, 100% 0%, 100% 100%, 0% 100%)" }}
        />

        {/* Conteúdo do autor */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center px-8 pb-5 pt-2">
        <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px_#1a7a6e]">
            <ImageFallback
              src={post.frontmatter.author.avatar}
              width={44}
              height={44}
              alt="author"
            />
          </div>
          <div className="pl-4">
            <p className="font-semibold text-white text-sm leading-tight">
              {post.frontmatter.author.name}
            </p>
            <p className="text-white/80 text-xs mt-0.5">
              {dateFormat(post.frontmatter.date)} — {readingTime(post.content)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;