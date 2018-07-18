import React from 'react'
import CourseCard from '../components/CourseCard';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
import CourseEditor from './CourseEditor';

// import LessonTabs from './LessonTabs';
// import TopicPills from './TopicPills';

class CourseManager extends React.Component{
    render(){
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseEditor/>

                {/*<TopicPills/>*/}

                <LessonTabs/>

                <ModuleList/>

                <div className="card-deck">
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>
            </div>
        )
    }
}

export default CourseManager;