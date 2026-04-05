// API client for the COMP303 Lab4 - Teams & Players React app.
// Connects to Microservice 2 backend and was developed by Farouk O.
// Microservices 1 developed by Muhammed . & Microservice 2 developed by Abdulrahman H.
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.6:8084/", // Microservice 2 backend (update to match your environment)
});

export default api;
