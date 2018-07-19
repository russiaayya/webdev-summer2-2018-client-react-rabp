import React from "react";
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: ''},
            modules: []
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleService.instance;
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
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
        this.findAllModulesForCourse(newProps.courseId)
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
        this.createModule = this.createModule.bind(this);
    }

    createModule() {
        console.log(this.state.module);
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(() => {
                this.findAllModulesForCourse(this.props.courseId)
            })
    }

    deleteModule = (moduleId) => {
        this.moduleService.deleteModule(moduleId)
            .then(() => this.findAllModulesForCourse(this.props.courseId))
    };

    renderListOfModules(){
        var self = this
        console.log(this.state);
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem key={module.id}
                                   title={module.title}
                                   id={module.id}
                                   deleteModule={self.deleteModule}/>
        })

            return modules;
    }

    render(){
        return (
            <div>
                <h3>Module list for course: {this.state.courseId}</h3>
                <input className="form-control"
                       onChange={this.titleChanged}
                       placeholder="title"/>
                <button onClick={this.createModule}
                    className=
                        "btn btn-primary btn-block">
                    <i className=
                           "fa fa-plus"></i>
                </button>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        )
    }
}

export default ModuleList;