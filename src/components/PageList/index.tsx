"use client"

import React from "react";
import {useFetch} from './useFetch-hook';

const URL = 'https://jsonplaceholder.typicode.com/todos';

function PageList() {
    const { posts,
        getPosts,
        isErr,
        isLoad,
        updatePosts} = useFetch(URL);

    function btnHandler() {
        getPosts(URL).then(data => {
            updatePosts(data);
        })
    }

    return(<>
        <div>
            <h2>Top lists on news</h2>
            <button onClick={btnHandler}>Get Top Ten</button>
        </div>
        <div className="posts">
        {!posts?.length ? null : <>
                {posts.map((item: any, idx: number) => {
                    return <li key={idx + item.id}>{item.title}</li>;
                })}
            </>}
        </div>
    </>)
}

export default PageList;