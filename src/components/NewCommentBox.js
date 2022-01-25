import React, { useState } from "react";
import { createComment as createCommentMutation } from "../graphql/mutations";
import { API } from "aws-amplify";

function NewCommentBox({ postID, reload }) {
  const initialNewComment = {
    content: "",
    postID,
  };
  // State
  const [newComment, setNewComment] = useState(initialNewComment);

  async function createComment() {
    await API.graphql({
      query: createCommentMutation,
      variables: { input: newComment },
    }).then(() => {
      setNewComment(initialNewComment);
      reload();
    });
  }

  return (
    <div>
      <input
        type="text"
        value={newComment.content}
        style={{ marginRight: "0.5em", width: "25em" }}
        onChange={(e) => setNewComment({ postID, content: e.target.value })}
      ></input>
      <button
        className="btn btn-secondary"
        onClick={createComment}
        disabled={newComment.content === ""}
      >
        Responder
      </button>
    </div>
  );
}

export default NewCommentBox;
