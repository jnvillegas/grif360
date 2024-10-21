import React, { useEffect, useRef } from "react";
import AFRAME from 'aframe';
import {Entity} from 'aframe-react';
import info from '../assets/info.png'
import gafas_white from '../assets/gafas_white.png'
import video from '../assets/video.jpg'
import image from '../assets/image-icon.png'

export default function T360view ({escena, seleccionarElemento, moverCamara}){

	const camara = useRef(null);

	const getTipo = (e) => {
		switch(e.tipo){
			case 0: return "video-button"; break;
			case 1: return "msg-button"; break;
			case 2: return "view-button"; break;
			case 3: return "image-button"; break;
		}
	}

	useEffect(() => {
		camara.current.setAttribute('wasd-controls', {enabled:false});
		/*try{
		AFRAME.registerComponent('rotation-reader', {
			tick: function () {
				let rotation = this.el.getAttribute('rotation');

				if (rotation.x != escena.inicio.x && rotation.y != escena.inicio.y) {
					console.log('cambio en la', rotation)
				}
			}
		  });}
		  catch(e){

		  }*/
	}, []);

	return <a-scene embedded>
				<a-assets>
					<img id="plus" src={info}/>
					<img id="gafas" src={gafas_white}/>
					<img id="playvideo" src={video}/>
					<img id="image" src={image}/>
					
				</a-assets>
                <a-sky id="cielo" src={escena.fondo}
				   rotation="0 90 0" 
				   material="opacity: 1; transparent:true"
				   animation__fade_in="property: material.opacity; from: 0; to: 1; dur: 1000; startEvents: fadein"
				   animation__fade_out="property: material.opacity; from: 1; to: 0; dur: 1000; startEvents: fadeout"
			    />

				<a-camera id="camara" ref={camara} rotation-reader>
						<a-entity position="0 0 -1" 
								  id="cursor"
								  cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 100"						  
						  		  raycaster="objects: .objeto"						  
								  material="shader:flat"> </a-entity>
				</a-camera>		

				<a-mixin id="msg-button" 
					 geometry="primitive: circle; radius:2;" 
					 animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
					 animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"					 
					 material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #plus; side: double"					  
					 clickeable
					 > 
				</a-mixin>
			
				<a-mixin id="view-button" 
					 geometry="primitive: circle; radius:5;"			  					 
					 material="opacity: 1; transparent:true; shader: flat; src: #gafas; side: double"
					 animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
					 animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"					 					 
					 animation="property: rotation; dur:3000; to: 0 360 0; easing:linear; loop:true"	 
					 clickeable				 
					 > 						 
				</a-mixin>

				<a-mixin id="video-button" 
					 geometry="primitive: circle; radius:1;"			  					 
					 material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #playvideo; side: double"
					 animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
					 animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
					 border='sides: 4; radius: 25; wall: #rail;'					 
					 clickeable				 
					 > 						 
				</a-mixin>

				<a-mixin id="image-button" 
					 geometry="primitive: circle; radius:1;"			  					 
					 material="color: white; opacity: 0.5; transparent: true; shader: flat; src: #image; side: double"
					 animation__scale="property: scale; to: 2.2 2.2 2.2; dur: 200; startEvents: mouseenter"
					 animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
					 border='sides: 4; radius: 25; wall: #rail;'					 
					 clickeable				 
					 > 						 
				</a-mixin>

				{escena.elementos.map((e, k)=><Entity 
											key={k}
											position={`${e.position.x} ${e.position.y} ${e.position.z}`} 
											rotation={`${e.rotation.x} ${e.rotation.y} ${e.rotation.z}`} 
											mixin={getTipo(e)}
											id={e.id}
											class="objeto"
											events={{
														click: (e) => seleccionarElemento(e.target),						
													}}
									 	 />)}
				
			
           </a-scene>
}