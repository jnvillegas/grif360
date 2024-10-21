import React, { useState } from "react";
import image from '../assets/image-icon.png';
import { LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons';
import './controles.css';

export default function EscenasMenu({ escenas, setEscena }){
    const [scrollPos, setScrollPos] = useState(0);

    const setScroll = (right) => {
        //if (scrollPos == 0) return;
        let escenasCont = document.getElementById('escenasMenu')
        let maxScroll = escenasCont.scrollWidth - escenasCont.clientWidth;
        const incremento = scrollPos + (right? 100 : -100)
        if (right && incremento>maxScroll || !right && incremento<0) return
        setScrollPos(incremento);
        escenasCont.scrollTo(incremento, 0);
        console.log(incremento)
    }

    const iconStyle = { fontSize: '64px', color: 'white', marginRight: 20}
    
    return <div id="escenasContainer" className="hidden-scenes">
                <LeftCircleOutlined style={iconStyle} twoToneColor="#eb2f96" onClick={() => setScroll(false)}/>
                <div id="escenasMenu">
                    {escenas && escenas.map((e, i) => 
                        <div class="escenaIcon">
                            <img className="escenaPic" key={i} width="80px" src={e.fondo} onClick={() => setEscena(e.titulo)}/>
                            <label>{e.titulo}</label>
                        </div>
                    )}
                    
                </div>
                <RightCircleOutlined style={iconStyle} onClick={() => setScroll(true)}/>
            </div>
}