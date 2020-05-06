import axios from 'axios';
import request from 'request';
import promise from 'promise';
import UtilityService from "./UtilityService";

class ApiService {

    addUser(user) {
        return axios.post('/registration', {
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

    async addUsersToList(inputObjectOfAddUserToList) {
        console.log("Input Object Of AddUserToList value is :: "+JSON.stringify(inputObjectOfAddUserToList));
        return new Promise(async function(resolve, reject) {
            var data = {
                listAccessignUserEmail :  inputObjectOfAddUserToList.array,
                email : inputObjectOfAddUserToList.email
            }
            const headers = {
              'Authorization': inputObjectOfAddUserToList.jwtToken
            }
            var response = await axios.post('/operations/addUserToMyList', data, {
                headers: headers
              });
            resolve(response);
        });
    }

    async getUserGrantAccessList(username){
        console.log("username is :: "+username);
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        console.log("jwtToken===>"+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username :  username
            }
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/operations/getUserGrantAccessList', data, {
                headers: headers
              });
            resolve(response);
        });
    }

    async assignExtraAttributesForItems(assignExtraAttributesForItemsInput){
        console.log("assignExtraAttributesForItemsInput is :: "+JSON.stringify(assignExtraAttributesForItemsInput));
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        console.log("jwtToken===>"+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username :  assignExtraAttributesForItemsInput.username,
                json : assignExtraAttributesForItemsInput.JsonOBJ
            }
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/inventories/assignExtraAttributesForItems', data, {
                headers: headers
              });
            resolve(response);
        });
    }
    async getAllExtraInventoryAttributes(username){
        console.log("getAllExtraInventoryAttributesInput is :: "+username);
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        console.log("jwtToken===>"+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username :  username
            }
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/inventories/getAllExtraInventoryAttributes', data, {
                headers: headers
              });
            resolve(response);
        });
    }
}
export default new ApiService();