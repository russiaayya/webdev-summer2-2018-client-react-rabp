import React from 'react'

export const LinkWidget = ({widget, updateWidget}) => {
    let text
    let href
    let name
    return(
        <div>
            <h3>Link Widget</h3>
            <label htmlFor="link-text">Link text</label>
            <input ref={node => text = node}
                   className="form-control"
                   placeholder="Link text"
                   id="link-text"
                   onChange={() =>{
                       widget.text = text.value;
                       updateWidget(widget)
                   }}></input>
            <label htmlFor="link-url">Link URL</label>
            <input ref={node => href = node}
                   className="form-control"
                   placeholder="Link URL"
                   id="link-url"
                   onChange={() =>{
                       widget.href = href.value;
                       updateWidget(widget)
                   }}></input>
            <label htmlFor="link-name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name" id="link-name"/>
            <h4>Preview</h4>
            <a href={widget.href}>{widget.text}</a>
        </div>
    )
}