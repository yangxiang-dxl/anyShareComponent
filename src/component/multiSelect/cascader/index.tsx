import React, { useContext, useEffect, useRef, useState } from "react";
import {  Row, Col, Input, Button, Modal } from "antd";
import { observer } from "mobx-react";
import Stores, { Option } from "./cascader.store";

import "./index.css";

import SCard from "./component/cart";
const YXCascader = observer(() => {
  const store = useContext(Stores);
  const [inputValue, setInputValue] = useState<string>(""); //编辑input框保存的数据
  const [secountData, setSecoundData] = useState<Option[] | undefined>(); //二级选项数据
  const [thirdData, setThirdData] = useState<Option[] | undefined>(); //三级选项数据
  const [fourthData, setFourthData] = useState<Option[] | undefined>(); //四级选项数据
  const [multiHandleData, setMultiHandleData] = useState<Option[]>();
  const [visible, setVisible] = useState(false);
  const textareaRef = useRef<any>();
  const handleSChange = (n?: Option) => {

    //改变二级选项数据清空三级和四级的数据
    setSecoundData(n?.children);
    setThirdData(undefined);
    setFourthData(undefined);
    return n?.children
  };
  const handleTChange = (n?: Option) => {

    //改变三级选项的数据清空四级的数据
    setThirdData(n?.children);
    setFourthData(undefined);
    return n?.children
  };
  const handleFChange = (n?: Option) => {

    //改变四级的选项数据
    setFourthData(n?.children);
    return n?.children
  };

  const handleOk = () => {
    //批量操作 点击ok
    let val = textareaRef.current.value
      .split(/[(\r\n)\r\n]+/)
      .map((item: string) => {
        if (item != null) {
          return item;
        }
      });
    setVisible(false);
    if (multiHandleData) store.multiAdd(multiHandleData, val);
  };
  const handleCancel = () => {
    //modal cancel
    setVisible(false);
  };
  const handleVisible = (n: boolean, currentData: Option[]) => {
    //控制批量操作modal框的显示和隐藏 同时保存批量操作的数据
    setVisible(n);
    setMultiHandleData(currentData);

  };
  return (
    <div className="cascader">
      <Row>
        <Col
          span={store.colNum}
          style={{
            display: store.num >= 2 ? "block" : "none",
          }}
        >
          <SCard
            handleSChange={handleSChange}
            data={store.datas}
            title="一级下拉选项"
            handleVisible={handleVisible}
            handleChildData={handleSChange}
          ></SCard>
        </Col>
        <Col
          span={store.colNum}
          style={{
            display: store.num >= 2 ? "block" : "none",
          }}
        >
          <SCard
            handleSChange={handleTChange}
            data={secountData}
            title="二级下拉选项"
            handleVisible={handleVisible}
            handleChildData={handleTChange}
          ></SCard>
        </Col>

        <Col
          span={store.colNum}
          style={{
            display: store.num >= 3 ? "block" : "none",
          }}
        >
          <SCard
            handleSChange={handleFChange}
            data={thirdData}
            title="三级下拉选项"
            handleVisible={handleVisible}
            handleChildData={handleFChange}
          ></SCard>
        </Col>
        <Col
          span={store.colNum}
          style={{
            display: store.num == 4 ? "block" : "none",
          }}
        >
          <SCard
            data={fourthData}
            title="四级下拉选项"
            handleVisible={handleVisible}
          ></SCard>
        </Col>
      </Row>
      <Modal
        title="批量操作"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width='400px'
      >
        <textarea
          rows={10}
          cols={55}
          placeholder="一行代表一条数据"
          ref={textareaRef}
        ></textarea>
      </Modal>
    </div>
  );
});
export default YXCascader;
