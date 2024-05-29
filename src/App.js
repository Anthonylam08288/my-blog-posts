import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Spinner from "./components/Spinner";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  function handleLoadMore() {
    setVisible((prevVisible) => prevVisible + 5);
  }

  function Blogs() {
    if (isLoading || !isLoaded) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (posts.length === 0) {
      return <div>No posts currently</div>;
    }

    return (
      <div className=" grid grid-cols-1 ">
        <ul className="list-disc list-inside text-sm">
          {posts.slice(0, visible).map((post) => (
            <li
              key={post.id}
              className="p-4 w-[70] max-sm:text-xs text-sm font-bold md:ml-6"
            >
              {" "}
              {post.title}
              {/* <h2 className="text-sm font-bold">{post.title}</h2> */}
              {/* <p className="text-xs">{post.body}</p> */}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto py-6">
      <h1 className="text-md font-bold ml-4 mb-8 underline">Latest News</h1>
      <Blogs />
      <button
        className="text-md font-bold ml-4 mt-6 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleLoadMore}
      >
        Load more. . .
      </button>
    </div>
  );
}

export default App;
