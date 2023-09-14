import React, { useState, useEffect, useRef, useContext } from "react";
import Comment from "./Comment";
import { addCommentRequest, fetchComments } from "../services";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import { UserContext } from "../App";

function Post({ name: pname,content, id }) {
  const { name, userId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const comment = useRef();

  const getComments = async () => {
    setLoading(true);
    const data = await fetchComments(id);
    setComments(data);
    setLoading(false);
  };

  const addComment = async () => {
    if(comment.current.value !== "")
    {setLoading(true);
    setShowComments(true);
    await addCommentRequest(id, name, comment.current.value, userId);
    getComments();
    setShowComments(true);
    comment.current.value = "";
    setLoading(false);
    return;
}

alert("Add content");
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleComments = () => {
    setShowComments((prevState) => !prevState);
  };
  return (
    <div className="postCard">
      <div className="postHeader">
        <div
          className="avatar"
        >
          {pname?.[0]}
        </div>
        <h3>{pname}</h3>
      </div>
      <p>{content}</p>
      <hr></hr>
      <div className="actionRow">
        <div className="commentForm">
          <input
            className="commentInput"
            placeholder="Add Comment"
            ref={comment}
          ></input>
          <button className="commentButton" onClick={addComment}>
            Add
          </button>
        </div>
        <button className="viewComment" onClick={handleComments}>
          {showComments ? (
            <FaRegArrowAltCircleUp />
          ) : (
            <FaRegArrowAltCircleDown />
          )}
        </button>
      </div>
      {!loading ? <div>
        {showComments &&
          comments.length !== 0 &&
          comments.map((comment) => (
            <Comment name={comment.name} content={comment.content} />
          ))}
        {showComments && comments.length === 0 && (
          <div className="empty">No data</div>
        )}
      </div> : <div className="empty">Loading...</div>}
    </div>
  );
}

export default Post;
