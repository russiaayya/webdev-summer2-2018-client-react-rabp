
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
            // fromIndex = state.widgets.findIndex((widget) => widget.id === action.widgetId)
            // toIndex = fromIndex--;
            // state.widgets.splice(toIndex, 0, state.widgets.splice(fromIndex, 1)[0]);
            // let widgets = Object.assign(state.widgets)
            // return {
            //     widgets: widgets
            // };
            return Object.assign({}, {
                widgets: state.widgets.map(widget => {
                    if(widget.widgetOrder === (action.widget.widgetOrder))
                        widget.widgetOrder = widget.widgetOrder - 1;
                    if(widget.widgetOrder === (action.widget.widgetOrder - 1))
                        widget.widgetOrder = widget.widgetOrder + 1;
                    console.log("I am up"+widget.widgetOrder)
                    return Object.assign({}, widget)
                })
            });
        case 'DOWN':
            // console.log(action.widgetId + 'goign down');
            // fromIndex = state.widgets.findIndex((widget) => widget.id === action.widgetId)
            // toIndex = fromIndex++;
            // return state;
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
            console.log(action.widgets);
            return {
                widgets: action.widgets
            };
        case 'SAVE_WIDGETS':
            console.log("topic id mila???: "+action.topicId)
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
                    // action.widget
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