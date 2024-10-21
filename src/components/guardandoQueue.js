import { Alert, Spin } from "antd";
import React, { useEffect, useState } from "react";

export default function GuardandoQueue({cantidad}){   
    const [opacidad, setOpacidad] = useState(1);

    useEffect(() => {
        setOpacidad(1);
        let a = setTimeout(()=>{
            setOpacidad(0.5);
            clearTimeout(a)
        }, 1000)
        
    }, [cantidad])

    return (<>
              {(cantidad>0)&&<Alert
                type="info"
                message={<b>Cambios sin guardar</b>}
                description={`Tiene ${cantidad} cambio${cantidad==1?'':'s'} sin guardar!`}
                style={{ position: 'absolute',
                         zIndex: 1000,
                         right: 0,
                         opacity: opacidad
                       }}
              />}</>)
}