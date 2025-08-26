import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  headers:{
    // "Content-Type":"application/json"
    "Authorization":`Bearer ${localStorage.getItem("token")}`
    // "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWF0IjoxNzU2MjAzNDE1LCJleHAiOjE3NTYyODk4MTV9.v6BqYI8B-n8JqsqKNd6WyAXegh6pB0eE1Xx_i2U1y1Q`
  }
})
export default axiosInstance;