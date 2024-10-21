import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { ShareAltOutlined } from '@ant-design/icons';

export default function Publicar({ projectId, visible, alCerrar }){
    
    const [urlShared, setUrlShared] = useState(window.location.href+'player/'+projectId.id)
    
    const alOk = () => {
        navigator.clipboard.writeText(urlShared);
        alCerrar();
    }

    useEffect(() => {
        setUrlShared(window.location.href+'player/'+projectId.id)
    }, [projectId]);


    return (<Modal title="Publicar Experiencia 360" open={visible} onOk={alOk} onCancel={alCerrar}>
                <Input value={urlShared} readOnly prefix={<ShareAltOutlined/>}/>
            </Modal>)

}