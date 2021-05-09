This is a guide to start the frontend projects from scratch:

Install tools
```sh
brew install n

# install node, npm
n lts

# install yarn 
npm i -g yarn
```

Init repo
```sh
yarn init -2 -y

# add dev dependencies
yarn add -D typescript eslint prettier

# add IDE integration
yarn dlx @yarnpkg/pnpify --sdk vscode vim

# add yarn plugin
yarn plugin import typescript
yarn plugin import workspace-tools

```

Add .prettierignore, .gitignore file. They should be the same with current
files.

Use yarn workspace to avoid the same dependencies in different apps. Add this line to the package.json file

```json
  "workspaces": [
    "backendside/userapp",
    "backendside/adminapp",
    "frontendside"
  ]
```

Use PnP loose mode for yarn because some dependencies are still not compatible
Add this line to .yarnrc.yml

```yaml
nodeLinker: pnp

pnpMode: loose
```

Then run installing dependencies

```sh
yarn install
```

Command for workspaces

```sh
yarn workspace adminapp run build
yarn workspace userapp run build
yarn workspace frontendside run build

# or
yarn workspaces foreach run build
```
