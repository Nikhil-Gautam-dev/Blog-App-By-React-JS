import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import SERVICE from "../components/appwrite/majorconf";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Editpost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug && userData?.$id) {
      SERVICE.getPost(slug).then((post) => {
        if (post) {
          if (post.userID === userData?.$id) {
            setPost(post);
            return;
          }
          toast.error("you are not allowed to edit this");
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default Editpost;
