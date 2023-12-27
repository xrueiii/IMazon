import ProductImage from "./_components/ProductImage";

type Props = {
  params: { productId: string };
};

function ProductPage({ params }: Props) {
  return (
    <div className="flex h-full w-full grow flex-wrap justify-center overflow-y-scroll rounded-b-xl border-2">
      <div className="relative flex h-96 w-2/5 items-center justify-center gap-2 bg-white p-2">
        <ProductImage productId={params.productId} />
      </div>
      <div className="relative flex h-96 w-3/5 flex-wrap bg-white">
        <div className="flex h-24 w-full items-center justify-end gap-4 px-8 py-3">
          {/*<DeleteButton/>
                    <EditButton/>*/}
        </div>
        <div className="flex h-48 w-full flex-wrap gap-x-4 bg-white px-8">
          {/*<ProductDetail/>*/}
        </div>
        <div className="flex h-24 w-full items-center justify-start gap-4 px-8 py-3">
          {/*<ProductStyle/>*/}
        </div>
      </div>
      {/*<ProductDescription/>*/}
      <div className="min-h-screen w-2/5 grow overflow-y-scroll bg-gray-400"></div>
    </div>
  );
}

export default ProductPage;
