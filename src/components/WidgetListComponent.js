import React from 'react'
import {HeadingWidget} from "./HeadingWidget";
import {ListWidget} from "./ListWidget";
import {ParagraphWidget} from "./ParagraphWidget";
import {ImageWidget} from "./ImageWidget";
import {LinkWidget} from "./LinkWidget";
import ToggleButton from 'react-toggle-button'

class WidgetListComponent extends React.Component{
    constructor(props){
        super(props)
        let widgetTitle;
        let widgetType;
        let widgetName;
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
                <div className="pull-right webdev-toggle-button">
                    <ToggleButton onToggle={this.props.switchPreview}
                                  value={this.props.preview}/>
                </div>
                <h5 className="pull-right webdev-toggle-text">Preview</h5>
                <button onClick={() => this.props.saveWidgets(this.props.topicId)}
                        className="btn btn-success float-right">Save</button>
                <h3 className="webdev-margin-top-bottom">Widget List (count: {this.props.widgets.length})</h3>
                <ul className="list-group">
                    <button onClick={() => {
                        this.props.createWidget()
                    }} className="btn btn-primary"
                            hidden={this.props.preview}>Add Widget</button>
                    {this.props.widgets.sort((a,b) => a.widgetOrder - b.widgetOrder).map((widget, index)=>{
                        widget.widgetOrder = index;
                        let widgetType;
                        return(
                        <li className="list-group-item"
                            key={index}>
                            <div hidden={this.props.preview}>
                            <button className="pull-right btn btn-danger webdev-close"
                                    onClick={() => this.props.deleteWidget(widget.id)}>
                                <i className="fa fa-times"></i>
                            </button>
                            <select id="widget-dropdown"
                                    value={widget.widgetType}
                                    ref={node => widgetType = node}
                                    onChange={()=>{
                                        widget.widgetType = widgetType.value;
                                    this.props.updateWidget(widget);
                                    }}
                                    className="float-right form-control webdev-close">
                                <option value="HEADING">Heading Widget</option>
                                <option value="PARAGRAPH">Paragraph Widget</option>
                                <option value="LIST">List Widget</option>
                                <option value="IMAGE">Image Widget</option>
                                <option value="LINK">Link Widget</option>
                            </select>
                            <button onClick={() => this.props.down(widget)}
                                    hidden={widget.widgetOrder===this.props.widgets.length-1}
                                    className="float-right btn btn-warning webdev-close">
                                <i className="fa fa-arrow-down"></i>
                            </button>
                            <button onClick={() => this.props.up(widget)}
                                    hidden={widget.widgetOrder===0}
                                    className="float-right btn btn-warning">
                                <i className="fa fa-arrow-up"></i>
                            </button>
                            </div>
                            <div>
                                {widget.widgetType === 'LIST' && <ListWidget widget={widget} updateWidget={this.props.updateWidget} preview={this.props.preview}/>}
                                {widget.widgetType === 'HEADING' && <HeadingWidget widget={widget} updateWidget={this.props.updateWidget} preview={this.props.preview}/>}
                                {widget.widgetType === 'PARAGRAPH' && <ParagraphWidget widget={widget} updateWidget={this.props.updateWidget} preview={this.props.preview}/>}
                                {widget.widgetType === 'IMAGE' && <ImageWidget widget={widget} updateWidget={this.props.updateWidget} preview={this.props.preview}/>}
                                {widget.widgetType === 'LINK' && <LinkWidget widget={widget} updateWidget={this.props.updateWidget} preview={this.props.preview}/>}
                            </div>
                        </li>)}
                    )}
                </ul>
            </div>)
    }
}
export default WidgetListComponent