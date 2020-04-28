import React, { Component } from 'react'
import ApiService from "./ApiService";
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
            userNameAlreadyExists : false
        }
        this.saveUser = this.saveUser.bind(this);
        this.onClose = this.onClose.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }
    saveUser = (e) => {
        console.log("validating username....");
        console.log("username state value : "+this.state.username);
        if(this.state.username && this.state.password && this.state.role){
            e.preventDefault();
            let user = {  email: this.state.email, username: this.state.username, password: this.state.password, role: this.state.role};
            console.log("user object is " + JSON.stringify(user));
            if(this.state.isEmailValid == true){
            ApiService.addUser(user).then((res) => {
                    console.log("response of register is : ",res);
                    var responseCode = res.data.code;
                    console.log("responseCode is : "+responseCode);
                    console.log("showSuccessPopUp value before setState"+this.state.showSuccessPopUp);
                    if(responseCode == 200){
                        this.setState({showSuccessPopUp : true});
                    }
                    if(responseCode == 406 && res.data.service_flag == "USER_WITH_SAME_EMAIL_ALREADY_EXISTS"){
                        this.setState({emailAlreadyExists : true});
                        console.log("email already exists :: "+this.state.emailAlreadyExists);
                    }
                    console.log("showSuccessPopUp value after setState"+this.state.showSuccessPopUp);
                });
            }else{
                return false;
            }
        }else{
            console.log("username is manditory");
             if(!this.state.username){this.setState({isUserNameValid : false});}
             if(!this.state.password){this.setState({isPasswordValid : false});}
             if(!this.state.role){this.setState({isRoleValid : false});}
            return false;
        }
    }

    onClose(){
        this.setState({showSuccessPopUp : false});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value ,isUserNameValid : true,isPasswordValid : true,isRoleValid : true});

    validateEmail(e){
        console.log("validating e-mail...");
        var emailFieldValue = e.target.value;
        console.log("emailField"+emailFieldValue);
        this.setState({ [e.target.name]: emailFieldValue });
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(emailFieldValue) == false) 
        {
            console.log("e-mail field is invalid");
            this.setState({isEmailValid : false});
        }else{
            this.setState({isEmailValid : true});
        }
    }

    render() {
        if(this.state.showSuccessPopUp == false){
        return(
            <div>
                <form>
                <div>
                <div className="form-group">
                    <label style={{marginRight: '10px'}}>E-Mail Address  </label><label>:</label><label>&nbsp;&nbsp;</label>
                    <input type="email" placeholder="e-mail" name="email" className = "input"  value={this.state.email} onChange={this.validateEmail} required/>
                </div>
                <div style={{marginRight: '-104px', color:'red'}}>{this.state.isEmailValid == false ? "Email is Not Valid" : ""}</div>
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
                <div className="form-group">
                    <label style={{marginRight: '110px'}}>Role  </label><label>:</label><label>&nbsp;&nbsp;</label>
                    <input placeholder="role" name="role" className = "input"  value={this.state.role} onChange={this.onChange} required/>
                </div>
                <div style={{marginRight: '-104px', color:'red'}}>{this.state.isRoleValid == false ? "Role is manditory" : ""}</div>
                <button className="btn btn-success" style={{marginRight: '-115px'}} onClick={this.saveUser}>Register!</button>
                </div>
                </form>
            </div>
        );
    }
        if(this.state.showSuccessPopUp == true)
        {
            console.log("showSuccessPopUp is now true");
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
                )
        }
    }
}

export default RegisterUserComponent;