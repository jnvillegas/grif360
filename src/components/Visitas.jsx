import React from 'react';
import { Button, Card, Flex, Typography } from 'antd';
import visitasSvg from '../assets/eye.svg';
import './controles.css';

const Visitas = () => (
  <div
    
    id='visitasComponent'    
  >
    <Flex
        vertical
        align="center"        
        // justify="space-between"
        style={{
          padding: 0,
          margin: 0,          
        }}
        
      >
      <img
        alt="avatar"
        src={visitasSvg} 
        style={{width: 40, height: 40, margin: 0, padding: 0, filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))'}}        
      />
      
        <Typography.Title level={5} style={{fontFamily: 'Spartan', color: 'rgba(255, 255, 255, .4)', margin: 0, padding: 0,filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 1))'}} id='visitas'>
          3582
        </Typography.Title>        
      
    </Flex>
  </div>
);
export default Visitas;