import React from "react";
import { Link } from 'react-router-dom'

class TopicPillItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="nav-item">
                <div className="nav-link">
                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
                        {this.props.topic.title}
                    </Link>
                    <i style={{'marginLeft': '10px'}} onClick={() => {
                        this.props.deleteTopic(this.props.topic.id)
                        // console.log('hello: '+this.props.moduleId)
                        }
                    } className="fa fa-times"></i>
                </div>
            </li>
        )
    }
}

export default TopicPillItem;