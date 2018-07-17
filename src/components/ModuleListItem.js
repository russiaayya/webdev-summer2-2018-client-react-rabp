import React from "react";

class ModuleListItem extends React.Component{
    render(){
        return(
            <li className="list-group-item">
                {this.props.title}
                <span className="pull-right">
                <i style={{'margin-right': '5px'}} className="fa fa-trash"></i>
                <i className="fa fa-pencil"></i>
                </span>
            </li>
        )
    }
}

export default ModuleListItem;