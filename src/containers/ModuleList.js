import React from "react";
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';
import ReactDOM from "react-dom";
import ModuleEditor from "./ModuleEditor";
import {Route} from 'react-router-dom'

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: ''},
            modules: [],
            mid: '',
            courseTitle: ''
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.renderListOfModules = this.renderListOfModules.bind(this);
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setCourseTitle(courseTitle) {
        this.setState({courseTitle: courseTitle});
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
        this.courseService.findCourseById(newProps.courseId)
            .then(course => {
                this.setCourseTitle(course.title)
            });
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
        this.createModule = this.createModule.bind(this);
    }

    createModule() {
        let module;
        if(this.state.module.title===''){
            module = {title: "New Module"}
        }
        else{
            module = this.state.module;
        }
        this.moduleService
            .createModule(this.props.courseId, module)
            .then(() => {
                this.findAllModulesForCourse(this.props.courseId)
            })
        ReactDOM.findDOMNode(this.refs.moduleInput).value = "";
    }

    deleteModule = (moduleId) => {
        this.moduleService.deleteModule(moduleId)
            .then(() => this.findAllModulesForCourse(this.props.courseId))
    };

    renderListOfModules(){
        var self = this
        let modules = null;
        console.log(this.state)
        if(this.state){
            modules = this.state.modules.map(function (module) {
                return <ModuleListItem key={module.id}
                                       courseId = {self.props.courseId}
                                       module = {module}
                                       deleteModule={self.deleteModule}
                                       updateModule={self.updateModule}
                                       selectModule={self.selectModule}/>
            })
        }
        return (modules);
    }

    selectModule = (event) =>{
        var editBtn = event.currentTarget;
        var moduleId = editBtn.parentNode.parentNode.id.substring(0, editBtn.parentNode.parentNode.id.indexOf('m'));
        this.moduleService.findModuleById(moduleId)
            .then((module)=>{
                ReactDOM.findDOMNode(this.refs.moduleInput).value = module.title;
            });
        this.state.mid = moduleId;
    }

    updateModule = () => {
        let self = this;
        let module;
        if(this.state.module.title===''){
            module = {title: "New Module"}
        }
        else{
            module = this.state.module;
        }
        this.moduleService.updateModule(this.state.mid,module)
            .then(() => self.moduleService.findAllModulesForCourse(self.state.courseId))
            .then(modules => self.setState({modules: modules}));
        this.state.module.title='';
        ReactDOM.findDOMNode(this.refs.moduleInput).value = "";
    };

    render(){
        return (
            <div className="row">
                <div className="col-4">
                <h2>Modules for course: {this.state.courseTitle}</h2>
                <input className="form-control"
                       ref="moduleInput"
                       onChange={this.titleChanged}
                       placeholder="New Module Title"/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                <button onClick={this.createModule}
                    className=
                        "btn btn-primary btn-block">
                    <i className=
                           "fa fa-plus"></i>
                </button></th>
                        <th>
                <button onClick={this.updateModule}
                        className=
                            "btn btn-primary btn-block">
                    <i className=
                           "fa fa-check"></i>
                </button>
                        </th>
                    </tr>
                    </thead>
                </table>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
                </div>
                <div className="col-8">
                    {/*<Route path="/module/:moduleId"*/}
                    <Route path="/course/:courseId/module/:moduleId"
                           component={ModuleEditor}
                           courseId={this.state.courseId}/>
                        {/*<LessonTabs/>*/}
                    {/*</Route>*/}
                </div>
            </div>
        )
    }
}

export default ModuleList;