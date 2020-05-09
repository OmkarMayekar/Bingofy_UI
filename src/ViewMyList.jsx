import React, { Component } from 'react'
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
import {messages} from "./messages";
import PopUp from "./Popup";
import './App.css';
import LoginToViewPageWarning from "./LoginToViewPageWarning";

class ViewMyList extends Component{

    constructor(props){
        super(props);
        this.state ={
            showUsers : false,
            globalItemListArray : [],
            showWarningPage : false
        }
        this.getListItems = this.getListItems.bind(this);
    }
    async componentDidMount()
    {
         this.getListItems();
         var jwtToken = await UtilityService.getLocalStorageToken();
         if(jwtToken)
         {
          this.setState({showWarningPage : true});
         }
    }

    getListItems =async () => {
      var loggedInUsername = await UtilityService.getLoggedInUsername();
      var cleanedloggedInUsername = JSON.parse(loggedInUsername);
      let getAllItemsInput = {username : cleanedloggedInUsername};
      var globalItemList = null;
      await ApiService.getAllItems(getAllItemsInput).then(async function(data){
            if(data.data.data)
            {
              console.log("getAllItems Response in componentDidMount ====> ", JSON.stringify(data.data.data.itemslist));
              globalItemList = data.data.data.itemslist;
              console.log("Items in componentDidMount ====> ",globalItemList);
            }
      });
      this.setState({globalItemListArray : globalItemList});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value});

    render() {
        if(this.state.globalItemListArray && this.state.showWarningPage == false){
        return(
            <div className="list-group" style={{marginLeft:'-10%'}}>
                    <ul style={{fontFamily: 'cursive'}}>
                      {this.state.globalItemListArray.map(element => 
                         <a href="" class="list-group-item list-group-item-action">{element}</a>
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

export default ViewMyList;