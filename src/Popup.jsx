import React from 'react';

class PopUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
             
render(){
    return(
<div>
    <div className="modal-alert-overlay" style={{zIndex:900}} ></div>
    <div className="modal-60" style={{width:'25%'}}>
        <div className="repeater modal-head">
            <span>{this.props.headerMessage}</span>
                <a href="#" onClick={this.props.onClose}></a>
        </div>
        <div className="repeater modal-body">
            <div>{this.props.bodyMessage}</div>
        </div>
        <div className="repeater modal-button">
            <a href="" onClick={this.props.onClose}>{"ok"}</a>
        </div>
    </div>
</div>
);
}
}
export default PopUp;