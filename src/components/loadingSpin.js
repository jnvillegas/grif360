import { Flex, Spin } from "antd";
import React from "react";

export default function LoadingSpin({ visible }){
    
    return (<Spin spinning={ visible } tip="Cargando..." size="large" fullscreen={ true }><div></div></Spin>)
}