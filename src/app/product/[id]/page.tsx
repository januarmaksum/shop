import dynamic from "next/dynamic";

const ProductDetail = dynamic(() => import("./[id]"));

export default function ProductDetailPage() {
  return <ProductDetail />;
}
