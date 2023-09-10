import styles from "./index.m.scss";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { transform as transformCode, Options } from "sucrase";
import React from "react";
import { Button, Input } from "@arco-design/web-react";
import { BenchMark } from "./benchmark";

const INIT_CODE = `<Button type='primary' onClick={() => alert(111)}>Primary</Button>`;
const DEFAULT_OPTION: Options = { transforms: ["jsx"], production: true };

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(INIT_CODE);

  const renderCode = (code: string) => {
    try {
      // transform: babel tsc @swc/wasm-web
      const { code: compiledCode } = transformCode(`return (${code});`, DEFAULT_OPTION);
      if (ref.current) {
        const el = ref.current;
        const sandbox: Record<string, unknown> = {
          React,
          Button,
        };
        // sandbox: window proxy iframe
        // xss: js-xss
        const withCode = `with(sandbox) { ${compiledCode} }`;
        console.log(withCode);
        // no-with: ...keys ...values
        const Components = new Function("sandbox", withCode)(sandbox);
        // SSR: ReactDOMServer.renderToStaticMarkup + ReactDOM.hydrate
        ReactDOM.render(Components, el);
      }
    } catch (error) {
      console.warn("Transform Code Error", error);
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
