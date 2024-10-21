import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Collapse, Menu, Popover } from "antd";
import carritoSvg from "../assets/carrito.svg";
import shareSvg from "../assets/share.svg";
import { useCopyLink } from "../hooks/useCopyLink";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MenuRedes = ({ handleLinkButton }) => {
  const { copied, handleCopy } = useCopyLink;
  const [showMenu, setShowMenu] = useState(true);
  const currentUrl = window.location.href;

  const items = [
    // {
    //   key: "carrito_key",
    //   icon: (
    //     <div className="icon-rel-360">
    //     <img
    //       src={carritoSvg}
    //       alt="carrito svg"
    //       style={{ width: 40, height: 40 }}
    //       className="animate__animated animate__fadeIn otra_360"
    //     />
    //     </div>
    //   ),
    //   // label: "Enlace",
    //   onClick: () => handleLinkButton(),
      
    // },
    {
      key: "enlace_key",
      // label: "Copiar enlace",     
      style: {
        padding: "0px",
      } ,
      icon: (
        <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
          <Popover            
            title="Enlace copiado!"
            trigger="click"
            open={copied}
            // onOpenChange={handleOpenChange}
          >
            <img
              src={shareSvg}
              alt="Custom Icon"
              style={{margin: 0,padding: 0, width: 40, height: 40 }}
              className={`animate__animated ${
                !showMenu ? "animate__fadeOut" : "animate__fadeIn"
              } itemMenuFloat`}
            />
          </Popover>
        </CopyToClipboard>
      ),
    },
    
  ];

  // const [current, setCurrent] = useState("mail");
  // const onClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };
  return (
    <div 
      id="menuFlotanteRedes"
      >
      <Menu
        // onClick={onClick}
        // selectedKeys={[current]}        
        mode="inline"
        items={items}
        theme="purple"
        style={{           
          height: 50,
          width: "100%",
          padding: 0,
          margin: 0,
          display: "block",
          // justifyContent: "flex.end",
          // alignItems: "end",
          // gap: "20px",
          
        }}
      />
      
    </div>
  );
};
export default MenuRedes;
