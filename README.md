# React Live

<p>
<a href="https://github.com/WindrunnerMax/ReactLive">GitHub</a>
<span>｜</span>
<a href="https://windrunnermax.github.io/ReactLive/">Playground</a>
<span>｜</span>
<a href="https://windrunnermax.github.io/DocEditor/">DEMO</a>
<span>｜</span>
<a href="https://github.com/WindrunnerMax/EveryDay/blob/master/Plugin/初探富文本之React实时预览.md">BLOG</a>
</p>

## Usage

```bash
$ pnpm add react-live-runtime -E
```

```js
// ./example/index.tsx
const sandbox = withSandbox({ React, console, alert, ...Arco });
const compiledCode = compileWithSucrase("<div>" + code + "</div>");
const Component = renderWithDependency(compiledCode, sandbox) as JSX.Element;
ReactDOM.render(Component, el);
```

## Develop

```bash
$ npm i -g pnpm@8.11.0
$ pnpm install --frozen-lockfile
$ npx husky install 
$ chmod 755 .husky/pre-commit
$ pnpm run dev
```
