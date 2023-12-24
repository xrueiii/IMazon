import HeaderBar from "./_components/HeaderBar";

type Props = {
  children: React.ReactNode;
};
export default async function WarehouseLayout({ children }: Props) {
  return (
    <main className="flex flex-col h-screen max-w-7xl mx-auto">
      <HeaderBar/>
      <div className="w-full">{children}</div>
    </main>
  );
}
