export declare class GraphQlClient {
    private _host;
    get host(): URL;
    constructor(host: string | URL);
    query<Response>(gql: string): Promise<Response>;
}
