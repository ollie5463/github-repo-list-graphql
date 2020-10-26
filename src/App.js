import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import './App.css'

const query = `
    query {
    viewer {
        login
        avatarUrl
        repositories(first: 50){
        totalCount
        nodes {
            name
                }
            }
        }
    }
`;

const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        Authorization: `Bearer ${OAUTH}`
    }
})
export function App() {
    const [repos, setRepos] = useState([])
    const [name, setName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    useEffect(() => {
        client
            .request(query)
            .then(results => JSON.parse(JSON.stringify(results, null, 2)))
            .then(result => {
                setRepos(result.viewer.repositories.nodes)
                setName(result.viewer.login)
                setAvatarUrl(result.viewer.avatarUrl)
            })
    }, [])
    return (
        <div className='flex top-level'>
            <div className='title'>
                <h1 className='header'>
                    {name}
                </h1>
                <img src={avatarUrl} width={100}></img>
            </div>
            <ul className='flex'>
                {repos.map((repo, i) => <li id='circle' className='flex' key={i}>{repo.name}</li>)}
            </ul>
        </div>
    )
}