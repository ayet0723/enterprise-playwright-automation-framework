# GitHub Actions Setup Guide

## Setting Up GitHub Secrets for CI/CD

For GitHub Actions to run your tests, you need to add your encrypted credentials as repository secrets.

### Steps to Add Secrets:

1. **Go to your repository on GitHub**
   ```
   https://github.com/ayet0723/enterprise-playwright-automation-framework
   ```

2. **Navigate to Settings → Secrets and variables → Actions**
   - Click on your repository
   - Go to "Settings" tab
   - Click "Secrets and variables" in the left sidebar
   - Click "Actions"

3. **Add the following Repository Secrets:**

   Click "New repository secret" for each of these:

   **Secret 1: SALT**
   - Name: `SALT`
   - Value: `mySecretSalt123`
   - Click "Add secret"

   **Secret 2: USERID**
   - Name: `USERID`
   - Value: `U2FsdGVkX1+8CJVLZ16BTp6FVHmzbbs91BpXodo8lQUGPu3YssX737IoHKFVWL4dQtUFKeuZ3P/eSa7I26VS5A==`
   - Click "Add secret"

   **Secret 3: PASSWORD**
   - Name: `PASSWORD`
   - Value: `U2FsdGVkX1/lkbbjZteywJj2Qrc26DdNt5OKvZf2m/A=`
   - Click "Add secret"

### Verify Setup:

After adding the secrets, your GitHub Actions workflow will:
- ✅ Automatically run on push to `main` or `test` branches
- ✅ Run on pull requests
- ✅ Can be manually triggered from Actions tab
- ✅ Create .env file with credentials during test run
- ✅ Upload test reports and results as artifacts

### Manual Trigger:

To manually trigger a test run:
1. Go to "Actions" tab in your repository
2. Click "Playwright Tests" workflow
3. Click "Run workflow" button
4. Select branch and click "Run workflow"

### View Test Reports:

After a workflow run completes:
1. Go to the workflow run
2. Scroll down to "Artifacts" section
3. Download "playwright-report" or "test-results"
4. Extract and open `index.html` for the report

### Workflow Features:

- **Runs on**: Ubuntu latest
- **Timeout**: 60 minutes
- **Node.js**: Version 18
- **Browser**: Google Chrome
- **Reports**: Stored for 30 days
- **Test results**: Stored for 7 days
- **Caching**: npm dependencies cached for faster runs

### Troubleshooting:

**If tests fail due to authentication:**
- Verify all three secrets are added correctly
- Check the encrypted values match your local .env file
- Ensure SALT is exactly the same as used for encryption

**If workflow doesn't trigger:**
- Check you pushed to `main` or `test` branch
- Verify `.github/workflows/main.yml` is in the repository
- Check Actions are enabled in repository settings

### Security Notes:

🔒 **Secrets are encrypted** - GitHub encrypts all secrets
🔒 **Never exposed in logs** - Secrets are masked in workflow logs
🔒 **Only accessible during workflow** - Cannot be downloaded or viewed after adding
