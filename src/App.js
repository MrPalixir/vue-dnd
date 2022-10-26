import DropZone from './DropZone';
import DragZone from './DragZone';

export default function App(props)
{
    return (
        <>
            <div style={{display:"grid", gridRow:"1 / 2", color:"white", height:"10vh"}}>
                <DragZone dragId="drag1" dropId={["drop1"]} style={{gridColumn: "1 / 2", backgroundColor:"red"}}>
                    <div>
                        Drag 1
                    </div>
                </DragZone>

                <DragZone dragId="drag2" dropId="drop2" style={{gridColumn: "2 / 2", backgroundColor:"blue"}}>
                    <div>
                        Drag 2
                    </div>
                </DragZone>
            </div>
            
            <div style={{display:"grid", gridRow:"2 / 2", color:"white", height:"10vh"}}>
                <DropZone id="drop1" style={{gridColumn: "1 / 2", backgroundColor:"green"}}>
                    <div>
                        Drop 1
                    </div>
                </DropZone>

                <DropZone id="drop2"  style={{gridColumn: "2 / 2", backgroundColor:"purple"}}>
                    <div>
                        Drop 2
                    </div>
                </DropZone>
            </div>
        </>
    );
}