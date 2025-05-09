import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import SERVICE from "../appwrite/majorconf";
import { data, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Postform({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post ? post.title : "",
        slug: post?.$id || "",
        content: post ? post.content : "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    toast.info("processing your form");
    try {
      let dbPost = null;
      if (post) {
        dbPost = await editPost(data);
      } else {
        dbPost = await createPost(data);
      }

      if (dbPost) {
        toast.success("Post created successfully");
        navigate(`/post/${dbPost.$id}`);
        return;
      }
    } catch (error) {
      toast.error("Error in submitting form");
      console.log("error in submitting form: ", error);
    }
  };

  const fileUpload = async (file) => {
    return await SERVICE.uploadFile(file);
  };

  const createPost = async (data) => {
    try {
      const file = (await data.image[0])
        ? await fileUpload(data.image[0])
        : null;
      if (!file) {
        throw new Error("Error in file upload");
      }
      const fileId = file.$id;
      data.featuredImage = fileId;
      const dbPost = await SERVICE.createPost({
        ...data,
        userID: userData.$id,
      });

      if (dbPost) return dbPost;
      else {
        throw new Error("Error in creating post");
      }
    } catch (error) {
      console.log("Error in creating post: ", error);
      toast.error("Error in creating post");
      return null;
    }
  };

  const editPost = async (data) => {
    try {
      const file = (await data.image[0])
        ? await fileUpload(data.image[0])
        : null;

      if (file) {
        SERVICE.deleteFile(post.featuredImage);
      }

      const dbPost = await SERVICE.updatePost(post.$id, {
        ...data,
        ...(file && file.$id && { featuredImage: file.$id }),
      });

      if (dbPost) return dbPost;
      else {
        throw new Error("Error in editing post");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error in editing post");
      return null;
    }
  };

  const slugTransform = useCallback((title) => {
    if (title && typeof title === "string") {
      return title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, "") // Remove non-alphanumeric characters except hyphens
        .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
    } else {
      return "";
    }
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && !post) {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit, (error) => {
        console.log("Form Error", error);
      })}
      className="flex flex-wrap"
    >
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            if (Object.keys(post).length == 0) {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={SERVICE.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default Postform;
