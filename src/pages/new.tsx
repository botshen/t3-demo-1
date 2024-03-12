import React from "react";
import { api } from "@/utils/api";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/router";

const NewPost = () => {
  const router = useRouter();

  const post = api.post.create.useMutation();
  const send = () => {
    // removed async here, not needed at the moment
    post.mutate(
      { title: "new post", content: "new content" },
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
  return (
    <div style={{ margin: "20px" }}>
      <Button onClick={send}>NewPost</Button>
    </div>
  );
};

export default NewPost;
