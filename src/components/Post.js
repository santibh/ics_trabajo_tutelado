import React from "react";
import { API } from "aws-amplify";
import { deletePost as deletePostMutation } from "../graphql/mutations";
import { AiFillDelete } from "react-icons/ai";

const Post = ({ id, owner, title, deletePost }) => {
  async function deletePostRequest() {
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
    }).then(() => deletePost(id));
  }

  return (
    <div className="row">
      <p id={id}>
        {owner}: {title}
      </p>
      <AiFillDelete onClick={deletePostRequest} />
    </div>
  );
};

export default Post;
