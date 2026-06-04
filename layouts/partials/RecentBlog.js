"use client";

import config from "@config/config.json";
import Link from "next/link";
import Post from "./Post";
import { markdownify } from "@lib/utils/textConverter";

const RecentBlog = ({ posts }) => {
  const { blog_folder } = config.settings;
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="section">
      <div className="container text-center">
        <div className="animate">
          <p className="uppercase">Our Latest News</p>
          {markdownify("Latest From Blog", "h2", "mt-4 section-title")}
        </div>
        
        <div className="row justify-center pb-16 pt-20">
          {recentPosts.map((post, i) => (
            <div key={`blog-${i}`} className="mb-8 lg:col-5">
              <Post post={post} />
            </div>
          ))}
        </div>

        <Link
          href={`/${blog_folder}`}
          className="btn btn-outline-primary"
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default RecentBlog;
