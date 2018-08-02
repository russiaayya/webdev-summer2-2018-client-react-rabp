import React from 'react'

export const HeadingWidget = ({widget, updateWidget, preview}) =>
{
    let text;
    let size;
    let name;
    return(
        <div>
            <h3 hidden={preview}>Heading widget</h3>
            <h4>{widget.name}</h4>
            <div hidden={preview}>
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
            <label className="webdev-margin-top" htmlFor="size">Heading size</label>
            <select onChange={() => {
                widget.size = parseInt(size.value);
                console.log("size: "+ widget.size)
                updateWidget(widget)
            }}
                ref={node => size = node}
                    className="form-control"
                    value={widget.size}
                    id="size">
                <option value='1'>Heading 1</option>
                <option value='2'>Heading 2</option>
                <option value='3'>Heading 3</option>
            </select>
            <label className="webdev-margin-top" htmlFor="name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name"
                   value={widget.name}
                   id="name"/>
            <h4 className="webdev-margin-top">Preview</h4>
            </div>
            {widget.size === 1 && <h1>{widget.text}</h1>}
            {widget.size === 2 && <h2>{widget.text}</h2>}
            {widget.size === 3 && <h3>{widget.text}</h3>}
        </div>
    )
}