import * as http from "http";

export class GraphQlClient {
    private _host: URL;
    get host() {
        return this._host;
    }

    constructor(host: string | URL) {
        this._host = typeof host === 'string'
            ? this._host = new URL(host)
            : host;
    }

    async query<Response>(gql: string) {
        return new Promise<Response>((resolve, reject) => {
            const postData = Buffer.from(JSON.stringify({
                query: gql
            }), 'utf8');

            const options = {
                hostname: this._host.hostname,
                port: this._host.port,
                path: this._host.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = http.request(options, (res) => {
                let chunks: Buffer[] = [];
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    chunks.push(Buffer.from(chunk, 'utf8'));
                });
                res.on('end', () => {
                    let body = Buffer.concat(chunks);
                    // @ts-ignore
                    resolve(JSON.parse(body.toString()).data);
                });
            });

            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject(e);
            });

            req.write(postData);
            req.end();
        })
    }
}