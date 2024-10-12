export async function handler(event, context) {
    const data = {hello: 'Hello world!'};
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}