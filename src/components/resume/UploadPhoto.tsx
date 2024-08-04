"use client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

import { storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";

export default function UploadPhoto({
  setValue
}: {
  setValue: (value: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const maxSize = 1024 * 1024 * 5; // 5MB

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const render = new FileReader();
      render.onload = async (e) => {
        await uploadFile(file);
      };
      render.readAsArrayBuffer(file);

      render.onabort = () => toast.error("File reading was aborted");
      render.onerror = () => toast.error("File reading has failed");
    });
  };

  const uploadFile = async (file: File) => {
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Uploading photo...");

    const imageRef = ref(storage, `images/${Date.now() + file.name}`);

    await uploadBytes(imageRef, file).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      console.log("File available at", downloadURL);

      setValue(downloadURL);
    });

    toast.success("Photo uploaded successfully", { id: toastId });
    setLoading(false);
  };
  return (
    <Dropzone onDrop={onDrop} minSize={0} maxSize={maxSize} maxFiles={1}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "mx-10 flex h-52 max-w-3xl items-center justify-center rounded-lg border border-dashed border-slate-400 p-5 text-center hover:cursor-pointer lg:mx-auto",
                isDragActive
                  ? "animate-pulse bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-white"
                  : "text-slate-400 dark:bg-slate-900"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="mt-2 text-red-500">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}
