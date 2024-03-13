import { db } from "@/server/db";
import { api } from "@/utils/api";
import { Button } from "@radix-ui/themes";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { appRouter } from "@/server/api/root";
import superjson from "superjson";
export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      db: db,
    },
    transformer: superjson, // optional - adds superjson serialization
  });
  const id = context.params?.id.toString() ?? "";
  // prefetch `post.byId`
  await helpers.post.getSinglePost.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
export const getStaticPaths = async () => {
  const posts = await db.post.findMany({
    select: {
      id: true,
    },
  });
  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: "blocking",
  };
};

const BlogDetail = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  // const id = router.query.id as string;
  // console.log("id", id);
  const { id } = props;
  const { data: posts } = api.post.getSinglePost.useQuery({
    id,
  });
  const deletePost = api.post.deletePost.useMutation();
  const handleDelete = async () => {
    deletePost.mutate(
      { id },
      {
        onSuccess: () => {
          // removed async here as onSuccess does not expect a Promise
          router.push("/writing").catch((error) => {
            // Handle the navigation error here, if needed
            console.error("Failed to navigate:", error);
          });
        },
      },
    );
  };
  const handleBack = () => {
    router.push("/writing").catch((error) => {
      // Handle the navigation error here, if needed
      console.error("Failed to navigate:", error);
    });
  };
  return (
    <div style={{ margin: "20px" }}>
      <div>博客ID：{posts?.id}</div>
      <div>博客标题：{posts?.title}</div>
      <div>博客内容：{posts?.content}</div>
      <Button onClick={handleDelete}>删除博客</Button>
      <br />
      <br />
      <Button onClick={handleBack}>返回列表</Button>
    </div>
  );
};

export default BlogDetail;
