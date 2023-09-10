import { compileWithBabel } from "@/compiler/babel";
import { compileWithSucrase } from "@/compiler/sucrase";
import { compileWithSWC, prepare } from "@/compiler/swc";
import { Button } from "@arco-design/web-react";

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
    <div>
      <Button
        type="primary"
        onClick={() => {
          console.time("babel");
          const code = getCode();
          const result = compileWithBabel(code);
          console.timeEnd("babel");
          console.log(result);
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
          const result = compileWithSWC(code);
          console.timeEnd("swc");
          console.timeEnd("swc-with-prepare");
          console.log(await result);
        }}
      >
        SWC
      </Button>
      <Button
        type="primary"
        onClick={() => {
          console.time("sucrase");
          const code = getCode();
          const result = compileWithSucrase(code);
          console.timeEnd("sucrase");
          console.log(result);
        }}
      >
        Sucrase
      </Button>
    </div>
  );
};
