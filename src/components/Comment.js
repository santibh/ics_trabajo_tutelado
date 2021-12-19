import React from "react";
import moment from "moment";

function Comment({ comment }) {
  return (
    <p>
      ({moment(comment.createdAt).format("DD/MM/yyyy")}){comment.owner}:
      {comment.content}
    </p>
  );
}

export default Comment;
