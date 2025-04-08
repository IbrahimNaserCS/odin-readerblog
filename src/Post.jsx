import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function Post() {
    const params = useParams();
    const id = params.id;
    console.log("Id is: ", id)
    const [postJson, setPostJson] = useState(null);
    const [nameInput, setNameInput] = useState("");
    const [commentInput, setCommentInput] = useState("");
    const url = `http://localhost:8080/post/${id}`;
    const [isLoading, setIsLoading] = useState(false);
    console.log("url is: ", url);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url,{ mode: 'cors'});
            const data = await response.json();
            return data;
        }
        const logData = async () => {
            const data = await fetchData();
            console.log("Data is: ", data);
            setPostJson(data);
        }
        logData();
        }, []);

    const [commentsJson, setCommentsJson] = useState(null);
    const url2 = `http://localhost:8080/comment/${id}`;
    console.log("url is: ", url);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url2,{ mode: 'cors'});
            const data = await response.json();
            return data;
        }
        const logData = async () => {
            const data = await fetchData();
            console.log("Data is: ", data);
            setCommentsJson(data);
        }
        logData();
        }, []);

    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    }
    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nameInput !== "" && commentInput !== "") {
            setIsLoading(true);
            await fetch(url2, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentorname: nameInput, content: commentInput })
              });
            setIsLoading(false);
            window.location.reload();
        } 
    }

    return (
    <>
    {!postJson || !commentsJson ? (
        <div>Loading...</div>
    ) : (
        <div>
    <p>{postJson.content}</p>
    <b>Comments</b>
    <form onSubmit={handleSubmit}>
        <input placeholder="Name" type="text" value={nameInput} onChange={handleNameChange}></input>
        <input placeholder="Comment" type="text" value={commentInput} onChange={handleCommentChange}></input>
        <button disabled={isLoading} type="submit">Comment</button>
    </form>
    <ul>
            {commentsJson.map((item, index) => (
                <p key={index}>{item.commentorName}: {item.content}</p>
            ))}
          </ul>
          </div>
    )}
    </>
    )
}