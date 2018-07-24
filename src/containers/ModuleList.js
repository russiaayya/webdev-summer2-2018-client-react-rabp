import React from "react";
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import ReactDOM from "react-dom";

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: ''},
            modules: [],
            mid: ''
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
        this.selectModule = this.selectModule.bind(this);
        // this.renderListOfModules = this.renderListOfModules.bind(this);
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
        if(this.state){
            let modules = this.state.modules.map(function (module) {
                return <ModuleListItem key={module.id}
                                       courseId = {self.props.courseId}
                    // title={module.title}
                    // id={module.id}
                                       module = {module}
                                       deleteModule={self.deleteModule}
                                       updateModule={self.updateModule}
                                       selectModule={self.selectModule}/>
            })
            return (modules);
        }
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
        let module;
        if(this.state.module.title===''){
            module = {title: "New Module"}
        }
        else{
            module = this.state.module;
        }
        this.moduleService.updateModule(this.state.mid,module)
            .then(() => this.moduleService.findAllModules())
            .then(modules => this.setState({modules: modules}));
        this.state.module.title='';
        ReactDOM.findDOMNode(this.refs.moduleInput).value = "";
    };

    render(){
        return (
            <div>
                <h3>Module list for course: {this.state.courseId}</h3>
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
        )
    }
}

export default ModuleList;