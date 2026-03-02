import type { Product } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  isHero?: boolean;
}

export function ProductCard({ product, isHero = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={`group relative glass glass-hover rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer flex flex-col h-full ${
        product.soldOut ? "opacity-60 saturate-50" : ""
      }`}
    >
      {/* Product image */}
      <div className={`bg-[rgba(27,67,50,0.3)] flex items-center justify-center overflow-hidden ${isHero ? "min-h-[280px] flex-1" : "h-[240px]"}`}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-heading text-3xl text-primary opacity-30">{product.shortName.charAt(0)}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="font-heading text-lg text-foreground leading-snug">
          {product.shortName}
        </h3>
        <p className="font-body text-sm text-accent-gold font-medium">
          {product.price} NOK
        </p>
      </div>

      {/* Hover overlay — "View" button */}
      {!product.soldOut && (
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4">
          <span className="block text-center glass rounded-full py-2 font-body text-xs uppercase tracking-wider text-accent-gold">
            Se detaljer
          </span>
        </div>
      )}

      {/* Sold out badge */}
      {product.soldOut && (
        <div className="absolute top-3 right-3 bg-[rgba(239,68,68,0.2)] backdrop-blur-sm border border-[rgba(239,68,68,0.3)] rounded-full px-3 py-1">
          <span className="font-body text-xs text-red-400 uppercase tracking-wider">Utsolgt</span>
        </div>
      )}
    </Link>
  );
}
