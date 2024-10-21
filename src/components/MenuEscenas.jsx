import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Collapse, Menu, Popover } from "antd";
import carritoSvg from "../assets/carrito.svg";
import diagramSvg from "../assets/diagram.svg";
import { useCopyLink } from "../hooks/useCopyLink";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MenuEscenas = ({ handleClickScenesButton }) => {
  const { copied, handleCopy } = useCopyLink;
  const [showMenu, setShowMenu] = useState(true);
  const currentUrl = window.location.href;

  const items = [    
    {
      key: "scenes_key",
      icon: (
        <img
          src={diagramSvg}
          alt="escenas"
          style={{ width: 40, height: 40, margin: 0, padding: 0, filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
          className={`animate__animated ${
            !showMenu ? "animate__fadeOut" : "animate__fadeIn"
          } itemMenuFloat`}
        />
      ),
      // label: "menu de escenas",
      onClick: () => handleClickScenesButton(),
      style: {
        marginBottom: "20px",
        marginTop: "0px",
        padding: "0px",
      },
    },
    // {
    //   key: "enlace_key",
    //   // label: "Copiar enlace",      
    //   icon: (
    //     <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
    //       <Popover            
    //         title="Enlace copiado!"
    //         trigger="click"
    //         open={copied}
    //         // onOpenChange={handleOpenChange}
    //       >
    //         <img
    //           src={shareSvg}
    //           alt="Custom Icon"
    //           style={{ width: 40, height: 40 }}
    //           className={`animate__animated ${
    //             !showMenu ? "animate__fadeOut" : "animate__fadeIn"
    //           } itemMenuFloat`}
    //         />
    //       </Popover>
    //     </CopyToClipboard>
    //   ),
    // },
    
  ];

  // const [current, setCurrent] = useState("mail");
  // const onClick = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };
  return (
    <div 
      id="menuFlotanteEscenas"
      >
      <Menu
        // onClick={onClick}
        // selectedKeys={[current]}        
        mode="inline"
        items={items}
        theme="purple"
        style={{           
          height: 50,
          // width: "100%",
          margin: 0,
          padding: 0,
          display: "block",
          // justifyContent: "flex.end",
          // alignItems: "end",
          // gap: "20px",
          
        }}
      />
      
    </div>
  );
};
export default MenuEscenas;
