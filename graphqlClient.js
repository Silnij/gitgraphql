const API_URL = 'https://01.kood.tech/api/graphql-engine/v1/graphql';

async function makeGraphQLQuery(query, variables = {}) {
    const jwt = localStorage.getItem('jwt'); 

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error(`GraphQL query failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(`GraphQL query returned errors: ${JSON.stringify(data.errors)}`);
        }

        return data;
    } catch (error) {
        throw new Error(`GraphQL query encountered an error: ${error.message}`);
    }
}

export { makeGraphQLQuery };
