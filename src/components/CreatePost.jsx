import React, { useRef, useContext } from 'react'
import { addPostRequest } from '../services';
import { UserContext } from '../App';

function CreatePost({getPosts}) {
  const {name, userId} = useContext(UserContext);
const content = useRef();
const handleAddPost = async () => {

  if(content.current.value !== "")
    {await addPostRequest(name, userId, content.current.value);
    content.current.value = "";
    getPosts();
    return;
}
alert("Plese add content");
}
  return (
    <div className="postFormContainer">
        <textarea className="postText" ref={content}></textarea>
        <button className="purpleButton" onClick = {handleAddPost}>Addpost</button>
    </div>
  )
}

export default CreatePost