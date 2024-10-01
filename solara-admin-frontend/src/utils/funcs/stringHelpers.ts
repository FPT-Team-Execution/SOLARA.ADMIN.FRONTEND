export function shortenString(input: string, startLength: number = 4, endLength: number = 4): string {
    if (input.length <= startLength + endLength) {
        return input;
    }
    const start = input.slice(0, startLength);
    const end = input.slice(-endLength);
    return `${start}...${end}`;
}