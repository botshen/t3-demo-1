import React from "react";
import { api } from "@/utils/api";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const writing = () => {
  const { data: posts } = api.post.getAllPost.useQuery();

  return (
    <div style={{ margin: "20px", display: "flex", flexWrap: "wrap" }}>
      {posts?.map((post) => {
        return (
          <article key={post.id} style={{ flex: "0 0 25%" }}>
            <p>博客ID：{post.id}</p>
            <p>博客标题：{post.title}</p>
            <p>博客内容：{post.content}</p>
            <Button>
              <Link href={`/posts/${post.id}`}>查看详情</Link>
            </Button>
            <div>----------</div>
          </article>
        );
      })}
    </div>
  );
};

export default writing;
