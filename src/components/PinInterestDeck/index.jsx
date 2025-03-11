"use client";
import React, { useState, useEffect } from "react";
import './index.css'

const ALL_BREED = "https://dog.ceo/api/breeds/list/all";
const BREED_IMG = "https://dog.ceo/api/breed/";

function PictureTiles() {
    const [dogList, setDogList] = useState([]);
    const [imgList, setImgList] = useState([]);

    useEffect(() => {
        getDogBreed(ALL_BREED).then(data => {
            setDogList(data);
        })
    }, []);

    useEffect(() => {
        if(!dogList.length) return;

        getCurrentBreed(dogList).then(data => {
            setImgList(data);
            // console.log(data);
        }, err => {
            console.error('api failed !!!', err);
        })
    }, [dogList]);


    return (
        <>
            <div className="dog-count">Dog Breed Count - {dogList.length}</div>
            <div className="dog-lists">
                {imgList.map((item, idx) => {
                    return <img className="dog-img" src={item} key={idx} alt={'dog_placeholder'}/>;
                })}
                {/* {
                    imgList.map((item, idx) => {
                        return <p className='dog-img' key={idx}>{item}</p>
                    })
                } */}
            </div>
        </>
    );
}

export default PictureTiles;

// Service functions
const getDogBreed = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw Error('api fails');
    }

    const data = await res.json();
    const { message } = data;

    const breedList = Object.keys(message);
    return breedList;
};

const getCurrentBreed = async (list) => {
    // const testList = list.slice(10, 15);

    // let count = testList.length;


    let count = list.length;
    const promArr = list.map(async item => {
        const res = await fetch(`${BREED_IMG+item}/images`);
        const data = res.json()
        if(!res.ok) {
            console.error('fail for breed', item);
        }else {
            count--;
        }

        return data;
    });
/* // This was creating the control switch issue
    if (count !== testList.length) {
        throw Error('getCurrentBreed failed !!!');
    }
 */
    const imgList = await Promise.all(promArr)

    // Transform in a way to store only one link
    const result = imgList.map(item => {
        const {message} = item;
        return message[0];
    })

    return result;
};
