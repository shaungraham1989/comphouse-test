# Shady Meadows Automated Test Suite - Shaun Graham

This is an automated test suite for validating the functionality and accessibility of the Shady Meadows web application using Playwright with Typescript.

## Project Structure

```plaintext
/Playwright-Test
├── pages/                                   # Page Object files
├── Playwright-report/index.html            # Playwright test results report
├── tests/                                  # Test files
├── playwright.config.ts                    # Playwright configuration



```

Here are the steps to execute the tests from scratch, including the setup and execution:
Steps to Execute Tests 

1. Install Prerequisites
Before starting, ensure you have the following installed on your machine:
```
Node.js (at least v14.x or newer)
npm (comes with Node.js)
```
2. Clone the Repository
```
git clone https://github.com/your-username/Playwright-Test.git
cd Playwright-Test
```

3. Install Dependencies
Run the following command to install all required packages and dependencies:
```
npm install
```


5. Install Playwright Browsers
Playwright requires additional browser binaries for testing. Install them using:
```
npx playwright install
```

7. Run Tests
To execute the tests:
```
npx playwright test

npx playwright test tests/example.spec.ts

npx playwright test --project=chromium
```

6. View Test Results
In Terminal: Test results will be displayed directly in the terminal after execution.
HTML Report:
After tests finish, generate and view the HTML report:
```
npx playwright show-report
```

