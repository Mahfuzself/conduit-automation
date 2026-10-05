# Conduit Automation — Requirements

## Scenarios
Implement the following scenarios, ensuring one positive test case for each:

1. **Create New Article**
2. **Edit Article** — create the article via API as a pre-condition
3. **Delete Article** — create the article via API as a pre-condition
4. **Filter Articles by Tag**
5. **Update User Settings**

## Key Considerations

### QA-Driven Assertions
Ensure thorough validation with necessary assertions for each scenario. Focus on both UI and functional correctness to cover visual elements, success messages, redirects, and data persistence.

### Session Management
Reuse authenticated sessions to optimize performance and reduce test execution time. Implement session persistence to avoid repeated logins where applicable.

### Best Practices
Follow industry-standard best practices for code structure, such as separating page objects, utilities, and test data. Focus on modularity, readability, and maintainability, allowing future scalability of the framework.

### Resilient Tests
Ensure that tests are resilient against minor UI changes. Use flexible locators and retry mechanisms when needed to handle flakiness in dynamic web elements.

## Bonus Features

- **Dynamic Test Data** — Implement dynamic and randomized test data generation to avoid hard-coded inputs and increase test coverage across different input cases.
- **Readable Test Reports** — Configure detailed and well-structured test reports (e.g., Allure or HTML reports) to make it easier for teams to analyze failures, errors, and results.
- **Negative Test Cases** — Add at least one negative test case for each scenario. Test edge cases and invalid inputs to verify proper error handling, validation messages, and user feedback.
- **Use AI tools** — not blindly, of course.
- **Cross-Browser Testing** — Where possible, configure the framework for cross-browser compatibility (Chromium, WebKit, and Firefox) to ensure the web application performs consistently across browsers.
- **Parallel Test Execution** — Optimize test suite execution by enabling parallel runs to speed up testing as the number of test cases increases.
- **Test Traceability** — Capture Playwright traces and screenshots on test failure for easier debugging. Link them to the CI/CD pipeline or reports for better traceability.
- **CI/CD Integration** — Set up the framework to run tests automatically within a CI/CD pipeline (GitHub Actions) to ensure continuous quality validation on every code change.
