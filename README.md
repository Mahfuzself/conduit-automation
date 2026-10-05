# Conduit Automation

Playwright + TypeScript tests for the [Conduit](https://conduit.bondaracademy.com) app.

## Requirements

- [Node.js 20+](https://nodejs.org)
- [Java 8+](https://adoptium.net) (only for the Allure report)

## Setup

```bash
git clone https://github.com/Mahfuzself/conduit-automation.git
cd conduit-automation
npm i
npx playwright install
```

## Run tests

```bash
npx playwright test
```

## View report

```bash
npx playwright show-report     # Playwright HTML report
npm run allure:serve           # Allure report
```
