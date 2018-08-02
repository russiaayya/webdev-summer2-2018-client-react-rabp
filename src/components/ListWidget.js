import React from 'react'

export const ListWidget = ({widget, updateWidget, preview}) => {
    let text
    let listType
    let name

    return(
        <div>
            <h3 hidden={preview}>List Widget</h3>
            <h4>{widget.name}</h4>
            <div hidden={preview}>
            <label htmlFor="list-text">List items</label>
            <textarea ref={node => text = node}
                      className="form-control"
                      placeholder="Enter one list item per line"
                      onChange={() =>{
                          widget.listItems = text.value;
                          updateWidget(widget)
                      }}
                      value={widget.listItems || ''}
                      id="list-text">
            </textarea>
            <label className="webdev-margin-top" htmlFor="listType">List type</label>
            <select ref={node => listType = node}
                    className="form-control"
                    id="listType"
                    value={widget.listType}
                    onChange={() => {
                widget.listType = listType.value
                updateWidget(widget)
            }}>
                <option value="unordered">Unordered</option>
                <option value="ordered">Ordered</option>
            </select>
            <label className="webdev-margin-top" htmlFor="list-name">Widget name</label>
            <input onChange={() => {
                widget.name = name.value;
                updateWidget(widget)
            }}
                   ref={node => name = node}
                   className="form-control"
                   placeholder="Widget name"
                   value={widget.name}
                   id="list-name"/>
            <h4 className="webdev-margin-top">Preview</h4>
            </div>
            {widget.listType === "unordered" && widget.listItems !== '' &&
            <ul>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
            {widget.listType === "ordered" && widget.listItems !== '' &&
            <ol>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            }
        </div>
    )
}