// ✅ Reusable Drag-and-Drop Upload with Previews using react-dropzone

"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";

interface UploadDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export default function UploadDropzone({
  files,
  onChange,
  maxFiles = 10,
  maxSizeMB = 5,
}: UploadDropzoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const combined = [...files, ...acceptedFiles].slice(0, maxFiles);
      onChange(combined);
    },
    [files, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: maxSizeMB * 1024 * 1024,
  });

  useEffect(() => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-all hover:border-primary/60 hover:bg-muted ${
          isDragActive ? "border-primary bg-muted" : "border-muted"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your images here...</p>
        ) : (
          <p>Drag & drop images here, or click to select files</p>
        )}
        <p className="text-sm text-muted-foreground">
          Max {maxFiles} files. Max size: {maxSizeMB}MB each.
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {previews.map((src, index) => (
            <div key={index} className="relative">
              <Image
                src={src}
                alt={`upload-preview-${index}`}
                width={120}
                height={120}
                className="rounded object-cover w-full h-[100px]"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 bg-white/70 rounded-full"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
