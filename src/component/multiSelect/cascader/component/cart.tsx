import {
  CloseOutlined,
  EditOutlined,
  UnorderedListOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import Store, { Option } from "../cascader.store";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import "./card.css";
const myCard = observer((props: any) => {
  const store = useContext(Store);
  const [flag, setFlag] = useState<Option>(); //标记点击的那一条
  const [title, setTitle] = useState(props.title); //title的值
  const [titleShow, setTitleShow] = useState(false); //title部分input框的显示控制
  const [refresh, setRefresh] = useState(true); //组件强制刷新
  const DragHandle = SortableHandle(() => (
    <span>
      <UnorderedListOutlined />
    </span>
  ));
  const SortableItem = SortableElement(({ item, index }: any) => {
    return (
      <div
        key={index}
        className="item"
        onClick={(e) => {
          e.stopPropagation();
          props.handleSChange && props.handleSChange(item);
          setFlag(item);
        }}
        style={{
          backgroundColor: flag === item ? "rgba(146, 197, 255, 0.5)" : "",
        }}
      >
        <div className="itemLeft">
          <span className="icon">
            <DragHandle></DragHandle>
          </span>
          <p
            className="noIcon"
            style={{
              width: "14px",
            }}
          ></p>
        </div>
        {flag !== item ? (
          <span
            className="showMessage message"
          >
            {item.value}
          </span>
        ) : (
          <input
            className="handleMessage message"
            type="text"
            autoFocus
            defaultValue={item.value}
            onBlur={(e) => {
              let val = e.target.value;
              store.changeVal(item, val);
            }}
          />
        )}
        <div className="itemRight">
          <span className="delete">
            <CloseOutlined
              onClick={(e) => {
                e.stopPropagation();
                store.del(props.data, item);
                setRefresh(!refresh);
                props.handleChildData(item)  //删除的时候更新子级的数据
              }}
            />
          </span>
          <div className="next">
            {flag !== item ? (
              <p
                style={{
                  width: "14px",
                }}
              ></p>
            ) : (
              <span className="next">
                <RightOutlined />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  });
  const SortableList = SortableContainer(({ items }: any) => {
    return (
      <div>
        {items &&
          items.map((value: Option, index: number) => {
            return <SortableItem key={index} index={index} item={value} />;
          })}
      </div>
    );
  });
  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    //拖动后的排序
    let middle: Option[];
    if (oldIndex < newIndex) {
      middle = props.data[oldIndex];
      for (let i = oldIndex; i <= newIndex; i++) {
        props.data[i] = props.data[i + 1];
      }
      props.data[newIndex] = middle;
    }
    if (oldIndex > newIndex) {
      middle = props.data[oldIndex];
      for (let i = oldIndex; i >= newIndex; i--) {
        props.data[i] = props.data[i - 1];
      }
      props.data[newIndex] = middle;
    }
    setRefresh(!refresh);
  };
  return (
    <div>
      <Card
        title={title}
        extra={
          <EditOutlined
            onClick={() => {
              setTitleShow(!titleShow);
            }}
          />
        }
        style={{
          position: "relative",
        }}
        className="card"
      >
        <input
          type="text"
          autoFocus={true}
          style={{
            display: titleShow ? "block" : "none",
          }}
          className="inputTitle"
          onBlur={(e) => {
            let val = e.target.value;
            if (!val) {
              setTitleShow(false);
              return;
            } else {
              setTitle(val);
              setTitleShow(false);
            }
          }}
        />
        <div className="box">
          <div className="optionList">
            <SortableList
              items={props.data}
              onSortEnd={onSortEnd}
              distance={5} //拖动达到5px才会触发插件的内部事件，解决选项不能点击的问题
            ></SortableList>
            
          </div>
          <div className="cardFooter">
            <Button
              onClick={() => {
                store.add(props.data, "default value");
                setRefresh(!refresh);
              }}
            >
              添加选项
            </Button>
            <span
              onClick={() => {
                props.handleVisible(true, props.data); //控制批量操作框的显示和隐藏
              }}
            >
              批量操作
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
});
export default myCard;
