import React, { useContext, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

const query = `
    query {
    viewer {
        login
        repositories(first: 50){
        totalCount
        nodes {
            name
                }
            }
        }
    }
`;

console.log(OAUTH);
const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        Authorization: `Bearer ${OAUTH}`
    }
})
export function App() {
    useEffect(() => {
        client
            .request(query)
            .then(results => JSON.stringify(results, null, 2))
            .then(console.log)
    }, [])
    return (
        <div>
            <p>
                Actually loaded some stuff
            </p>
        </div>
    )
}