import DeleteButton from "./_components/DeleteButton";
import EditButton from "./_components/EditButton";
import ProductDescription from "./_components/ProductDescription";
import ProductDetail from "./_components/ProductDetail";
import ProductImage from "./_components/ProductImage";
import { getProductDetail_1, getProductDetail_2, getProductPhotos } from "./_components/actions";


type Props = {
  params: { productId: string };
};

async function ProductPage({ params }: Props) {
  const images =  await getProductPhotos(params.productId);
  const detail_1 = await getProductDetail_1(params.productId);
  const detail_2 = await getProductDetail_2(params.productId);
  return (
    <div className="flex h-full w-full grow flex-wrap justify-center overflow-y-scroll rounded-b-xl border-2">
      <div className="relative flex h-96 w-2/5 items-center justify-center gap-2 bg-white p-2">
        <ProductImage images={images} />
      </div>
      <div className="relative flex h-96 w-3/5 flex-wrap bg-white">
        <div className="flex h-24 w-full items-center justify-end gap-4 px-8 py-3">
          <DeleteButton productId={params.productId} />
          <EditButton />
        </div>
        <ProductDetail detail_1={detail_1} detail_2={detail_2} />
      </div>
      <ProductDescription productId={params.productId}/>
      <div className="min-h-screen w-2/5 grow overflow-y-scroll bg-gray-400"></div>
    </div>
  );
}

export default ProductPage;