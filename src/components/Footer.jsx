import React from 'react'
import LoadingSpin from './loadingSpin';
import ArchivadasForm from './archivadasForm';

export const Footer = () => {
  return (
    <>
    {/* <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Griftin 360 Designer ©{new Date().getFullYear()}        
        <LoadingSpin visible={loading}/>
        <ArchivadasForm visible={mostrarArchivadasForm} archivadas={usuarioActivo.experiencias??[]} eliminarExperiencia={eliminarExperiencia} alCerrar={() => setMostrarArchivadasForm(false)} alAceptar={(p) => {setProyecto(p); setMostrarArchivadasForm(false)}}/>
        <ExperienciasForm visible={mostrarExperienciaForm} alCerrar={() => setMostrarExperienciaForm(false)} alAceptar={crearExperiencia}/>
        <EscenaForm visible={mostrarEscenaForm} alCerrar={() => setMostrarEscenaForm(false)} alAceptar={addEscena}/>
        <ElementosForm visible={mostrarElementosForm} alCerrar={() => setMostrarElementosForm(false)} alAceptar={addElemento}/>
        <Publicar projectId={proyecto} visible={mostrarPublicar} alCerrar={()=> setMostrarPublicar(false)} />
      </Footer> */}
    </>
  )
}
