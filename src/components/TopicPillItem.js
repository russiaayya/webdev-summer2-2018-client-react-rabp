import React from "react";
import { Link } from 'react-router-dom'

class TopicPillItem extends React.Component{
    constructor(props){
        super(props);
    }

    deleteTopic() {
        if (window.confirm("Are you sure you want to delete this topic?")) {
            this.props.deleteTopic(this.props.topic.id);
        }
        else {
            return;
        }
    }

    render(){
        return(
            <li className="nav-item">
                <div className="nav-link">
                    {this.props.topic.title}
                    <i style={{'marginLeft': '10px'}} onClick={() => {
                        this.deleteTopic()
                        // console.log('hello: '+this.props.moduleId)
                        }
                    } className="fa fa-times"></i>
                </div>
            </li>
        )
    }
}

export default TopicPillItem;