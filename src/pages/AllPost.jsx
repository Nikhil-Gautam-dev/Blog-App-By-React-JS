import React, { useState, useEffect } from "react";
import SERVICE from "../components/appwrite/majorconf";
import { Container, Postcard } from "../components";
import { toast } from "react-toastify";
function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      SERVICE.allPost().then((posts) => {
        if (posts) {
          toast.info("All post fetched successfully");
          setPosts(posts.documents);
        }
      });
    })();
  }, []);

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
