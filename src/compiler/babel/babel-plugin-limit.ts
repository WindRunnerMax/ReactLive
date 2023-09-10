import { PluginObj } from "babel-standalone";

export const BabelPluginLimit = (): PluginObj => {
  return {
    name: "babel-plugin-limit",
    visitor: {
      FunctionDeclaration(path) {
        const funcName = path.node.id.name;
        if (funcName !== "App") {
          //   throw new Error("Function Error");
          path.remove();
        }
      },
      JSXIdentifier(path) {
        if (path.node.name === "dangerouslySetInnerHTML") {
          //   throw new Error("Attributes Error");
          path.remove();
        }
      },
    },
  };
};
