"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Product } from "@/interfaces/Product";
import Image from "next/image";

const ProductDetail: React.FC = () => {
  const pathname = usePathname();
  const productId = pathname.split("/").pop();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error("Product not found");
            } else {
              throw new Error("An error occurred while fetching the product");
            }
          }
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error.message);
          setProduct(null);
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <Image
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 rounded-lg shadow-md object-contain"
        width={200}
        height={200}
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-2">Category: {product.category}</p>
      <p className="text-lg font-semibold mb-2">Brand: {product.brand}</p>
      <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
      <p className="text-lg font-semibold mb-2">Stock: {product.stock}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tags:</h2>
        <ul className="list-disc list-inside">
          {product.tags.map((tag, index) => (
            <li key={index} className="text-gray-600">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4">
        {product.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product image ${index + 1}`}
            className="rounded-lg shadow-md object-contain"
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
