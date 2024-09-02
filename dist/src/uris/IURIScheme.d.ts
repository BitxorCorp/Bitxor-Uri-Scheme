/**
 * URI Scheme interface
 */
export interface IURIScheme<T> {
    toTransaction(): T;
    build(): string;
}
