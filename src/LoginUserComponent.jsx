import React, { Component } from 'react'
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
import {messages} from "./messages";
import PopUp from "./Popup";
import './App.css';

class LoginUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            showSuccessPopUp : false,
            isUserNameValid : true,
            isPasswordValid : true,
            unAuthorizedUser : false
        }
        this.loginUser = this.loginUser.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    loginUser =async (e) => {
        console.log("validating username....");
        console.log("username state value in loginUser: "+this.state.username);
        if(this.state.username && this.state.password){
            e.preventDefault();
            let user = {username: this.state.username, password: this.state.password};
            console.log("user object in loginUser is " + JSON.stringify(user));
            if(this.state.isUserNameValid == true){
                await ApiService.loginUser(user).then(async (res) => {
                        console.log("response of login is : ",res);
                        var jwtToken = '';
                        if(res.headers.authorization)
                        {
                               jwtToken = res.headers.authorization
                        }
                        window.sessionStorage.setItem("LoginResponse", JSON.stringify(jwtToken));
                        var cleanedToken = await UtilityService.getLocalStorageToken();
                        var responseCode = res.status;
                        console.log("responseCode for login is : "+responseCode);
                        console.log("showSuccessPopUp value before setState"+this.state.showSuccessPopUp);
                        if(responseCode == 200){
                            this.setState({showSuccessPopUp : true});
                        }
                        console.log("showSuccessPopUp value after setState"+this.state.showSuccessPopUp);
                    }).catch((err) =>{
                            console.log("error was caught "+err);
                            this.setState({unAuthorizedUser : true});
                            console.log("unAuthorizedUser state in catch :: "+this.state.unAuthorizedUser);
                        });
            }else{
                return false;
            }
        }else{
            console.log("username is manditory");
             if(!this.state.username){this.setState({isUserNameValid : false});}
             if(!this.state.password){this.setState({isPasswordValid : false});}
            return false;
        }
    }

    onClose(){
        this.setState({showSuccessPopUp : false,unAuthorizedUser : false});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value ,isUserNameValid : true,isPasswordValid : true,isRoleValid : true});

    render() {console.log("unAuthorizedUser state value in render is : "+this.state.unAuthorizedUser);
        if(this.state.showSuccessPopUp == false && this.state.unAuthorizedUser == false){
        return(
            <div>
                <form>
                <div>
                <div className="form-group">
                    <label style={{marginRight: '64px'}}>Username  </label><label>:</label><label>&nbsp;&nbsp;</label>
                    <input type="text" placeholder="username" className = "input" name="username" value={this.state.username} onChange={this.onChange} required/>
                </div>
                <div style={{marginRight: '-104px', color:'red'}}>{this.state.isUserNameValid == false ? "Username is manditory" : ""}</div>
                <div className="form-group">
                    <label style={{marginRight: '68px'}}>Password  </label><label>:</label><label>&nbsp;&nbsp;</label>
                    <input type="password" placeholder="password" className = "input"  name="password" value={this.state.password} onChange={this.onChange} required/>
                </div>
                <div style={{marginRight: '-104px', color:'red'}}>{this.state.isPasswordValid == false ? "Password is manditory" : ""}</div>
                <button className="btn btn-success" style={{marginRight: '-115px'}} onClick={this.loginUser}>Login!</button>
                </div>
                </form>
            </div>
        );
    }
    if(this.state.unAuthorizedUser == true)
    {
            console.log("User is unAuthorizedUser");
            return (<PopUp headerMessage = {messages.UNAUTHORIZED_USER} bodyMessage = {messages.CREDS_INVALID} onClose={this.onClose}/>);
    }
    if(this.state.showSuccessPopUp == true)
    {
            console.log("showSuccessPopUp is now true");
            return (<PopUp headerMessage = {messages.LOGGING_IN_SUCCESSFULL_HEADER} bodyMessage = {messages.USER_LOGGED_IN_SUCCESSFULLY}/>);
    }
    }
}

export default LoginUserComponent;