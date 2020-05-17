import axios from 'axios';
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
        //console.log("jwtToken ===> "+jwtToken);
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
        //console.log("jwtToken ===> "+jwtToken);
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
        //console.log("jwtToken ===> "+jwtToken);
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

    async addNewItemsToUserList(addNewItemsToUserListInput){
        console.log("addNewItemsToUserLists is :: "+JSON.stringify(addNewItemsToUserListInput));
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        //console.log("jwtToken ===> "+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username : addNewItemsToUserListInput.username,
                list_of_items_To_be_added : addNewItemsToUserListInput.arrayOfItems
            }
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/inventories/addNewItemsToUserList', data, {
                headers: headers
              });
            resolve(response);
        });
    }

    async removeItemsFromUserList(removeItemsFromUserListInput){
        console.log("removeItemsFromUserList is :: "+JSON.stringify(removeItemsFromUserListInput));
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        //console.log("jwtToken ===> "+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username : removeItemsFromUserListInput.username,
                list_of_items_To_be_added : removeItemsFromUserListInput.arrayOfItems
            }
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/inventories/removeItemsFromUserList', data, {
                headers: headers
              });
            resolve(response);
        });
    }

    async getAllItems(getAllItemsInput){
        console.log("getAllItems input is :: "+JSON.stringify(getAllItemsInput));
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        //console.log("jwtToken ===> "+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username : getAllItemsInput.username
            }
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/inventories/getAllItems', data, {
                headers: headers
              });
            resolve(response);
        });
    }

    async addRecipe(addRecipeInput){
        console.log("addRecipe input is :: "+JSON.stringify(addRecipeInput));
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        //console.log("jwtToken ===> "+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username : addRecipeInput.username,
                recipe_title : addRecipeInput.recipeTitle,
                recipe_desc : addRecipeInput.recipeDescription,
                sharing_user_email : addRecipeInput.sharingUserEmail,
                recipe_type : addRecipeInput.recipeType
            }
            console.log("data =====>",data);
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/operations/addRecipe', data, {
                headers: headers
              });
            resolve(response);
        });
    }

    async getRecipe(getRecipeInput){
        console.log("getRecipe input is :: "+JSON.stringify(getRecipeInput));
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        //console.log("jwtToken ===> "+jwtToken);
        return new Promise(async function(resolve, reject) {
            var data = {
                username : getRecipeInput.username
            }
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.post('/operations/getRecipe', data, {
                headers: headers
              });
            resolve(response);
        });
    }

     async getNonAdminUserList(){
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        //console.log("jwtToken ===> ",jwtToken);
        return new Promise(async function(resolve, reject) {
            const headers = {
              'Authorization': jwtToken
            }
            var response = await axios.get('/adminUser/getAllNonAdminUsersInfo', {
                headers: headers
              });
            resolve(response);
        });
    }

    async sendFeedback(sendFeedbackInput){
        console.log("sendFeedbackInput ===> ",sendFeedbackInput);
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        //console.log("jwtToken ===> ",jwtToken);
        return new Promise(async function(resolve, reject) {
            const headers = {
              'Authorization': jwtToken
            }
            var data = {
                username : sendFeedbackInput.username,
                feedback : sendFeedbackInput.feedback
            }
            var response = await axios.post('/operations/sendFeedback', data, {
                headers: headers
              });
            resolve(response);
        });
    }

    async viewCommonLists(viewCommonListsInput){
        console.log("viewCommonListsInput ===> ",viewCommonListsInput);
        var jwtToken = '';
        jwtToken = await UtilityService.getLocalStorageToken();
        console.log("jwtToken ===> ",jwtToken);
        return new Promise(async function(resolve, reject) {
            const headers = {
              'Authorization': jwtToken
            }
            var data = {
                username : viewCommonListsInput.username
            }
            var response = await axios.post('/inventories/getAllCommonItems', data, {
                headers: headers
              });
            resolve(response);
        });
    }
}
export default new ApiService();