import React from 'react'
import TopicService from '../services/TopicService'
import LessonService from "../services/LessonService";
import TopicPillItem from "../components/TopicPillItem"
import ReactDOM from "react-dom";
import TopicEditor from "./TopicEditor";
import {Route} from 'react-router-dom'

class TopicPills extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            lessonId: '',
            topic: { title: ''},
            topics: []
        };
        this.createTopic = this.createTopic.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.topicService = TopicService.instance;
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setTopics(topics) {
        this.setState({topics: topics})
    }

    findAllTopicsForLesson(lessonId) {
        this.topicService
            .findAllTopicsForLesson(lessonId)
            .then((topics) => {this.setTopics(topics)});
    }

    componentDidMount() {
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps){
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.lessonId)
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({topic: {title: event.target.value}});
        this.createTopic = this.createTopic.bind(this);
    }

    createTopic() {
        console.log(this.state.topic);
        this.topicService
            .createTopic(this.props.lessonId, this.state.topic)
            .then(() => {
                this.findAllTopicsForLesson(this.props.lessonId)
            })
        ReactDOM.findDOMNode(this.refs.topicInput).value = "";
    }

    deleteTopic = (topicId) => {
        this.topicService.deleteTopic(topicId)
            .then(() => this.findAllTopicsForLesson(this.props.lessonId))
    };

    renderListOfTopics(){
        var self = this
        console.log('state info'+this.state);
        let topics = this.state.topics.map(function (topic) {
            return <TopicPillItem key={topic.id}
                                  courseId = {self.props.courseId}
                                  moduleId = {self.props.moduleId}
                                  lessonId = {self.props.lessonId}
                                  topic = {topic}
                                  deleteTopic={self.deleteTopic}/>
        })

        return topics;
    }

    render(){
        return(
            <div>
                <h3 id="topic-pills">Topics for lesson: {this.state.lessonId}</h3>
                <input className="form-control"
                       ref="topicInput"
                       onChange={this.titleChanged}
                       placeholder="New Topic Title"/>
                <button onClick={this.createTopic}
                        className=
                            "btn btn-primary btn-block">
                    <i className=
                           "fa fa-plus"></i>
                </button>
                <ul className="nav nav-pills">
                    {this.renderListOfTopics()}
                    {/*<li className="nav-item">*/}
                        {/*<a className="nav-link active"*/}
                           {/*href="#">Topic 1</a></li>*/}
                    {/*<li className="nav-item"><a className="nav-link"*/}
                                                {/*href="#">Topic 2</a></li>*/}
                </ul>
            </div>
        )
    }
}

export default TopicPills;