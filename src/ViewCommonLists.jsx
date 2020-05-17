import React, { Component } from 'react'
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
import {messages} from "./messages";
import PopUp from "./Popup";
import './App.css';
import LoginToViewPageWarning from "./LoginToViewPageWarning";
var keys = null;
var response = null;
class ViewCommonLists extends Component{

    constructor(props){
        super(props);
        this.state ={
            showUsers : false,
            globalUserListArray : [],
            globalItemsListArray : [],
            showWarningPage : false,
            jwtToken : '',
            searchItems : []
        }
        this.getListItems = this.getListItems.bind(this);
    }
    async componentDidMount()
    {
        console.log("componentDidMount called");
        const jwtToken = await UtilityService.getLocalStorageToken();
            if(jwtToken==null || jwtToken=='null' ) 
            {
                console.log("jwtToken was null");
                this.setState({showWarningPage : true});
            }
            else
            {
                console.log("jwtToke avialble");
                this.setState({showWarningPage : false});
                this.getListItems();
            }
        console.log("componentDidMount ended....");
    }

    getListItems =async () => {
      var valuesArray = [];
              var keysArray = [];
      var loggedInUsername = await UtilityService.getLoggedInUsername();
      var cleanedloggedInUsername = JSON.parse(loggedInUsername);
      let viewCommonListsInput = {username : cleanedloggedInUsername};
      var globalItemList = null;
      await ApiService.viewCommonLists(viewCommonListsInput).then(async function(data){
            if(data.data.data)
            {
              console.log("getAllItems Response in componentDidMount ====> ", data);
              response = data.data.data.user_with_list_of_items;
              keys = Object.keys(response);
              var values = Object.values(response);
              keys.forEach(function(key){
                  console.log(key,":",response[key]);
                  valuesArray.push(response[key]);
                  keysArray.push(key);
              });
            }
      });
      this.setState({globalUserListArray : keysArray,globalItemsListArray : valuesArray});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value});

    render() {
      console.log("this.state.showWarningPage ",this.state.showWarningPage == true);
        if(this.state.showWarningPage == false)
        {
        return(
            <div className="list-group" style={{marginLeft:'-10%'}}>
                <ul style={{fontFamily: 'cursive'}}>
                 {keys && keys.map(element => 
                  <div>
                     <a href="" class="list-group-item list-group-item-action">{element+"'s List"}</a>
                     <a href="" class="list-group-item list-group-item-action">{response[element]+","}</a>
                  </div>
                  )}
                </ul>
            </div>
        );
        }
        if(this.state.showWarningPage == true)
        {
          return(<LoginToViewPageWarning/>);
        }
    }
}

export default ViewCommonLists;