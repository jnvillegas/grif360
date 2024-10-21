import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { InfoCircleOutlined } from '@ant-design/icons';
const ModalSinPortal = ({ titulo, mensaje, setIsVisible, isVisible, success }) => {
  
  //const [modalOpen, setModalOpen] = useState(isVisible);
  return (
    <>  
      
      <br />
      <br />      
      <Modal        
         title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InfoCircleOutlined style={{ color:  success ? '#52c41a' : 'red' , marginRight: '20px', fontSize: '60px' }} /> {/* Ícono agregado */}
            {titulo}
          </div>
        }
        styles={{
            header: {
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',                            
            },            
            mask: {
                backdropFilter: 'blur(2px)'
            }
        }}
        centered
        open={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
      >
        <Title level={5} type='normal' style={{ justifyContent: 'center', alignItems: 'center', display: 'flex'}}>{mensaje}</Title>
        
      </Modal>
    </>
  );
};
export default ModalSinPortal;