export class GraphQLError extends Error {
    constructor(
        message: string,
        public readonly code?: string,
        public readonly originalError?: unknown
    ) {
        super(message);
        this.name = 'GraphQLError';
    }
}

export class GraphQlClient {
    constructor(private readonly endpoint: string) { }

    async query(query: string): Promise<any> {
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new GraphQLError(
                    `HTTP error: ${response.status}`,
                    'HTTP_ERROR',
                    await response.text()
                );
            }

            const data = await response.json();
            return data.data;

        } catch (error) {

            if (error instanceof GraphQLError) {
                throw error;
            }

            // 网络错误
            if (error instanceof TypeError) {
                throw new GraphQLError(
                    'Network error occurred',
                    'NETWORK_ERROR',
                    error
                );
            }

            // 其他未知错误
            throw new GraphQLError(
                'An unexpected error occurred',
                'UNKNOWN_ERROR',
                error
            );
        }
    }
}