import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AFRAME from "aframe";
import { Entity } from "aframe-react";
import info from "../assets/info.png";
import gafas_white from "../assets/gafas_white.png";
import video from "../assets/video.jpg";
import image from "../assets/image-icon.png";
import "./controles.css";
import LoadingSpin from "./loadingSpin";
import PopUpMsg from "./popUpMsg";
import OpenProject from "./openProject";
import EscenasMenu from "./escenasMenu";
import { Alert } from "antd";
import "animate.css";
import MenuComponent from "./MenuComponent";
import ReactGA from 'react-ga4';
import MenuOtras from "./MenuOtras";
import Visitas from "./Visitas";
import MenuRedes from "./MenuRedes";
import MenuEscenas from "./MenuEscenas";
import MenuEnlaces from "./MenuEnlaces";
import CardCar from "./CardCar";
require("aframe-look-at-component");


export default function Player360() {
  const [open, setOpen] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [popUpTitulo, setPopUpTitulo] = useState("");
  const [popUpContenido, setPopUpContenido] = useState(null);
  const [isMobileXp] = useState(AFRAME.utils.device.isMobile());
  const [isVR, setIsVR] = useState(false);
  const [escenaIndex, setEscenaIndex] = useState(0);
  const [proyecto, setProyecto] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [mobileVideoSrc, setMobileVideoSrc] = useState("");
  const [mobilePlayerPos, setMobilePlayerPos] = useState({ x: 0, y: 0, z: 1 });
  const [VRPopUpImage, setVRPopUpImage] = useState(null);
  const [timeOutClick, setTimeOutClick] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animateEnabled, setAnimateEnabled] = useState(true);
  const [urlLink, setUrlLink] = useState("");
  const [showAlertLink, setShowAlertLink] = useState(false);
  const [showMenuFloat, setShowMenuFloat] = useState(true)
  const [desplegarMenu, setDesplegarMenu] = useState(false);
  //state que maneja el ocultamiento de la card de menu de otras segun click en pantalla
  const [desplegarCard, setDesplegarCard] = useState(false)
  const menuEnlacesOtrasRef = useRef(null)


  const [titulo360Value, setTitulo360Value] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState({
    titulo: "",
    mensaje: "",
  });

  const [redesState, setRedesState] = useState({
    facebook: "",
    twitter: "",
    youtube: "",
  });
  
  const [linksDataState, setLinksData] = useState([]);

  const location = useParams();
  const cielo = useRef(null);
  const escena = useRef(null);
  const camara = useRef(null);
  const cursor = useRef(null);
  const vrbutton = useRef(null);
  const videoControl = useRef(null);
  const iframe = useRef(null);
  var distanciaTouch = 0;
  var touchPos = { x: 0, y: 0 };

  const ANALYTICS_KEY = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;

  const getTipo = (e) => {
    switch (e.tipo) {
      case 0:
        return "video-button";
      case 1:
        return "msg-button";
      case 2:
        return "view-button";
      case 3:
        return "image-button";
      default:
        return null;
    }
  };

  useEffect(() => {
    ReactGA.initialize(ANALYTICS_KEY);
  }, []);
  

  const setEscena = (escenaTitulo, p) => {
    // console.log(escenaTitulo);
    cielo.current.emit("fadeout");
    let controls = camara.current.components["look-controls"];
    setTimeout(() => {
      if (controls) {
        let indice = p.escenas.findIndex((x) => x.titulo === escenaTitulo);
        if (indice < 0) indice = 0;
        setEscenaIndex(indice);
        let valorX =
          ((p.escenas[indice].inicio ? p.escenas[indice].inicio.x : 0) *
            Math.PI) /
          180;
        let valorY =
          (((p.escenas[indice].inicio ? p.escenas[indice].inicio.y : 0) *
            Math.PI) /
            180) *
          -1;
        controls.pitchObject.rotation.x = valorX;
        controls.yawObject.rotation.y = valorY;
      }
      cielo.current.emit("fadein");
    }, 500);
  };

  const setVR = () => {
    escena.current.enterVR();
  };

  const setFullscreen = () => {
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  const zoomIn = (zoomin) => {
    let objCamara = camara.current.getAttribute("camera", "zoom");
    objCamara.zoom += 0.1 * (zoomin ? 1 : -1);
    if (objCamara.zoom <= 1) objCamara.zoom = 1;
    if (objCamara.zoom >= 5) objCamara.zoom = 5;

    camara.current.setAttribute("camera", "zoom", objCamara.zoom);
  };

  const handleCardRelacionadas = (event) => {
    // console.log(event.target)
    // console.log("REFFFFFF", menuEnlacesOtrasRef.current)
    // console.log("contain event", !menuEnlacesOtrasRef.current.contains(event.target))
    if (menuEnlacesOtrasRef.current && !menuEnlacesOtrasRef.current.contains(event.target)) {
      console.log("CLICKEANDO AFUERA!!")
      console.log(desplegarCard)
      setDesplegarCard(prev => false)      
    }else{
      console.log("CLICKEANDO ADENTRO!!")
      setDesplegarCard(prev => true)      
    }
    
  }

  const handleClickLinkButton = (e) => {
    if (urlLink !== undefined && urlLink !== "") {
      ReactGA.event({
        category: 'User', 
        action: 'onLinkClick',
      });  
      window.open(urlLink, "_blank");
    } else {
      setAlertErrorMessage({
        titulo: "Link Inexistente",
        mensaje:
          "Configure el enlace de la Experiencia 360 con su sitio web o su carrito de compras.",
      });
      setShowAlertLink(true);
      setTimeout(() => {
        setShowAlertLink(false);
      }, 2000);
    }
  };

  const handleNavigateRelated = (urlTarget) => {
    if (urlTarget !== undefined && urlTarget !== "") {
      ReactGA.event({
        category: 'User', 
        action: 'onLinkClick',
      });  
      window.open(urlTarget, "_blank");
    } else {
      setAlertErrorMessage({
        titulo: "Link Inexistente",
        mensaje:
          "Configure el enlace de la Experiencia 360 con su sitio web o su carrito de compras.",
      });
      setShowAlertLink(true);
      setTimeout(() => {
        setShowAlertLink(false);
      }, 2000);
    }
  };

  const handleClickPlusButton = (e) => {    
    zoomIn(true);    
  };

  const handleClickMinusButton = (e) => {    
    zoomIn(false);
  }

  const handleClickFullScreenButton = (e) => {
    setFullscreen();
  };

  const handleClickScenesButton = (e) => {
    viewScenasShortcut();
  };

  const handleClickOptionButton = (key_word) => {
    
    switch (key_word) {
      case "enlace_1_key":    
        
        break;
      break;
      case "animation_key":    
        setAnimateEnabled(!animateEnabled);
        break;
      case "twitter_key":
        if (redesState?.twitter !== undefined && redesState?.twitter !== "") {
          window.open(redesState.twitter, "_blank");
        } else {
          setAlertErrorMessage({
            titulo: "Twitter Inexistente",
            mensaje: "Configure el enlace a su plataforma de Twitter.",
          });
          setShowAlertLink(true);
          setTimeout(() => {
            setShowAlertLink(false);
          }, 2000);
        }
        break;
      case "youtube_key":
        if (redesState?.youtube !== undefined && redesState?.youtube !== "") {
          window.open(redesState.youtube, "_blank");
        } else {
          setAlertErrorMessage({
            titulo: "Youtube Inexistente",
            mensaje: "Configure el enlace a su plataforma de Youtube.",
          });
          setShowAlertLink(true);
          setTimeout(() => {
            setShowAlertLink(false);
          }, 2000);
        }
        break;
      case "facebook_key":
        if (redesState?.facebook !== undefined && redesState?.facebook !== "") {
          window.open(redesState.facebook, "_blank");
        } else {
          setAlertErrorMessage({
            titulo: "Facebook Inexistente",
            mensaje: "Configure el enlace a su plataforma de Facebook.",
          });
          setShowAlertLink(true);
          setTimeout(() => {
            setShowAlertLink(false);
          }, 2000);
        }
        break;

      default:
        break;
    }
  };

  const setVRPopUpPosition = (e, elemento = "player") => {
    let pos = camara.current.getAttribute("position");
    let rot = camara.current.getAttribute("rotation");
    console.log(pos, rot);

    const distance = 30;
    const theta = (rot.y * Math.PI) / 180;
    const planeX = pos.x - distance * Math.sin(theta);
    const planeZ = pos.z - distance * Math.cos(theta);
    let position = document.getElementById(elemento).getAttribute("position");
    position.x = planeX;
    position.y = pos.y;
    position.z = planeZ;
    console.log(position);
    document.getElementById(elemento).setAttribute("position", position);
  };

  const getFunction = (e) => {
    switch (e.tipo) {
      case 0:
        return () => {
          if (playing) return;
          if (!isVR) {
            setPopUpTitulo(e.nombre);
            let videoURL =
              e.video +
              (e.video && e.video.includes("?") ? "&" : "?") +
              "autoplay=1";
            if (iframe.current) iframe.current.src = videoURL;
            setPopUpContenido(
              <iframe
                ref={!iframe.current ? iframe : null}
                src={videoURL}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                width="100%"
                height="350vh"
              />
            );

            setOpen(true);
            console.log(e);
          } else {
            setPopUpTitulo(e.nombre);
            setMobileVideoSrc(e.video);
            console.log(e.position);
            setVRPopUpPosition(e);
            videoControl.current.play();
            setPlaying(true);
          }
        };
      case 1:
        return () => {
          if (playing) return;
          setPopUpTitulo(e.titulo);
          setPopUpContenido(e.texto);
          if (!isVR) {
            setOpen(true);
            console.log(e);
          } else {
            setVRPopUpPosition(e);
            setPlaying(true);
          }
        };
      case 2:
        return () => {
          if (playing) return;
          if (e.escena) setEscena(e.escena, proyecto);
          else {
            setPopUpTitulo(e.nombre);
            setPopUpContenido("No hay una escena asociada a este link");
            setOpen(true);
          }
        };
      case 3:
        return () => {
          if (playing) return;
          if (e.imagen) {
            setPopUpTitulo(e.nombre);
            if (!isVR) {
              setPopUpContenido(<img width="100%" src={e.imagen} />);
              setOpen(true);
            } else {
              setVRPopUpImage(e.imagen);
              document.getElementById("imageURL").src = e.imagen;
              setVRPopUpPosition(e);
              setPlaying(true);
            }
          }
        };
      default:
        return null;
    }
  };

  const calcularDistancia = (a, b) => {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const setFileData = (data) => {
    setProyecto({ ...data });
    let escenaPrincipal = data.escenas.find((e) => e.principal);
    if (escenaPrincipal) setEscena(escenaPrincipal.titulo, data);
    else setEscena(0, data);
  };

  const getProject = async () => {
    if (!location.proyectId) return;
    setCargando(true);
    var a = await fetch(
      "https://codegstudio.com/apps/360/convertir.php?id=" + location.proyectId
    );
    a.json().then((data) => {
      setFileData(data);
      console.log("<<<<<<<<<DATOS DEL PROYECTO OBTENIDOS DEL FILE<<<<<<<<<<");
      console.log(data);
      setCargando(false);
      setAnimateEnabled(data.isAnimated);
      setUrlLink(data.linkUrl);
      setTitulo360Value(data.titulo360);
      setRedesState(data.redesSociales);
      setLinksData(data.otras360);
    });
  };

  const isMobile = () => {
    document.querySelector("a-scene").addEventListener("enter-vr", function () {
      setIsVR(true);
    });

    document.querySelector("a-scene").addEventListener("exit-vr", function () {
      setIsVR(false);
    });

    if (!isMobileXp) {
      cursor.current.setAttribute(
        "cursor",
        "rayOrigin: mouse; fuse: true; fuseTimeout: 100"
      );
      cursor.current.setAttribute("visible", false);
    } else {
      cursor.current.setAttribute("cursor", "fuse: true; fuseTimeout: 100");
      cursor.current.setAttribute(
        "geometry",
        "primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
      );
    }
    camara.current.setAttribute("wasd-controls", { enabled: false });
  };

  const setMouseEvents = () => {
    let rotationSpeed = 0.01;
    let tt = document.getElementById("tooltip");
    window.addEventListener("mousemove", (event) => {
      tt.style.left = event.pageX - 50 + "px";
      tt.style.top = event.pageY - 50 + "px";
    });

    window.addEventListener("wheel", (event) => {
      let delta = event.deltaY || event.detail || event.wheelDelta;
      zoomIn(delta < 0);
    });
    window.addEventListener("touchstart", (event) => {
      distanciaTouch = 0;
      let toques = Array.from(event.touches);
      if (toques.length > 1) {
        distanciaTouch = calcularDistancia(toques[0], toques[1]);
        console.log("toques iniciales", distanciaTouch);
        console.log(
          "toques iniciales",
          calcularDistancia(toques[0], toques[1])
        );
      }
      if (toques.length == 1) {
        touchPos = { x: toques[0].clientX, y: toques[0].clientY };
        console.log("starttouch", {
          x: toques[0].clientX,
          y: toques[0].clientY,
        });
      }
    });

    window.addEventListener("touchend", (event) => {
      let toques = Array.from(event.changedTouches);
      console.log("endtouch", event);
      if (toques.length == 1) {
        if (toques[0].clientX == touchPos.x && toques[0].clientY == touchPos.y)
          tapBackground();
        setDesplegarMenu(prev => !prev);
      }
    });

    window.addEventListener("touchmove", (event) => {
      let toques = Array.from(event.touches);
      if (toques.length > 1) {
        let esAcercamiento =
          distanciaTouch < calcularDistancia(toques[0], toques[1]);
        zoomIn(esAcercamiento);
        console.log("distancia", distanciaTouch);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        camara.current.components["look-controls"].yawObject.rotation.y +=
          rotationSpeed;
      } else if (e.key === "ArrowRight") {
        camara.current.components["look-controls"].yawObject.rotation.y -=
          rotationSpeed;
      } else if (e.key === "ArrowUp") {
        camara.current.components["look-controls"].pitchObject.rotation.x +=
          rotationSpeed;
      } else if (e.key === "ArrowDown") {
        camara.current.components["look-controls"].pitchObject.rotation.x -=
          rotationSpeed;
      }
    });

    window.addEventListener("click", (e) => {
      setAnimateEnabled(false);      
      //setDesplegarMenu(prev => !prev);
      // console.log("showMenuFloat antes de cambiarlo", showMenuFloat);
      // setShowMenuFloat((prev) => {
      //   console.log("showMenuFloat adentro de setShowMenu es: ", prev);
      //   return !prev;
      // });
    });

    /*window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
              this.rotateLeft = false;
            } else if (e.key === 'ArrowRight') {
              this.rotateRight = false;
            }
          });*/
  };

  const cerrarPopUp = () => {
    setOpen(false);
    if (iframe.current) iframe.current.src = "";
    setPopUpContenido(null);
    setPlaying(false);
    setMobileVideoSrc("");
    document.getElementById("imageURL").src = "";
    setVRPopUpImage(null);
  };

  const tapBackground = () => {
    setDesplegarMenu(prev => !prev);
    let escenasContainer = document.getElementById("escenasContainer");
    escenasContainer.classList.add("hidden-scenes");
    console.log("tapBackground", timeOutClick);

    // if (timeOutClick) return;
    // let banner = document.getElementById("banner");
    // let escenasContainer = document.getElementById("escenasContainer");
    // banner.classList.remove("hidden-menu");
    // let to = setTimeout(() => {
    //   console.log("intervalo");
    //   let banner = document.getElementById("banner");
    //   if (
    //     banner &&
    //     banner.classList &&
    //     !banner.classList.contains("hidden-menu")
    //   ) {
    //     banner.classList.add("hidden-menu");
    //     escenasContainer.classList.add("hidden-scenes");
    //   }
    //   setTimeOutClick(null);
    // }, 1000);
    // setTimeOutClick(to);
  };

  const viewScenasShortcut = () => {
    let escenasContainer = document.getElementById("escenasContainer");
    escenasContainer.classList.remove("hidden-scenes");
  };

  const showTooltip = (e) => {
    let tt = document.getElementById("tooltip");
    tt.classList.remove("hidden");
    tt.innerHTML = e.nombre;
    //tt.style.left =
    /*
        tt.setAttribute('visible', true);
        tt.setAttribute('text', 'value', e.nombre);
        //setVRPopUpPosition(e, 'tooltip')
        tt.setAttribute('position', `${e.position.x-2} ${e.position.y} ${-12}`);*/
  };

  const hideTooltip = (e) => {
    let tt = document.getElementById("tooltip");
    tt.classList.add("hidden"); /*
        tt.setAttribute('visible', false);*/
  };

  useEffect(() => {
    console.log("[PLAYER-VIEW]:::EFFECT", !location.proyectId);
    setMouseEvents();
    getProject();
    isMobile();
    ReactGA.event({
      category: 'User', 
      action: 'onLoadExperience',
      data: {
        user_rol: 'visitor',
      }
    });
    document.addEventListener("click", handleCardRelacionadas);
    
  }, []);

  useEffect(() => {
    console.log("ANIMACION HABILITADA?", animateEnabled);
  }, [animateEnabled]);

  return (
    
      <>
        {" "}
        <LoadingSpin visible={cargando} />
        <OpenProject visible={!location.proyectId} setFileData={setFileData} />
        <PopUpMsg
          visible={open}
          titulo={popUpTitulo}
          contenido={popUpContenido}
          alCerrar={cerrarPopUp}
        />
        <EscenasMenu
          escenas={proyecto ? proyecto.escenas : []}
          setEscena={(e) => setEscena(e, proyecto)}
        />
        <div id="tooltip" className="hidden"></div>
        {!cargando && proyecto && !open && !playing && (
          <div id="banner" className="hidden-menu">
            {/* <div
              className="controlbutton"
              id="zoominbutton"
              onClick={() => zoomIn(true)}
            ></div>
            <div
              className="controlbutton"
              id="zoomoutbutton"
              onClick={() => zoomIn(false)}
            ></div> */}
            {/* <div
              className="controlbutton"
              id="fullscreenbutton"
              onClick={setFullscreen}
            ></div> */}
            {/* <div
              className="controlbutton"
              id="linkbutton"
              onClick={handleClickLinkButton}
            ></div> */}
            {/* <div
              className="controlbutton"
              id="vrbutton"
              ref={vrbutton}
              onClick={setVR}
              style={{ display: isMobileXp ? "block" : "none" }}
            ></div> */}
            {/* <div
              className="controlbutton"
              id="shortcutbutton"
              ref={vrbutton}
              onClick={viewScenasShortcut}
            >
              <ApartmentOutlined style={{ fontSize: 45 }} />
            </div> */}
          </div>
        )}
        <a-scene
          ref={escena}
          onMouseDown={(e) => {
            if (e.clientX != undefined)
              setMousePos({ x: e.clientX, y: e.clientY });
          }}
          onMouseUp={(e) => {
            if (
              e.clientX != undefined &&
              e.clientX == mousePos.x &&
              e.clientY == mousePos.y
            )
              tapBackground();
          }}
        >
          <a-assets>
            <img id="plus" src={info} alt="plus" />
            <img id="gafas" src={gafas_white} alt="gafas" />
            <img id="playvideo" src={video} alt="playvideo" />
            <img id="image" src={image} alt="image" />
            <img id="imageURL" src="" alt="imageURL" />
            <video
              ref={videoControl}
              id="videocontrol"
              width="100%"
              src={mobileVideoSrc}
              controls
              autoPlay
            />
          </a-assets>
          <a-sky
            ref={cielo}
            id="cielo"
            src={
              proyecto && proyecto.escenas.length
                ? proyecto.escenas[escenaIndex].fondo
                : ""
            }
            rotation="0 90 0"
            material="opacity: 1; transparent:true"
            animation__fade_in="property: material.opacity; from: 0; to: 1; dur: 1500; startEvents: fadein"
            animation__fade_out="property: material.opacity; from: 1; to: 0; dur: 500; startEvents: fadeout"
          />
          <a-camera
            id="camara"
            ref={camara}
            animation={`property: rotation; from: 0 0 0; to: 0 360 0; dur: 800000; loop: true; easing:linear; enabled: ${animateEnabled};`}
          >
            <a-cursor
              position="0 0 -1"
              id="cursor"
              ref={cursor}
              cursor="fuse: true; fuseTimeout: 100"
              raycaster="objects: .objeto"
              material="shader:flat; color:white"
            />
          </a-camera>
          <a-mixin
            id="msg-button"
            geometry="primitive: circle; radius:2;"
            animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
            animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
            material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #plus; side: double"
            clickeable
          ></a-mixin>
          <a-mixin
            id="view-button"
            geometry="primitive: circle; radius:5;"
            material="opacity: 1; transparent:true; shader: flat; src: #gafas; side: double"
            animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
            animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
            animation="property: rotation; dur:3000; to: 0 360 0; easing:linear; loop:true"
            clickeable
          ></a-mixin>
          <a-mixin
            id="video-button"
            geometry="primitive: circle; radius:1;"
            material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #playvideo; side: double"
            animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
            animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
            border="sides: 4; radius: 25; wall: #rail;"
            clickeable
          ></a-mixin>
          <a-mixin
            id="image-button"
            geometry="primitive: circle; radius:1;"
            material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #image; side: double"
            animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
            animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
            border="sides: 4; radius: 25; wall: #rail;"
            clickeable
          ></a-mixin>
          <a-plane
            id="player"
            width="42"
            height="32"
            look-at="#camara"
            position={mobilePlayerPos}
            visible={playing}
          >
            <a-entity
              position="1.5 8.5 10"
              text={
                "shader: msdf; anchor: center; width: 30; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: black; value: " +
                popUpTitulo
              }
            />
            {!popUpContenido && !VRPopUpImage && (
              <a-video
                src="#videocontrol"
                width="37"
                height="23"
                rotation="0 0 0"
                position="0 0 1"
                visible={!popUpContenido && !VRPopUpImage}
                border="sides: 4; radius: 25; wall: #rail;"
              ></a-video>
            )}
            {VRPopUpImage && (
              <Entity
                width="37"
                height="23"
                rotation="0 0 0"
                position="0 0 1"
                visible={VRPopUpImage}
                geometry="primitive: plane; height: 23; width: 37"
                material="shader: flat; src: #imageURL; side: double"
                border="sides: 4; radius: 25; wall: #rail;"
              ></Entity>
            )}
            {popUpContenido && (
              <Entity
                position="-12.5 2.5 10"
                visible={popUpContenido}
                text={
                  popUpContenido
                    ? "shader: msdf; anchor: left; width: 25; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: black; value: " +
                      popUpContenido
                    : ""
                }
              />
            )}
            <Entity
              position="8 -10 10"
              className="objeto"
              animation__scale="property: scale; to: 1.5 1.5 1.5; dur: 200; startEvents: mouseenter"
              animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
              text="shader: msdf; anchor: left; width: 20; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: black; value: ok"
              events={{
                click: cerrarPopUp,
              }}
            />
          </a-plane>
          {/*<Entity
              id="tooltip"
              visible={false}
              text="shader: msdf; anchor: left; width: 40; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: ok"
                  />*/}
          {proyecto && proyecto.escenas.length
            ? proyecto.escenas[escenaIndex].elementos.map((e, k) => (
                <Entity
                  key={k}
                  position={`${e.position.x} ${e.position.y} ${e.position.z}`}
                  rotation={`${e.rotation.x} ${e.rotation.y} ${e.rotation.z}`}
                  mixin={getTipo(e)}
                  id={e.id}
                  className="objeto"
                  visible={!playing}
                  events={{
                    click: getFunction(e),
                    mouseenter: (s) => showTooltip(e),
                    mouseleave: () => hideTooltip(e),
                  }}
                />
              ))
            : ""}
        </a-scene>
        {showAlertLink && (
          <Alert
            id="alertLink"
            message={alertErrorMessage.titulo}
            description={alertErrorMessage.mensaje}
            type="error"
            style={{ opacity: 0.4 }}
          />
        )}
        <h1 class="titleExperiencia">{titulo360Value}</h1>
      
        {desplegarMenu && (<div
            className={`animate__animated ${
              showMenuFloat ? "animate__fadeIn" : "animate__fadeOut"
            }`}
      
            >
          <MenuComponent
            id="menuFlotante"
            handleLinkButton={handleClickLinkButton}
            handleOptionButton={handleClickOptionButton}
            handleClickPlusButton={handleClickPlusButton}
            handleClickMinusButton={handleClickMinusButton}
            handleClickFullScreenButton={handleClickFullScreenButton}
            handleClickScenesButton={handleClickScenesButton}
            desplegarMenu={desplegarMenu}
            setDesplegarMenu={setDesplegarMenu}
            isMobile={isMobileXp}
            setVR = {setVR}
          />
        </div>)}
        
        <MenuOtras
          // id="menuFlotanteOtras"
          handleLinkButton={handleClickLinkButton}
          // handleOptionButton={handleClickOptionButton}
         />
         <Visitas />         
        <MenuRedes />
        <div ref={menuEnlacesOtrasRef}>
          <MenuEnlaces handleLinkButton={handleNavigateRelated} data={linksDataState} handleShowFromPadre={handleCardRelacionadas} desplegarCard={desplegarCard}/>
        </div>

        {/* <div style={{display: "block"}}>
          <CardCar />
        </div> */}
        <MenuEscenas
        handleClickScenesButton={handleClickScenesButton}
        >          
        </MenuEscenas>
         
      
      </>
    
  );
}
