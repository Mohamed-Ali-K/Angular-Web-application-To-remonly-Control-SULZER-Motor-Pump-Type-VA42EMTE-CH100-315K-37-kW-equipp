# Angular Web Application for Remote Control of SULZER Motor Pump

<!-- Add a project logo here if available -->
<!-- ![Project Logo](path/to/logo.png) -->

This project is a web application built with Angular to remotely control a SULZER motor pump Type VA42EMTE CH100-315K (37 kW) equipped with an ABB ASC580 R4 AC Driver, using an ESP32 microcontroller.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Building the Project](#building-the-project)
  - [Running Unit Tests](#running-unit-tests)
  - [Running End-to-End Tests](#running-end-to-end-tests)
- [ESP32 Repository](#esp32-repository)
- [Live Application](#live-application)
- [Contributing](#contributing)
- [License](#license)
- [Further Help](#further-help)

## Introduction

This application provides a web-based interface to remotely monitor and control a SULZER motor pump. It leverages an ESP32 microcontroller for communication with the pump's AC driver and Firebase for real-time data synchronization and backend services.

## Features

- **Remote Operation:** Start and stop the motor pump remotely.
- **Frequency Control:** Increase or decrease the motor pump's frequency.
- **Real-time Monitoring:** Display real-time data for frequency, current, and speed.
- **Water Level Monitoring:** Track the seawater level in the basin where the motor pump is installed.
- **Safety Measures:** Automatically stop the motor pump in case of critical conditions (e.g., overheating, cavitation).
- **Notifications:** Alert the operator in case of a breakdown.
- **Secure Access:** User authentication with login and password.

## Technology Stack

- **Frontend:**
  - Angular 8
  - Angular Material
  - Firebase Realtime Database (for web app)
- **Hardware:**
  - ESP32 Microcontroller
- **Backend (ESP32):**
  - C++
  - Firebase (for ESP32 communication)
- **Version Control:**
  - Git

## Project Structure

*(Details about the project's directory structure can be added here. For example:)*
```
.
├── src/
│   ├── app/                # Application components and modules
│   ├── assets/             # Static assets (images, etc.)
│   ├── environments/       # Environment-specific configurations
│   ├── index.html          # Main HTML file
│   ├── main.ts             # Main entry point for the application
│   ├── polyfills.ts        # Polyfills for browser compatibility
│   ├── styles.css          # Global styles
│   └── test.ts             # Main entry point for unit tests
├── .angular-cli.json     # Angular CLI configuration
├── .editorconfig         # Editor configuration
├── .gitignore            # Git ignore file
├── karma.conf.js         # Karma test runner configuration
├── package.json          # Project dependencies and scripts
├── protractor.conf.js    # Protractor e2e test configuration
├── README.md             # This file
├── tsconfig.app.json     # TypeScript configuration for the application
├── tsconfig.json         # General TypeScript configuration
├── tsconfig.spec.json    # TypeScript configuration for tests
└── tslint.json           # TSLint configuration
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (Node Package Manager)
- Angular CLI (version 7.3.5 or compatible)
- Some electronic knowledge for choosing components (resistors, capacitors, relays, etc.) and soldering.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

```bash
ng serve
```

### Building the Project

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

```bash
ng build
# For production build
ng build --prod
```

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

```bash
ng test
```

### Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

```bash
ng e2e
```

## ESP32 Repository

The C++ code for the ESP32 microcontroller can be found in the following repository:
[https://github.com/Mohamed-Ali-K/LOW-VOLTAGE-AC-DRIVES-ACS580-Or-ACS880-ESP32-control-Driver-using-FierBASe](https://github.com/Mohamed-Ali-K/LOW-VOLTAGE-AC-DRIVES-ACS580-Or-ACS880-ESP32-control-Driver-using-FierBASe)

## Live Application

A live version of the application is available at:
[https://sudpotassep60.web.app/login](https://sudpotassep60.web.app/login)

**Login Credentials:**
- **Email:** `test@test.com`
- **Password:** `test1234`

*(Note: This is as of 01/09 - availability might change)*

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (if one exists, otherwise specify the license).

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
