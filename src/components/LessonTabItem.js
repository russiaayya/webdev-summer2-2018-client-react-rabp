import React from "react";
import { Link } from 'react-router-dom'

class LessonTabItem extends React.Component{
    constructor(props){
        super(props);
    }

    deleteLesson() {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            this.props.deleteLesson(this.props.lesson.id);
        }
        else {
            return;
        }
    }

    render(){
        return(
            <li className="nav-item">
                <div className="nav-link">
                    {/*<Link to={`/lesson/${this.props.lesson.id}`}>*/}
                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                        {this.props.lesson.title}
                    </Link>
                    <i style={{'marginLeft': '10px'}} onClick={() => {
                        this.deleteLesson()}
                    } className="fa fa-times"></i>
                </div>
            </li>
        )
    }
}

export default LessonTabItem;