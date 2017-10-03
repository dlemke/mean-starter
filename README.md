# MEAN Starter

![Alt text](/src/assets/img/mean-login.png?raw=true "MEAN Login")


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Dependencies

1. Local instance of [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/).
2. [Gulp](https://gulpjs.com/) installed globally for server development (`npm i -g gulp`).

## Setup project

From your terminal, run `npm install` to load project dependencies followed by `gulp`. Gulp will run `ng build` and create the `dist` folder which Express can then use to serve up your `index.html` file located in the `dist` folder. Server development has live reload setup with nodemon but any UI or client side changes will need to be built again by running `ng build` or restarting the project (`Ctrl + C` followed by `gulp`). For straight client side development you can use `ng serve` as you normally would with any Angular 4 app. However, any back end calls to node/express will not be available during this time.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
