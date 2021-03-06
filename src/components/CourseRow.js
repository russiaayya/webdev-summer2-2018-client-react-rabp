import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
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
    render() {
        return (
            <tr id = {this.props.course.id}>
                <td>
                    <i className="fa fa-book"></i>
                <Link to={`/course/${this.props.course.id}`}>
                    {this.props.course.title}
                </Link>
                </td>
                <td>
                    me
                </td>
                <td>
                    {this.displayDateTime()}
                </td>
                <td>
                    <button className="btn btn-success"
                            onClick={(event) =>
                                this.props.selectCourse(event)
                            }>
                        Edit Title
                    </button>
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={() =>
                                this.deleteCourse()
                            }>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}
export default CourseRow;