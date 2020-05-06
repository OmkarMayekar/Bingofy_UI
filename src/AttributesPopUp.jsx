import React, { Component }  from 'react';
import ApiService from "./ApiService";
import UtilityService from "./UtilityService";

class AttributesPopUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            callingElement : '',
            personalnote : '',
            kg : '',
            money : '',
            showMandatoryFieldError : false
        };
        this.submitDetailsPopUp = this.submitDetailsPopUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveJsonObj = this.saveJsonObj.bind(this);
    }
     async submitDetailsPopUp(e)
      {
        if(this.state.personalnote && this.state.kg && this.state.money)
        {
            e.preventDefault();
            var JsonOBJ = {};
            JsonOBJ = 
            {
                "ItemName" : this.props.callingElement,
                "PersonalNote" : this.state.personalnote,
                "KG" : this.state.kg,
                "Money" : this.state.money
            }
            var JsonOBJString = JSON.stringify(JsonOBJ, null, 2);
            var myEscapedJSONString = JSON.stringify(JsonOBJString).slice(1, -1);
            console.log("JsonOBJ string ===>",myEscapedJSONString);
            await this.saveJsonObj(JsonOBJString);
            this.props.changeshowExtraFieldsStateToFalse(e);
        }
        else
        {
            this.setState({showMandatoryFieldError : true });
        }
      }

      onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value,showMandatoryFieldError:false});
      
      async saveJsonObj(JsonOBJ)
      { 
        var username = await UtilityService.getLoggedInUsername();
        var usernameWithOutQuotes = username.replace(/"/g, '');
        console.log("username is ===>",username);
        let assignExtraAttributesForItemsInput =  {username : usernameWithOutQuotes,JsonOBJ: JsonOBJ};
        await ApiService.assignExtraAttributesForItems(assignExtraAttributesForItemsInput).then(async function(data){
                console.log("response of add users to list is :: "+JSON.stringify(data));
                        
        });
      }
render(){
    return(
            <div>
                <div className="modal-alert-overlay" style={{zIndex:900}}></div>
                <div className="modal-60-attributes">
                    <div className="repeater modal-head">
                        <span>{"Details"}</span>
                        <a href="javascript:void(0)" onClick={(e)=>{this.props.changeshowExtraFieldsStateToFalse(e)}}></a>
                    </div>
                    <div className="repeater modal-body">
                        <form>
                            <div className="form-group">
                                <label>Personal Note  </label><label>:</label><label>&nbsp;&nbsp;</label>
                                <input type="text" placeholder="note.." className="input" id="personalnote" name="personalnote" value={this.state.personalnote} onChange = {this.onChange} required/>
                                <p style={{color:"red",marginRight:"-11%"}}>{this.state.showMandatoryFieldError ? (document.getElementById("personalnote").value ? null : "Please enter something") : null}</p>
                            </div>
                            <div className="form-group">
                            <label>Kg's</label><label>:</label><label>&nbsp;&nbsp;</label>
                            <input type="number" id="kg" name="kg" value={this.state.kg} onChange={this.onChange} required/>
                            <p style={{color:"red",marginRight:"0%"}}>{this.state.showMandatoryFieldError ? (document.getElementById("kg").value ? null : "Please enter something") : null}</p>
                            </div>
                            <div className="form-group">
                            <label>Money</label><label>:</label><label>&nbsp;&nbsp;</label>
                            <input type="number" id="money" name="money" value={this.state.money} onChange={this.onChange} required/>
                            <p style={{color:"red",marginRight:"-2%"}}>{this.state.showMandatoryFieldError ? (document.getElementById("money").value ? null : "Please enter something") : null}</p>
                            </div>
                        </form>
                    </div>
                    <div className="repeater modal-button">
                        <button className="btn btn-dark" onClick={(e)=>{this.submitDetailsPopUp(e)}}>Add Attributes</button>
                    </div>
                </div>
            </div>
);
}
}
export default AttributesPopUp;