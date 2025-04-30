export function formatResponse(data: any, message: string = 'Success') {
    return {
        status: 'success',
        message,
        data,
    };
}

export function formatError(message: string, code: number = 500) {
    return {
        status: 'error',
        message,
        code,
    };
}