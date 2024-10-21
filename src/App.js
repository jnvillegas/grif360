import React, { useState } from 'react';
import './App.css';
import { GoogleApi } from './components/googleApi';
import Routes from './routes.js';

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(JSON.parse(localStorage.getItem('user')));
  const [googleAPI] = useState(new GoogleApi(setUsuarioActivo));

  /*const prueba = () => {
    fetch('https://lh3.googleusercontent.com/d/1HiOPKRAg8Dpgs9eEIFL2g9qCmrgX3QtC?authuser=0')
      .then( x => 
          x.blob()
          .then(y => {
              var urlCreator = window.URL || window.webkitURL;
              var imageUrl = urlCreator.createObjectURL(y);
              console.log(imageUrl)
              var a = document.createElement('img');
              a.src = imageUrl;
              document.getElementsByClassName('App')[0].appendChild(a)
            }) 
          )
  }*/
  setInterval(() => {
    if (!usuarioActivo) return;

    /*let expires_at = usuarioActivo.c2.value.xc.expires_at;
    let hora_actual = new Date();
    if ((expires_at - hora_actual) < 0){
      googleAPI.logOut();
    }
    console.log('check token', expires_at - hora_actual);*/
    
  }, 5000);
  return (
    <div className="App">      
      <Routes googleAPI={googleAPI} usuarioActivo={usuarioActivo} setUsuarioActivo={setUsuarioActivo} />
    </div>
  );
}

export default App;

