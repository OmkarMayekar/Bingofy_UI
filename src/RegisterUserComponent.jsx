import React, { Component } from 'react'
import ApiService from "./ApiService";
import PopUp from "./Popup";
import {messages} from "./messages";
import './App.css';

class RegisterUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            email: '',
            role: '',
            showSuccessPopUp : false,
            isEmailValid : true,
            isUserNameValid : true,
            isPasswordValid : true,
            isRoleValid : true,
            emailAlreadyExists : false,
            usernameAlreadyExists : false
        }
        this.saveUser = this.saveUser.bind(this);
        this.onClose = this.onClose.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }
    saveUser = (e) => {
        console.log("validating username....");
        if(this.state.username && this.state.password){
            e.preventDefault();
            let user = {  email: this.state.email, username: this.state.username, password: this.state.password, role: "NONADMIN"};
            if(this.state.isEmailValid == true){
            ApiService.addUser(user).then((res) => {
                    console.log("response of register is : ",res);
                    var responseCode = res.data.code;
                    console.log("responseCode is : "+responseCode);
                    if(responseCode == 200){
                        this.setState({showSuccessPopUp : true});
                    }
                    if(responseCode == 406 && res.data.data.service_flag == "USER_WITH_SAME_EMAIL_ALREADY_EXISTS"){
                        this.setState({emailAlreadyExists : true});
                    }
                    if(responseCode == 406 && res.data.data.service_flag == "USER_WITH_SAME_USERNAME_ALREADY_EXISTS"){
                        this.setState({usernameAlreadyExists : true});
                    }
                });
            }else{
                return false;
            }
        }else{
             if(!this.state.username){this.setState({isUserNameValid : false});}
             if(!this.state.password){this.setState({isPasswordValid : false});}
             if(!this.state.role){this.setState({isRoleValid : false});}
            return false;
        }
    }

    onClose(){
        this.setState({showSuccessPopUp : false, emailAlreadyExists : false, usernameAlreadyExists : false});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value ,isUserNameValid : true,isPasswordValid : true,isRoleValid : true});

    validateEmail(e){
        console.log("validating e-mail...");
        var emailFieldValue = e.target.value;
        this.setState({ [e.target.name]: emailFieldValue });
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(emailFieldValue) == false) 
        {
            this.setState({isEmailValid : false});
        }
        else
        {
            if(/@bingofy.com\s*$/.test(emailFieldValue))
            {
                this.setState({isEmailValid : true});
                console.log("it ends in @yahoo");
            }
            else
            {
                this.setState({isEmailValid : false});
                console.log("it does not ends");
            }
            
        }
    }

    render() 
    {
        if(this.state.showSuccessPopUp == false && this.state.emailAlreadyExists == false && this.state.usernameAlreadyExists == false)
        {
        return(
            <div>
                <form>
                <div>
                <div className="form-group">
                    <label style={{marginRight: '10px'}}>E-Mail Address  </label><label>:</label><label>&nbsp;&nbsp;</label>
                    <input type="email" placeholder="e-mail" name="email" className = "input"  value={this.state.email} onChange={this.validateEmail} required/>
                </div>
                <div style={{marginRight: '-104px', color:'red'}}>{this.state.isEmailValid == false ? <label style={{fontSize : '12px'}}>Email is Not Valid</label> : ""}</div>
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
                <button className="btn btn-dark" style={{marginRight: '50%',marginLeft: '50%',marginTop: '2%'}} onClick={this.saveUser}>Register!</button>
                </div>
                </form>
            </div>
            );
        }
    if(this.state.showSuccessPopUp == true)
    {
        return(
            <div>
                <div className="modal-alert-overlay" style={{zIndex:900}} ></div>
                <div className="modal-60" style={{width:'25%'}}>
                    <div className="repeater modal-head">
                        <span>{"Registeration Successful"}</span>
                        <a href="javascript:void(0)" onClick={this.onClose}></a>
                    </div>
                    <div className="repeater modal-body">
                        <div>{messages.USER_REGISTERED_SUCCESSFULLY}</div>
                    </div>
                    <div className="repeater modal-button">
                        <a href="" onClick={this.onClose}>{"ok"}</a>
                    </div>
                </div>
            </div>
                );
    }
    if(this.state.emailAlreadyExists == true)
    {
            return (<PopUp headerMessage = {messages.USER_REGISTERED_UNSUCCESSFULLY} bodyMessage = {messages.USER_WITH_SAME_EMAIL_ALREADY_EXISTS} onClose={this.onClose}/>);
    }
    if(this.state.usernameAlreadyExists == true)
    {
            return (<PopUp headerMessage = {messages.USER_REGISTERED_UNSUCCESSFULLY} bodyMessage = {messages.USER_WITH_SAME_USERNAME_ALREADY_EXISTS} onClose={this.onClose}/>);
    }
    }
}

export default RegisterUserComponent;