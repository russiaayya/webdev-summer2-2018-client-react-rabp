import React from 'react'
import {HeadingWidget} from "./HeadingWidget";
import {ListWidget} from "./ListWidget";
import {ParagraphWidget} from "./ParagraphWidget";
import {ImageWidget} from "./ImageWidget";
import {LinkWidget} from "./LinkWidget";

class WidgetListComponent extends React.Component{
    constructor(props){
        super(props)
        let widgetTitle;
        let widgetType;
        let widgetName;
        // this.props.loadAllWidgets();
        // this.props.findAllWidgetsForTopic(this.props.topicId)
        // console.log('topic id hrer: '+this.props.topicId)
    }

    componentDidMount(){}

    componentWillReceiveProps(newProps){
        if (newProps.topicId !== this.props.topicId) {
            this.props.findAllWidgetsForTopic(newProps.topicId);
        }
    }

    render(){
        return(
            <div>
                <button onClick={() => this.props.saveWidgets(this.props.topicId)}
                        className="btn btn-success float-right">Save</button>
                <h1>Widget List ({this.props.widgets.length})</h1>
                <ul className="list-group">
                    <button onClick={() => {
                        // let widget = {
                        //     title: this.widgetTitle.value,
                        //     id: (new Date()).getTime(),
                        //     widgetType: this.widgetType.value
                        //     // widgetType: "LINK"
                        // };
                        this.props.createWidget()
                        // this.widgetTitle.value = '';
                    }} className="btn btn-success">Add Widget</button>
                    {this.props.widgets.map((widget, index)=>
                        <li className="list-group-item"
                            key={index}>
                            {/*<h3>{widget.name} ({widget.id}) - {widget.widgetType} Widget</h3>*/}
                            <button className="float-right btn btn-danger"
                                    onClick={() => this.props.deleteWidget(widget.id)}>
                                Delete</button>
                            <select id="widget-dropdown"
                                    value={widget.widgetType}
                                    ref={node => this.widgetType = node}
                                    onChange={()=>{
                                    widget.widgetType = this.widgetType.value;
                                    this.props.updateWidget(widget);
                                    }}
                                    className="float-right form-control">
                                <option value="HEADING">Heading Widget</option>
                                <option value="PARAGRAPH">Paragraph Widget</option>
                                <option value="LIST">List Widget</option>
                                <option value="IMAGE">Image Widget</option>
                                <option value="LINK">Link Widget</option>
                            </select>
                            <button onClick={() => this.props.down(widget.id)}
                                    className="float-right btn btn-warning">
                                Down
                            </button>
                            <button onClick={() => this.props.up(widget.id)}
                                    className="float-right btn btn-warning">
                                Up
                            </button>
                            <div>
                                {widget.widgetType === 'LIST' && <ListWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'HEADING' && <HeadingWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'PARAGRAPH' && <ParagraphWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'IMAGE' && <ImageWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'LINK' && <LinkWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                            </div>
                        </li>
                    )}
                </ul>
            </div>)
    }
}
export default WidgetListComponent