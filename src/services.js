import axios from "axios";
const baseUrl = "https://kennect-backend.vercel.app";

export const fetchUser = async (name) => {
  try {
    const data = await axios.post(`${baseUrl}/addUser`,{name});
    return data;
  } catch (error) {
    return {status : 400, data: {}}
  }
};

export const fetchComments = async (postId) => {
  try {
    const { data, status } = await axios.get(`${baseUrl}/${postId}/comments`);
    if (status === 200) return data;
  } catch (error) {
    return [];
  }
};

export const fetchPosts = async () => {
  try {
    const { data, status } = await axios.get(`${baseUrl}/all`);
    if (status === 200) return data;
  } catch (error) {
    alert(error.message);
    return [];
  }
};

export const addCommentRequest = async (postId, name, content, userId) => {
  try {
    const { status } = await axios.post(
      `${baseUrl}/${postId}/addComment`,
      { name, content, userId }
    );
    if (status === 200) {
      alert("Comment added")
    }
  } catch (error) {
    alert("could not add comment")
  }
};

export const addPostRequest = async (name, userId, content) => {
  try {
    const {status} = await axios.post(`${baseUrl}/addPost`, {
      name,
      userId,
      content,
    });
    if (status === 200) 
    alert("Post created");
  } catch (error) {
    alert("Some error occured");
  }
};

export const searchRequest = async (keyword) => {
  try {
    const { data, status } = await axios.get(
      `${baseUrl}/search/?keyword=${keyword}`
    );
    if(status === 200)
    return data;

  } catch (error) {
    alert("some error occured")
    return [];
  }
};
