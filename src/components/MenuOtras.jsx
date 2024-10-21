import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import carritoSvg from "../assets/carrito.svg";

const MenuOtras = ({ handleLinkButton }) => {
  const items = [
    {
      key: "carrito_key",
      icon: (
        <div className="icon-rel-360">
        <img
          src={carritoSvg}
          alt="carrito svg"
          style={{ width: 40, height: 40,filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
          className="animate__animated animate__fadeIn otra_360"
        />
        </div>
      ),
      // label: "Enlace",
      onClick: () => handleLinkButton(),
      style: {
        padding: "0px",
      }
    },
    // {
    //   key: "otra_1_key",
    //   icon: (
    //     <div className="icon-rel-360">
    //       <img
    //       src='https://agnnissan.com.ar/wp-content/uploads/2024/03/sentra_mc24.jpg'
    //       alt="link 1"
    //       // style={{ width: 40, height: 40 }}
    //       className="animate__animated animate__fadeIn image-icon-rel-360"
    //     />
    //     </div>
        
    //   ),
    //   // label: "Enlace",
    //   onClick: () => handleLinkButton(),
      
    // },
    
  ];
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div 
      id="menuFlotanteOtras"
      >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        theme="purple"
        style={{           
          height: 50,
          width: "100%",
          display: "flex",
          justifyContent: "flex.start",
          alignItems: "center",
          border: "none",
          // gap: "20px",
          
        }}
      />
      
    </div>
  );
};
export default MenuOtras;
