// functions/log-visitor.js
exports.handler = async (event) => {
    try {
        // Extract visitor data
        const ip = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'];
        const userAgent = event.headers['user-agent'];
        const host = event.headers['host'];
        const timestamp = new Date().toISOString();

        // Create a log entry
        const logEntry = `
            IP: ${ip}
            Host: ${host}
            User-Agent: ${userAgent}
            Timestamp: ${timestamp}
            ----------------------------
        `;

        // Log the data to the console (visible in Netlify's function logs)
        console.log('Visitor logged:', logEntry);

        // Option 1: Send the data to an external logging service
        // Example: Use a service like https://requestbin.com/ to capture logs
        await fetch('https://eo6ua7z6a8qwlwk.m.pipedream.net/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip, host, userAgent, timestamp }),
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Visitor logged successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};