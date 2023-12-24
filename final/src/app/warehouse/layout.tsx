import HeaderBar from "./_components/HeaderBar";

type Props = {
  children: React.ReactNode;
};
export default async function WarehouseLayout({ children }: Props) {
  return (
    <main className="flex flex-col h-screen max-w-7xl mx-auto py-5">
      <HeaderBar/>
      <div className="w-full h-screen">{children}</div>
    </main>
  );
}
