import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const CardCar = ({handleLinkButton,data}) => {
  const {titulo, url, imagen} = data;
  // console.log("Data recibida en CardCar>>>>>",{titulo,url,imagen})
  const haveInfo = (titulo == null || titulo === "")? false : true;

  const precio = ""

  return(      
      haveInfo ? (
        <Card
    hoverable
    style={{     
      width: 150,
    }}
    cover={<img alt="example" src={imagen} />}
    onClick={() => handleLinkButton(url)}
  >
    <Meta title={titulo} description={precio} />
  </Card>
      ):null   
  
)};
export default CardCar;