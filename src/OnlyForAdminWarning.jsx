import React, { Component } from 'react';
import './App.css';

class OnlyForAdminWarning extends Component{

    constructor(props){
        super(props);
        this.state ={
        }
    }

    render() {
        return(
            <div className="">
                <div className="box border-bottom-light-gray padding5-20">
                </div>                
                <div className="" style={{'marginTop':'15%'}}>                
                    <table width="65%" style={{"margin":"0 auto"}}>
                        <tr>
                            <td width="60%" className="centerAlign" style={{"verticalAlign":"middle"}}>
                                <div className="centerAlign orange" style={{"fontSize":"300%"}}>Please contact administrator</div>
                                <div className="centerAlign padding20 font-big gray" style={{"text-align":"center"}}>
                                    This page is only for admin!!
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default OnlyForAdminWarning;