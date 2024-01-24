# Descope OIDC Amplify Angular

This project demonstrates the use of OIDC auth with Descope for an AWS Amplify project (without Cognito or any AWS auth services). Using this setup you can still leverage the owner and group auth rule based automatic data filtering that Amplify offers without the hassle and rigidity of Cognito.

## To Use this project:
1. Initialize AWS Amplify using angular documentation:
    https://docs.amplify.aws/angular/start/getting-started/installation/

2. via amplify cli `amplify add api`, select graphql, and select OIDC Connect for default (and only) authorization mode. Have your Descope issuer URL and Project ID ready to provide to the cli prompts.

3. use the below schema in your `amplify/backend/api/{projectname}}/schema.graphql` file.

4. make sure the descope user you are authenticating with has the `user` role or edit as needed.

```graphql
type Todo @model @auth(rules: [
  { allow: owner, provider: oidc, identityClaim: "sub", operations: [read, delete] },
  { allow: groups, provider: oidc, groupClaim: "roles", groups: ["user"], operations: [create]}
]) {
  id: ID!
  name: String!
  description: String
  owner: String
}
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
