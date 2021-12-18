import React, { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import {
  createPost as createPostMutation,
  deletePost as deletePostMutation,
} from "./graphql/mutations";
import { listPosts } from "./graphql/queries";
import Feed from "./components/Feed";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "prueba" });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const apiData = await API.graphql({ query: listPosts });
    setPosts(apiData.data.listPosts.items);
  }

  async function createPost() {
    if (newPost.title.length === "") return;
    await API.graphql({
      query: createPostMutation,
      variables: { input: newPost },
    });
  }

  async function deleteNote({ id }) {
    /*const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});*/
  }

  return (
    <div className="App">
      <AmplifySignOut />
      <h1>ICS Trabajo Tutelado</h1>

      <button onClick={createPost}>Crear</button>
      <Feed posts={posts}/>
    </div>
  );
}

export default withAuthenticator(App);
