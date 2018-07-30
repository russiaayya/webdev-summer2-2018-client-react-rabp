
let initialState = {
    widgets: [
        // {title: 'List Widget 1', id: 2, widgetType: 'LIST', ordered: false, listItems: 'item 1\nitem 2\nitem 3'},
        // {title: 'Heading Widget 1', id: 1, widgetType: 'HEADING'},
        // {title: 'Widget 1', id: 123, widgetType: 'WT1'},
        // {title: 'Widget 2', id: 234, widgetType: 'WT2'},
        // {title: 'Widget 3', id: 345, widgetType: 'WT3'},
        // {title: 'Widget 4', id: 456, widgetType: 'WT1'}
    ]
};

const WidgetReducer = (
    state = initialState,
    action) => {
    let fromIndex;
    let toIndex;
    switch (action.type){
        case 'UP':
            fromIndex = state.widgets.findIndex((widget) => widget.id === action.widgetId)
            toIndex = fromIndex--;
            state.widgets.splice(toIndex, 0, state.widgets.splice(fromIndex, 1)[0]);
            let widgets = Object.assign(state.widgets)
            return {
                widgets: widgets
            };
        case 'DOWN':
            console.log(action.widgetId + 'goign down');
            fromIndex = state.widgets.findIndex((widget) => widget.id === action.widgetId)
            toIndex = fromIndex++;
            return state;
        case 'FIND_ALL_WIDGETS':
            console.log(action.widgets);
            return {
                widgets: action.widgets
            };
        case 'SAVE_WIDGETS':
            fetch('http://localhost:8080/api/widget', {
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
                    action.widget
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
        default:
            return state;
    }
}

export default WidgetReducer