import React from "react";
import { API } from "aws-amplify";
import { deletePost as deletePostMutation } from "../graphql/mutations";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "../styles/posts.css";
import moment from "moment";
import NewCommentBox from "./NewCommentBox";
import Comment from "./Comment";

const Post = ({ id, owner, title, comments, createdAt, deletePost, reload }) => {
  async function deletePostRequest() {
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
    })
      .then(() => {
        deletePost(id);
      })
      .catch(() => toast.error("Error eliminando el mensaje"));
  }

  return (
    <div id={id} className="container postcard mb-3">
      <p>{owner}</p>
      <p>{title}</p>
      <AiFillDelete onClick={deletePostRequest} />
      <p>{moment(createdAt).format("DD/MM/yyyy")}</p>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NewCommentBox postID={id} reload={reload} />
      {comments.items && comments.items.map((x) => (
        <Comment comment={x} />
      ))}
    </div>
  );
};

export default Post;
