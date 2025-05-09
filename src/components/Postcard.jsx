import React from "react";
import SERVICE from "../components/appwrite/majorconf";
import { Link } from "react-router-dom";

function Postcard({ post }) {
  // appwrite me id ko $id se btaya jata h

  return (
    <Link to={`/post/${post.$id}`}>
      <div className="bg-gray-100 w-full rounded-xl p-4 ">
        <div className="w-full mb-4 justify-center">
          <img
            src={SERVICE.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
