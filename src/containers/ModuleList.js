import React from "react";
import ModuleListItem from '../components/ModuleListItem';

class ModuleList extends React.Component {
    render(){
        return (
            <div>
                <h1>Module list</h1>
                <ul className="list-group">
                    <ModuleListItem title="Module 1"/>
                    <ModuleListItem title="Module 2"/>
                    <ModuleListItem title="Module3"/>
                    <ModuleListItem title="Module 4"/>
                </ul>
            </div>
        )
    }
}

export default ModuleList;