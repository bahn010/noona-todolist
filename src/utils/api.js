import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api`,
  headers: {  
    "Content-Type": "application/json",
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    if (error.response && error.response.data) {
      if (typeof error.response.data === 'object' && error.response.data.message) {
        return Promise.reject(new Error(error.response.data.message));
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
