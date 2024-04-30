declare type WithSearchParams<T = {}> = T & {
    searchParams: URLSearchParams
}