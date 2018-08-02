import {connect} from 'react-redux'
import WidgetListComponent from '../components/WidgetListComponent'

// const WIDGET_API_URL =
//     'http://webdev-summer2-2018-rabp.herokuapp.com/api/topic/';
//
// const WIDGET_API_URL_2 =
//     'http://webdev-summer2-2018-rabp.herokuapp.com/api/widget'

const WIDGET_API_URL_2 =
    'http://localhost:8080/api/widget'

const WIDGET_API_URL =
    'http://localhost:8080/api/topic/';

const stateToPropertyMapper = state =>(
    {
        widgets: state.widgets,
        preview: state.preview
    }
)

const dispatcherToPropertyMapper = dispatch => (
    {
        findAllWidgetsForTopic: (topicId) => {
            fetch(WIDGET_API_URL+topicId+'/widget')
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
        }),
        updateWidget: widget => dispatch({
            type: 'UPDATE_WIDGET',
            widget: widget
        }),
        saveWidgets: (topicId) => dispatch({
            type: 'SAVE_WIDGETS',
            topicId: topicId
        }),
        loadAllWidgets: () => {
            fetch(WIDGET_API_URL_2)
                .then(respose => respose.json())
                .then(widgets => dispatch({
                    type: 'FIND_ALL_WIDGETS',
                    widgets: widgets
                }))
        },
        up: (widget) => {
            dispatch({
                type: 'UP',
                widget: widget
            })
        },
        down: (widget) => {
            dispatch({
                type: 'DOWN',
                widget: widget
            })
        },
        switchPreview: () => dispatch({
            type: 'PREVIEW'
        })
    }
)

const WidgetListContainer =
    connect(stateToPropertyMapper, dispatcherToPropertyMapper)
    (WidgetListComponent)

export default WidgetListContainer