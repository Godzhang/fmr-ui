import React, { useState } from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Icon from "./components/Icon/icon";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabItem from "./components/Tabs/tabItem";
import Transition from "./components/Transition/transition";
import Input from "./components/Input/input";
import AutoComplete, {
  DataSourceType,
} from "./components/AutoComplete/autoComplete";
import Select from "./components/Select/select";
import Option from "./components/Select/option";

function App() {
  const [showTransition, setTransition] = useState(false);
  // autocomplete
  // const list = ["zhangqi", "chuquwan"];
  // const fetchSuggestions = (keyword: string) =>
  //   list
  //     .filter((item) => item.includes(keyword))
  //     .map((item) => ({ value: item }));
  interface LakerProps {
    value: string;
    number: number;
  }
  const list = [
    { value: "zhangqi", number: 1 },
    { value: "chuquwan", number: 2 },
  ];
  const fetchSuggestions = (keyword: string) => {
    return list.filter((item) => item.value.includes(keyword));

    // return new Promise<DataSourceType[]>((resolve) => {
    //   setTimeout(() => {
    //     const result = list.filter((item) => item.value.includes(keyword));
    //     resolve(result);
    //   }, 3000);
    // });

    // return fetch("")
    //   .then((res) => res.json())
    //   .then((res) => ({ value: res.name, ...res }));
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerProps>;
    return `Name: ${itemWithNumber.value} - ${itemWithNumber.number}`;
  };

  const selectOptions = ["maike", "cuifu", "fulankelin"];

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Select</h1>
      <Select
        defaultValue="maike"
        onChange={(v) => console.log(v)}
        onVisibleChange={(v) => console.log(v)}
      >
        {selectOptions.map((option, oi) => (
          <Option key={option} value={option} disabled={oi === 1}>
            {option}
          </Option>
        ))}
      </Select>
      <br />
      <hr />
      <br />
      <h1>AutoComplete</h1>
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        onSelect={(item) => console.log(item)}
        style={{ marginBottom: "10px" }}
      />
      <p>问题：如果是自定义选项，点击后应该渲染自定义选项内容</p>
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        onSelect={(item) => console.log(item)}
        renderOption={renderOption}
      />
      <br />
      <hr />
      <br />
      <h1>Input</h1>
      <Input style={{ marginBottom: "10px" }} placeholder="请输入姓名" />
      <Input style={{ marginBottom: "10px" }} placeholder="disabled" disabled />
      <Input style={{ marginBottom: "10px" }} placeholder="readonly" readOnly />
      <Input
        style={{ marginBottom: "10px" }}
        value="zhangqi"
        prepend="prepend"
        append="append"
        onChange={(e) => console.log(e.target.value)}
      />
      <Input
        style={{ marginBottom: "10px" }}
        value="zhangqi"
        icon="coffee"
        prepend="prepend"
        size="lg"
        onChange={(e) => console.log(e.target.value)}
      />
      <br />
      <hr />
      <br />
      <h1>Transition test</h1>
      <Button onClick={() => setTransition(!showTransition)}>show test</Button>
      <Transition in={showTransition} timeout={300} animation="zoom-in-top">
        <p>transition test</p>
      </Transition>
      <Transition in={showTransition} timeout={300} animation="zoom-in-top">
        <Alert
          message="alert default"
          description="alert description"
          closable
        ></Alert>
      </Transition>
      <br />
      <hr />
      <br />
      <h1>Icon</h1>
      <Icon icon="coffee" theme="primary" size="5x" />
      <Icon icon="coffee" theme="secondary" size="5x" />
      <Icon icon="coffee" theme="success" size="5x" />
      <Icon icon="coffee" theme="info" size="5x" />
      <Icon icon="coffee" theme="warning" size="5x" />
      <Icon icon="coffee" theme="danger" size="5x" />
      <Icon
        icon="coffee"
        theme="light"
        size="5x"
        style={{ backgroundColor: "#333" }}
      />
      <Icon icon="coffee" theme="dark" size="5x" />
      <br />
      <hr />
      <br />
      <h1>Tabs</h1>
      <Tabs defaultActiveKey={0} onChange={(key) => console.log(key)}>
        <TabItem label="tab_1">123</TabItem>
        <TabItem label="tab_2">
          456456456456456456456456456456456 456456456456456456456456456456456
          456456456456456456456456456456456 456456456456456456456456456456456
          456456456456456456456456456456456 456456456456456456456456456456456
          4564564564564564564564564564564564564564564564564
          5645645645645645645645645645645645645645645645645645645656456456456456456456456456456456456
          456456456456456456456456456456456456456456456456456456456456456456456456456456456456456
        </TabItem>
        <TabItem label="tab_3" disabled>
          789
        </TabItem>
      </Tabs>
      <br />
      <Tabs defaultActiveKey={0} type="card">
        <TabItem label="tab_1">123</TabItem>
        <TabItem label="tab_2" disabled>
          456
        </TabItem>
        <TabItem label="tab_3">789</TabItem>
      </Tabs>
      <br />
      <Tabs defaultActiveKey={0}>
        <TabItem label={<i>custom label</i>}>custom label</TabItem>
        <TabItem
          label={
            <div>
              <Icon
                icon="coffee"
                theme="primary"
                style={{ marginRight: "5px" }}
              />
              coffee
            </div>
          }
        >
          coffee
        </TabItem>
        <TabItem label="tab_3">789</TabItem>
      </Tabs>
      <br />
      <hr />
      <br />
      <h1>Menu</h1>
      <Menu
        defaultIndex="0"
        onSelect={(index) => console.log(index)}
        defaultOpenSubMenus={["3"]}
      >
        <MenuItem>item_1</MenuItem>
        <MenuItem disabled>item_2</MenuItem>
        <MenuItem>item_3</MenuItem>
        <SubMenu title="submenu_1">
          <MenuItem>dropmenu_1</MenuItem>
          <MenuItem>dropmenu_2</MenuItem>
        </SubMenu>
      </Menu>
      <br />
      <Menu
        defaultIndex="0"
        onSelect={(index) => console.log(index)}
        mode="vertical"
        defaultOpenSubMenus={["3"]}
      >
        <MenuItem>item_1</MenuItem>
        <MenuItem disabled>item_2</MenuItem>
        <MenuItem>item_3</MenuItem>
        <SubMenu title="submenu_1">
          <MenuItem>dropmenu_1</MenuItem>
          <MenuItem>dropmenu_2</MenuItem>
        </SubMenu>
      </Menu>
      <br />
      <hr />
      <br />
      <h1>Alert</h1>
      <Alert message="alert default"></Alert>
      <Alert message="alert success" type="success"></Alert>
      <Alert message="alert danger" type="danger"></Alert>
      <Alert message="alert warning" type="warning"></Alert>
      <br />
      <Alert message="alert default" description="alert description"></Alert>
      <Alert message="alert default" closable data-index="1"></Alert>
      <Alert
        message="alert defaultalert defaultalert defaultalert defaultalert defaultalert defaultalert defaultalert defaultalert defaultalert defaultalert default"
        description="alert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert descriptionalert description"
        closable
      ></Alert>
      <br />
      <hr />
      <br />
      <h1>Button</h1>
      <Button>button</Button>
      <Button disabled>button disabled</Button>
      <Button btnType="primary" size="lg">
        button large
      </Button>
      <Button btnType="danger" size="sm">
        button small
      </Button>
      <Button btnType="link" href="https://www.baidu.com" target="_blank">
        button link
      </Button>
      <Button btnType="link" href="https://www.baidu.com" disabled>
        button link disabled
      </Button>
      <p>learn react</p>
    </div>
  );
}

export default App;
