import { api } from "@/utils/api";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/router";
import React from "react";

const BlogDetail = () => {
  const router = useRouter();
  const id = router.query.id as string;
  console.log("id", id);
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
