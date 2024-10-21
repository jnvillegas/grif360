import { Card, Checkbox, Slider } from "antd";
import React, { useEffect, useState } from "react";

export default function SceneInspector({proyecto, escena, guardarCambios}){

    const [rotEditing, setRotEditing] = useState(escena.inicio || {x:0, y:0});    

    const activarPrincipal = (e) => {
        escena.principal = e.target.checked;
        guardarCambios(escena);
    }

    const alCambiarRot = (e) => {
        console.log('alCambiarRot', e)
        setRotEditing({x:e.x, y:e.y})
        let valorX = e.x * Math.PI / 180
        let valorY = e.y * Math.PI / 180 *-1

        let camara = document.getElementById('camara');        
        camara.components['look-controls'].pitchObject.rotation.x = valorX
        camara.components['look-controls'].yawObject.rotation.y = valorY
        escena.inicio = e        
    }

    useEffect(() => {        
        console.log('cambioEscena:', escena)
        let camara = document.getElementById('camara');
        console.log('look', escena.inicio);
        let valorX = escena.inicio.x * Math.PI / 180
        let valorY = escena.inicio.y * Math.PI / 180 *-1
        if (camara && camara.components && camara.components['look-controls']){
            camara.components['look-controls'].pitchObject.rotation.x = valorX
            camara.components['look-controls'].yawObject.rotation.y = valorY
        }
        
        setRotEditing(escena.inicio)
    }, [escena])

    return (<>
        <h1 style={{
            textAlign: 'left'
          }}>{escena.titulo}</h1>
        <Card title="Principal: " size="small" style={{
            textAlign: 'left'
          }}>
            <Checkbox checked={escena.principal} onChange={activarPrincipal} >Establecer como Principal</Checkbox>
        </Card>
        <Card title="Vista Inicial: " size="small" style={{
            textAlign: 'left'
          }}>
            <label>Eje X</label><Slider onChangeComplete={()=>guardarCambios(escena)} defaultValue={0} step={0.01} max={180} min={-180} value={rotEditing.x} onChange={(v) => alCambiarRot({...rotEditing, x:v})} disabled={!escena}/>
            <label>Eje Y</label><Slider onChangeComplete={()=>guardarCambios(escena)} defaultValue={0} step={0.01} max={180} min={-180} value={rotEditing.y} onChange={(v) => alCambiarRot({...rotEditing, y:v})} disabled={!escena}/>            
        </Card>
    </>)
}