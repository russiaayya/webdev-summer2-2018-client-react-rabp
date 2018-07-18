import React from 'react'
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';

class CourseEditor extends React.Component{
    render() {
        return(
            <div className="row">
                <div className="col-4">
                    <ModuleList/>
                </div>
                <div className="col-8">
                    <LessonTabs/>
                </div>
            </div>
        )
    }
}

export default CourseEditor;