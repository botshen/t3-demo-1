import React from "react";
import { api } from "@/utils/api";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/router";

const NewPost = () => {
  const router = useRouter();

  const post = api.post.create.useMutation();
  const send = () => {
    post.mutate(
      { title: "new post", content: "new content" },
      {
        onSuccess: () => {
          // 删除成功后的操作，例如跳转
          router.push("/writing");
        },
      },
    );
  };
  return (
    <div style={{ margin: "20px" }}>
      <Button onClick={send}>NewPost</Button>
    </div>
  );
};

export default NewPost;
