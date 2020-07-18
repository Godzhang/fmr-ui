import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import "../src/styles/index.scss";
import "./fix_info_style.scss";

const wrapperStyle = {
  padding: "20px 40px",
  width: "500px",
};

const storyWrapper = (storyFn) => (
  <div style={wrapperStyle}>
    <h3 style={{ marginBottom: "10px" }}>组件演示</h3>
    {storyFn()}
  </div>
);

addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({ info: { inline: true, header: false } });
