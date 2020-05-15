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
            showWarningPage : false,
            jwtToken : ''
        }
        this.getListItems = this.getListItems.bind(this);
    }
    async componentDidMount()
    {
        console.log("componentDidMount called");
        const jwtToken = await UtilityService.getLocalStorageToken();
        console.log("jwtToken in componentDidMount ====> ",jwtToken);
        console.log("jwtToken in componentDidMount ====> ",typeof jwtToken);
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
      console.log("this.state.showWarningPage ",this.state.showWarningPage == true);
        if(this.state.showWarningPage == false)
        {
        return(
            <div className="list-group" style={{marginLeft:'-10%'}}>
                <ul style={{fontFamily: 'cursive'}}>
                  {this.state.globalItemListArray && this.state.globalItemListArray.map(element => 
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