import { auth } from "@/lib/auth";
import DeleteButton from "./_components/DeleteButton";
import EditButton from "./_components/EditButton";
import ProductDescription from "./_components/ProductDescription";
import ProductDetail from "./_components/ProductDetail";
import ProductImage from "./_components/ProductImage";
import ReviewInput from "./_components/ReviewInput";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import {
  getProductDetail_1,
  getProductDetail_2,
  getProductPhotos,
} from "./_components/actions";
import { publicEnv } from "@/lib/env/public";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { commentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: { productId: string };
};

async function ProductPage({ params }: Props) {
  const images = await getProductPhotos(params.productId);
  const detail_1 = await getProductDetail_1(params.productId);
  const detail_2 = await getProductDetail_2(params.productId);

  const comments = await db.query.commentsTable.findMany({
    where: eq(commentsTable.productId, params.productId),
    with: {
      user: {
        columns: {
          name: true,
        }
      }
    },
    columns: {
      content: true,
      userId: true,
      rate: true,
    },
  });

  let rate:GLfloat = 0;
  comments.forEach((comment) => {
    rate += comment.rate;
  })

  rate = rate/comments.length;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  return (
    <div className="flex h-full w-full grow flex-wrap justify-center overflow-y-scroll rounded-b-xl border-2 px-10">
      <div className="relative flex h-96 w-2/5 items-center justify-center gap-2 bg-white p-2">
        <ProductImage images={images} />
      </div>
      <div className="relative flex h-96 w-3/5 flex-wrap bg-white">
        <div className="flex h-24 w-full items-center justify-end gap-4 px-8 py-3">

          <DeleteButton productId={params.productId} />
          <EditButton />
        </div>
        <ProductDetail detail_1={detail_1} detail_2={detail_2} rate={rate.toString().substring(0,3)} />
      </div>
      <div className="mt-16 px-8 flex justify-between w-full">
        <ProductDescription productId={params.productId} />
        <div className="min-h-screen w-2/5 grow overflow-y-scroll border-2 bg-white rounded-md">
          <p className="font-normal p-5 text-2xl">評論</p>
          {userId !== detail_1.sellerdisplayId && <ReviewInput userId={userId} productId={params.productId}/>}
          { comments.length === 0 && <p className="w-full text-gray-500 text-center mt-10">There's still no comment for this product.</p>}
          <div className="mt-5 w-full flex-col gap-2">
            {comments.map((comment, index) => 
              <div key={index} className="w-full border py-16 px-5">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <p>{comment.user.name}:</p>
                    <p>{comment.content}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                  {
                    comment.rate === 1 && 
                      <>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarOutlineIcon/>
                        <StarOutlineIcon/>
                        <StarOutlineIcon/>
                        <StarOutlineIcon/>
                      </>
                  }
                  {
                    comment.rate === 2 && 
                      <>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarOutlineIcon/>
                        <StarOutlineIcon/>
                        <StarOutlineIcon/>
                      </>
                  }
                  {
                    comment.rate === 3 && 
                      <>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarOutlineIcon/>
                        <StarOutlineIcon/>
                      </>
                  }
                  {
                    comment.rate === 4 && 
                      <>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarOutlineIcon/>
                      </>
                  }
                  {
                    comment.rate === 5 && 
                      <>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                        <StarRateIcon className="text-yellow-500"/>
                      </>
                  }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      
  );
}

export default ProductPage;
