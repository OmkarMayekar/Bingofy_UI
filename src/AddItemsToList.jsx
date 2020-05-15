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
            }
        console.log("componentDidMount ended....");
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
        if(this.state.showWarningPage == true)
        {
            return(<LoginToViewPageWarning/>);
        }
    }
}

export default AddItemsToList;