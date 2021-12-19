import React from "react";
import Post from "./Post";

const Feed = ({ posts, setPosts, reload }) => {
  const deletePost = (id) => {
    setPosts((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="col">
      {posts.map((x) => (
        <Post
          id={x.id}
          owner={x.owner}
          date={x.createdAt}
          comments={x.comments}
          title={x.title}
          deletePost={deletePost}
          reload={reload}
        />
      ))}
    </div>
  );
};

export default Feed;
