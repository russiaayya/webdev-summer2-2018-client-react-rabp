import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseCard from "../components/CourseCard";
import CourseService from "../services/CourseService";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {
            course: {title: ''},
            courses: [],
            cid: '',
            cardView: false
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
        if(this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      course={course}
                                      deleteCourse={self.deleteCourse}
                                      updateCourse={self.updateCourse}
                                      selectCourse={self.selectCourse}/>
                }
            )
        }
        return (
            courses
        )
    }

    renderCourseCards() {
        var self = this
        let courses = null;
        if(this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return (

                        <CourseCard key={course.id}
                                       course={course}
                                       deleteCourse={self.deleteCourse}
                                       updateCourse={self.updateCourse}
                                       selectCourse={self.selectCourse}/>

                )
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
        ReactDOM.findDOMNode(this.refs.courseInput).value = "";
    }

    deleteCourse = (courseId) => {
        this.courseService.deleteCourse(courseId)
            .then(() => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    selectCourse = (event) =>{
        var editBtn = event.currentTarget;
        var courseId = editBtn.parentNode.parentNode.id;
        this.courseService.findCourseById(courseId)
            .then((course)=>{
                ReactDOM.findDOMNode(this.refs.courseInput).value = course.title;
            });
        this.state.cid = courseId;
    }

    updateCourse = () => {
        let course;
        if(this.state.course.title===''){
            course = {title: "New Course"}
        }
        else{
            course = this.state.course;
        }
        this.courseService.updateCourse(this.state.cid,course)
            .then(() => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}));
        this.state.course.title='';
        ReactDOM.findDOMNode(this.refs.courseInput).value = "";
    };

    render() {
        let view;
        return (
            <div>
                <h2>Course List</h2>
                <label><input
                    ref={node => view = node}
                              onClick={() => {
                                  this.setState({cardView:view.checked})
                              }}
                              type="checkbox"/> Card deck view</label>
                <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th><input id="courseTitle"
                                   ref="courseInput"
                                   onChange={this.titleChanged}
                                   className="form-control"
                                   id="titleFld"
                                   placeholder="New Course Title"/></th>
                        <th><button onClick={this.createCourse}
                                    className="btn btn-primary">Add New Course</button></th>
                        <th><button onClick={this.updateCourse}
                                    className="btn btn-primary">Update</button></th>
                    </tr>
                    <tr hidden={this.state.cardView}><th>Title</th>
                        <th>Owned by</th>
                        <th>Last modified</th>
                    </tr>
                    </thead>
                    <tbody hidden={this.state.cardView}>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
                </div>
                <div hidden={!(this.state.cardView)} className="card-deck">
                    {this.renderCourseCards()}
                </div>
            </div>
        )
    }
}
export default CourseList;