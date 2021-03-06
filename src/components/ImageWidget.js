import React from 'react'

export const ImageWidget = ({widget, updateWidget, preview}) => {
    let src
    let name
    return(
        <div>
            <h3 hidden={preview}>Image Widget</h3>
            <h4>{widget.name}</h4>
            <div hidden={preview}>
            <label htmlFor="image-url">Image URL</label>
            <input ref={node => src = node}
                   className="form-control"
                   placeholder="Image URL"
                   id="image-url"
                   value={widget.src}
                   onChange={() =>{
                          widget.src = src.value;
                          updateWidget(widget)
                      }}></input>
            <label className="webdev-margin-top" htmlFor="image-name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name"
                   value={widget.name}
                   id="image-name"/>
            <h4 className="webdev-margin-top">Preview</h4>
            </div>
            <img src={widget.src} className="img-fluid"/>
        </div>
    )
}