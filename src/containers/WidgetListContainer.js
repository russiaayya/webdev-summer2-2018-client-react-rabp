import {connect} from 'react-redux'
import WidgetListComponent from '../components/WidgetListComponent'

const stateToPropertyMapper = state =>(
    {
        widgets: state.widgets
    }
)

const dispatcherToPropertyMapper = dispatch => (
    {
        findAllWidgetsForTopic: (topicId) => {
            fetch('http://localhost:8080/api/topic/'+topicId+'/widget')
                .then(response => (response.json()))
                .then(widgets => dispatch({
                    type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
                    widgets: widgets
                }) )
        },

        deleteWidget: (widgetId) => dispatch({
            type: 'DELETE_WIDGET',
            widgetId: widgetId
        }),
        createWidget: () => dispatch({
            type: 'CREATE_WIDGET'
            // widget: widget
        }),
        updateWidget: widget => dispatch({
            type: 'UPDATE_WIDGET',
            widget: widget
        }),
        saveWidgets: () => dispatch({
            type: 'SAVE_WIDGETS'
        }),
        loadAllWidgets: () => {
            fetch('http://localhost:8080/api/widget')
                .then(respose => respose.json())
                .then(widgets => dispatch({
                    type: 'FIND_ALL_WIDGETS',
                    widgets: widgets
                }))
        },
        up: (widgetId) => {
            dispatch({
                type: 'UP',
                widgetId: widgetId
            })
        },
        down: (widgetId) => {
            dispatch({
                type: 'DOWN',
                widgetId: widgetId
            })
        }
    }
)

const WidgetListContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)
    (WidgetListComponent)

export default WidgetListContainer