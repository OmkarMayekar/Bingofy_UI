import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8082/registration/demo';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post('http://localhost:9090/registration', {
        email_address :  user.email,
        username : user.username,
        password : user.password,
        role : user.role
      });
    }

    async loginUser(user) {
        return axios.post('/login', {
        username : user.username,
        password : user.password
      });
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user);
    }

}

export default new ApiService();