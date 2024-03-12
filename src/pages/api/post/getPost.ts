// services/blogService.ts 或你的相应服务文件
import { db } from "@/server/db";

export async function fetchBlogPosts() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedPosts = posts.map((post) => {
    return {
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  });

  return serializedPosts;
}
