import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Form,  Space, Switch } from "antd";
import { AuthContext } from "../../context/auth-context/AuthContext";
import "../controles.css";
import LoadingSpin from "../loadingSpin";
import ModalSinPortal from "../../core/components/ModalSinPortal";



const base_url = process.env.REACT_APP_BASE_URL;

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// const initialState = {
//       userId: null,
//       username: null,
//       token: null,
//       refreshToken: null,
// }
const initialState = {
  username: null,
  password: null,
};

const FormLogin = ({ handleCloseModal, setIsRegister }) => {
  const [user, setUser] = useState(initialState);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { login, logout } = useContext(AuthContext);
  const [dataModal, setDataModal] = useState({
    titulo: "",
    mensaje: "",
  })

  //const base_url = "https://metaverso.griftin.com.ar/app/v1";
  //const base_url = "http://127.0.0.1:3001/app/v1/";

  
  const fetchLogin = useCallback(async () => {
    setisLoading(true);    
    try {
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NDU4ZmRjMC1jMmIwLTRiY2UtYWQ5Ni1lZWJlZWQzYTJkNWIiLCJpYXQiOjE3MjY3NTc2MTMsImV4cCI6MTcyNjc1ODUxM30.SZ2iMcshWbG5KaMsAJoTtyJeNvEiLamH5Hh9eYDTkgY"
      const test = await fetch(`${base_url}`,{
        headers: {
          "Content-Type": "application/json",          
        },
      });
      console.log("test", test);
      if (!test.ok) {
        const message = `Error : ${test.status}`;
        throw new Error(message);
      }
      const testRes = await test.json();
      console.log("testRes", testRes);
      console.log(user)

      const res = await fetch(`${base_url}/users/login`, {
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"        
        },
        method: "POST",
      });
      
      console.log("RES: ", res);
      if (!res.ok) {
        const message = `Error : ${res.status}`;
        throw new Error(message);
      }
      const data = await res.json();
      console.log("Response on login: ", data);
      //const userToken = data.token
      

      const newAuthState = {
        isLogged: true,
        username: data.userProfile.firstName,
        token: data.auth.access,
        refreshToken: data.auth.refresh,
        userId: data.userProfile.id,
      }
      //accion de login en el contexto
      login(newAuthState)

      //guardamos el estado de login en el localStorage
      localStorage.setItem("authState", JSON.stringify({
        griftin_token: data.auth.access,
        griftin_refresh_token: data.auth.refresh,
        griftin_userId: data.userProfile.id,
        griftin_username: data.userProfile.firstName
      }))

      setSuccess(true);
      setDataModal({ titulo: "Login exitoso", mensaje: `Bienvenido/a ${data.userProfile.firstName}` });
      setShowModal(true);
      setInterval(() => {
        //setSuccess(false);
        setShowModal(false);
        handleCloseModal(false);
      }, 3000);
    } catch (error) {
      setSuccess(false);
      setError(true);
      setDataModal({ titulo: "Error en Login", mensaje: 'Controle su usuario y clave por favor...' });
      setShowModal(true);
    } finally {
      setisLoading(false);

      //es solo para prueba
      //handleCloseModal(false);
    }
  }, [user]);

  

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    //console.log(user)
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    console.log("data del formulario", user);
    fetchLogin();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="modal-content">
      <h3 style={{ textAlign: "center" }}>Formulario de Login</h3>
      <LoadingSpin visible={isLoading} />
      <Form
        name="loginForm"
        title="Login"
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
        autoComplete="off"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
              message: "Please input your password!",
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
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
          {/* <Space direction="vertical">
            <span>No tiene Cuenta?</span>
            <Switch
              defaultChecked
              checkedChildren="register"
              unCheckedChildren="login"
              onChange={() => {
                setIsRegister(true);
              }}
            />
          </Space> */}
        </Form.Item>
      </Form>
      <ModalSinPortal titulo={dataModal.titulo} mensaje={dataModal.mensaje} setIsVisible={setShowModal} isVisible={showModal} success={success}/>
    </div>
  );
};

export default FormLogin;
