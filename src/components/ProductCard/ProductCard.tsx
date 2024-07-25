import Image from "next/image";
import { Product } from "@/interfaces/Product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
}) => {
  return (
    <Link
      href={`/product/${product.id}`}
      passHref
      className="border p-4 rounded-lg shadow-md"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
        width={256}
        height={256}
        priority={priority}
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-800 font-bold">${product.price}</p>
    </Link>
  );
};

export default ProductCard;
