"use client";

import { ChangeEvent, DragEvent, useState } from "react";

import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [nameIsFilled, setNameIsFilled] = useState(true);
  const [allFilled, setAllFilled] = useState(false);
  const [priceIsFilled, setPriceIsFilled] = useState(true);
  const [image, setImage] = useState<string>("");
  const [imageIsFilled, setImageIsFilled] = useState(true);
  const [quantityIsFilled, setQuantityIsFilled] = useState(true);
  const [styleIsFilled, setStyleIsFilled] = useState(true);
  const [desciptionIsFilled, setDescriptionIsFilled] = useState(true);
  // const [image, setImage] = useState<string>("");
  const [isNext, setIsNext] = useState(true);
  const router = useRouter();
  // const [picture, setPicture] = useState();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsNext(false);
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);

    // Update nameIsFilled state based on whether the input is filled
    setNameIsFilled(!!inputValue.trim()); // Will be true if not empty
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);

    // Update nameIsFilled state based on whether the input is filled
    setDescriptionIsFilled(!!inputValue.trim()); // Will be true if not empty
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPrice(inputValue);

    // Update nameIsFilled state based on whether the input is filled
    setPriceIsFilled(!!inputValue.trim()); // Will be true if not empty
  };
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuantity(inputValue);

    // Update nameIsFilled state based on whether the input is filled
    setQuantityIsFilled(!!inputValue.trim()); // Will be true if not empty
  };
  const handleStyleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setStyle(inputValue);

    // Update nameIsFilled state based on whether the input is filled
    setStyleIsFilled(!!inputValue.trim()); // Will be true if not empty
  };
  const handleNextStep = () => {
    if (name === "") {
      setNameIsFilled(false);
    } else {
      setNameIsFilled(true);
    }
    if (description === "") {
      setDescriptionIsFilled(false);
    } else {
      setDescriptionIsFilled(true);
    }
    if (nameIsFilled && desciptionIsFilled) setAllFilled(true);
    if (allFilled === true) setIsNext(false);
  };
  const handleCancel = () => {
    // setIsNext(true);
    router.push("/warehouse");
  };
  const handleLastStep = () => {
    setIsNext(true);
  };
  const handleNextProduct = () => {
    if (price === "") {
      setPriceIsFilled(false);
    } else {
      setPriceIsFilled(true);
    }
    if (quantity === "") {
      setQuantityIsFilled(false);
    } else {
      setQuantityIsFilled(true);
    }
    if (style === "") {
      setStyleIsFilled(false);
    } else {
      setStyleIsFilled(true);
    }
    if (image === "") {
      setImageIsFilled(false);
    } else {
      setImageIsFilled(true);
    }
  };
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
        setImage(reader.result as string);
        setImageIsFilled(true);
      };
    }
  };

  return (
    <>
      {isNext === true && (
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
                  value={name}
                  onChange={handleNameChange}
                  className="mt-1 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-semibold">Description</p>
                {desciptionIsFilled === false && (
                  <p className="text-xs text-red-500">
                    *You haven't fill this column
                  </p>
                )}
                <input
                  id="description"
                  type="description"
                  value={description}
                  onChange={handleDescriptionChange}
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
      {isNext === false && (
        <div className="min-w-[400px] rounded-2xl border-2 border-black bg-white p-4">
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
                  value={price}
                  onChange={handlePriceChange}
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
                    value={style}
                    onChange={handleStyleChange}
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
                  type="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-2 w-full bg-gray-100"
                />
              </div>
              <div className="w-full">
                <p className="font-bold">Size(optional)</p>
                <div className="flex items-center justify-center gap-5 rounded-md bg-gray-100">
                  <input
                    id="size"
                    type="size_type"
                    value={size}
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    className="mt-1 w-full bg-gray-100"
                  />
                </div>
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
                    <img
                      className="mx-auto h-12 w-12"
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
                    <img
                      src={previewSrc}
                      className="mx-auto mt-4 max-h-40"
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
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 py-1 text-sm hover:bg-slate-100"
                  onClick={handleNextProduct}
                >
                  Next product
                </button>
                <button
                  data-testid="add-submit-button"
                  // type="submit"
                  className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-sm text-white hover:bg-teal-700"
                  onClick={handleCancel}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
