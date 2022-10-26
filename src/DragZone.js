import React from 'react';
import Context from "./Context";

import './css/DropZone.css';

export default function DragZone(props)
{
    var path = props.children._source.fileName + "," + props.dropId;
    var instance = Context.instance;

    const handleMouseMove = (e) => {
        console.log("move")
    }

    const handleMouseUp = (e) => {
        if(!instance.find(props.children._source.fileName, props.dropId))
            return;

        var value = instance.getPath(props.children._source.fileName + "," + props.dropId)['value'];
        
        var element = React.createElement(
        "div",
        {"key" : instance.getCurrentKey(), "style": value['style']},
        <DragZone dragId={value.dragId} dropId={value.dropId}>{value['children']}</DragZone>
        );

        instance.updatePath(props.children._source.fileName + "," + props.dropId, "element", element);

        console.log(instance.getListObserver());

        // setChildren(React.cloneElement(children, null, [children, element]));

        // var el = document.getElementById(value['dragId']);
        // if(el !== null)
        //     el.remove();

        // Context.instance.removePath(path);
        Context.instance.notify("mouseUp");

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }

    const handleMouseDown = (e) => {
        Context.instance.setPath(path, {"dragId" : props.dragId, "value" : props});

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        e.preventDefault();
    }

    return (
    <>
        <div className="dragZone" id={props.dragId} style={props.style} onMouseDown={handleMouseDown}>
            {props.children}
        </div>
    </>);
}