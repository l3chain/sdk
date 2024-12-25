export declare class GraphQLError extends Error {
    readonly code?: string | undefined;
    readonly originalError?: unknown;
    constructor(message: string, code?: string | undefined, originalError?: unknown);
}
export declare class GraphQlClient {
    private readonly endpoint;
    constructor(endpoint: string);
    query(query: string): Promise<any>;
}
