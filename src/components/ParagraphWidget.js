import React from 'react'

export const ParagraphWidget = ({widget, updateWidget, preview}) => {
    let text;
    let name;
    return(
        <div>
            <h3 hidden={preview}>Paragraph widget</h3>
            <h4>{widget.name}</h4>
            <div hidden={preview}>
            <label htmlFor="paragraph-text">Paragraph text</label>
            <textarea ref={node => text = node}
                      className="form-control"
                      placeholder="Paragraph text"
                      id="paragraph-text"
                      onChange={() =>{
                          widget.text = text.value;
                          updateWidget(widget);
                      }}
                      value={widget.text}></textarea>
            <label className="webdev-margin-top" htmlFor="paragraph-name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name"
                   value={widget.name}
                   id="paragraph-name"/>
            <h4 className="webdev-margin-top">Preview</h4>
            </div>
            {widget.text}
        </div>
    )
}