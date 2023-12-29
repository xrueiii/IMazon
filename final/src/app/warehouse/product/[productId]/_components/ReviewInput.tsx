import React from "react";

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function ReviewInput({ value, setValue }: Props) {
  return (
    <div className="flex h-12 w-full">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Aa"
        className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-3/4 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
        name="productReview"
      />
      <button
        className="h-9 rounded-md border-2 bg-teal-900 px-4 text-white hover:bg-teal-700"
        type="submit"
        onClick={() => setValue(value)}
      >
        Send
      </button>
    </div>
  );
}

export default ReviewInput;
