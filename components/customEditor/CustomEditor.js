import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CustomEditor = ({ value, onChangeFunction }) => {
  return (
    <CKEditor
      editor={Editor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChangeFunction(data);
      }}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "200px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
    />
  );
};

export default CustomEditor;
