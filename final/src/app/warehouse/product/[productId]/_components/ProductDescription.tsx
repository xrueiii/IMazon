type ProductDescriptionProps = {
    productDescription: string; 
}


export default function ProductDescription( { productDescription }: ProductDescriptionProps) {
    return(
    <div className="p-10 w-3/5 break-normal">
        {productDescription}
    </div>)
}