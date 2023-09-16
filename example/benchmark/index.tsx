import { compileWithBabel } from "@/compiler/babel";
import { compileWithSucrase } from "@/compiler/sucrase";
import { compileWithSWC, prepare } from "@/compiler/swc";
import { Button, Space } from "@arco-design/web-react";

const getCode = () => {
  const CHUNK = `
    <Button className="button-component">
      <div className="div-child"></div>
    </Button>
    `;
  return "<div>" + new Array(1000).fill(CHUNK).join("") + "</div>";
};

export const BenchMark = () => {
  return (
    <Space size="small">
      <Button
        type="primary"
        onClick={() => {
          console.time("babel");
          const code = getCode();
          compileWithBabel(code);
          console.timeEnd("babel");
        }}
      >
        Babel
      </Button>
      <Button
        type="primary"
        onClick={async () => {
          console.time("swc-with-prepare");
          await prepare();
          console.time("swc");
          const code = getCode();
          compileWithSWC(code);
          console.timeEnd("swc");
          console.timeEnd("swc-with-prepare");
        }}
      >
        SWC
      </Button>
      <Button
        type="primary"
        onClick={() => {
          console.time("sucrase");
          const code = getCode();
          compileWithSucrase(code);
          console.timeEnd("sucrase");
        }}
      >
        Sucrase
      </Button>
    </Space>
  );
};
