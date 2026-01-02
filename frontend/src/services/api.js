import axios from "axios";

const api = axios.create({
  baseURL: "https://promptvault-g746.onrender.com/api", 
  withCredentials: true, 
});

export default api;
