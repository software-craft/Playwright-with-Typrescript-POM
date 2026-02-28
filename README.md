# 🧪 Playwright Automation Framework

End-to-end **test automation framework** built with **Playwright**, focused on validating modern web applications by combining **UI testing, API testing, and complete user flows**, following QA best practices and a scalable architecture.

The project simulates a real work environment, integrating frontend and backend testing, authentication state handling, dynamic data, and automated execution through CI/CD.

---

## 🎯 Project Objective

The main goal is to show how to design and maintain a professional automation framework that:

- Is **scalable and maintainable**
- Avoids duplicated code using design patterns
- Allows **integrated frontend and backend testing**
- Can run locally and in CI/CD pipelines
- Represents a real QA Automation Engineer workflow

---

## 🧠 Testing Approach

This framework combines multiple testing layers:

- **UI Testing**: validation of critical user flows
- **API Testing**: direct backend and service validation
- **End-to-End Testing**: full frontend and backend integration
- **Error and negative scenario testing**
- **Multi-user testing** and session handling

---

## 🧱 Framework Architecture

The project is structured to improve clarity and reuse:

- **Page Object Model (POM)** to separate test logic from UI logic
- Reusable and decoupled pages
- Use of hooks for state setup and cleanup
- Externalized test data
- Shared utilities for backend and authentication

This allows the framework to grow without becoming fragile or hard to maintain.

---

## 🔐 Authentication and Session Handling

The framework implements advanced authentication strategies:

- Session persistence using **Session Storage**
- Reuse of login states
- **Multi-user testing** at the same time
- Context separation for different roles

This reduces execution time and improves test stability.

---

## 🌐 API & Backend Testing

In addition to visual testing, the project validates the backend directly:

- HTTP response validation
- UI and API synchronization
- Network error simulation
- Full flow testing started from API

This helps detect issues before they impact the UI.

---

## 🐳 Execution Environment

The project is ready to run in a controlled environment:

- Use of **Docker** to start the test environment
- Reproducible configuration
- Independence from the local operating system
- Ideal for automated pipeline execution

---

## 📊 Execution, Reports, and Debug

- Use of the Playwright test runner
- Automatic execution reports
- Support for UI mode execution
- Fast test generation using support tools

---

## 🔁 Version Control

The project follows a professional Git workflow:

- Branch usage
- Clear and traceable commits
- Pull Requests as integration mechanism
- Designed for collaborative QA team work

---

## 🚦 CI/CD

The framework is integrated with **CI/CD**, allowing:

- Automatic test execution on every change
- Install, build, and test steps in the pipeline
- Automatic report generation
- Result publishing using GitHub Pages
- Pipeline optimization with parallel execution and best practices

---

## 🛠️ Technologies Used

- Playwright
- JavaScript / TypeScript
- Docker
- Git & GitHub
- GitHub Actions
- API Testing
- Page Object Model

---

Know:

- **Professional QA Automation** mindset
- Ability to design real automation frameworks
- Understanding of modern testing (UI + API + CI/CD)
- Best practices applied to production environments

---
