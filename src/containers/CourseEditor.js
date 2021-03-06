import React from 'react'
import ModuleList from './ModuleList';
import ModuleEditor from './ModuleEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LessonEditor from "./LessonEditor";

class CourseEditor extends React.Component{

    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: ''};
    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse
        (newProps.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    render() {
        return(
                <div>
                    <div className="row">
                        <div className="col-12">
                            <ModuleList courseId={this.state.courseId}/>
                        </div>
                        {/*<div className="col-8">*/}
                            {/*/!*<Route path="/module/:moduleId"*!/*/}
                            {/*<Route path="/course/:courseId/module/:moduleId"*/}
                                   {/*component={ModuleEditor}*/}
                                   {/*courseId={this.state.courseId}>*/}
                                {/*/!*<LessonTabs/>*!/*/}
                            {/*</Route>*/}
                        {/*</div>*/}
                    </div>
                </div>
        )
    }
}

export default CourseEditor;