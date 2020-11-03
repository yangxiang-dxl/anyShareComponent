import React from "react";
import { action, computed, observable, toJS } from "mobx";
export interface Option {
  value: string;
  label?: string;
  children?: Option[];
}
class Stores {
  @observable num: number = 2;
  @observable datas: Option[] = [
  ];
  @observable secoundData:Option [] |undefined = undefined 
  @observable thirdData:Option [] |undefined = undefined 
  @observable fourthData:Option [] |undefined = undefined 

  @action handleSChange = (n?: Option) => {  //改变二级选项数据清空三级和四级的数据
    // !n?.children&&n?.children = [];
    this.secoundData = n?.children
    this.thirdData = undefined
    this.fourthData = undefined
  };
  @action handleTChange = (n?: Option) => {  //改变三级选项的数据清空四级的数据
    this.thirdData = n?.children
    this.fourthData = undefined
  };
  @action handleFChange = (n?: Option) => { //改变四级的选项数据
    this.fourthData = n?.children
  };
 
  @action add(ori: Option[] | undefined, value: string) { //单个增加
    if (ori)
      ori.push({
        value: value,
        label: value,
        children: [],
      });
    console.log(this.datas);
  }
  @action multiAdd(ori: Option[], arr: string[]) {//批量增加
    console.log(toJS(arr))
    arr.map((item: string) => {
      if (item.trim() !== "")
        ori.push({
          value: item,
          label: item,
          children: [],
        });
    });
  }
  @action changeVal(ori: Option, value: string) {//编辑选项input
    ori.value = value;
  }

  @action del(ori: Option[] | undefined, item: Option) { //删除
    //删除自己的children
    delete item.children
    let index:number = -1
    if(ori){
       for(let i =0 ; i < ori?.length ; i++){
      if(ori[i]===item){
       index = i
      }
    }
    }
    console.log('dkfdlkflkd',toJS(this.datas) )
   if(index!==-1)
    
    ori?.splice(index, 1);
  }

  @computed get colNum() {  //计算列数
    return Math.floor(24 / this.num);
  }
  @computed get modalWidth() {//计算ModalWidth
    return this.num * 240 + 64;
  }
}
export default React.createContext(new Stores());
