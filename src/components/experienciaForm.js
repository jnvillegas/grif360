import { Form, Input, Modal } from "antd";
import React from "react";

export default function ExperienciasForm({ visible, alCerrar, alAceptar }){
    const [form] = Form.useForm();

    return (<Modal title="Nueva Experiencia 360°" open={visible} onOk={() => {
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
      }} onCancel={alCerrar}>
                <Form form={form}
                      layout="vertical"
                      name="experienciaForm"
                      initialValues={{
                        modifier: 'public',
                 }}>
                    <Form.Item  name="titulo"
                                label="Titulo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ingrese el titulo de la Experiencia',
                                    },]}>
                                         <Input />                        
                    </Form.Item>
                </Form>
            </Modal>)
}