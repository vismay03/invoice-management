"use client";

import { useEffect, useRef, useState } from "react";
export default function FileUploader({ name, field, form }: { name: string, field: any, form: any }) {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [files, setFiles] = useState<any>([]);

    function handleChange(e: any) {
        e.preventDefault();
        console.log("File has been added");
        if (e.target.files && e.target.files[0]) {
            for (let i = 0; i < e.target.files["length"]; i++) {
                setFiles((prevState: any) => [...prevState, e.target.files[i]]);
            }
        }
    }

    useEffect(() => {

        form.setValue(name, files);

    }, [files]);

    // function handleSubmitFile(e: any) {
    //     if (files.length === 0) {
    //         // no file has been submitted
    //     } else {
    //         // write submit logic here
    //     }
    // }

    function handleDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
            }
        }
    }

    function handleDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile(fileName: any, idx: any) {
        const newArr = [...files];
        newArr.splice(idx, 1);
        setFiles([]);
        setFiles(newArr);
    }

    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }

    return (
        <>
            <div className="mt-1 flex justify-center px-1 pt-1 pb-1 border-2 border-gray-300 border-dashed rounded-md">
                <form
                    className={`${dragActive ? "bg-muted" : "bg-transparent"}  p-4 rounded-lg w-full  min-h-[10rem] text-center flex flex-col items-center justify-center`}
                    onDragEnter={handleDragEnter}
                    onSubmit={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                >
                    {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
                    <input
                        placeholder="fileInput"
                        className="hidden"
                        ref={inputRef}
                        name={name}
                        type="file"
                        multiple={true}
                        onChange={handleChange}
                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    />

                    <div className="">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-red" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ></path>
                            </svg>
                            <div className="text-sm text-gray-600">
                                <label htmlFor="file-upload" className="">
                                    <p>
                                        Drag & Drop files or{" "}
                                        <span
                                            className="font-bold text-blue-600 cursor-pointer"
                                            onClick={openFileExplorer}
                                        >
                                            <u>Select files</u>
                                        </span>
                                        &nbsp;to upload
                                    </p>

                                </label>
                                {/* <p className="pl-1 ">or drag and drop</p> */}
                            </div>
                            <p className="text-xs ">PNG, JPG up to 2MB</p>
                        </div>
                    </div>




                    {/* <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button> */}
                </form>
            </div>

            {files.length > 0 && <div className="flex flex-col items-center p-3">
                {files.map((file: any, idx: any) => (
                    <div key={idx} className="flex flex-row space-x-5">
                        <span>{file.name}</span>
                        {/* <span>{file.size}</span>
                        <span>{file.url}</span> */}
                        <span
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeFile(file.name, idx)}
                        >
                            remove
                        </span>
                    </div>
                ))}
            </div>}

        </>
    );
}
