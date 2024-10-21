import React, { useEffect, useState } from "react";
import { Card, Slider, Input, Select, Button, Popconfirm, Upload } from "antd";

export default function ElementInspector({ proyecto, eliminarElemento, elemento, guardarCambios }){

    const [posEditing, setPosEditing] = useState(elemento.position);
    const [rotEditing, setRotEditing] = useState(elemento.rotation);
    const [titulo, setTitulo] = useState(elemento.titulo);
    const [texto, setTexto] = useState(elemento.texto);
    const [escena, setEscena] = useState(elemento.escena);
    const [video, setVideo] = useState(elemento.video);
    const [imagen, setImagen] = useState(elemento.imagen);


    const alCambiarTitulo = (e) => {
        setTitulo(e.target.value);
        elemento.titulo = e.target.value;
    }

    const alCambiarTexto = (e) => {
        setTexto(e.target.value);
        elemento.texto = e.target.value;
    }

    const alCambiarEscena = (e) => {
        setEscena(e);
        elemento.escena = e;
        guardarCambios(elemento);
    }

    const alCambiarVideo = (e) => {
        setVideo(e.target.value);
        elemento.video = e.target.value;
    }

    const alCambiarImagen = (e) => {
        setImagen(e);
        elemento.imagen = e;
    }

    const alCambiarPos = (e) => {
        if (elemento){
            document.getElementById(elemento.id).setAttribute('position', `${e.x} ${e.y} ${e.z}`);
            elemento.position = e;            
            setPosEditing(e);
            
        }        
    }

    const alCambiarRot = (e) => {
        if (elemento){
            document.getElementById(elemento.id).setAttribute('rotation', `${e.x} ${e.y} ${e.z}`);
            elemento.rotation = e;
            setRotEditing(e);
            
        }        
    }

    useEffect(() => {
        setEscena(elemento.escena);
        setTexto(elemento.texto);
        setVideo(elemento.video);
        setTitulo(elemento.titulo);
        setPosEditing(elemento.position);  
        setRotEditing(elemento.rotation); 
    }, [elemento])

    return(<>
        <h1 style={{
            textAlign: 'left'
          }}>{elemento.nombre}</h1>
        <Card title="Posicion: " size="small" style={{
            textAlign: 'left'
          }}>            
            <label>Eje X</label><Slider defaultValue={0} step={0.01} max={100} min={-100} value={posEditing.x} onChangeComplete={()=>guardarCambios(elemento)} onChange={(v) => alCambiarPos({...elemento.position, x:v})} disabled={!elemento}/>
            <label>Eje Y</label><Slider defaultValue={0} step={0.01} max={100} min={-100} value={posEditing.y} onChangeComplete={()=>guardarCambios(elemento)} onChange={(v) => alCambiarPos({...elemento.position, y:v})} disabled={!elemento}/>
            <label>Eje Z</label><Slider defaultValue={0} step={0.01} max={100} min={-100} value={posEditing.z} onChangeComplete={()=>guardarCambios(elemento)} onChange={(v) => alCambiarPos({...elemento.position, z:v})} disabled={!elemento}/>
        </Card>
        <Card title="Rotacion: " size="small" style={{
            textAlign: 'left'
          }}>            
            <label>Eje X</label><Slider defaultValue={0} step={0.01} max={100} min={-100} value={rotEditing.x} onChangeComplete={()=>guardarCambios(elemento)} onChange={(v) => alCambiarRot({...elemento.rotation, x:v})} disabled={!elemento}/>
            <label>Eje Y</label><Slider defaultValue={0} step={0.01} max={100} min={-100} value={rotEditing.y} onChangeComplete={()=>guardarCambios(elemento)} onChange={(v) => alCambiarRot({...elemento.rotation, y:v})} disabled={!elemento}/>            
        </Card>
        <Card title="Accion: " size="small" style={{
            textAlign: 'left'
          }}>
            {elemento && elemento.tipo===1?(<><label>Titulo:{titulo} </label><Input value={titulo} onBlur={()=>guardarCambios(elemento)} onChange={alCambiarTitulo} /></>):null}
            {elemento && elemento.tipo===1?(<><label>Texto:</label><Input value={texto} onBlur={()=>guardarCambios(elemento)} onChange={alCambiarTexto}/></>):null}
            {elemento && elemento.tipo===2?(<><label>Escena:</label><Select value={escena} onChange={alCambiarEscena} options={proyecto.escenas.map(x => {return {value:x.titulo, label:x.titulo}})} style={{width: '100%'}}/></>):null}
            {elemento && elemento.tipo===0?(<><label>Video URL:</label><Input value={video} onBlur={()=>guardarCambios(elemento)} onChange={alCambiarVideo}/></>):null} 
            {elemento && elemento.tipo===3?(<><label>Imagen:</label><img width="100%" src={imagen}/></>):null}
            {elemento && elemento.tipo===3?(<><Upload accept=".png, .jpg" 
                    maxCount={1}
                    beforeUpload={file => {
                      
                      const reader = new FileReader();
              
                      reader.onload = e => {
                          console.log(e.target.result);
                          alCambiarImagen(e.target.result);
                          guardarCambios(elemento);
                      };
                      reader.readAsDataURL(file);
              
                      // Prevent upload
                      return false;
                    }}                    
            ><Button type="primary"  >Subir Imagen</Button>
            </Upload></>):null}     
             
        </Card>        
        <Card size="small" style={{
            textAlign: 'center'
          }}>
            <Popconfirm title="Eliminar Elemento"
                        description="Realmente desea eliminar este elemento?"
                        onConfirm={() => eliminarElemento(elemento)}                        
                        okText="Si" cancelText="No"
                        >
                    <Button type="primary"danger>Eliminar</Button>
            </Popconfirm>
        </Card>
        </>)
}