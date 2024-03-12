import React from "react";
import { api } from "@/utils/api";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const writing = () => {
  const { data: posts } = api.post.getAllPost.useQuery();

  return (
    <>
      {posts?.map((post) => {
        return (
          <article key={post.id}>
            <p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <span>----------</span>
            <Link href={`/posts/${post.id}`}>Read post</Link>
          </article>
        );
      })}
    </>
  );
};

export default writing;
