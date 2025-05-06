import React, { useState, useEffect } from "react";
import SERVICE from "../components/appwrite/majorconf";
import { Container, Postcard } from "../components";
function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);

  SERVICE.allPost([]).then((post) => {
    if (post) {
      setPosts(post.documents);
    }
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="w-1/4 p-2" key={post.$id}>
              <Postcard
                post={post} // Pass the entire post object to Postcard
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
