import React from "react";

function NewPostBox({ value, setNewPost }) {
  return (
    <div style={{marginRight: "20px"}}>
      <input
        type="text"
        value={value.title}
        onChange={(e) => setNewPost({ title: e.target.value })}
      ></input>
    </div>
  );
}

export default NewPostBox;
