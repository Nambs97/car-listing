import axios from "axios";
import apiConfig from "../config/api.config"

const BASE_URL = apiConfig.BASE_URL;

class UserService {
    getAll() {
      return axios.get(BASE_URL + "/users");
    }
  
    get(id) {
      return axios.get(`${BASE_URL}/users/${id}`);
    }
  
    findByUsername(username) {
      return axios.get(`${BASE_URL}/users?username=${username}`);
    }
  }
  
  export default new UserService();