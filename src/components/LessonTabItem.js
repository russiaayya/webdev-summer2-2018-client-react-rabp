import React from "react";
import { Link } from 'react-router-dom'

class LessonTabItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="nav-item">
                <div className="nav-link">
                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                        {this.props.lesson.title}
                    </Link>
                    <i style={{'marginLeft': '10px'}} onClick={() => {
                        this.props.deleteLesson(this.props.lesson.id)
                        console.log('hello: '+this.props.moduleId)}
                    } className="fa fa-times"></i>
                </div>
            </li>
        )
                {/*<a className="nav-link"*/}
                   {/*href="#">{this.props.lesson.title + " "}*/}
                    {/*<i onClick={() => {*/}
                        {/*this.props.deleteLesson(this.props.lesson.id)*/}
                        {/*console.log('hello: '+this.props.moduleId)}*/}
                    {/*} className="fa fa-times"></i>*/}
        {/*</a>*/}


            // <li className="list-group-item">
            //     {/*<Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>*/}
            //         {/*<Link to={`/module/${this.props.module.id}`}>*/}
            //         {this.props.lesson.title}
            //     {/*</Link>*/}
            //     <span className="pull-right">
            //     <i onClick={() => {
            //         this.props.deleteLesson(this.props.lesson.id)
            //         // console.log('hello: '+this.props.moduleId)
            //     }}
            //        style={{'marginRight': '5px'}} className="fa fa-trash"></i>
            //     <i className="fa fa-pencil"></i>
            //     </span>
            // </li>
    }
}

export default LessonTabItem;