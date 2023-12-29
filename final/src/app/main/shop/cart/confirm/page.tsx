import NoButton from "./_components/NoButton";
import YesButton from "./_components/YesButton";

async function ConfirmPage() {
  return (
    <div className="flex h-full w-full flex-wrap justify-center gap-8 rounded-b-xl border-2 px-10">
      <div className="flex h-40 w-full items-end justify-center py-4 text-3xl font-semibold">
        <span>你確定要結帳嗎？</span>
      </div>
      <div className="flex h-40 w-full items-start justify-center gap-4">
        <NoButton />
        <YesButton />
      </div>
    </div>
  );
}

export default ConfirmPage;
