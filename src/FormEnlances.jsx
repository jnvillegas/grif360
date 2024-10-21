import React, { useCallback, useEffect, useRef, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select, Space } from "antd";

import { Option } from "antd/es/mentions";
import { ModalPortal } from "./components/ModalPortal";


const initialState = [  
{
  icono:"auto",
  titulo: "Automovil",
  url: "https://agnnissan.com.ar/vehiculos/autos/sentra-2/",
  imagen: "https://agnnissan.com.ar/wp-content/uploads/2024/03/nissan-nuevo-nissan-versa-bl.jpg",
},
{
  icono:"camioneta",
  titulo: "Nissan Kicks",
  url: "https://agnnissan.com.ar/vehiculos/autos/x-trail-e-power/",
  imagen: "https://agnnissan.com.ar/wp-content/uploads/2024/03/nissan-kicks.png",
},];

export const FormEnlances = ({ enlaces = [], setEnlaces, handleSubmitEnlaces }) => {

  const firstRender = useRef(true)
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false)
  const [listaLocal, setListaLocal] = useState(enlaces || [])

  // const getModalConfirmation = new Promise((resolve, reject) => {
  //   setConfirmAction(false)
  //   resolve(true)
  // })

  const iconsList = [
    "auto",
    "camioneta",
    "habitacion",
    "casa"
  ]
  

  const onFinish = (values) => {    
    // setShowPortalModal(true);    
    setListaLocal([...values.listadoEnlaces]);            
    
      console.log("Estado de Lista Local en FormEnlances: ", listaLocal);
    
    handleSubmitEnlaces(values.listadoEnlaces);
    
    
    if(confirmAction) {      
      
    }
  };  


  return (
    <>
      {/* <Title level={5}>Formulario de Enlaces</Title> */}
      <Form
        name="links-form"
        onFinish={onFinish}
        initialValues={{
          listadoEnlaces: enlaces,}}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.List name="listadoEnlaces">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Divider orientation="left"  plain>
                    <b><u>Datos de Enlace:</u></b>
                  </Divider>
                  <Form.Item
                    {...restField}
                    name={[name, "icono"]}
                    rules={[
                      {
                        required: true,
                        message: "el icono es obligatorio",
                      },
                    ]}
                    label="Icono"
                  >
                    <Select
                      placeholder="seleccione un icono"
                      onChange={() => {}}
                      allowClear
                    >
                      {iconsList.map((icon, index) => (
                        <Option key={index} value={icon}>
                          {icon}
                        </Option>
                      ))}                      
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "titulo"]}
                    rules={[
                      {
                        required: true,
                        message: "el titulo es obligatorio",
                      },
                    ]}
                    label="Titulo"
                  >
                    <Input placeholder="titulo del enlace" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "url"]}
                    rules={[
                      {
                        required: true,
                        message: "la url es obligatoria",
                      },
                    ]}
                    label="Url"
                  >
                    <Input placeholder="url del enlace" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "imagen"]}
                    rules={[
                      {
                        required: true,
                        message: "la imagen es obligatoria",
                      },
                    ]}
                    label="Imagen"
                  >
                    <Input placeholder="imagen del enlace" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>          
          <Button type="primary" htmlType="submit">
            Confirmar Datos
          </Button>
        </Form.Item>
      </Form>
      <ModalPortal  showModal={showPortalModal} setShowModal={setShowPortalModal} setConfirmAction={setConfirmAction}  />
    </>
  );
};
