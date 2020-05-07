import React, { Component } from 'react';
import './App.css';

class Recipes extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            email: '',
            role: ''
        }
        this.onClose = this.onClose.bind(this);
    }

    onClose(){
        this.setState({showSuccessPopUp : false});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {

        return(
            <div>
            <h3>Recipes Page</h3>   
            </div>
        );
    }
}

export default Recipes;