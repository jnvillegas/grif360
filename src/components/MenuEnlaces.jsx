import { useCallback, useEffect, useState } from "react";
import './controles.css'
import { Menu } from "antd";
import carSvg from '../assets/car.svg';
import camionetaSvg from '../assets/camioneta.svg';
import casaSvg from '../assets/casa.svg'
import habitacionSvg from '../assets/habitacion.svg'
import genericLink from '../assets/genericLink.svg'
import CardCar from "./CardCar";
import 'animate.css'


const initialStateDataSelected = { 
  icono: "",
  titulo: "",
  url: "",
  imagen: "",
}

const MenuEnlaces = ({ handleLinkButton, data=[], handleShowFromPadre, desplegarCard }) => {
  const [showCardCar, setShowCardCar] = useState(false)  
  const [selectedData, setSelectedData] = useState(data[0] || initialStateDataSelected)
  const [items, setItems] = useState([])
  const [keyMemory, setKeyMemory] = useState(0)


  const handleOnClickIconButton = (e) => {
    // console.log("handleOnClickIconButton", e.key)
    const index = parseInt(e.key) - 1
    setSelectedData(data[index])
    
    if(keyMemory === index) {
      setShowCardCar(prev => !prev)
    }

    if(keyMemory !== index && !showCardCar) {
      setShowCardCar(true)
    }
    
    setKeyMemory(index)
  }

  const renderItems = useCallback(
    () => {
      const newItems = data.map((item, index) => ({
        key: (index + 1).toString(),
        title: item.titulo,
        icon: (
          <div className="icon-enlace-car">
            <img
            // src={camionetaSvg}
              src={
                item.icono === "auto"?
                carSvg:
                item.icono === "camioneta"?
                camionetaSvg:
                item.icono === "casa"?
                casaSvg:
                item.icono === "habitacion"?
                habitacionSvg:
                genericLink
              }
              alt={`link ${index + 1}`}
              style={{ width: 40, height: 40,filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))', padding: "1px" }}
              className="animate__animated animate__fadeIn"
            />
          </div>
        ),
      }));
    
      setItems(newItems);
    },
    [data],
  )
  


  useEffect(() => {    
    if (data.length > 0) {
      renderItems();
    }
  }, [data]);   

  useEffect(() => {    
    setShowCardCar(desplegarCard)
  }, [desplegarCard])
  
    
  

  return (
    <div 
      id="menuFlotanteEnlaces"
      // style={{ backgroundColor: "black" }}
      >
        <div  className={`animate__animated ${showCardCar? 'animate__fadeInUp':'animate__fadeOutDown'}`}
          style={{ 
            // backgroundColor:'grey',
            width: "100%", 
            alignItems: "center",
            justifyContent: "space-around",
            display: "flex",
            marginBottom: "20px",
           }}
        >
          <CardCar handleLinkButton={handleLinkButton}  data={selectedData}/>
        </div>
      <Menu        
        // onClick={onClick}
        // selectedKeys={[current]}
        mode="horizontal"
        onClick={handleOnClickIconButton}                        
        items={items}
        theme="purple"
        style={{            
          // backgroundColor: "black",
          justifyContent: "center",          
          // marginTop: "20px",
          // height: 50,
          // width: 200,
          // display: "flex",
          // justifyContent: "flex.start",
          // alignItems: "center",
          // border: "none",          
          // gap: "20px",
          
        }}
      />
      
    </div>
  );
};
export default MenuEnlaces;
