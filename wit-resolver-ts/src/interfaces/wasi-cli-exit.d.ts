/** @module Interface wasi:cli/exit@0.2.3 **/
export function exit(status: Result<void, void>): void;
export type Result<T, E> = { tag: 'ok', val: T } | { tag: 'err', val: E };
