import { Button, Empty } from "antd";
import React, {useEffect} from "react";
import ReactGA from 'react-ga4';


export default function EmptyPage({ accion }){
    const ANALYTICS_KEY = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;
    ReactGA.initialize(ANALYTICS_KEY);

    useEffect(() => {
      ReactGA.send({ 
        hitType: "pageview",
        page: window.location.pathname 
      }); 
    }, []);

    return <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60 }}
    description={
      <span>
        Cree una Nueva Experiencia <a href="#tutorial">Griftin 360°</a>
      </span>
    }
  >
    <Button type="primary" onClick={() => {
      accion(true);
      ReactGA.event({
        category: 'User', 
        action: 'Clicked New' 
      })
    }}>
      Crear Nueva
    </Button>
  </Empty>
}