import React, { useState, useEffect, useContext } from "react";
import { fetchPosts } from "../services";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Search from "./Search";
import "../App.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name, userId } = useContext(UserContext);
  const navigate = useNavigate();

  if(name === null || userId === null)
  navigate('/');


  const getPosts = async () => {
    setLoading(true);
    const data = await fetchPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
    <Navbar />
    <hr></hr>
      <div className="feedContainer">
        <CreatePost className="postForm" getPosts={getPosts} />
        <div className="feed">
          <Search reset={setPosts} />
          {!loading ? (
            <div className="postContainer">
              {posts.length !== 0 &&
                posts?.map((post) => (
                  <Post name={post.name} content={post.content} id={post._id} key={post._id}/>
                ))}
              {posts.length === 0 && (
                <div className="empty">
                  No data<br></br>
                  Try creating a post!
                </div>
              )}
            </div>
          ) : (
            <div className="empty"> Loading... </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
