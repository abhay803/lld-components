"use client";
import React, { useState, useCallback } from "react";
import "./index.css";

const URL = "https://jsonplaceholder.typicode.com/users";
const DEBOUNCE_TIME = 500;

function customBind(fn) {
  let that = this;
  return function (args) {
    fn.apply(that, ...args);
  };
}

function customDebounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export default function Codility() {
  const [inputVal, setInputVal] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const [listRes, setListRes] = useState([]);

  const debounceChangeHandler = useCallback(
    customDebounce((inputVal) => {
      getList(inputVal).then(
        (res) => {
          setListRes(res);
          setIsLoad(false);
        },
        (err) => console.error(err)
      );
    }, DEBOUNCE_TIME),
    []
  );

  const handleListClick = (target) => {
    const { textContent } = target;
    alert(textContent);
    setInputVal("");
    setListRes([]);
  };

  return (
    <div className="list__container">
      <div className={isLoad ? "control is-loading" : "control"}>
        <input
          type="text"
          className="search-query"
          value={inputVal}
          onChange={(e) => {
            setIsLoad(true);

            const { value } = e.target;
            setInputVal(value);

            debounceChangeHandler(value);
          }}
        />
      </div>

      {!listRes.length ? null : (
        <ul
          className="list"
          onClick={(e) => {
            handleListClick(e.target);
          }}
        >
          {listRes.map((item, idx) => (
            <li href="#" className="list-item" key={idx}>
              {item.username || ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Rest Service Helper
const getList = async (query) => {
  if (!query) return [];

  const res = await fetch(`${URL}?query=${query}`);

  if (!res.ok) {
    console.error("API fails");
    return 0;
  }

  const list = await res.json();

  return list;
};
