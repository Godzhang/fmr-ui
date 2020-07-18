import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";
import Icon from "../Icon/icon";

const testProps: TabsProps = {
  defaultActiveKey: 0,
  className: "test",
  onChange: jest.fn(),
};

const testCardProps: TabsProps = {
  defaultActiveKey: 0,
  type: "card",
};

const generateTabs = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <TabItem label="tab_active">active</TabItem>
      <TabItem label="tab_2">hidden</TabItem>
      <TabItem label="tab_disabled" disabled>
        disabled
      </TabItem>
    </Tabs>
  );
};

const generateCustomTabs = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <TabItem label={<i>custom-tab-1</i>}>tab-1</TabItem>
    </Tabs>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .tabs-content .tabs-tabpane {
      display: none;
    }
    .tabs-content .tabs-tabpane.is-active {
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  tabElement: HTMLElement,
  activeNavElement: HTMLElement,
  activePaneElement: HTMLElement,
  disabledNavElement: HTMLElement,
  disabledPaneElement: HTMLElement;

describe("test Tabs and TabItem component", () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps));
    wrapper.container.append(createStyleFile());
    tabElement = wrapper.getByRole("tab");
    activeNavElement = wrapper.getByText("tab_active");
    disabledNavElement = wrapper.getByText("tab_disabled");
    activePaneElement = wrapper.getByText("active");
    disabledPaneElement = wrapper.getByText("disabled");
  });
  it("should render correct Tabs and TabItem based on default props", () => {
    expect(tabElement).toBeInTheDocument();
    expect(tabElement).toHaveClass("fmr-tabs test");
    expect(
      tabElement.querySelectorAll(":scope > ul > .tabs-nav-item").length
    ).toEqual(3);
    expect(activeNavElement).toHaveClass("tabs-nav-item is-active");
    expect(disabledNavElement).toHaveClass("tabs-nav-item is-disabled");
    expect(activePaneElement).toHaveClass("tabs-tabpane is-active");
    expect(disabledPaneElement).toHaveClass("tabs-tabpane");
  });
  it("should render correct type style when type is set to card", () => {
    cleanup();
    const wrapper = render(generateTabs(testCardProps));
    tabElement = wrapper.getByRole("tab");
    expect(tabElement).toBeInTheDocument();
    expect(tabElement).toHaveClass("fmr-tabs tabs-card");
  });
  it("should not trigger onChange when click on disabled nav item", () => {
    fireEvent.click(wrapper.getByText("tab_disabled"));
    expect(testProps.onChange).not.toHaveBeenCalled();
  });
  it("should show correct TabItems when click on nav item", () => {
    expect(wrapper.getByText("hidden")).not.toBeVisible();

    fireEvent.click(wrapper.getByText("tab_2"));
    expect(wrapper.getByText("hidden")).toBeVisible();
    expect(testProps.onChange).toHaveBeenCalledWith(1);

    fireEvent.click(wrapper.getByText("tab_active"));
    expect(wrapper.getByText("hidden")).not.toBeVisible();
    expect(testProps.onChange).toHaveBeenCalledWith(0);
  });
  it("should correct render when label is set to custom Fragment", () => {
    cleanup();
    const wrapper = render(generateCustomTabs(testProps));
    wrapper.container.append(createStyleFile());
    const firstChild = wrapper.getByText("custom-tab-1");

    expect(firstChild.tagName.toLowerCase()).toEqual("i");
  });
});
