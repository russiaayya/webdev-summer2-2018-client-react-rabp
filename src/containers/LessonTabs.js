import React from 'react'
import ModuleService from "../services/ModuleService";
import LessonService from "../services/LessonService"
import LessonTabItem from "../components/LessonTabItem"

class LessonTabs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            lesson: { title: ''},
            lessons: []
        };
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
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
        this.findAllLessonsForModule(newProps.moduleId)
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({lesson: {title: event.target.value}});
        this.createLesson = this.createLesson.bind(this);
    }

    createLesson() {
        console.log(this.state.lesson);
        this.lessonService
            .createLesson(this.props.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.props.moduleId)
            })
    }

    deleteLesson = (lessonId) => {
        this.lessonService.deleteLesson(lessonId)
            .then(() => this.findAllLessonsForModule(this.props.moduleId))
    };

    renderListOfLessons(){
        var self = this
        console.log('state info'+this.state);
        let lessons = this.state.lessons.map(function (lesson) {
            return <LessonTabItem key={lesson.id}
                                   courseId = {self.props.courseId}
                                  moduleId = {self.props.moduleId}
                // title={module.title}
                // id={module.id}
                                   lesson = {lesson}
                                   deleteLesson={self.deleteLesson}/>
        })

        return lessons;
    }

    render() {
        return(
            <div>
                <input className="form-control"
                       onChange={this.titleChanged}
                       placeholder="title"/>
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