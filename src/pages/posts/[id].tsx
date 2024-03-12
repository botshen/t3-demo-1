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
  const handleDelete = () => {
    deletePost.mutate(
      { id },
      {
        onSuccess: () => {
          // 删除成功后的操作，例如跳转
          router.push("/writing");
        },
        onError: (error) => {
          // 错误处理
          console.error("Delete post failed", error);
        },
      },
    );
  };
  return (
    <>
      <div>BlogDetail{posts?.id}</div>
      <div>BlogDetail{posts?.title}</div>
      <div>BlogDetail{posts?.content}</div>
      <span>------------------------</span>
      <Button onClick={handleDelete}>删除博客</Button>
    </>
  );
};

export default BlogDetail;
