const API_URL = 'https://01.kood.tech/api/graphql-engine/v1/graphql';

async function makeGraphQLQuery(query, variables = {}) {
    const jwt = localStorage.getItem('jwt'); 

    const parts = jwt.split('.');

if (parts.length === 3) {
    const [header, payload, signature] = parts;
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    //console.log('Decoded Header:', decodedHeader);
    //console.log('Decoded Payload:', decodedPayload);
    //console.log('Signature:', signature);
} else {
    console.error('Invalid JWT format: Expected 3 parts.');
    //console.log('JWT:',jwt);
    //console.log('parts:', parts);
}

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
