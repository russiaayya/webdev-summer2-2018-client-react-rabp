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
    render() {
        return (
            <tr>
                <td>
                    <i style={{'marginRight': '10px'}} className="fa fa-pencil"></i>
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
                    <button className="btn btn-danger"
                            onClick={() =>
                                this.props.deleteCourse(this.props.course.id)
                            }>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}
export default CourseRow;