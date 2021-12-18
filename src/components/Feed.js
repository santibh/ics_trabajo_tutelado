import React from "react";
import Post from "./Post";

const Feed = ({posts, setPosts}) => {

  const deletePost = id => {
    setPosts(prev => prev.filter(x => x.id !== id))
  }

  return (
    <div className="col">
      {posts.map((x) => (
        <Post id={x.id} owner={x.owner} title={x.title} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default Feed;
