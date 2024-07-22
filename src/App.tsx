// import { useRequest } from "ahooks";
import useRequest from './useRequest'
import Mock from "mockjs";
import React, { useState } from "react";

async function getEmail(search?: string): Promise<string[]> {
  console.log("@@@ 执行", search);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ "data|5": ["@email"] }).data);
    }, 300);
  });
}

 const Test = () => {
  const [ready, setReady] = useState(false);

  const { data, loading, run } = useRequest(getEmail, {
    debounceWait: 10000,
    debounceLeading: true,
    debounceTrailing: false,
    ready: ready,
    manual: false,
  });

  return (
    <div>
      <button onClick={() => setReady((pre) => !pre)}>{String(ready)}</button>
      <input
        placeholder="Search Emails"
        onChange={(e) => {
          console.log("我出发onchange了？");
          run(e.target.value);
        }}
      />
      {loading ? (
        <p>loading</p>
      ) : (
        <ul style={{ marginTop: 8 }}>
          {data?.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test;