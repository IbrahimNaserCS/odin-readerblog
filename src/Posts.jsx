import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'

export function Posts() {
    const [postsJson, setPostsJson] = useState(null);
    const url = "http://localhost:8080/post";
      useEffect(() => {
        console.log("In use effect");
        async function fetchData() {
          console.log("Called");
          const response = await fetch(url,{ mode: 'cors'});
          const data = await response.json();
          console.log(data);
          return data;
        }
        const logData = async () => {
          const data = await fetchData();
          setPostsJson(data);
        }
        logData();
      }, [])
    console.log("In posts");
    return (
      <>
        {!postsJson ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {postsJson.map((item, index) => (
                <p key={index}>
              <Link to={`/post/${item.id}`} >{item.title} ({item.date.slice(0, 10)})</Link>
              </p>
            ))}
          </ul>
        )}
      </>
    );
  }  