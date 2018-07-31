import React from 'react'

export const ListWidget = ({widget, updateWidget}) => {
    let text
    // let ordered
    let listType

    return(
        <div>
            <h3>List Widget</h3>
            <h4>{widget.name}</h4>
            <textarea ref={node => text = node}
                      className="form-control"
                      onChange={() =>{
                          widget.listItems = text.value;
                          updateWidget(widget)
                      }}
                      value={widget.listItems || ''}>
            </textarea>
            {/*<label>*/}
                {/*<input ref={node => ordered = node}*/}
                       {/*onClick={() => {*/}
                           {/*widget.ordered = ordered.checked*/}
                           {/*updateWidget(widget)*/}
                       {/*}}*/}
                       {/*checked={widget.ordered}*/}
                       {/*type="checkbox"/>Ordered*/}
            {/*</label>*/}
            <label htmlFor="listType">Order</label>
            <select ref={node => listType = node}
                    className="form-control"
                    id="listType"
                    onChange={() => {
                // widget.ordered = ordered.checked
                widget.listType = listType.value
                updateWidget(widget)
            }}>
                <option value="unordered">Unordered</option>
                <option value="ordered">Ordered</option>
            </select>
            <h4>Preview</h4>
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