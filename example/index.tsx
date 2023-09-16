import styles from "./index.m.scss";
import "@arco-design/web-react/dist/css/index.less";
import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import * as Arco from "@arco-design/web-react";
import { BenchMark } from "./benchmark";
import { compileWithSucrase } from "../src/compiler/sucrase";
import { withSandbox } from "../src/utils/sandbox";
import { renderWithDependency } from "../src/renderer/dependency";

const { Input, Typography } = Arco;

const INIT_CODE = `
<Space size='large' style={{ marginTop: 20 }}>
  <Button type='primary'>Primary</Button>
  <Button type='secondary'>Secondary</Button>
  <Button type='dashed'>Dashed</Button>
</Space>
<Card style={{ width: 360, marginTop: 20 }} title='Arco Card' extra={<Link>More</Link>} >
  ByteDance's core product, Toutiao ('Headlines'), is a content platform in China and around
  the world. Toutiao started out as a news recommendation engine and gradually evolved into a
  platform delivering content in various formats.
</Card>
`;

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState(INIT_CODE);

  const renderCode = (code: string) => {
    try {
      if (ref.current) {
        const el = ref.current;
        const sandbox = withSandbox({ React, console, alert, ...Arco });
        const compiledCode = compileWithSucrase("<div>" + code + "</div>");
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
      <Typography.Title heading={3}>Playground</Typography.Title>
      <Typography.Paragraph>支持Arco Design组件的实时预览</Typography.Paragraph>
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
      <Typography.Title heading={3}>Benchmark</Typography.Title>
      <Typography.Paragraph>打开控制台查看执行速度</Typography.Paragraph>
      <BenchMark></BenchMark>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
