import React from "react";
import { Link } from 'react-router-dom'

class TopicPillItem extends React.Component{
    constructor(props){
        super(props);
        this.highlight = this.highlight.bind(this);
    }

    deleteTopic() {
        if (window.confirm("Are you sure you want to delete this topic?")) {
            this.props.deleteTopic(this.props.topic.id);
        }
        else {
            return;
        }
    }

    highlight(){
        var mods = document.getElementsByClassName('topic-pills');
        for(var i=0;i<mods.length;i++){
            mods[i].style.backgroundColor="white";
        }
        var mod = document.getElementById(this.props.topic.id+"t");
        mod.style.backgroundColor="#d7f0f7";
    }

    render(){
        return(
            <li id={this.props.topic.id+"t"}
                className="nav-item topic-pills">
                <div className="nav-link">
                    <Link onClick={this.highlight}
                          to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
                    {this.props.topic.title}
                    </Link>
                    <i onClick={() => {
                        this.deleteTopic()
                        // console.log('hello: '+this.props.moduleId)
                        }
                    } className="fa fa-times"></i>
                </div>
            </li>
        )
    }
}

export default TopicPillItem;