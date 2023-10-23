const API_URL = 'https://01.kood.tech/api/graphql-engine/v1/graphql';

async function makeGraphQLQuery(query, variables = {}) {
    const jwt = localStorage.getItem('jwt'); 

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
        throw new Error('GraphQL query failed');
    }

    const data = await response.json();
    return data;
}

export { makeGraphQLQuery };
