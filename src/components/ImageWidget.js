import React from 'react'

export const ImageWidget = ({widget, updateWidget}) => {
    let src
    let name
    return(
        <div>
            <h3>Image Widget</h3>
            <label htmlFor="image-url">Image URL</label>
            <input ref={node => src = node}
                      className="form-control"
                      placeholder="Image URL"
                      id="image-url"
                      onChange={() =>{
                          widget.src = src.value;
                          updateWidget(widget)
                      }}></input>
            <label htmlFor="image-name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name" id="image-name"/>
            <h4>Preview</h4>
            <img width="560"
                 height="315"
                 src={widget.src}/>
        </div>
    )
}