import React, { useEffect, useState } from "react";
import SERVICE from "../components/appwrite/majorconf";
import { Container, Postcard } from "../components";
import { toast } from "react-toastify";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    SERVICE.allPost().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                “Don’t just read blogs. Write yours in minutes.”
                <br />
                No coding, no setup.
                <br />
                Just write!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <Postcard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
