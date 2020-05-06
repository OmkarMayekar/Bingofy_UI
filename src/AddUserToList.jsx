import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
import {messages} from "./messages";
import PopUp from "./Popup";
import './App.css';

var resultOfGetSharingUserList = [];
var userNames = [];
class AddUserToList extends Component
{
    constructor(props){
        super(props);
        this.state ={
            sharingUserEmail: '',
            alert:null,
            succesfullPopUpMessage : false,
            unsuccessfullPopUpMessage : false,
            sharingUserEmailInvalid : false,
            emailInsideArrayIsInvalid : false,
            showSharingUsersList : false,
            userNameArray : [],
            userEmailArray : [],
            showUsers : false
        }
        this.onClose = this.onClose.bind(this);
        this.validateEmailFieldValues = this.validateEmailFieldValues.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.getListOfUsersSharingList = this.getListOfUsersSharingList.bind(this);
    }

    onClose(){
        this.setState({succesfullPopUpMessage : false, unsuccessfullPopUpMessage : false, sharingUserEmailInvalid : false, emailInsideArrayIsInvalid : false});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value});

    async validateEmailFieldValues(e){
        e.preventDefault();
        var emailString = document.getElementById("email").value;
        var sharingUserEmail = document.getElementById("sharingUser").value;
        var validationForSharingUserEmail = this.validateEmail(sharingUserEmail);
        console.log("sharing user email is :: "+validationForSharingUserEmail);
        if(validationForSharingUserEmail == "invalid")
        {
            this.setState({sharingUserEmailInvalid : true});
        }
        var array = emailString.split(',');
        console.log("array is :: "+array);
        for(var i =0 ; i < array.length ; i++)
        {
            var validationForArrayOfUserEmail = this.validateEmail(array[i]);
            if(validationForArrayOfUserEmail == "invalid")
            {   
                this.setState({emailInsideArrayIsInvalid : true});
                return false;
            }
        }
        if(this.state.sharingUserEmailInvalid == false && this.state.emailInsideArrayIsInvalid == false){
            console.log("calling api.....");
            var jwtToken = '';
            var responseCode = '';
            jwtToken = await UtilityService.getLocalStorageToken();
            let inputObjectOfAddUserToList = {array: array, email: sharingUserEmail,jwtToken:jwtToken};
            await ApiService.addUsersToList(inputObjectOfAddUserToList).then(async function(data){
                console.log("response of add users to list is :: "+JSON.stringify(data));
                        responseCode = data.data.code;
                        
            });
            console.log("response code is :: "+responseCode);
             if(responseCode == 201){
                this.setState({succesfullPopUpMessage : true});
                }
            if(responseCode === 500){
                this.setState({unsuccessfullPopUpMessage : true});
                }
        }
    }

    validateEmail = async (sharingUserEmail) =>  {
        console.log("validating e-mail...");
        var emailFieldValue = sharingUserEmail;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(emailFieldValue) == false) 
        {
            console.log("e-mail field is invalid");
            return "invalid";
        }else{
            console.log("e-mail field is valid");
            return "valid";
        }
    }

    getListOfUsersSharingList =async (e) => {
        e.preventDefault();
        var responseCode = 0;
        var response = '';
        var loggedInUsername = await UtilityService.getLoggedInUsername();
        var cleanedloggedInUsername = loggedInUsername.replace(/['"]+/g, '');
        await ApiService.getUserGrantAccessList(cleanedloggedInUsername).then(async function(data){
                console.log("response of get user grant access list is :: "+JSON.stringify(data));
                response = data;
                responseCode = data.data.code;
        });
        if(responseCode == 200)
        {
            var result = response.data.data;
            var output = Object.keys(result).map(function(data){
                return [data,result[data]];
             });
            var stringOutput = String(output);
            var array = stringOutput.split(',');
            resultOfGetSharingUserList = array;
            if(resultOfGetSharingUserList.length > 0)
            {
                userNames = resultOfGetSharingUserList.filter((element, index) => {
                    return index % 2 === 0;
                });
                console.log("array of usernames is :: ", userNames); 
                this.setState({showUsers : true});
            }
        }
}

    render() {
    if(this.state.sharingUserEmailInvalid == false && this.state.emailInsideArrayIsInvalid == false && this.state.succesfullPopUpMessage == false && this.state.unsuccessfullPopUpMessage == false && this.state.showUsers == false)
    {
        return(
            <div style={{marginTop: '8%'}}>
            <ReactTooltip place="top" className="react-tooltip-header" type="warning" effect="float"/>
                <form>
                <div>
                <div className="form-group">
                    <label style={{marginRight: '64px'}}>Please enter email of the users to be added  </label><label>:</label><label>&nbsp;&nbsp;</label>
                    <input type="text" placeholder="email" className="input" name="emailField" id="email" data-tip="Please enter correct emails" onChange={this.onChange}/>
                </div>
                <div style={{marginRight: '-104px', color:'red'}}>{this.state.isUserNameValid == false ? "Username is manditory" : ""}</div>
                <div className="form-group">
                    <label style={{marginRight: '90px'}}>Specify email of the user sharing it's list  </label><label>:</label><label>&nbsp;&nbsp;</label>
                    <input type="text" placeholder="email" className="input" name="emailField" id="sharingUser" onChange={this.onChange}/>
                </div>
                <a href="#"className="btn btn-secondary" onClick={this.getListOfUsersSharingList} style={{marginTop: '90px'}}>Show users sharing my list</a><label>&nbsp;&nbsp;&nbsp;&nbsp;</label><a href="#"className="btn btn-dark" onClick={this.validateEmailFieldValues} style={{marginTop: '90px'}}>Share My List</a>
                </div>
                </form>
            </div>
        );
    }
    if( this.state.sharingUserEmailInvalid == true )
    {
        return (<PopUp headerMessage = {messages.INCORRECT_EMAIL_ADDRESS} bodyMessage = {messages.SHARING_USER_EMAIL_IS_INCORRECT} onClose={this.onClose}/>);
    }
    if ( this.state.emailInsideArrayIsInvalid == true )
    {
        return (<PopUp headerMessage = {messages.INCORRECT_EMAIL_ADDRESS} bodyMessage = {messages.EMAIL_ADDRESS_IN_LIST_IS_INCORRECT} onClose={this.onClose}/>);
    }
    if(this.state.succesfullPopUpMessage == true )
    {
        return (<PopUp headerMessage = {messages.USERS_ARE_NOW_SHARING_LIST} bodyMessage = {messages.USERS_ARE_NOW_SHARING_LIST_BODY} onClose={this.onClose}/>);
    }
    if(this.state.unsuccessfullPopUpMessage == true )
    {
        return (<PopUp headerMessage = {messages.LIST_ACCESS_DENIED} bodyMessage = {messages.LIST_ACCESS_DENIED_BODY} onClose={this.onClose}/>);
    }
    if(this.state.showUsers == true)
    {
        return (
                <div className="list-group" style={{marginLeft:'-10%'}}>
                    <ul style={{fontFamily: 'cursive'}}>
                      {userNames.map(element => 
                         <a href="#" class="list-group-item list-group-item-action">{element}</a>
                        )}
                    </ul>
                </div>
                );
    }
    }
}
export default AddUserToList;