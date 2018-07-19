import React from "react";

class ModuleListItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="list-group-item">
                {this.props.title}
                <span className="pull-right">
                <i onClick={() => {
                    this.props.deleteModule(this.props.id)
                console.log('hello: '+this.props.id)}
                } style={{'marginRight': '5px'}} className="fa fa-trash"></i>
                <i className="fa fa-pencil"></i>
                </span>
            </li>
        )
    }
}

export default ModuleListItem;