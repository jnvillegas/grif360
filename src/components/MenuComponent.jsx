import React, { useState } from "react";

import { Button, Menu, Popover } from "antd";
import carritoSvg from "../assets/carrito.svg";
import facebookSvg from "../assets/facebook.svg";
import youtubeSvg from "../assets/youtube.svg";
import twitterSvg from "../assets/twitter.svg";
import reloadSvg from "../assets/reload.svg";
import shareSvg from "../assets/share.svg";
import redesSvg from "../assets/redes.svg";
import plusSvg from "../assets/plus.svg";
import minusSvg from "../assets/minus.svg";
import fullscreenSvg from "../assets/full_screen.svg";
import vrSvg from "../assets/vr_icon.svg";
import diagramSvg from "../assets/diagram.svg";
import "./controles.css";
import "animate.css";
import { useCopyLink } from "../hooks/useCopyLink";
import { CopyToClipboard } from "react-copy-to-clipboard";

const MenuComponent = ({
  handleLinkButton,
  handleOptionButton,
  handleClickPlusButton,
  handleClickMinusButton,
  handleClickFullScreenButton,
  handleClickScenesButton,
  desplegarMenu,
  setDesplegarMenu,
  isMobile,
  setVR,
}) => {
 const [collapsed, setCollapsed] = useState(false);
  // const [showMenu, setShowMenu] = useState(true);
  const { copied, handleCopy } = useCopyLink;

  const currentUrl = window.location.href;

  const items = [
    {
      key: "zoom_plus_key",
      icon: (
        <img
          src={plusSvg}
          alt="zoom mas"
          style={{ width: 40, height: 40, filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
          className={`animate__animated ${
            !desplegarMenu ? "animate__fadeOut" : "animate__fadeIn"
          } itemMenuFloat`}
        />
      ),
      label: "Acercar",
      onClick: () => handleClickPlusButton(),
      style: {
        marginBottom: "20px 0px",
      },
    },
    {
      key: "zoom_minus_key",
      icon: (
        <img
          src={minusSvg}
          alt="zoom menos"
          style={{ width: 40, height: 40, filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
          className={`animate__animated ${
            !desplegarMenu ? "animate__fadeOut" : "animate__fadeIn"
          } itemMenuFloat`}
        />
      ),
      label: "Alejar",
      onClick: () => handleClickMinusButton(),
      style: {
        marginBottom: "20px 0px",
      },
    },
    {
      key: "full_screen_key",
      icon: (
        <img
          src={fullscreenSvg}
          alt="fullscreen"
          style={{ width: 40, height: 40, filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
          className={`animate__animated ${
            !desplegarMenu ? "animate__fadeOut" : "animate__fadeIn"
          } itemMenuFloat`}
        />
      ),
      label: "fullscreen",
      onClick: () => handleClickFullScreenButton(),
      style: {
        marginBottom: "20px 0px",
      },
    },
    {
      key: "vr_key",
      icon: (
        <img
          src={vrSvg}
          alt="vr-option"
          style={{ width: 40, height: 40, filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))' }}
          className={`animate__animated ${
            !desplegarMenu ? "animate__fadeOut" : "animate__fadeIn"
          } itemMenuFloat`}
        />
      ),
      label: "vr vision",
      onClick: () => setVR(),
      style: {
        //display: !isMobile ? 'none' : 'block',
        marginBottom: "20px 0px",
      },
    },
    // {
    //   key: "scenes_key",
    //   icon: (
    //     <img
    //       src={diagramSvg}
    //       alt="escenas"
    //       style={{ width: 40, height: 40 }}
    //       className={`animate__animated ${
    //         !showMenu ? "animate__fadeOut" : "animate__fadeIn"
    //       } itemMenuFloat`}
    //     />
    //   ),
    //   label: "menu de escenas",
    //   onClick: () => handleClickScenesButton(),
    //   style: {
    //     marginBottom: "20px",
    //   },
    // },
    // {
    //   key: 'link_key',
    //   icon: <img src={carritoSvg} alt="carrito svg" style={{ width: 40, height: 40 }} className={`animate__animated ${!showMenu ? 'animate__fadeOut' : 'animate__fadeIn'} itemMenuFloat`} />,
    //   label: 'Enlace',
    //   onClick: () => handleLinkButton(),
    //   style: {
    //     marginBottom: '20px'
    //    },

    // },
    // {
    //   key: 'animation_key',
    //   icon: <img src={reloadSvg} alt="reload svg" style={{ width: 40, height: 40 }} className={`animate__animated ${!showMenu ? 'animate__fadeOut' : 'animate__fadeIn'} itemMenuFloat`} />,
    //   label: 'Animación',
    //   style: {
    //     marginBottom: '20px'
    //    },
    // },
    // {
    //   key: 'otras_key',
    //   label: 'Navegación de Experiencias',
    //   icon: <img src={linkSvg} alt="Custom Icon" style={{ width: 40, height: 40 }} className={`animate__animated ${!showMenu ? 'animate__fadeOut' : 'animate__fadeIn'} itemMenuFloat`} />,
    //   style: {
    //     marginBottom: '20px'
    //    },
    //   children: [
    //     {
    //       key: '5',
    //       label: 'Experiencia Relacioanda 1',
    //       style: {
    //         color: 'white',
    //         fontSize: '17px',
    //         fontWeight: 'bold',
    //         backgroundColor: 'rgb(0, 0, 0, 0.4)',
    //       }
    //     },
    //     {
    //       key: '6',
    //       label: 'Experiencia Relacioanda 2',
    //       style: {
    //         color: 'white',
    //         fontSize: '17px',
    //         fontWeight: 'bold',
    //         backgroundColor: 'rgb(0, 0, 0, 0.4)',
    //       }
    //     },
    //     {
    //       key: '7',
    //       label: 'Experiencia Relacioanda 3',
    //       style: {
    //         color: 'white',
    //         fontSize: '17px',
    //         fontWeight: 'bold',
    //         backgroundColor: 'rgb(0, 0, 0, 0.4)',
    //       }
    //     },
    //     {
    //       key: '8',
    //       label: 'Experiencia Relacioanda 4',
    //       style: {
    //         color: 'white',
    //         fontSize: '17px',
    //         fontWeight: 'bold',
    //         backgroundColor: 'rgb(0, 0, 0, 0.4)',
    //       }
    //     },
    //   ],
    // },
    // {
    //   key: "enlace_key",
    //   label: "Copiar enlace",
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
    // {
    //   key: 'redes_key',
    //   label: 'Redes Sociales',
    //   icon: <img src={shareSvg} alt="Custom Icon" style={{ width: 40, height: 40 }} className={`animate__animated ${!showMenu ? 'animate__fadeOut' : 'animate__fadeIn'} itemMenuFloat`} />,
    //   children: [
    //     {
    //       key: 'youtube_key',
    //       style: {
    //         backgroundColor: 'rgb(0, 0, 0, 0.2)',
    //         width: '50%',
    //       },
    //       icon: <img src={youtubeSvg} alt="Custom Icon" style={{ padding: 8 }} className="animate__animated animate__fadeIn itemMenuFloat" />,

    //     },
    //     {
    //       key: 'twitter_key',
    //       style: {
    //         backgroundColor: 'rgb(0, 0, 0, 0.2)',
    //         width: '50%',
    //       },
    //       icon: <img src={twitterSvg} alt="Custom Icon" style={{ padding: 8 }} className="animate__animated animate__fadeIn itemMenuFloat" />,

    //     },
    //     {
    //       key: 'facebook_key',
    //       style: {
    //         backgroundColor: 'rgb(0, 0, 0, 0.2)',
    //         width: '50%',
    //       },
    //       icon: <img src={facebookSvg} alt="Custom Icon" style={{ padding: 8 }} className="animate__animated animate__fadeIn itemMenuFloat" />,
    //     },
    //   ],
    // },
  ];

  const handleClickMenu = (e) => {
    switch (e.key) {
      case null:
        // setShowMenu((prev) => !prev);
        break;

      case "twitter_key":
        handleOptionButton(e.key);
        break;
      case "facebook_key":
        handleOptionButton(e.key);
        break;
      case "youtube_key":
        handleOptionButton(e.key);
        break;
      case "animation_key":
        handleOptionButton(e.key);
        break;

      default:
        // setShowMenu((prev) => !prev);
        break;
    }
  };
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  return (
    <div
      id="menuFlotante"
      style={{
        width: 150,
      }}
    >
      {/* <Button
        type="primary"
        onClick={handleClickMenu}
        style={{
          display: "flex",
          //display: "none",
          marginTop: 0,
          marginBottom: 30,
          marginLeft: 105,
          padding: "0px",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 35,
          backgroundColor: "rgba(255, 255, 255, 0)",
        }}
        className="itemMenuFloat"
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <Menu
        style={{
          marginLeft: 76,
          display: "block",
          fontSize: 25,
          opacity: 1,
          boxSizing: "content-box",          
          // backgroundColor: "rgba(0, 0, 0, 0)",
        }}
        //defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        theme="purple" //a proposito puse un theme que no existe
        //inlineCollapsed={collapsed}
        inlineCollapsed={true}
        //items={showMenu?items:null}
        items={items}
        // onClick={handleClickMenu}
        //expandIcon={({ isOpen }) => (isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
      />
    </div>
  );
};
export default MenuComponent;
