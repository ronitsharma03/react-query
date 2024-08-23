import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPosts, fetchPosts, fetchTags } from "../api/api";
import React from "react";
import Spinner from "./Spinner";

const PostData = () => {
    const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity
  });

  const {
    mutate,
    isError: isPostError,
    reset,
    error: postError,
    isPending
  } = useMutation({
    mutationFn: addPosts,
    onMutate: () => {
        return {id:1};
    },
    onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
            queryKey: ["posts"],
            exact: true,

        })
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys())
      .filter((key) => formData.get(key) === "on");
    console.log(title, tags);
    if (!title || !tags) return;
    mutate({ id: posts.length + 1, title, tags });
    e.target.reset();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter the data" name="title" />
          <div>
            {tagsData?.map((tag) => (
              <div key={tag}>
                <input type="checkbox" name={tag} id={tag} />
                <label htmlFor={tag}>{tag}</label>
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <br />
      {isLoading && isPending &&  <Spinner />}
      {isError  && <p>{error?.message}</p>}
      {isPostError && <p onClick={() => reset()}>Failed to post</p>}
      {posts?.map((post) => (
        <div key={post.id}>
          <div>{post.title}</div>
          <div>{post.tags}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default PostData;
