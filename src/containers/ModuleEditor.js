import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LessonTabs from "./LessonTabs";
import LessonEditor from "./LessonEditor"

class ModuleEditor extends React.Component{

    constructor(props) {
        super(props);
        this.selectModule = this.selectModule.bind(this);
        this.state = {moduleId: ''};
    }

    componentDidMount() {
        this.selectModule
        (this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps){
        this.selectModule
        (newProps.match.params.moduleId);
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    render() {
        return(
            <Router>
                <div>
                    {/*<h3>Editing module: {this.state.moduleId}</h3>*/}
                    <div>
                        <LessonTabs moduleId={this.state.moduleId}
                                    courseId={this.props.match.params.courseId}/>
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                               component={LessonEditor} >
                        </Route>
                    </div>
                    {/*<Route path="lesson/:lessonId"*/}

                    {/*<div className="row">*/}
                        {/*<div className="col-4">*/}
                            {/*<ModuleList courseId={this.state.courseId}/>*/}
                        {/*</div>*/}
                        {/*<div className="col-8">*/}
                            {/*/!*<Route path="/module/:moduleId"*!/*/}
                            {/*<Route path="/course/:courseId/module/:moduleId"*/}
                                   {/*component={LessonTabs}>*/}
                                {/*/!*<LessonTabs/>*!/*/}
                            {/*</Route>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </Router>
        )
    }
}

export default ModuleEditor;