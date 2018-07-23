import React from "react";
import { Link } from 'react-router-dom'

class ModuleListItem extends React.Component{
    constructor(props){
        super(props);
        this.highlight = this.highlight.bind(this);
    }
    deleteModule() {
        if (window.confirm("Are you sure you want to delete this module?")) {
            this.props.deleteModule(this.props.module.id);
        }
        else {
            return;
        }
    }

    highlight(){
        var mods = document.getElementsByClassName('module-list');
        for(var i=0;i<mods.length;i++){
            mods[i].style.backgroundColor="white";
        }
        var mod = document.getElementById(this.props.module.id+"m");
        mod.style.backgroundColor="#d7f0f7";
    }

    render(){
        return(
            <li id={this.props.module.id+"m"} className="list-group-item list-group-item-action module-list">
                {/*<Link to={`/module/${this.props.module.id}`}>*/}
                <Link onClick={this.highlight}
                      to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
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