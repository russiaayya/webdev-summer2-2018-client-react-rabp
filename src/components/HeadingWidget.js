import React from 'react'

export const HeadingWidget = ({widget, updateWidget}) =>
{
    let text;
    let size;
    let name;
    let widgetType;
    return(
        <div>
            <h3>Heading widget</h3>
            <h4>{widget.name}</h4>
            {/*<select id="widget-type"*/}
                {/*ref={node => widgetType = node}*/}
                {/*className="pull-right"*/}
                {/*value={widget.widgetType}*/}
                    {/*onChange={()=>{*/}
                        {/*widget.widgetType = widgetType.value;*/}
                        {/*updateWidget(widget);*/}
                    {/*}}>*/}
                {/*<option value="HEADING">Heading Widget</option>*/}
                {/*<option value="PARAGRAPH">Paragraph Widget</option>*/}
                {/*<option value="LIST">List Widget</option>*/}
                {/*<option value="IMAGE">Image Widget</option>*/}
                {/*<option value="LINK">Link Widget</option>*/}
            {/*</select>*/}
            <label htmlFor="text">Heading text</label>
            <input ref={node => text = node}
                   onChange={() => {
                       widget.text = text.value;
                       console.log("heading: "+widget.text)
                       updateWidget(widget)
                   }}
                   className="form-control"
                   placeholder="Heading text"
                   id="text"
                   value={widget.text}/>
            <label htmlFor="size">Heading size</label>
            <select onChange={() => {
                widget.size = size.value;
                console.log("size: "+ widget.size)
                updateWidget(widget)
            }}
                ref={node => size = node}
                    className="form-control" id="size">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
            <label htmlFor="name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name"
                   value={widget.name}
                   id="name"/>
            <h4>Preview</h4>
            {widget.size === 1 && <h1>{widget.text}</h1>}
            {widget.size === 2 && <h2>{widget.text}</h2>}
            {widget.size === 3 && <h3>{widget.text}</h3>}
        </div>
    )
}