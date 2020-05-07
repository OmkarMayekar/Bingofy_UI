import React, { Component } from 'react'
import './App.css';
import MyCard from "./Card";
class AddItemsToList extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            arrayOfItems : [],
            showExtraFields : false
        }
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value});

    render() {
        return(
            <MyCard arrayOfItems={this.state.arrayOfItems} showExtraFields={this.state.showExtraFields}/>
        );
    }
}

export default AddItemsToList;