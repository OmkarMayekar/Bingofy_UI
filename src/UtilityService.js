class UtilityService {

    async getLocalStorageToken(){
        var tokenForHeader = window.sessionStorage.getItem("LoginResponse");
        var tokenForHeaderAfterStringify = JSON.stringify(tokenForHeader);
        var cleanString = tokenForHeaderAfterStringify.replace(/\\/g, "");
        var cleanedToken = cleanString.replace(/""/g,"");
        console.log("cleaned Token is : "+cleanedToken);
        return cleanedToken;
    }
}

export default new UtilityService();