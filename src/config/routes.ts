export const routes = {
    repos: {
        path: "/repos",
        createRoute: (query: any): string => `/repos/:${query}` 
    }
}