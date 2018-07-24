import React from 'react'
import ModuleService from "../services/ModuleService";
import LessonService from "../services/LessonService"
import LessonTabItem from "../components/LessonTabItem"
import ReactDOM from "react-dom";

class LessonTabs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            lesson: { title: ''},
            lessons: [],
            moduleTitle: ''
        };
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
        this.moduleService = ModuleService.instance;
    }

    setModuleTitle(moduleTitle) {
        this.setState({moduleTitle: moduleTitle});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    findAllLessonsForModule(moduleId) {
        this.lessonService
            .findAllLessonsForModule(moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.moduleId);
        this.moduleService.findModuleById(newProps.moduleId)
            .then(module => {
                this.setModuleTitle(module.title)
            });
    }

    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
        this.createLesson = this.createLesson.bind(this);
    }

    createLesson() {
        let lesson;
        if(this.state.lesson.title===''){
            lesson = {title: "New Lesson"}
        }
        else {
            lesson = this.state.lesson;
        }
        this.lessonService
            .createLesson(this.props.moduleId, lesson)
            .then(() => {
                this.findAllLessonsForModule(this.props.moduleId)
            })
        ReactDOM.findDOMNode(this.refs.lessonInput).value = "";
    }

    deleteLesson = (lessonId) => {
        this.lessonService.deleteLesson(lessonId)
            .then(() => this.findAllLessonsForModule(this.props.moduleId))
    };

    renderListOfLessons(){
        var self = this;
        let lessons = this.state.lessons.map(function (lesson) {
            return <LessonTabItem key={lesson.id}
                                  courseId = {self.props.courseId}
                                  moduleId = {self.props.moduleId}
                                  lesson = {lesson}
                                  deleteLesson={self.deleteLesson}/>
        })

        return lessons;
    }

    render() {
        return(
            <div>
                <h3 id="lesson-tabs">Lessons for module: {this.state.moduleTitle}</h3>
                <input className="form-control"
                       ref="lessonInput"
                       onChange={this.titleChanged}
                       placeholder="New Lesson Title"/>
                <button onClick={this.createLesson}
                        className=
                            "btn btn-primary btn-block">
                    <i className=
                           "fa fa-plus"></i>
                </button>
                <ul className="nav nav-tabs">
                    {this.renderListOfLessons()}
                    {/*<li className="nav-item"><a className="nav-link active"*/}
                                                {/*href="#">Active Tab</a></li>*/}
                    {/*<li className="nav-item"><a className="nav-link"*/}
                                                {/*href="#">Another Tab</a></li>*/}

                </ul>
            </div>

        )
    }

}

export default LessonTabs;