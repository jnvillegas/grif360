import { Form, Modal, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from "react";

export default function OpenProject({ visible, setFileData }){

    const [abierto, setAbierto] = useState(visible);
    const [fileContent, setFileContent] = useState(null);
    const [form] = Form.useForm();
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

    const leerArchivo = (file) => {
                      
            const reader = new FileReader();
 
            reader.onload = e => {
                setFileContent(e.target.result);
                //setImagen(e.target.result)
            };
            reader.readAsText(file);
    
            // Prevent upload
            return false;
        }
    


    const props = {
        name: 'file',
        multiple: false,
        showUploadList: true,
        maxCount:1,
        beforeUpload:leerArchivo,
        
    };
    
    return (<><Modal title="Abrir proyecto desde mi computadora:" 
                     open={abierto} 
                     onCancel={null} 
                     onOk={() => {
                        setFileData(JSON.parse(fileContent));                        
                        setAbierto(false)
                     } } 
                     okText="Abrir"
                     cancelButtonProps={{ style: { display: 'none' } }}>
        <Form form={form}
              layout="vertical"
              name="openProjectForm"
              initialValues={{
                    modifier: 'public',
              }}>
            <Form.Item label="Proyecto Griftin 360°">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Arrastre un archivo de proyecto a esta area</p>                        
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </Form>
        </Modal>
    </>);
}