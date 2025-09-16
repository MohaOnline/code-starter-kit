'use client';

import React, {useEffect, useState} from 'react';
import {status, useStatus} from "@/app/lib/atoms";
import {ListSubheader} from "@mui/material";

/**
 * @see /_t
 */
export default function Page() {

  // TODO use Status.
  const [words, setWords] = useState([])
  const [needWordsRefresh, setNeedWordsRefresh] = useState(false);

  // 全局状态管理 / Global state management
  const [status, setStatus] = useStatus();

  // 获取单词
  useEffect(() => {
    fetch("/api/notebook-words-english", {
      credentials: "include",
    }).then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setWords(data.data);
        setStatus(current => ({
          ...current,
          words: data.data
        }));

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [needWordsRefresh]);

  return (
    <>
      <div>Temp</div>
    </>
  );
}