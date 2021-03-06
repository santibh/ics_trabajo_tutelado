import React, { useState, useEffect } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { createPost as createPostMutation } from "./graphql/mutations";
import { listPosts } from "./graphql/queries";
import { searchPosts } from "./graphql/queries";
import Feed from "./components/Feed";
import { BiRefresh } from "react-icons/bi";
import NewPostBox from "./components/NewPostBox";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [newPost, setNewPost] = useState({ title: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const apiData = await API.graphql({ query: listPosts });
    setLoading(false);
    setPosts(apiData.data.listPosts.items);
    setNewPost({ title: "" });
  }

  async function createPost() {
    if (newPost.title.length === "") return;
    await API.graphql({
      query: createPostMutation,
      variables: { input: newPost },
    }).then(() => fetchPosts());
  }

  async function handleSearchPosts() {
    setSearchResults();
    const apiData = await API.graphql({
      query: searchPosts,
      variables: { filter: {title: { match: query }}},
    });
    console.log(apiData.data.searchPosts.items);
    try {
      setSearchResults(apiData.data.searchPosts.items);
    } catch {}
  }

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults])

  return (
    <div className="App">
      <AmplifySignOut />
      <div className="container mb-4">
        <h1>ICS Trabajo Tutelado</h1>
        <div className="d-flex justify-content-center">
          <button className="btn" onClick={fetchPosts}>
            <BiRefresh />
          </button>
          <NewPostBox value={newPost} setNewPost={setNewPost} />
          <button
            className="btn btn-primary"
            onClick={createPost}
            disabled={newPost.title === ""}
          >
            Post
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>{" "}
          <button
            className="btn btn-primary"
            onClick={handleSearchPosts}
            disabled={query === ""}
          >
            Buscar
          </button>
        </div>
        <div>
          <h4>Resultados de la b??squeda ({searchResults !== undefined &&
            searchResults !== null && searchResults.length} mensaje/s):</h4>
          {searchResults !== undefined &&
            searchResults !== null &&
            searchResults.map((x) => (
              <p>{x.title}</p>
            ))}
        </div>
      </div>
      {!loading && (
        <Feed posts={posts} setPosts={setPosts} reload={fetchPosts} />
      )}
      {loading && <div>Cargando...</div>}
    </div>
  );
}

export default withAuthenticator(App);
