export default {
    // Cron Trigger handler
    async scheduled(event, env, ctx) {
        ctx.waitUntil(handleRequest(env));
    },

    // HTTP Handler for manual testing
    async fetch(request, env, ctx) {
        // Manually trigger the check-in logic
        const result = await handleRequest(env);
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    },
};

async function handleRequest(env) {
    const url = "https://www.ablesci.com/user/sign";

    // Debugging: List all available environment keys
    console.log("Available Env Keys:", Object.keys(env));

    // Get Cookie from environment variables
    // You should set this in Cloudflare dashboard or via wrangler secret put COOKIE
    const cookie = env.COOKIE;

    if (!cookie) {
        const errorMsg = "Error: COOKIE environment variable not set. Please set it using 'wrangler secret put COOKIE'.";
        console.error(errorMsg);
        return { success: false, message: errorMsg };
    }

    const headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cookie": cookie,
        "DNT": "1",
        "Referer": "https://www.ablesci.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    };

    try {
        const response = await fetch(url, { method: "GET", headers });
        const data = await response.json().catch(() => null) || await response.text();

        console.log(`Check-in Status: ${response.status}`);
        console.log(`Check-in Response:`, data);

        return {
            status: response.status,
            data: data
        };
    } catch (err) {
        console.error(`Check-in Error: ${err}`);
        return { success: false, error: String(err) };
    }
}
