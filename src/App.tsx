import React,{useRef,useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './test/01'
import {Button} from 'antd'
import MyModal from './component/multiSelect'
import { observer } from 'mobx-react';

const  App=()=> {
  return (
    <div className="App">
        <MyModal />
    </div>
  );
}

export default App;
