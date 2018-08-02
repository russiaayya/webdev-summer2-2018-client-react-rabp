import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TopicPills from "./TopicPills";
import WidgetListContainer from './WidgetListContainer'

class TopicEditor extends React.Component{

    constructor(props) {
        super(props);
        this.selectTopic = this.selectTopic.bind(this);
        this.state = {topicId: ''};
    }

    componentDidMount() {
        this.selectTopic
        (this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps){
        this.selectTopic
        (newProps.match.params.topicId);
    }

    selectTopic(topicId) {
        this.setState({topicId: topicId});
    }

    render() {
        return(
                <div>
                    <WidgetListContainer topicId={this.state.topicId}/>
                </div>
        )
    }
}

export default TopicEditor;