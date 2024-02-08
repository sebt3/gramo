# Gramo
Gramo is a kubernetes web client.

## Running
Use kustomize on the `deploy` directory to get the basic stuff.
You'll still need to publish it and give it the permissions you want.
But every permission you'll give to it will be granted to anyone using the app, control the access accordingly.

## Coding

### Used techs
- typescript
- GraphQL (using apollo)
- vue3
- Quasar
- d3
- monaco-editor
- handlebars (build-time only, runtime is full vue)

### Coding strategy

Since there's a lot of code to be written and most would look-a-like and since kubernetes document its APIs, use this documentation to generate most of the code. This is not unlike the library underneath (@kubernetes/client-node) which is also generated using the same strategy.

### Code locally
```sh
git clone https://github.com/sebt3/gramo.git
cd gramo
yarn install
yarn gen
yarn dev
```
