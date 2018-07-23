import React from "react";
import { Link } from 'react-router-dom'

class TopicPillItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="nav-item">
                <div className="nav-link">
                    {this.props.topic.title}
                    <i style={{'marginLeft': '10px'}} onClick={() => {
                        this.props.deleteTopic(this.props.topic.id)
                        // console.log('hello: '+this.props.moduleId)
                        }
                    } className="fa fa-times"></i>
                </div>
            </li>
        )
    }
}

export default TopicPillItem;