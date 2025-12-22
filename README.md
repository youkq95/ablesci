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

3.  **Set the Cookie Secret**:
    The script requires your authentication cookie. **Do not commit this to GitHub.**
    Set it securely using wrangler secrets:
    ```bash
    wrangler secret put COOKIE
    ```
    When prompted, paste your `_identity-frontend` cookie value.

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
