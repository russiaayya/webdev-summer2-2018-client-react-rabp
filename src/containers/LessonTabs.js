import React from 'react'

class LessonTabs extends React.Component{
    render() {
        return(
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link active"
                                                href="#">Active Tab</a></li>
                    <li className="nav-item"><a className="nav-link"
                                                href="#">Another Tab</a></li>
                </ul>
            </div>

        )
    }

}

export default LessonTabs;