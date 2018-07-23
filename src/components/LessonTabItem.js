import React from "react";
import { Link } from 'react-router-dom'

class LessonTabItem extends React.Component{
    constructor(props){
        super(props);
        this.highlight = this.highlight.bind(this);
    }

    deleteLesson() {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            this.props.deleteLesson(this.props.lesson.id);
        }
        else {
            return;
        }
    }

    highlight(){
        var lessons = document.getElementsByClassName('lesson-tabs');
        for(var i=0;i<lessons.length;i++){
            lessons[i].style.backgroundColor="white";
        }
        var lesson = document.getElementById(this.props.lesson.id+"l");
        lesson.style.backgroundColor="#d7f0f7";
    }

    render(){
        return(
            <li id={this.props.lesson.id+"l"} className="nav-item lesson-tabs">
                <div className="nav-link">
                    {/*<Link to={`/lesson/${this.props.lesson.id}`}>*/}
                    <Link onClick={this.highlight}
                          to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
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