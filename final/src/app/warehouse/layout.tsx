import HeaderBar from "./_components/HeaderBar";
import PageTab from "./_components/PageTab";

type Props = {
  children: React.ReactNode;
};
export default async function WarehouseLayout({ children }: Props) {
  return (
    <main className="flex flex-col h-screen max-w-7xl mx-auto">
      <HeaderBar/>
      <PageTab/>
      <div className="w-full">{children}</div>
    </main>
  );
}
