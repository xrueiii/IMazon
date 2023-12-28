"use client";

import { addProduct } from "../../actions";

export type FinishButtonProps = {
    name: string;
    description: string;
}

export default function FinishButton( { name, description }: FinishButtonProps) {
    const handleFinish = async() => {
        await addProduct(name,description);
    }

    return (
        <button
                data-testid="add-submit-button"
                // type="submit"
                onClick={handleFinish}
                className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-sm text-white hover:bg-teal-700"
              >
                Finish
        </button>
    );
}