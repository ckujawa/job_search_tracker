export function isNullUndefinedOrEmpty<T>(object: string | undefined | null): boolean {
    return object === undefined || object === null || object === ''
}