
let initialState = {
    widgets: [],
    preview: false
};

const WidgetReducer = (
    state = initialState,
    action) => {
    let fromIndex;
    let toIndex;
    let newState;
    switch (action.type){
        case 'FIND_ALL_WIDGETS_FOR_TOPIC':
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            return newState
        case 'UP':
            return Object.assign({}, {
                widgets: state.widgets.map(widget => {
                    if(widget.widgetOrder === (action.widget.widgetOrder))
                        widget.widgetOrder = widget.widgetOrder - 1;
                    if(widget.widgetOrder === (action.widget.widgetOrder - 1))
                        widget.widgetOrder = widget.widgetOrder + 1;
                    return Object.assign({}, widget)
                })
            });
        case 'DOWN':
            let order = action.widget.widgetOrder;
            return Object.assign({}, {
                widgets: state.widgets.map(widget => {
                    if (widget.widgetOrder === order + 1)
                        widget.widgetOrder = widget.widgetOrder - 1;
                    if (widget.widgetOrder === action.widget.widgetOrder)
                        widget.widgetOrder = widget.widgetOrder + 1;
                    return Object.assign({}, widget)
                })
            });

        case 'FIND_ALL_WIDGETS':
            return {
                widgets: action.widgets
            };
        case 'SAVE_WIDGETS':
            fetch('http://localhost:8080/api/topic/'+action.topicId+'/widgets', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(state.widgets)
            });
            return state;
        case 'DELETE_WIDGET':
            return{
                widgets: state.widgets.filter(
                    widget => widget.id !== action.widgetId
                )
            }
        case 'CREATE_WIDGET':
            return{
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: '',
                        name: '',
                        widgetType: 'HEADING',
                        size: 1,
                        listType: 'unordered',
                        src:'',
                        href:'',
                        listItems:'',
                        widgetOrder: state.widgets.length + 1
                    }
                ]
            }
        case 'UPDATE_WIDGET':
            return{
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.widget.id){
                        return action.widget;
                    }else {
                        return widget
                    }
                })
            }
        case 'PREVIEW':
            return{
                widgets: state.widgets,
                preview: !state.preview
            }
        default:
            return state;
    }
}

export default WidgetReducer