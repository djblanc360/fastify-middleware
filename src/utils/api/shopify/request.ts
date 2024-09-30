import fetch from "node-fetch"

type Payload = {
    url: string;
    type: string;
    token: string;
    query: string;
    variables?: { [key: string]: unknown };
}

type GraphQLResponse<T> = {
    data: T;
    errors?: Array<{ message: string}>;
}

const graphqlRequest = async <T>(payload: Payload): Promise<T> => {
    const { url, type, token, query, variables } = payload;

    const response = await fetch(`${url}graphql.json`, {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token,
        },
        body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
        throw new Error(`Network error: ${response.status} - ${response.statusText}`);
    }

    // explicitly tell TS that value returned conforms to type
    const result = await response.json() as GraphQLResponse<T>;

    const { data, errors } = result;

    if (errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(errors)}`);
    }

    return data;
}

export default graphqlRequest