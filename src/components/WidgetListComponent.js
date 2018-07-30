import React from 'react'
import {WidgetType1} from './WidgetType1'
import {WidgetType2} from './WidgetType2'
import {WidgetType3} from './WidgetType3'
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
        this.props.loadAllWidgets()
    }
    // componentWillReceiveProps(newProps){
    //     this.props.widgets = newProps.widgets;
    // }

    render(){
        return(
            <div>
                <button onClick={this.props.saveWidgets}
                        className="btn btn-success float-right">Save</button>
                <h1>Widget List ({this.props.widgets.length})</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <label htmlFor="widget-title">Widget title</label>
                        <input ref={node => this.widgetTitle = node}
                               className="form-control"
                               placeholder="Widget title"
                               id="widget-title"/>
                        <label htmlFor="widget-type">Widget type</label>
                        <select id="widget-type"
                                ref={node => this.widgetType = node}
                                className="form-control"
                                defaultValue="HEADING">
                            <option value="WT1">Widget Type 1</option>
                            {/*<option value="WT2">Widget Type 2</option>*/}
                            <option value="WT3">Widget Type 3</option>
                            <option value="HEADING">Heading Widget</option>
                            <option value="PARAGRAPH">Paragraph Widget</option>
                            <option value="LIST">List Widget</option>
                            <option value="IMAGE">Image Widget</option>
                            <option value="LINK">Link Widget</option>
                        </select>
                        <button onClick={() => {
                            let widget = {
                                title: this.widgetTitle.value,
                                id: (new Date()).getTime(),
                                // widgetType: this.widgetType.value
                                widgetType: "LINK"
                            };
                            this.props.createWidget(widget)
                            this.widgetTitle.value = '';
                        }} className="btn btn-success">Add Widget</button>
                    </li>
                    {this.props.widgets.map((widget, index)=>
                        <li className="list-group-item"
                            key={index}>
                            {widget.title} ({widget.id}) - {widget.widgetType}
                            <button className="float-right btn btn-danger"
                                    onClick={() => this.props.deleteWidget(widget.id)}>
                                Delete</button>
                            <select id="widget-dropdown" defaultValue={widget.widgetType} ref={node => this.widgetType = node} className="float-right form-control">
                                <option value="WT1">Widget Type 1</option>
                                <option value="WT2">Widget Type 2</option>
                                <option value="WT3">Widget Type 3</option>
                                <option value="HEADING">Heading Widget</option>
                                <option value="PARAGRAPH">Paragraph Widget</option>
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
                                {widget.widgetType === 'WT1' && <WidgetType1 widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'WT2' && <WidgetType2 widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'WT3' && <WidgetType3 widget={widget} updateWidget={this.props.updateWidget}/>}
                            </div>
                        </li>
                    )}
                </ul>
            </div>)
    }
}
export default WidgetListComponent