import { Button } from "@radix-ui/themes";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { fetchBlogPosts } from "./api/post/getPost";
type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};
type WritingProps = {
  data: Post[];
};

const writing = ({ data }: WritingProps) => {
  return (
    <div style={{ margin: "20px", display: "flex", flexWrap: "wrap" }}>
      {data?.map((post: Post) => {
        return (
          <article key={post.id} style={{ flex: "0 0 25%" }}>
            <p>博客ID: {post.id}</p>
            <p>博客标题: {post.title}</p>
            <p>博客内容: {post.content}</p>
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await fetchBlogPosts();
  return {
    props: { data: posts },
  };
};

export default writing;
