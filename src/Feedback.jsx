import React, { Component } from 'react';
import './App.css';
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
import LoginToViewPageWarning from "./LoginToViewPageWarning"; 
import PopUp from "./Popup";
import {messages} from "./messages";
import { Card, CardBody, CardTitle, CardSubtitle } from "shards-react";
import { MDBInput,MDBMask, MDBView, MDBContainer, MDBRow, MDBCol} from "mdbreact";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'

var array = [];

const MyLoader = () => {
  return (
    <div style={{marginTop : '5%'}}>
    <Loader
         type="ThreeDots"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={25000} //3 secs
    />
    </div>
  )
}

class Feedback extends Component{

    constructor(props){
        super(props);
        this.state ={
          feebackDescription : '',
          showWarningPage : false,
          feedbackSubmitted : false,
          loading : false,
          feedbackFailed : false
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.showLoader = this.showLoader.bind(this);
    }

    async componentDidMount(){
        console.log("componentDidMount called");
        const jwtToken = await UtilityService.getLocalStorageToken();
            if(jwtToken==null || jwtToken=='null' ) 
            {
                console.log("jwtToken was null");
                this.setState({showWarningPage : true});
            }
            else
            {
                console.log("jwtToken avialble");
                this.setState({showWarningPage : false});
            }
            
            console.log("componentDidMount ended....");
    }
    
    changeHandler = event => {
      this.setState({ [event.target.name]: event.target.value });
    };


    async sendFeedback(e)
    {
      e.preventDefault();
      if(this.state.feebackDescription != null)
      { 
        this.showLoader();
        var username = await UtilityService.getLoggedInUsername();
        var cleanedUsername = JSON.parse(username);
        var responseCode = null;
        let sendFeedbackInput = {username : cleanedUsername, feedback : this.state.feebackDescription};
        await ApiService.sendFeedback(sendFeedbackInput).then(async function(data){
                  console.log("response of send feedback is :: ",JSON.stringify(data));
                  responseCode = data.data.code;
        });
        if(responseCode == 201)
        {
          this.setState({feedbackSubmitted : true});
          this.hideLoader();
        }
        if(responseCode == 406)
        {
          this.setState({feedbackFailed : true});
          this.hideLoader();
        }
      }

    }

    hideLoader = () => {
      this.setState({ loading: false });
    }

    showLoader = () => {
      this.setState({ loading: true });
    }

    render() 
    {
      console.log("callAPI ====> ",this.state.callAPI);
      if(this.state.showWarningPage == false && this.state.feedbackSubmitted == false && this.state.loading == false)
      { 
        return(
              <Card style={{width : '50%', marginLeft : '25%', marginTop : '5%'}}>
                <CardBody>
                  <MDBInput
                  name="feebackDescription"
                  id="defaultFormRegisterNameEx"
                  type="textarea"
                  label="Connect with us...."
                  rows="10"
                  icon="pencil-alt"
                  onChange={this.changeHandler}
                  value={this.state.feebackDescription}
                  background
                />
                <button className="btn btn-dark" style={{marginRight: '50%',marginLeft: '20%',width: '60%'}} onClick={(e) => {this.sendFeedback(e)}}>Let us know!</button>
                </CardBody>
              </Card>
              );
      }
    if(this.state.showWarningPage == true)
    {
        return(<LoginToViewPageWarning/>);
    }
    if(this.state.feedbackSubmitted == true)
    {
        return (<PopUp headerMessage = {messages.FEEBACK_SENT_SUCCESSFULLY} bodyMessage = {messages.FEEBACK_SENT_SUCCESSFULLY_BODY}/>);
    }
    if(this.state.feedbackFailed == true)
    {
        return (<PopUp headerMessage = {messages.FEEBACK_SENT_UNSUCCESSFULLY} bodyMessage = {messages.FEEBACK_SENT_UNSUCCESSFULLY_BODY}/>);
    }
    if(this.state.loading == true)
    {
        return (<MyLoader/>);
    }
    }
}

export default Feedback;