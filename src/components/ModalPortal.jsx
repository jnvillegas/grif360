import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import ReactDOM from "react-dom";
import  { useState } from 'react'

export const ModalPortal = ({showModal, setShowModal, setConfirmAction}) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const showModal = () => {
    //   setIsModalOpen(true);
    // };
    const handleOk = () => {
      //setIsModalOpen(false);
      setConfirmAction(true)
      setShowModal(false)
    };
    const handleCancel = () => {
      //setIsModalOpen(false);
      setShowModal(false)
      setConfirmAction(false)
    };
    return ReactDOM.createPortal(
      <>
        <Modal title="Basic Modal" open={showModal} onOk={handleOk} onCancel={handleCancel} >
        <p>Some contents...</p>
        
      </Modal>
      </>,
      document.getElementById('modal')
    );
}
