import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.state = {
            course: {title: ''},
            courses: []
        }
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses(){
        this.courseService
            .findAllCourses()
            .then((courses) => {
                console.log(courses);
                this.setState({courses: courses});
            });
    }

    renderCourseRows() {
        var self = this
        let courses = null;
        console.log(this.state)
        if(this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      course={course}
                                      deleteCourse={self.deleteCourse}/>
                }
            )
        }
        return (
            courses
        )
    }

    titleChanged(event) {
        this.setState({
            course: { title: event.target.value}
        });
    }
    createCourse() {
        let course;
        if(this.state.course.title===''){
            course = {title: "New Course"}
        }
        else{
            course = this.state.course;
        }
        this.courseService
            .createCourse(course)
            .then(() => { this.findAllCourses(); });
    }

    deleteCourse = (courseId) => {
        this.courseService.deleteCourse(courseId)
            .then(() => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th><input onChange={this.titleChanged}
                                   className="form-control"
                                   id="titleFld"
                                   placeholder="New Course Title"/></th>
                        <th><button onClick={this.createCourse}
                                    className="btn btn-primary">Add New Course</button></th>
                    </tr>
                    <tr><th>Title</th>
                        <th>Owned by</th>
                        <th>Last modified</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;