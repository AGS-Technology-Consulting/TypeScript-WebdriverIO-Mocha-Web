# CI/CD Setup Guide

Complete guide for setting up GitHub Actions and Jenkins pipelines for the WebdriverIO Cucumber Web Automation Framework.

## 📋 Table of Contents

- [GitHub Actions Setup](#github-actions-setup)
- [Jenkins Setup](#jenkins-setup)
- [Secrets Configuration](#secrets-configuration)
- [Workflows Overview](#workflows-overview)
- [Troubleshooting](#troubleshooting)

---

## 🚀 GitHub Actions Setup

### 1. Push Code to GitHub

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - Web automation framework"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to: `Settings > Secrets and variables > Actions > New repository secret`

**Required Secrets:**

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SLACK_WEBHOOK_URL` | Slack webhook for notifications | `https://hooks.slack.com/services/XXX` |
| `EMAIL_USERNAME` | Email for sending reports | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Email app password | `xxxx xxxx xxxx xxxx` |
| `EMAIL_RECIPIENTS` | Comma-separated emails | `team@example.com,qa@example.com` |

### 3. Enable GitHub Pages

**For Allure Reports:**

1. Go to `Settings > Pages`
2. Source: `Deploy from a branch`
3. Branch: `gh-pages` / `root`
4. Save

Your reports will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO/`

### 4. Workflow Permissions

Go to: `Settings > Actions > General > Workflow permissions`

Select: ✅ **Read and write permissions**

---

## 📊 Workflows Overview

### 1. **Main Test Workflow** (`.github/workflows/web-tests.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests
- Manual dispatch
- Daily schedule (2 AM UTC)

**Features:**
- Chrome, Firefox, Edge tests
- Parallel execution
- Allure reports
- Screenshot capture
- Slack notifications

**Manual Trigger:**

```bash
# Go to: Actions > Web Test Automation > Run workflow
# Select:
# - Browser: chrome/firefox/edge/all
# - Tag: @smoke, @regression, etc.
# - Headless: true/false
```

**Parameters:**
- `browser`: Browser to test (chrome/firefox/edge/all)
- `tag`: Cucumber tag expression (@smoke, @regression)
- `headless`: Run in headless mode (true/false)

### 2. **PR Checks** (`.github/workflows/pr-checks.yml`)

**Triggers:**
- Pull request opened/updated

**Features:**
- ESLint code quality
- Prettier formatting check
- TypeScript type checking
- Smoke tests on Chrome
- PR comments with results

### 3. **Nightly Regression** (`.github/workflows/nightly-regression.yml`)

**Triggers:**
- Daily at 1 AM UTC (Mon-Fri)
- Manual dispatch

**Features:**
- Full regression suite
- Chrome + Firefox
- Email reports
- Slack notifications
- 30-day report retention

---

## 🏗️ Jenkins Setup

### 1. Prerequisites

**Install Jenkins Plugins:**

```bash
- NodeJS Plugin
- Allure Plugin
- Email Extension Plugin
- Pipeline Plugin
- Git Plugin
- Slack Notification Plugin (optional)
```

### 2. Configure Jenkins

#### A. Install Node.js

`Manage Jenkins > Global Tool Configuration > NodeJS`

```
Name: Node 18
Version: 18.x.x
✅ Install automatically
```

#### B. Configure Email

`Manage Jenkins > Configure System > Extended E-mail Notification`

```
SMTP Server: smtp.gmail.com
SMTP Port: 465
✅ Use SSL
Credentials: Add your email credentials
Default Recipients: team@example.com
```

#### C. Configure Allure

`Manage Jenkins > Global Tool Configuration > Allure Commandline`

```
Name: Allure
✅ Install automatically
Version: Latest
```

### 3. Create Jenkins Pipeline

#### Option A: Pipeline from SCM

1. New Item > Pipeline
2. Pipeline Definition: `Pipeline script from SCM`
3. SCM: Git
4. Repository URL: `https://github.com/YOUR_USERNAME/YOUR_REPO.git`
5. Script Path: `Jenkinsfile`

#### Option B: Multibranch Pipeline

1. New Item > Multibranch Pipeline
2. Branch Sources: Git
3. Repository URL: Your repo
4. Build Configuration: `by Jenkinsfile`

### 4. Run Jenkins Pipeline

**Build with Parameters:**

| Parameter | Description | Values |
|-----------|-------------|--------|
| `BROWSER` | Browser to test | chrome, firefox, edge, all |
| `TEST_SUITE` | Test suite | smoke, regression, all |
| `TAG_EXPRESSION` | Cucumber tags | @smoke, @regression |
| `HEADLESS` | Headless mode | true, false |
| `CLEAN_BUILD` | Clean reports | true, false |
| `PARALLEL_EXECUTION` | Parallel browsers | true, false |

**Example Builds:**

```bash
# Smoke tests on Chrome (headless)
BROWSER=chrome
TEST_SUITE=smoke
HEADLESS=true

# Regression on all browsers
BROWSER=all
TEST_SUITE=regression
HEADLESS=true
PARALLEL_EXECUTION=true

# Custom tags
TAG_EXPRESSION=@smoke and @positive
BROWSER=chrome
```

---

## 🔐 Secrets Configuration

### GitHub Actions Secrets

#### 1. Slack Webhook

**Create Slack App:**
1. Go to https://api.slack.com/apps
2. Create New App > From scratch
3. Add Incoming Webhooks
4. Copy Webhook URL
5. Add to GitHub Secrets as `SLACK_WEBHOOK_URL`

#### 2. Email Configuration

**Gmail App Password:**
1. Google Account > Security
2. 2-Step Verification (enable)
3. App Passwords > Generate
4. Copy password
5. Add to GitHub Secrets:
   - `EMAIL_USERNAME`: your-email@gmail.com
   - `EMAIL_PASSWORD`: generated app password

### Jenkins Credentials

#### Add Credentials

`Manage Jenkins > Manage Credentials > Global > Add Credentials`

**Email:**
```
Kind: Username with password
Username: your-email@gmail.com
Password: app-password
ID: email-credentials
```

**Slack (Optional):**
```
Kind: Secret text
Secret: webhook-url
ID: slack-webhook
```

---

## 📈 Viewing Reports

### GitHub Actions

**Allure Report:**
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

**Artifacts:**
- Go to Actions > Select run > Artifacts section
- Download: screenshots, logs, allure-results

### Jenkins

**Allure Report:**
```
http://JENKINS_URL/job/YOUR_JOB/BUILD_NUMBER/allure/
```

**Artifacts:**
```
http://JENKINS_URL/job/YOUR_JOB/BUILD_NUMBER/artifact/
```

---

## 🎯 Workflow Examples

### Example 1: Run Smoke Tests on Push

```yaml
# Already configured in web-tests.yml
# Automatically runs when you push to main/develop
```

### Example 2: PR Validation

```yaml
# Already configured in pr-checks.yml
# Runs lint, type-check, and smoke tests on every PR
```

### Example 3: Nightly Regression

```yaml
# Already configured in nightly-regression.yml
# Runs full regression Monday-Friday at 1 AM UTC
```

### Example 4: Manual Run with Custom Tags

**GitHub Actions:**
1. Go to Actions tab
2. Select "Web Test Automation"
3. Click "Run workflow"
4. Fill parameters:
   - Browser: chrome
   - Tag: @positive and @smoke
   - Headless: true
5. Run

**Jenkins:**
1. Go to your pipeline
2. Click "Build with Parameters"
3. Set TAG_EXPRESSION: `@positive and @smoke`
4. Select BROWSER: chrome
5. Build

---

## 🐛 Troubleshooting

### GitHub Actions Issues

#### Issue: Workflow not triggering

**Solution:**
```bash
# Check .github/workflows/ exists
ls -la .github/workflows/

# Verify YAML syntax
yamllint .github/workflows/*.yml

# Check workflow permissions
# Settings > Actions > General > Workflow permissions
# Select: "Read and write permissions"
```

#### Issue: Can't deploy to GitHub Pages

**Solution:**
```bash
# Enable GitHub Pages
# Settings > Pages > Source: gh-pages branch

# Check if gh-pages branch exists
git branch -a

# Manually create if needed
git checkout --orphan gh-pages
git rm -rf .
echo "Reports" > index.html
git add index.html
git commit -m "Initialize gh-pages"
git push origin gh-pages
```

#### Issue: Allure report not generating

**Solution:**
```bash
# Ensure allure-results directory has files
ls -la allure-results/

# Check Allure installation in workflow
# Should see: "Generate Combined Allure Report" step
```

### Jenkins Issues

#### Issue: Node.js not found

**Solution:**
```
Manage Jenkins > Global Tool Configuration > NodeJS
Install Node.js 18
Update Jenkinsfile: 
tools {
    nodejs "Node 18"
}
```

#### Issue: Allure plugin not working

**Solution:**
```
Manage Jenkins > Manage Plugins
Install: "Allure Jenkins Plugin"
Configure: Manage Jenkins > Global Tool Configuration > Allure Commandline
```

#### Issue: Email not sending

**Solution:**
```
Manage Jenkins > Configure System > Extended E-mail Notification
Test Configuration > Test e-mail recipient
Check SMTP settings:
- Server: smtp.gmail.com
- Port: 465
- Use SSL: ✅
- Credentials: valid app password
```

#### Issue: Browser not found

**Solution:**
```bash
# Install browsers on Jenkins agent
sudo apt-get update
sudo apt-get install -y chromium-browser firefox

# Or use Docker agent with browsers pre-installed
docker pull selenium/standalone-chrome
```

---

## 🔄 CI/CD Best Practices

### 1. Run Smoke Tests on Every PR
```yaml
# pr-checks.yml already configured
# Catches issues early
```

### 2. Schedule Regression Tests
```yaml
# nightly-regression.yml runs Mon-Fri
# Full coverage without blocking development
```

### 3. Use Allure Reports
```yaml
# Tracks test history
# Shows trends
# Easy to share with team
```

### 4. Set Up Notifications
```yaml
# Slack for instant alerts
# Email for detailed reports
# Both configured in workflows
```

### 5. Parameterize Builds
```yaml
# Jenkins and GitHub Actions support parameters
# Flexibility for different test runs
```

---

## 📚 Additional Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Jenkins Pipeline Docs](https://www.jenkins.io/doc/book/pipeline/)
- [Allure Report Docs](https://docs.qameta.io/allure/)
- [WebdriverIO Docs](https://webdriver.io/)
- [Cucumber Docs](https://cucumber.io/docs/cucumber/)

---

## 🎉 Quick Start Checklist

- [ ] Push code to GitHub
- [ ] Configure GitHub Secrets
- [ ] Enable GitHub Pages
- [ ] Set workflow permissions
- [ ] Install Jenkins plugins
- [ ] Configure Jenkins Node.js
- [ ] Configure Jenkins Email
- [ ] Configure Jenkins Allure
- [ ] Create Jenkins pipeline
- [ ] Run first build
- [ ] Verify reports
- [ ] Set up notifications

**All done! Your CI/CD pipeline is ready! 🚀**
