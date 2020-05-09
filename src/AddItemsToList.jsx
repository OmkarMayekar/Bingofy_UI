import React, { Component } from 'react'
import './App.css';
import UtilityService from "./UtilityService";
import LoginToViewPageWarning from "./LoginToViewPageWarning"; 
import MyCard from "./Card";
class AddItemsToList extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            arrayOfItems : [],
            showExtraFields : false,
            showWarningPage : false,
        }
    }
    async componentDidMount(){
       var jwtToken = await UtilityService.getLocalStorageToken();
       if(jwtToken)
       {
        this.setState({showWarningPage : true});
       }
    }
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value});

    render() {
        if(this.state.showWarningPage == false)
        {
        return(
            <MyCard arrayOfItems={this.state.arrayOfItems} showExtraFields={this.state.showExtraFields}/>
        );
        }
        if(this.state.showWarningPage == true)
        {
            return(<LoginToViewPageWarning/>);
        }
    }
}

export default AddItemsToList;