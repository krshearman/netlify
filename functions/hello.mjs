export const handler = async (event, context) => {
    const encoder = new TextEncoder();
    const formatter = new Intl.DateTimeFormat("en", { timeStyle: "medium" });

    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode("<html><body><ol>"));
            let i = 0;
            const timer = setInterval(() => {
                controller.enqueue(
                    encoder.encode(
                        `<li>Hello at ${formatter.format(new Date())}</li>\n\n`
                    )
                );
                if (i++ >= 5) {
                    controller.enqueue(encoder.encode("</ol></body></html>"));
                    controller.close();
                    clearInterval(timer);
                }
            }, 1000);
        }
    });

    // Return a streaming response
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
            'Transfer-Encoding': 'chunked',
        },
        body: stream,
    };
};
