import { Button, Modal } from "antd";
import React from "react";


export default function PopUpMsg({ visible, titulo, contenido, alCerrar }){


    return (<Modal title={<h1 style={{textAlign:'center'}}>{titulo}</h1>} open={visible} onCancel={alCerrar} destroyOnClose={true}                
                footer={[<Button key="back" onClick={alCerrar}>Ok</Button>]} 
                style={{height: '90vh'}}               
            >
                <div style={{fontSize: 18}}>{contenido}</div>
            </Modal>)
}