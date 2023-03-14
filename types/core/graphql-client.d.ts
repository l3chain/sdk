export declare class GraphQlClient {
    private _host;
    constructor(host: string | URL);
    query<Response>(gql: string): Promise<Response>;
}
