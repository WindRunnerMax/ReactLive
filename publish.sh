npm version patch --no-git-tag-version
npx tsc -p tsconfig.build.json
npx tsc-alias -p tsconfig.build.json
npm publish --registry=https://registry.npmjs.org/ 
