import React, { useState } from "react";
import Post from "./Post";

const Feed = ({posts}) => {

  return (
    <div>
      Feed: aquí se veran los mensajes
      {posts.map((x) => (
        <Post id={x.id} owner={x.owner} title={x.title} />
      ))}
    </div>
  );
};

export default Feed;
