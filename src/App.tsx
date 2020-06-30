import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
