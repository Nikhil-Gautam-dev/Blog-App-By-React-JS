import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";


const APIKey = import.meta.env.VITE_TINY_MCE_API_KEY;

export default function RTE({ name, control, label, defaultValue = "" }) {
  // control react-hook-form se aaya orr ye yha ki state ko form me transfer karne ka kaam karega

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "Content"}
        control={control}
        render={({ field: { onChange } }) => {
          console.log(defaultValue)
          return (
            <Editor
              initialValue={defaultValue}
              apiKey = {APIKey}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],

                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",

                content_style:
                  "body{ font-family:Helvetica, Arial, sans-serif, font-size: 14px }",
              }}
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
}
