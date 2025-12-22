# ablesci check-in (Cloudflare Worker)

This is a Cloudflare Worker implementation of the [ablesci](https://www.ablesci.com/) automatic check-in script.

## Prerequisites

1.  **Cloudflare Account**: You need a Cloudflare account.
2.  **Node.js**: Installed on your machine.

## Setup

1.  **Install dependencies**:
    This project uses a standalone worker script, but you need `wrangler` CLI to deploy.
    ```bash
    npm install -g wrangler
    ```

2.  **Login to Cloudflare**:
    ```bash
    wrangler login
    ```

3.  **Set the Cookie Secret (CLI Method)**:
    The script requires your authentication cookie. **Do not commit this to GitHub.**
    Set it securely using wrangler secrets:
    ```bash
    wrangler secret put COOKIE
    ```
    When prompted, paste your `_identity-frontend` cookie value.

## Cloudflare Dashboard Deployment (GitHub Integration)

If you are deploying by connecting your GitHub repository directly in the Cloudflare Dashboard:

1.  **Connect Repo**: Select this repository in the Cloudflare Workers dashboard.
2.  **Build Settings**:
    *   **Build Command**: Leave empty.
    *   **Deploy Command**: `npx wrangler deploy` (default).
3.  **Environment Variables (CRITICAL)**:
    *   **Do NOT set the cookie in the "Build" step.**
    *   After the project is created, go to **Settings -> Variables and Secrets**.
    *   Add a variable named `COOKIE` with your cookie value.
    *   Click "Encrypt" or "Secret" to keep it secure.
    *   **Redeploy**: You must go to "Deployments" and trigger a new deployment for the variable to take effect.
4.  **Important Note on Preview**:
    The "Quick Edit" preview pane in Cloudflare often **does not load secrets**. To test, click the actual deployed URL (e.g., `https://ablesci.yourname.workers.dev`).

## Deployment

To deploy the worker to your Cloudflare account:

```bash
wrangler deploy
```

## Configuration

*   **Schedule**: The worker is configured to run daily at 00:00 UTC (which is 08:00 Beijing Time) in `wrangler.toml`.
    ```toml
    [triggers]
    crons = ["0 0 * * *"]
    ```
    You can adjust this cron expression if needed.

## Testing

You can trigger the worker manually via the command line or the Cloudflare dashboard to test if it works:
```bash
wrangler tail # locally watch logs
```
Or simply visit the deployed worker URL provided after `wrangler deploy`.
