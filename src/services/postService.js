import axios from 'axios';

const API_BASE_URL = 'http://52.221.38.101'; // Ganti sesuai backend-mu

// Fetch posts from API
export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data.data; // Assuming the API returns an object with 'data'
    } catch (error) {
        console.error('Error fetching posts:', error);
        return []; // Return empty array on error
    }
};

// Create a new post
export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts`, postData);
        return response.data.data; // Assuming the response contains a 'data' field
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
};

// Delete a post by ID
export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/posts/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        return false;
    }
};

// Edit an existing post
export const editPost = async (id, postData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData);
        return response.data.data; // Assuming the response contains a 'data' field
    } catch (error) {
        console.error('Error editing post:', error);
        return null;
    }
};

