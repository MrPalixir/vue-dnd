import React,  { useState, useEffect} from 'react';

import Context from "./Context";

import './css/DropZone.css';

export default function DropZone(props)
{
    var instance = Context.instance;
    const [children, setChildren] = useState(props.children);
    
    const update = () => {
        handleMouseUp();
    }

    useEffect(() =>{
        Context.instance.follow({"func": update, "follow" : ["mouseUp"]});
    }, []);

    const handleMouseUp = () => {
        // if(!instance.find(props.children._source.fileName, props.id))
        //     return;
        console.log(props);

        var value = instance.getPath(props.children._source.fileName + "," + props.id)['value'];
        
        // var element = React.createElement(
        // "div",
        // {"key" : instance.getCurrentKey(), "style": value['style']},
        // <DragZone dragId={value.dragId} dropId={value.dropId}>{value['children']}</DragZone>
        // );

        setChildren(React.cloneElement(children, null, [children, value['element']]));

        var el = document.getElementById(value['dragId']);
        if(el !== null)
            el.remove();

        instance.removePath(props.children._source.fileName + "," + props.id);
    }

    return (
    <>
        <div className="dropZone" style={props.style}>
            {children}
        </div>
    </>);
}