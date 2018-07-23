import React from "react";
import { Link } from 'react-router-dom'

class ModuleListItem extends React.Component{
    constructor(props){
        super(props);
    }
    deleteModule() {
        if (window.confirm("Are you sure you want to delete this module?")) {
            this.props.deleteModule(this.props.module.id);
        }
        else {
            return;
        }
    }

    render(){
        return(
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                {/*<Link to={`/module/${this.props.module.id}`}>*/}
                {this.props.module.title}
                </Link>
                <span className="pull-right">
                <i onClick={() => {
                    this.deleteModule()}
                } style={{'marginRight': '5px'}} className="fa fa-trash"></i>
                <i className="fa fa-pencil"></i>
                </span>
            </li>
        )
    }
}

export default ModuleListItem;