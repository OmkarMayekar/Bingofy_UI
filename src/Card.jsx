import React,{Fragment,Component} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, CardTitle, CardText, CardImg,CardBody,Row, Col } from 'reactstrap';
import AttributePopup from "./AttributesPopUp";
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ApiService from "./ApiService";
import UtilityService from "./UtilityService";
var responseArray = null;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


class MyCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showExtraFields : false,
            extraAttributes : '',
            callingElement : '',
            personalNote : '',
            kg : '',
            money : '',
            expanded: false,
            setExpanded : false
        };
        this.removeItemFromArray = this.removeItemFromArray.bind(this);
        this.pushItemToArray = this.pushItemToArray.bind(this);
        this.changeshowExtraFieldsState = this.changeshowExtraFieldsState.bind(this);
        this.changeshowExtraFieldsStateToFalse = this.changeshowExtraFieldsStateToFalse.bind(this);
        this.expandPanel = this.expandPanel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

  classes =()=> {useStyles();}

  pushItemToArray(itemName,id){
    if(this.props.arrayOfItems.includes(itemName) == false){
        this.props.arrayOfItems.push(itemName);
    }
    var elem = document.getElementById(id);
    if (elem.innerHTML == "Add") {elem.innerHTML = "Added";}

    var removeButtonnId = id+"d";
    if(removeButtonnId)
    {
    var elem = document.getElementById(removeButtonnId);
    if (elem.innerHTML == "Removed") {elem.innerHTML = "Remove";}
    }
  }

  removeItemFromArray(itemName,id,addButtonID){
    this.props.arrayOfItems.splice(this.props.arrayOfItems.indexOf(itemName), 1);
    var addButtonId = addButtonID;
    if(addButtonId){
    var elem = document.getElementById(addButtonId);
    if (elem.innerHTML == "Added") {elem.innerHTML = "Add";}
    }
    var elem = document.getElementById(id);
    if (elem.innerHTML == "Remove") {elem.innerHTML = "Removed";}
  }

  changeshowExtraFieldsState(e){
      this.setState({showExtraFields : true, callingElement : e.target.value});
  }

  changeshowExtraFieldsStateToFalse(e) {
    this.setState({showExtraFields : false});
  }
 
  handleChange = (panel) => (event, isExpanded) => {
    isExpanded ? this.setState({ expanded: panel}) : this.setState({ expanded: false })
  };

  async expandPanel(e){
    var currElement = e.currentTarget.id;
    var loggedInUsername = await UtilityService.getLoggedInUsername();
    var doubleParsedJSON = null;
    var cleanedloggedInUsername = JSON.parse(loggedInUsername);
    if(!this.state.extraAttributes)
    {
    await ApiService.getAllExtraInventoryAttributes(cleanedloggedInUsername).then(async function(data){
          var jsonResponse = data.data.data.jsonValue;
          console.log("jsonResponse ====> ", jsonResponse);
          responseArray = jsonResponse.split("_");
    });
    }
    if(responseArray){
        for(var jsondata of responseArray){
              if(currElement == JSON.parse(jsondata).ItemName)
                    {
                      this.setState({personalNote:JSON.parse(jsondata).PersonalNote,kg:JSON.parse(jsondata).KG,money:JSON.parse(jsondata).Money})
                      break;
                    }
            }
      }
      this.setState({extraAttributes : responseArray});
  }

  render(){
  return (
    <Row>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/apple.png" alt="Card image cap" variant="top"/>
          <CardTitle className="MyClass" className="MyClass" id = "Apple">Apple</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton1" className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Apple","myButton1")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Apple","myButton1d","myButton1")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Apple" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Apple") ? <AttributePopup callingElement={this.state.callingElement} changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card>
        <div className={this.classes.root}>
          <ExpansionPanel id="Apple" onClick={(e) => {this.expandPanel(e)}} expanded = {this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography style={{fontFamily:'cursive'}} className={this.classes.heading}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
              <div>
                  <div><label>Personal Note :{ this.state.personalNote ? this.state.personalNote : null }</label></div>
                  <div><label>Quantity :{ this.state.kg ? this.state.kg : null }</label></div>
                  <div><label>Money :{ this.state.money ? this.state.money : null}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Orange.png" alt="Card image cap" />
          <CardTitle className="MyClass">Orange</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton2"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Orange","myButton2")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton2d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Orange","myButton2d","myButton2")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Orange" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Orange")? <AttributePopup callingElement={this.state.callingElement} changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card>
        <div className={this.classes.root}>
          <ExpansionPanel id="Orange" onClick={(e) => this.expandPanel(e)} expanded = {this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note :{ this.state.personalNote ? this.state.personalNote : null }</label></div>
                  <div><label>Quantity :{ this.state.kg ? this.state.kg : null }</label></div>
                  <div><label>Money :{ this.state.money ? this.state.money : null}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Mango.png" alt="Card image cap" />
          <CardTitle className="MyClass">Mango</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton3"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Mango","myButton3")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton3d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Mango","myButton3d","myButton3")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Mango" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Mango") ? <AttributePopup callingElement={this.state.callingElement} changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Mango" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Mango" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Mango" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
          <Card body style={{fontFamily:'cursive'}}>
          <CardImg top width="100%" src="/Peach.png" alt="Card image cap" />
            <CardTitle className="MyClass">Peach</CardTitle>
            <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
            <Button id ="myButton4"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Peach","myButton4")}}>Add</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton4d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Peach","myButton4d","myButton4")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton1d"  value="Peach" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Peach") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
          </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Peach" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Peach" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Peach" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Cherry.png" alt="Card image cap" variant="top"/>
          <CardTitle className="MyClass">Cherry</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton5"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Cherry","myButton5")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton5d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Cherry","myButton5d","myButton5")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Cherry"  className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Cherry") ? <AttributePopup  callingElement={this.state.callingElement} changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel5'} onChange={this.handleChange('panel5')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Cherry" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Cherry" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Cherry" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Grape.png" alt="Card image cap" />
          <CardTitle className="MyClass">Grape</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton6"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Grape","myButton6")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton6d" className="btn btn-outline-dark"  onClick={(e) => {this.removeItemFromArray("Grape","myButton6d","myButton6")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Grape" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true  && this.state.callingElement=="Grape") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel6'} onChange={this.handleChange('panel6')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Grape" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Grape" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Grape" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Banana.png" alt="Card image cap" />
          <CardTitle className="MyClass">Banana</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton7"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Banana","myButton7")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton7d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Banana","myButton7d","myButton7")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Banana" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Banana") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)} expanded = {this.state.expanded === 'panel7'} onChange={this.handleChange('panel7')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Banana" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Banana" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Banana" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
          <Card body style={{fontFamily:'cursive'}}>
          <CardImg top width="100%" src="/Wattermelon.png" alt="Card image cap" />
            <CardTitle className="MyClass">Watermelon</CardTitle>
            <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
            <Button id ="myButton8"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Watermelon","myButton8")}}>Add</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton8d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Watermelon","myButton8d","myButton8")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton1d" value="Watermelon" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Watermelon") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
          </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel8'} onChange={this.handleChange('panel8')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Watermelon" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Watermelon" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Watermelon" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Strawberry.png" alt="Card image cap" variant="top"/>
          <CardTitle className="MyClass">Strawberry</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton9"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Strawberry","myButton9")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton9d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Strawberry","myButton9d","myButton9")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Strawberry" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true  && this.state.callingElement=="Strawberry")? <AttributePopup callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel9'} onChange={this.handleChange('panel9')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Strawberry" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Strawberry" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Strawberry" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Guava.png" alt="Card image cap" />
          <CardTitle className="MyClass">Guava</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton10"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Guava","myButton10")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton10d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Guava","myButton10d","myButton10")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Guava" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Guava") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel10'} onChange={this.handleChange('panel10')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Guava" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Guava" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Guava" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Kiwi.png" alt="Card image cap" />
          <CardTitle className="MyClass">Kiwi</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton11"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Kiwi","myButton11")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton11d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Kiwi","myButton11d","myButton11")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Kiwi"  className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Kiwi") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel11'} onChange={this.handleChange('panel11')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Kiwi" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Kiwi" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Kiwi" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
          <Card body style={{fontFamily:'cursive'}}>
          <CardImg top width="100%" src="/Raspberry.png" alt="Card image cap" />
            <CardTitle className="MyClass">Raspberry</CardTitle>
            <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
            <Button id ="myButton12"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Raspberry","myButton12")}}>Add</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton12d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Raspberry","myButton12d","myButton12")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton1d" value="Raspberry" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
            {(this.state.showExtraFields == true && this.state.callingElement=="Raspberry") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
          </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel12'} onChange={this.handleChange('panel12')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Raspberry" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Raspberry" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Raspberry" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Apricot.png" alt="Card image cap" variant="top"/>
          <CardTitle className="MyClass">Apricot</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton13"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Apricot","myButton13")}}>Add</Button>&nbsp;&nbsp;&nbsp;
           <Button id ="myButton13d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Apricot","myButton13d","myButton13")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
           <Button id ="myButton1d" value="Apricot" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
            {(this.state.showExtraFields == true && this.state.callingElement=="Apricot") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel13'} onChange={this.handleChange('panel13')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Apricot" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Apricot" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Apricot" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Fig.png" alt="Card image cap" />
          <CardTitle className="MyClass">Fig</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton14"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Fig","myButton14")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton14d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Fig","myButton14d","myButton14")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Fig" className="btn btn-outline-dark"  onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Fig") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel14'} onChange={this.handleChange('panel14')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Fig" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Fig" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Fig" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Lemon.png" alt="Card image cap" />
          <CardTitle className="MyClass">Lemon</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton15"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Lemon","myButton15")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton15d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Lemon","myButton15d","myButton15")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Lemon" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Lemon") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel15'} onChange={this.handleChange('panel15')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Lemon" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Lemon" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Lemon" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
          <Card body style={{fontFamily:'cursive'}}>
          <CardImg top width="100%" src="/Papaya.png" alt="Card image cap" />
            <CardTitle className="MyClass">Papaya</CardTitle>
            <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
            <Button id ="myButton16"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Papaya","myButton16")}}>Add</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton16d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Papaya","myButton16d","myButton16")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton1d" value="Papaya" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true  && this.state.callingElement=="Papaya")? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
          </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel16'} onChange={this.handleChange('panel16')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Papaya" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Papaya" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Papaya" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Pomegranate.png" alt="Card image cap" variant="top"/>
          <CardTitle className="MyClass">Pomegranate</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton17"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Pomegranate","myButton17")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton17d" className="btn btn-outline-dark"  onClick={(e) => {this.removeItemFromArray("Pomegranate","myButton17d","myButton17")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Pomegranate" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true  && this.state.callingElement=="Pomegranate")? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel17'} onChange={this.handleChange('panel17')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Pomegranate" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Pomegranate" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Pomegranate" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Plum.png" alt="Card image cap" />
          <CardTitle className="MyClass">Plum</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton18"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Plum","myButton18")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton18d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Plum","myButton18d","myButton18")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Plum" className="btn btn-outline-dark"  onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Plum") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel18'} onChange={this.handleChange('panel18')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Plum" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Plum" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Plum" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
        <Card body style={{fontFamily:'cursive'}}>
        <CardImg top width="100%" src="/Passionfruit.png" alt="Card image cap" />
         <CardTitle className="MyClass">Passion fruit</CardTitle>
          <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
          <Button id ="myButton19"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Passion fruit","myButton19")}}>Add</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton19d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Passion fruit","myButton19d","myButton19")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
          <Button id ="myButton1d" value="Passion" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
          {(this.state.showExtraFields == true && this.state.callingElement=="Passion") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
        </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel19'} onChange={this.handleChange('panel19')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Passion fruit" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Passion fruit" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Passion fruit" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
          <Card body style={{fontFamily:'cursive'}}>
          <CardImg top width="100%" src="/Coconut.png" alt="Card image cap" />
            <CardTitle className="MyClass">Coconut</CardTitle>
            <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
            <Button id ="myButton20"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Coconut","myButton20")}}>Add</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton20d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Coconut","myButton20d","myButton20")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton1d" value="Coconut" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
            {(this.state.showExtraFields == true && this.state.callingElement=="Coconut") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
          </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel20'} onChange={this.handleChange('panel20')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Coconut" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Coconut" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Coconut" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <Col sm="6" xs={6} md={4}>
          <Card body style={{fontFamily:'cursive'}}>
          <CardImg top width="100%" src="/Lychee.png" alt="Card image cap" />
            <CardTitle className="MyClass">Lychee</CardTitle>
            <CardContent>
            <Typography variant="body2" style={{fontFamily:'cursive'}}color="textSecondary" component="p">
              You can add more details to me.
            </Typography>
          </CardContent>
            <Button id ="myButton21"  className="btn btn-outline-dark" onClick={(e) => {this.pushItemToArray("Lychee","myButton21")}}>Add</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton21d"  className="btn btn-outline-dark" onClick={(e) => {this.removeItemFromArray("Lychee","myButton21d","myButton21")}}>Remove</Button>&nbsp;&nbsp;&nbsp;
            <Button id ="myButton1d" value="Lychee" className="btn btn-outline-dark" onClick={(e) => {this.changeshowExtraFieldsState(e)}}>Add More</Button>
            {(this.state.showExtraFields == true && this.state.callingElement=="Lychee") ? <AttributePopup  callingElement={this.state.callingElement}  changeshowExtraFieldsStateToFalse = {this.changeshowExtraFieldsStateToFalse}/> : null}
          </Card><div className={this.classes.root}>
          <ExpansionPanel onClick={(e) => this.expandPanel(e)}expanded = {this.state.expanded === 'panel21'} onChange={this.handleChange('panel21')} >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={this.classes.heading} style={{fontFamily:'cursive'}}>View Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <div>
                  <div><label>Personal Note : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Lychee" ? this.state.extraAttributes.PersonalNote : null )}</label></div>
                  <div><label>Quantity : {(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Lychee" ? this.state.extraAttributes.KG : null )}</label></div>
                  <div><label>Money :{(this.state.extraAttributes && this.state.extraAttributes.ItemName == "Lychee" ? this.state.extraAttributes.Money : null )}</label></div>
              </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Col>
      <div>
      </div>
    </Row>
  );
}
};
export default MyCard;