import { useEffect, useState } from 'react';

function useFetch(url:string) {
    const [posts, setPosts] = useState<any>([]);
    const [isErr, setIsErr] = useState<boolean>(true);
    const [isLoad, setisLoad] = useState(false);

    async function getPosts(url: string) {
        const res = await fetch(url);

        if(!res.ok) {
            throw Error('api fails');
        }

        const data = await res.json();
        return data;
    }

    useEffect( () => {
        setisLoad(true);
        getPosts(url).then(data => {
            setPosts(data);
            setisLoad(false);
        }, err => {
            console.error(err);
            setIsErr(true);
        });
    }, []);

    const updatePosts = (posts: []) => {
        const RANGE = 90;
        const temp = Math.ceil(Math.random() * 90);

        setPosts(posts.slice(temp, temp+10));
    }

    return {
        posts,
        getPosts,
        isErr,
        isLoad,
        updatePosts
    }
}

export {useFetch};
