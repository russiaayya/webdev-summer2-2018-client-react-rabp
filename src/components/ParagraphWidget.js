import React from 'react'

export const ParagraphWidget = ({widget, updateWidget}) => {
    let text
    let name
    return(
        <div>
            <h3>Paragraph Widget</h3>
            <label htmlFor="paragraph-text">Paragraph text</label>
            <textarea ref={node => text = node}
                      className="form-control"
                      placeholder="Paragraph text"
                      id="paragraph-text"
                      onChange={() =>{
                          widget.text = text.value;
                          updateWidget(widget)
                      }}
                      value={widget.text}></textarea>
            <label htmlFor="paragraph-name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name" id="paragraph-name"/>
            <h4>Preview</h4>
            {widget.text}
        </div>
    )
}