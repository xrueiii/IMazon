"use client";

import type { ChangeEvent, DragEvent } from "react";
import { useRef, useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import type { ProductDetail } from "@/lib/types";



export default function AddProductForm() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const styleInputRef = useRef<HTMLInputElement>(null);

  const [nameIsFilled, setNameIsFilled] = useState(true);
  const [descriptionIsFilled, setDescriptionIsFilled] = useState(true);
  const [priceIsFilled, setPriceIsFilled] = useState(true);
  const [styleIsFilled, setStyleIsFilled] = useState(true);
  const [quantityIsFilled, setQuantityIsFilled] = useState(true);
  const [allFilled, setAllFilled] = useState(false);
  const [imageIsFilled, setImageIsFilled] = useState(true);
  const [image, setImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [productDetail, setProductDetail] = useState<
    Omit<ProductDetail, "id" | "productId" | "sold">[]
  >([]);

  const router = useRouter();
  

  const handleNextStep = () => {
    if (nameInputRef.current?.value === "") {
      setNameIsFilled(false);
    } else {
      setNameIsFilled(true);
    }
    if (descriptionInputRef.current?.value === "") {
      setDescriptionIsFilled(false);
    } else {
      setDescriptionIsFilled(true);
    }
    if (nameIsFilled && descriptionIsFilled) setAllFilled(true);
    if (allFilled === true) {
      setCurrentIndex(currentIndex + 1);
      setAllFilled(false);
    }
  };

  const handleCancel = () => {
    router.push("/warehouse");
  };

  const handleNextStyle = () => {
    if (parseInt(quantityInputRef.current?.value ?? "") === 0) {
      setQuantityIsFilled(false);
    } else {
      setQuantityIsFilled(true);
      
    }

    if (priceInputRef.current?.value === "") {
      setPriceIsFilled(false);
    } else {
      setPriceIsFilled(true);
      
    }

    if (styleInputRef.current?.value === "") {
      setStyleIsFilled(false);
    } else {
      setStyleIsFilled(true);
    }



    if (imageIsFilled) setAllFilled(true);

    if (allFilled === true) {
      const newStyle: Omit<ProductDetail, "id" | "productId" | "sold">
       = {price: priceInputRef.current?.value ?? "", style: styleInputRef.current?.value ?? "", quantity: parseInt(quantityInputRef.current?.value ?? ""), imageLink: image};
      setProductDetail((productDetail) => [...productDetail, newStyle]);
      setCurrentIndex(currentIndex + 1);
      if(priceInputRef.current?.value) 
        priceInputRef.current.value = "";
      if(quantityInputRef.current?.value) 
        quantityInputRef.current.value = "";
      if(styleInputRef.current?.value) 
        styleInputRef.current.value = "";
      if (previewSrc)
        setPreviewSrc("");

    } else {
      return;
    }
  };

  const handleLastStep = () => {
    setCurrentIndex(currentIndex - 1);
  };

  // handle uploading picture
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    displayPreview(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    displayPreview(file);
  };

  const displayPreview = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewSrc(reader.result as string);
        setImageIsFilled(true);
        setImage(reader.result as string);
      };
    }
  };

  return (
    <>
      {currentIndex === -1 && (
        <div className="min-w-[400px] rounded-2xl border-2 border-black bg-white p-4">
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex flex-col gap-4 px-10">
              <div className="w-full">
                <p className="font-semibold">Name</p>
                {nameIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="Name"
                  type="name"
                  ref={nameInputRef}
                  className="mt-1 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-semibold">Description</p>
                {descriptionIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="description"
                  type="description"
                  ref={descriptionInputRef}
                  className="mt-1 w-full bg-gray-100"
                ></input>
              </div>

              <div className="mb-3 mt-5 flex gap-5">
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 py-1 hover:bg-slate-100"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-white hover:bg-teal-700"
                  onClick={handleNextStep}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentIndex !== -1 && (
        <div className="min-w-[400px] rounded-2xl border-2 border-black bg-white p-4">
          <div className="flex">
            <p className="text-sm text-gray-500">Style No.</p>
            <p className="text-sm text-gray-500">{currentIndex + 1}</p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex flex-col gap-4 px-10">
              <div className="w-full">
                <p className="font-bold">Price</p>
                {priceIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="Price"
                  type="price"
                  ref={priceInputRef}
                  className="mt-1 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-bold">Style</p>
                {styleIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <div className="flex items-center justify-center gap-5 rounded-md bg-gray-100">
                  <input
                    id="style"
                    type="style_type"
                    ref={styleInputRef}
                    className="mt-1 w-full bg-gray-100"
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="font-bold">Quantity</p>
                {quantityIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="Quantity"
                  type="number"
                  ref={quantityInputRef}
                  className="mt-2 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-bold">Picture</p>
                {imageIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <div
                  className={`relative w-[280px] rounded-lg border-2 border-dashed border-gray-300 p-6 ${
                    isDragOver ? "border-indigo-600" : ""
                  }`}
                  id="dropzone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    className="absolute inset-0 z-50 h-full w-full opacity-0"
                    onChange={handleInputChange}
                  />
                  <div className="text-center">
                    <Image
                      className="mx-auto h-12 w-12"
                      fill
                      src="https://www.svgrepo.com/show/357902/image-upload.svg"
                      alt=""
                    />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer"
                      >
                        <span>Drag and drop</span>
                        <span className="text-indigo-600"> or browse</span>
                        <span> to upload</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  {previewSrc && (
                    <Image
                      src={previewSrc}
                      fill
                      className="mx-auto max-h-40 bg-white"
                      alt="Preview"
                    />
                  )}
                </div>
              </div>
              <div className="mb-3 mt-5 flex gap-5">
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 py-1 text-sm hover:bg-slate-100"
                  onClick={handleLastStep}
                >
                  Last Step
                </button>
                {currentIndex === productDetail.length && (
                  <button
                    data-testid="add-submit-button"
                    // type="submit"
                    className="mb-3 w-full rounded-lg border-2 py-1 text-sm hover:bg-slate-100"
                    onClick={handleNextStyle}
                  >
                    Add another style
                  </button>
                )}
                {currentIndex !== productDetail.length && (
                  <button
                    data-testid="add-submit-button"
                    // type="submit"
                    className="mb-3 w-full rounded-lg border-2 py-1 text-sm hover:bg-slate-100"
                    onClick={handleNextStyle}
                  >
                    Next style
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
