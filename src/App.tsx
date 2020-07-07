import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Icon from "./components/Icon/icon";

function App() {
  return (
    <div className="App">
      <h1>Icon</h1>
      <Icon icon="coffee" theme="primary" size="5x" />
      <Icon icon="coffee" theme="secondary" size="5x" />
      <Icon icon="coffee" theme="success" size="5x" />
      <Icon icon="coffee" theme="info" size="5x" />
      <Icon icon="coffee" theme="warning" size="5x" />
      <Icon icon="coffee" theme="danger" size="5x" />
      <Icon icon="coffee" theme="light" size="5x" />
      <Icon icon="coffee" theme="dark" size="5x" />
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
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        button large
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        button small
      </Button>
      <Button
        btnType={ButtonType.Link}
        href="https://www.baidu.com"
        target="_blank"
      >
        button link
      </Button>
      <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
        button link disabled
      </Button>
      <p>learn react</p>
    </div>
  );
}

export default App;
