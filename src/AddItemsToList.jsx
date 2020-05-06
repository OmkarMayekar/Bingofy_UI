import React, { Component,Fragment } from 'react'
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
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