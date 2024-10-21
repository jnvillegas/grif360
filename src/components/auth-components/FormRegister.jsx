import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, Switch } from 'antd';
import { AuthContext } from '../../context/auth-context/AuthContext';
import "../controles.css"


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// const initialState = {
//       userId: null,
//       username: null, 
//       token: null,
//       refreshToken: null,
// }
const initialState = {        
        username: null, 
        password:null,
        email: null,
        subscription: 'Free',
        subscriptionStatus: 'Active'

  }

const FormRegister = ({handleCloseModal, setIsRegister}) => { 
  const [user, setUser] = useState(initialState)
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)
  const {login} = useContext(AuthContext);

  const base_url = "https://metaverso.griftin.com.ar/app/v1";

  const fetchRegistry = useCallback(
    async() => {
      setisLoading(true);
      try {
        // const res = await fetch(`${base_url}/users/login`, {
        //   body: JSON.stringify(user),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   method: "POST",
        // });
        // console.log("RES EN LOGIN", res)

        // if (!res.ok) {
        //   const message = `Error al obtener token: ${res.status}`;
        //   throw new Error(message);
        // }
        // const data = await res.json();
        //const userToken = data.token
        console.log("Data para el post",user)
        
        
        // const newAuthState = {
        //   logged: true,
        //   username: data.username,
        //   token: userToken,
        //   idUser: data.user__id
        // }
        //accion de login en el contexto
        //login({type: types.login, payload: newAuthState})        
        //guardamos el estado de login en el localStorage
        //localStorage.setItem("authState", JSON.stringify(newAuthState))


        setSuccess(true);
        setInterval(() => {
          setSuccess(false);
          handleCloseModal(false);
        }, 1000);
        
      } catch (error) {
        console.log(error)
      }finally {
        setisLoading(false);
      }
      
    },
    [user],
  )

const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value
  })
  console.log(user)
}

  const handleSubmit = (e) => {
    //e.preventDefault();    
    console.log("data del formulario",user)
    fetchRegistry();

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



return (
  <div className="modal-content">
    <h3 style={{textAlign: "center"}}>Formulario de Registro</h3>
    <Form 
      title='Register'
      name="registerForm"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete='off'
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      >

<Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <input
          className="input"
          type="text"
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
           />
    </Form.Item>
    
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
    </Form.Item>

    <Form.Item
      label="email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Por favor ingrese su email!',
        },
      ]}
    >
      <input
          className="input"
          type="text"
          placeholder="email"
          name="email"
          value={user.email}
          onChange={handleChange}
           />
    </Form.Item>

    <Form.Item
      label="Subsription"
      name="subsription"
      rules={[
        {
          required: true,
          message: 'Ingrese la suscripción!',
        },
      ]}
    >
      <input
          className="input"
          type="text"
          placeholder="subscription"
          name="subscription"
          value={user.subscription}
          onChange={handleChange}
           />
    </Form.Item>

    <Form.Item
      label="Status"
      name="status"
      rules={[
        {
          required: true,
          message: 'Ingres el status de suscripción',
        },
      ]}
    >
      <input
          className="input"
          type="text"
          placeholder="Subscription Status"
          name="subscriptionStatus"
          value={user.subscriptionStatus}
          onChange={handleChange}
           />
    </Form.Item>
    
    
    

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Crear Cuenta
      </Button>
    </Form.Item>

    <Form.Item
      name="changeMode"
      valuePropName="exist"
      wrapperCol={{
        offset: 3,
        span: 16,
      }}
    >
        <Space direction="vertical">
            <span>Ya tiene una cuenta?</span>
            <Switch defaultChecked={false} checkedChildren="开启" unCheckedChildren="login" onChange={() => {setIsRegister(false)}} />

        </Space>
    </Form.Item>


    

    </Form>
  </div>
  )
};

export default FormRegister;