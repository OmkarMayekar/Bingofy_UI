class UtilityService {

    async getLocalStorageToken(){
        var tokenForHeader = window.sessionStorage.getItem("LoginResponse");
        var tokenForHeaderAfterStringify = JSON.stringify(tokenForHeader);
        var cleanString = tokenForHeaderAfterStringify.replace(/\\/g, "");
        var cleanedToken = cleanString.replace(/""/g,"");
        return cleanedToken;
    }

    async getLoggedInUsername(){
        var loggedInUsername = window.sessionStorage.getItem("LoggedInUsername");
		return loggedInUsername;
    }
}

export default new UtilityService();