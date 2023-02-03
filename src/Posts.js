import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);

        let postPromises = posts.map((post) => {
          return fetch(
            `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
          ).then((response) => response.json());
        });

        return Promise.all(postPromises);
      })
      .then((commentsArray) => {
        setComments(commentsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <h2>Comments</h2>
          <ul>
            {comments.map((commentsArray, index) => (
              <li key={index}>
                <ul>
                  {commentsArray.map((comment) => (
                    <li key={comment.id}>{comment.body}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Posts;
