import React, { Component } from 'react';
import './App.css';
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
import LoginToViewPageWarning from "./LoginToViewPageWarning"; 
import PopUp from "./Popup";
import {messages} from "./messages";
import ViewRecipeCard from "./ViewRecipeCard.jsx";
var array = [];
class AddRecipes extends Component{

    constructor(props){
        super(props);
        this.state ={
          showWarningPage : false,
          arrayOfRecipeResult : [],
          generalRecipeArray : []
        }
        this.buildGeneralRecipeArray = this.buildGeneralRecipeArray.bind(this);
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
                console.log("jwtToken avialble");
                this.setState({showWarningPage : false});
                var username = await UtilityService.getLoggedInUsername();
                var cleanedUsername = JSON.parse(username); 
                let getRecipeInput = {username : cleanedUsername};
                
                await ApiService.getRecipe(getRecipeInput).then(async function(data){
                      console.log("response of getRecipe ==========> ",data.data.data.result);
                      array = data.data.data.result;
                });
                
            }
            await this.buildGeneralRecipeArray();
            
            console.log("componentDidMount ended....");
    }

    async buildGeneralRecipeArray()
    {
      var localArray = []; 
      this.setState({arrayOfRecipeResult : array});
      await this.state.arrayOfRecipeResult.map(async item => (item.recipe_type == "GENERAL" ? localArray.push(item) : null));
      this.setState({generalRecipeArray : localArray});
    }
  
    render() 
    {
      if(this.state.showWarningPage == false)
      { 
        return(
               <div>
                <h3 style={{fontFamily : 'fantasy', color : 'lightslategray', marginTop : '2%'}}>General Recipes</h3>
                    {this.state.generalRecipeArray.map(item => <ViewRecipeCard key={item} value={item} />)}
                </div>
              );
      }
    if(this.state.showWarningPage == true)
    {
        return(<LoginToViewPageWarning/>);
    }
    }
}

export default AddRecipes;