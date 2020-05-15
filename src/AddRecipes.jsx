import React, { Component } from 'react';
import './App.css';
import { MDBInput,MDBMask, MDBView, MDBContainer, MDBRow, MDBCol} from "mdbreact";
import Typography from '@material-ui/core/Typography';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
import LoginToViewPageWarning from "./LoginToViewPageWarning"; 
import PopUp from "./Popup";
import {messages} from "./messages";

var array =[];
var sharingUserEmailArray = [];
class AddRecipes extends Component{

    constructor(props){
        super(props);
        this.state ={
            imgSrc : '',
             value: 'Please write here....',
             description : '',
             RecipeTitle : '',
             sharingUserEmail : [],
             recipeType : 'GENERAL',
             showWarningPage : false,
             jwtToken : '',
             recipeAddedSuccessfully : false,
             selectGeneralRecipe : false,
             defaultCheckedPersonal : false,
             defaultCheckedGeneral : true,
             nonAdminUserList : [],
             targetcountrystate : false,
             multiValue : [],
             filterOptions : [],
             recipeAddedSuccessfullyPopUp : false,
             showEmailNotSelectedError : false
        }
        this.onChangeForImage = this.onChangeForImage.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.setRecipeTypeGeneral = this.setRecipeTypeGeneral.bind(this);
        this.setRecipeTypePersonalized = this.setRecipeTypePersonalized.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getNonAdminUserList = this.getNonAdminUserList.bind(this);
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
                await this.getNonAdminUserList();
                this.setState({showWarningPage : false});
            }
        console.log("componentDidMount ended....");
    }

    async getNonAdminUserList()
    {
      var responseOfGetNonAdminUserList = await ApiService.getNonAdminUserList();
      this.state.nonAdminUserList = responseOfGetNonAdminUserList.data.data;
       array = this.state.nonAdminUserList;
       let userList = [];
       for (var i = 0; i < array.length; i++) {
            userList.push({
              label: array[i],
              value: array[i]
            });
        }
        this.setState({
          filterOptions: userList
        });
    }
    getInitialState (){
      return{file: []}
    }


    onChangeForImage(){
      var file = this.refs.file.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

       reader.onloadend = function (e) {
          this.setState({imgSrc: [reader.result]})
        }.bind(this);
      console.log(url) 
    }
  
    changeHandler = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    async addRecipe(e)
    {
        var responseCode = null;
        console.log("addRecipe called!");
        this.state.multiValue.forEach(function (item) {
            if(!sharingUserEmailArray.includes(item))
                sharingUserEmailArray.push(item.value);
          });
        console.log("sharingUserEmailArray ====> ",sharingUserEmailArray);
        if(this.state.recipeType == "PERSONALIZED")
        {
          if(sharingUserEmailArray.length == 0)
          {
            this.setState({showEmailNotSelectedError : true});
            return false;
          }
        }
        let addRecipeInput = {};
        e.preventDefault();
        if(this.state.description != '' && this.state.RecipeTitle != '')
        {
          var username = await UtilityService.getLoggedInUsername();
          var cleanedUsername = JSON.parse(username);
          addRecipeInput = {username : cleanedUsername, recipeTitle : this.state.RecipeTitle, recipeDescription : this.state.description, sharingUserEmail : sharingUserEmailArray, recipeType : this.state.recipeType};
          await ApiService.addRecipe(addRecipeInput).then(async function(data){
                  console.log("response of add recipe is :: ",JSON.stringify(data));
                  responseCode = data.data.code;
          });
          console.log("responseCode ===> ",responseCode);
          if(responseCode == 201)//406
          {
            this.setState({recipeAddedSuccessfullyPopUp : true});
          }
        }
    }

    setRecipeTypeGeneral()
    {
      this.setState({recipeType : "GENERAL" , defaultCheckedGeneral : true, defaultCheckedPersonal : false, showEmailNotSelectedError : false});
    }

    setRecipeTypePersonalized()
    {
      this.setState({recipeType : "PERSONALIZED", defaultCheckedPersonal : true, defaultCheckedGeneral : false, showEmailNotSelectedError : false});
    }

    handleChange = (options) =>{
        this.setState({showEmailNotSelectedError : false});
        this.setState(state => {
            return {
                multiValue : options
            };
        });
    }


    render() {
    const { selectedOption,selectedOptionTargetCountry } = this.state;
    if(this.state.showWarningPage == false && this.state.recipeAddedSuccessfullyPopUp == false)
    {
        return(
              <div>
              <ReactTooltip place="top" className="react-tooltip-header" type="warning" effect="float"/>
                <form>
                <label>Select Recipe Type</label>
                <label style={{fontSize : '10px', color : 'darkRed'}}>(General is default category)&nbsp;&nbsp;</label>
                <label>:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <label>
                <input type="radio" name="generalRecipe" onClick={this.setRecipeTypeGeneral} checked={this.state.defaultCheckedGeneral}/>&nbsp;GENERAL RECIPE
                </label>&nbsp;&nbsp;&nbsp;
                <label>
                <input type="radio" name="personalizedRecipe" onClick={this.setRecipeTypePersonalized} checked={this.state.defaultCheckedPersonal}/>&nbsp;PERSONALIZED RECIPE
                </label>
                <div style={{marginTop:'2%',width: '50%',marginLeft: '25%'}} className="form-group">
                    <MDBInput label="Title" size="sm" name="RecipeTitle" value={this.state.RecipeTitle} onChange={this.changeHandler}/>
                </div>
                <div style={{marginTop:'2%',width: '90%',marginLeft: '5%'}}>
                <MDBInput
                  name="description"
                  id="defaultFormRegisterNameEx"
                  type="textarea"
                  label="Add description here...."
                  rows="10"
                  icon="pencil-alt"
                  onChange={this.changeHandler}
                  value={this.state.description}
                  background
                />
                </div>
                </form>
                <MDBContainer className="mt-5">
                    <MDBView>
                      <img
                        className="img-fluid"
                        alt=""
                        src={this.state.imgSrc}
                      />
                    </MDBView>
                </MDBContainer>
                
                {
                 this.state.recipeType == "PERSONALIZED" ? 
                 <div style={{marginBottom : '3%', marginLeft : '25%', width : '50%'}} >
                  <Select
                    id="sharingUserEmailDIV"
                    className="multi-selector"
                    closeOnSelect={true}
                    placeholder={"Select Users"}
                    isMulti
                    name="Users"
                    menuPlacement="top"
                    value={this.state.multiValue}
                    options={this.state.filterOptions}
                    onChange={this.handleChange.bind(this)}
                  />
                  </div>
                 : null
                }
                {
                  this.state.showEmailNotSelectedError == true ? <div><span style={{color : 'red', fontFamily : 'cursive',fontSize : '12px'}}>Please select atleast one email!</span></div>
                  : null
                }
                {
                 this.state.recipeType == "PERSONALIZED" ? 
                 <label>Select the users you want to share recipe with!</label>
                 : null
                }
                <button className="btn btn-dark" style={{marginRight: '50%',marginLeft: '45%'}} onClick={(e) => {this.addRecipe(e)}}>Giveaway!</button>
                </div>
        );
    }
    if(this.state.showWarningPage == true)
    {
        return(<LoginToViewPageWarning/>);
    }
    if(this.state.recipeAddedSuccessfullyPopUp == true)
    {
        return (<PopUp headerMessage = {messages.RECIPE_ADDED_SUCCESSFULLY} bodyMessage = {messages.RECIPE_ADDED_SUCCESSFULLY_BODY}/>);
    }
    }
}

export default AddRecipes;