import React from "react";
import { Form, Modal, Col, Row, Input} from 'antd';
import './elementosForm.css'
import video from '../assets/video.jpg'
import escena from '../assets/escena.png'
import info from '../assets/info.png'
import image from '../assets/image.png'

export default function ElementosForm({visible, alCerrar, alAceptar}){    
    const [form] = Form.useForm();
    

    return (<Modal
        open={visible}
        title="Nuevo elemento"
        okText="Crear"
        cancelText="Cancelar"
        onCancel={() => {            
            alCerrar();
          }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              
              alAceptar(values);
              form.resetFields();
              //onCreate(values);
            })
            .catch((info) => {
              console.log('No puede Continuar:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="elementosForm"
          initialValues={{
            modifier: 'public',
          }}
        >
            <Form.Item name="elemento" label="Tipo" rules={[{
                required: true,
                message: 'Seleccione el tipo del Elemento',
            }]}>               
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={6} style={{textAlign:'center'}}>                    
                    <input type="radio" name="elemento" id="videoElement" style={{display:'none'}} value={0}/>
                    <label htmlFor="videoElement"><img alt="" src={video} width={50} height={50}/><br/> Video
                    </label>                
                </Col>
                <Col className="gutter-row" span={6} style={{textAlign:'center'}}>
                    <input type="radio" name="elemento" id="textElement" style={{display:'none'}} value={1}/>
                    <label htmlFor="textElement"><img alt="" src={info} width={50} height={50}/><br/> Info</label>                
                </Col>
                <Col className="gutter-row" span={6} style={{textAlign:'center'}}>
                    <input type="radio" name="elemento" id="imageElement" style={{display:'none'}} value={3}/>
                    <label htmlFor="imageElement"><img alt="" src={image} width={50} height={50}/><br/> Imagen</label>                
                </Col>
                <Col className="gutter-row" span={6} style={{textAlign:'center'}}>
                    <input type="radio" name="elemento" id="escenaElement" style={{display:'none'}} value={2}/>
                    <label htmlFor="escenaElement"><img alt="" src={escena} width={50} height={50}/><br/> Link a Escena</label>                
                </Col>
            </Row>
            </Form.Item>
                
            <Form.Item label="Nombre" name="nombre" rules={[
              {
                required: true,
                message: 'Ingrese el titulo del Elemento',
              },
            ]}>
                <Input/>
            </Form.Item>
          
        </Form>
      </Modal>);
}