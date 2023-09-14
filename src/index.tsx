import styles from "./index.m.scss";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import React from "react";
import { Button, Input } from "@arco-design/web-react";
import { BenchMark } from "./benchmark";
import { compileWithSucrase } from "./compiler/sucrase";
import { withSandbox } from "./utils/sandbox";
import { renderWithDependency } from "./renderer/dependency";

const INIT_CODE = `<Button type='primary' onClick={() => alert(111)}>Primary</Button>`;

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(INIT_CODE);

  const renderCode = (code: string) => {
    try {
      if (ref.current) {
        const el = ref.current;
        const sandbox = withSandbox({ React, Button, console, alert });
        const compiledCode = compileWithSucrase(code);
        const Component = renderWithDependency(compiledCode, sandbox) as JSX.Element;
        ReactDOM.render(Component, el);
      }
    } catch (error) {
      console.log("Transform Code Error", error);
    }
  };

  useEffect(() => {
    renderCode(code);
  }, [code]);

  return (
    <div className={styles.body}>
      <BenchMark></BenchMark>
      <div className={styles.container}>
        <div ref={ref}></div>
      </div>
      <div>
        <Input.TextArea
          autoSize
          className={styles.textarea}
          value={code}
          onChange={setCode}
        ></Input.TextArea>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
