import React from "react";
import { api } from "@/utils/api";
import { Button } from "@radix-ui/themes";

const NewPost = () => {
  const post = api.post.create.useMutation();
  const send = () => {
    post.mutate({ title: "new post", content: "new content" });
  };
  return <Button onClick={send}>NewPost</Button>;
};

export default NewPost;
