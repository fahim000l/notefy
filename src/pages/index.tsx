import Main from "@/layouts/Main";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { DateRange } from "@mui/icons-material";
import { format } from "date-fns";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
// const { DocumentEditorContainerComponent, Toolbar } = dynamic(
//   () => import("@syncfusion/ej2-react-documenteditor")
// );

import React, { useRef, useState, useMemo } from "react";
import { Divider } from "@mui/material";

const quillModules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ font: [] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"], // remove formatting button
  ],
};

const quillFormats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "script",
  "indent",
  "direction",
  "color",
  "background",
  "align",
];

export default function Home() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <Main>
      {/* <div>Hellow</div> */}
      <div className="lg:p-5 bg-white text-black min-h-0">
        <div className="sticky top-16 z-[500] bg-white">
          <div className="flex items-start justify-between lg:p-5 p-2">
            {/* <p className="cursor-text">Why I am writing ?</p> */}
            <input className="w-[50%]" type="text" />
            <div>
              <p className="text-[blue] font-bold text-inherit">Save now</p>
            </div>
          </div>
          {/* {DocumentEditorContainerComponent && (
          <DocumentEditorContainerComponent id="container" />
        )} */}
          {/* <div className=""> */}
          <Divider />
          <div className="flex space-x-2">
            <div className="flex items-center">
              <DateRange /> {format(new Date(), "dd-MM-yyyy")}
            </div>
            {/* <Divider orientation="horizontal" /> */}
            <div className="divider divider-horizontal"></div>
            <div>{content ? content?.split(" ").length : 0} Words</div>
            <div></div>
          </div>
          <Divider />
        </div>

        {/* </div> */}
        <JoditEditor
          ref={editor}
          value={content}
          // config={config}
          // className="z-[1000]"
          config={{
            width: "100%",
            imageDefaultWidth: 200,
            height: "screen",
            toolbarButtonSize: "small",
            toolbarStickyOffset: 150,
          }}
          onBlur={(newValue) => setContent(newValue)}
          // tabIndex={12} // tabIndex of textarea
          className="h-[100vh]"
          // onChange={(newValue) => setContent(newValue)}
        />
      </div>
    </Main>
  );
}
