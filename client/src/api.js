import axios from "axios";

// Backend API base URL
const API_URL = "http://localhost:5000/api/auth"; 

export const signup = async (formdata) => {
    return axios.post(`${API_URL}/signup`, formdata);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};


