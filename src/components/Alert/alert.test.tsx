import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";

const testProps: AlertProps = {
  type: "success",
  message: "nice",
  description: "description",
  className: "klass",
};

const closableProps: AlertProps = {
  closable: true,
};

describe("test Alert component", () => {
  it("should render the correct alert component", () => {
    const wrapper = render(<Alert role="alert" message="nice" />);
    const element = wrapper.getByRole("alert");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("DIV");
    expect(element).toHaveClass("alert alert-default");
  });
  it("should render the correct component based on different props", () => {
    const wrapper = render(<Alert role="alert" {...testProps} />);
    const element = wrapper.getByRole("alert");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert alert-success klass");
    expect(element.firstChild).toHaveClass("alert-message");
    expect(element.lastChild).toHaveClass("alert-description");
  });
  it("should remove the component after click the close-icon", async () => {
    const wrapper = render(<Alert role="alert" {...closableProps} />);
    const element = wrapper.getByRole("alert");
    const closeIcon = element.getElementsByClassName("alert-close-icon")[0];
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert closable");
    expect(element.firstChild).toHaveClass("alert-message");
    expect(element.lastChild).toHaveClass("alert-close-icon");
    fireEvent.click(closeIcon);
    await waitFor(() => {
      expect(element).not.toBeInTheDocument();
    });
  });
});
