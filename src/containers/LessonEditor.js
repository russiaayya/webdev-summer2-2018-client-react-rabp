import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TopicPills from "./TopicPills";

class LessonEditor extends React.Component{

    constructor(props) {
        super(props);
        this.selectLesson = this.selectLesson.bind(this);
        this.state = {lessonId: ''};
    }

    componentDidMount() {
        this.selectLesson
        (this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps){
        this.selectLesson
        (newProps.match.params.lessonId);
    }

    selectLesson(lessonId) {
        this.setState({lessonId: lessonId});
    }

    render() {
        return(
            <Router>
                <div>
                    <h2>Editing lesson: {this.state.lessonId}</h2>
                    <div>
                        <TopicPills lessonId={this.state.lessonId}/>
                    </div>

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

export default LessonEditor;