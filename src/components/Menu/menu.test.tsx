import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const gerenateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropmenu">
        <MenuItem>drop_1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe("test Menu and Menu component", () => {
  beforeEach(() => {
    wrapper = render(gerenateMenu(testProps));
    menuElement = wrapper.getByRole("menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("fmr-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right back", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("menu-item is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(gerenateMenu(testVerProps));
    menuElement = wrapper.getByRole("menu");
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("fmr-menu menu-vertical");
  });
  // submenu
  it("should show dropdown items when hover on SubMenu", async () => {
    expect(wrapper.queryByText("drop_1")).not.toBeInTheDocument();
    const dropdownElement = wrapper.getByText("dropmenu");
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop_1")).toBeVisible();
    });

    fireEvent.click(wrapper.getByText("drop_1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");

    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop_1")).not.toBeInTheDocument();
    });
  });
  it("should show dropdown items when click on vertical Menu", async () => {
    cleanup();
    const wrapper = render(gerenateMenu(testVerProps));
    expect(wrapper.queryByText("drop_1")).not.toBeInTheDocument();
    const dropdownElement = wrapper.getByText("dropmenu");
    fireEvent.click(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop_1")).toBeVisible();
    });

    fireEvent.click(wrapper.getByText("drop_1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");

    fireEvent.click(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop_1")).not.toBeInTheDocument();
    });
  });
  it("should open SubMenu when mode is vertical and defaultOpenSubMenus has value", async () => {
    cleanup();
    const wrapper = render(
      gerenateMenu({ ...testVerProps, ...{ defaultOpenSubMenus: ["3"] } })
    );
    await waitFor(() => {
      expect(wrapper.queryByText("drop_1")).toBeVisible();
    });
  });
});
