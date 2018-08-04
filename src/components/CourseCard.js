import React from "react";
import { Link } from 'react-router-dom'

class CourseCard extends React.Component{
    displayDateTime(){
        let dateTime;
        let currentTime = new Date().toLocaleDateString();
        let modified = new Date(this.props.course.modified).toLocaleDateString();
        if(currentTime === modified){
            dateTime = new Date(this.props.course.modified).toLocaleTimeString();
        }
        else{
            dateTime = modified;
        }
        return dateTime;
    }
    deleteCourse(){
        if(window.confirm("Are you sure you want to delete this course?")){
            this.props.deleteCourse(this.props.course.id);
        }
        else {
            return;
        }
    }
    render () {
        return (
            <div id = {this.props.course.id} className="card" styles={{width: '18rem'}}>
                <img className="card-img-top"
                     src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    <Link to={`/course/${this.props.course.id}`}>
                    <h5 className="card-title">{this.props.course.title}</h5>
                    </Link>
                    <p className="card-text">Modified {this.displayDateTime()}</p>
                    <button className="btn btn-success"
                            onClick={(event) =>
                                this.props.selectCourse(event)
                            }>
                        Edit Title
                    </button>
                    <button className="btn btn-danger webdev-close"
                            onClick={() =>
                                this.deleteCourse()
                            }>
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

export default CourseCard;