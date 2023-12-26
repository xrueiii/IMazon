"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

function AddProductForm() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const router = useRouter();
  // const [picture, setPicture] = useState();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleCancel = () => {
    router.push("/warehouse");
  };
  return (
    <div className="min-w-[400px] rounded-2xl border-2 border-black bg-white p-4">
      <div className="mt-5 flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-10">
          <div className="w-full">
            <p>Name</p>
            <input
              id="Name"
              type="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mt-1 w-full rounded-md bg-gray-200"
            />
          </div>
          <div className="w-full">
            <p>Price</p>
            <input
              id="Price"
              type="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="mt-1 w-full rounded-md bg-gray-200"
            />
          </div>
          <div className="mb-3 mt-5 flex gap-5">
            <button
              data-testid="add-submit-button"
              type="submit"
              className="mb-3 w-full rounded-lg border-2 py-1 hover:bg-slate-100"
            >
              Add
            </button>
            <button
              data-testid="add-submit-button"
              type="submit"
              className="mb-3 w-full rounded-lg border-2 py-1 hover:bg-slate-100"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
