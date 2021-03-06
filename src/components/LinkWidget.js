import React from 'react'

export const LinkWidget = ({widget, updateWidget, preview}) => {
    let text
    let href
    let name
    return(
        <div>
            <h3 hidden={preview}>Link Widget</h3>
            <h4>{widget.name}</h4>
            <div hidden={preview}>
            <label htmlFor="link-text">Link text</label>
            <input ref={node => text = node}
                   className="form-control"
                   placeholder="Link text"
                   id="link-text"
                   value={widget.text}
                   onChange={() =>{
                       widget.text = text.value;
                       updateWidget(widget)
                   }}></input>
            <label className="webdev-margin-top" htmlFor="link-url">Link URL</label>
            <input ref={node => href = node}
                   className="form-control"
                   placeholder="Link URL"
                   value={widget.href}
                   id="link-url"
                   onChange={() =>{
                       widget.href = href.value;
                       updateWidget(widget)
                   }}></input>
            <label className="webdev-margin-top" htmlFor="link-name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name"
                   value={widget.name}
                   id="link-name"/>
            <h4 className="webdev-margin-top">Preview</h4>
            </div>
            <a href={widget.href}>{widget.text}</a>
        </div>
    )
}