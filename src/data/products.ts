export type Category = "Mushrooms" | "Adaptogens" | "Longevity" | "Vitamins & Minerals" | "Amino Acids & Protein";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  featured: boolean;
  heroTile?: boolean;
  soldOut: boolean;
  shortName: string;
}

export const products: Product[] = [
  { id: "methylene-blue", name: "1% Methylene Blue Solution USP 30ml", shortName: "Methylene Blue", price: 439, category: "Longevity", featured: false, soldOut: false },
  { id: "black-ginger", name: "Freeze Dried Black Ginger 50g", shortName: "Black Ginger", price: 349, category: "Amino Acids & Protein", featured: false, soldOut: false },
  { id: "berberine", name: "Berberine (Liposomal) 90 caps", shortName: "Berberine", price: 539, category: "Longevity", featured: true, soldOut: false },
  { id: "cistanche", name: "Cistanche tubulosa 60 Tablets", shortName: "Cistanche", price: 489, category: "Adaptogens", featured: false, soldOut: false },
  { id: "collagen", name: "Collagen Hydrolysate 450g", shortName: "Collagen", price: 499, category: "Amino Acids & Protein", featured: false, soldOut: false },
  { id: "cordyceps", name: "Cordyceps Extract Powder 30g", shortName: "Cordyceps", price: 279, category: "Mushrooms", featured: false, soldOut: false },
  { id: "fadogia", name: "Fadogia Agrestis 10:1 Extract 60 caps", shortName: "Fadogia Agrestis", price: 379, category: "Adaptogens", featured: false, soldOut: false },
  { id: "lions-mane", name: "Lion's Mane Mushroom 1:1 60 caps", shortName: "Lion's Mane", price: 339, category: "Mushrooms", featured: false, soldOut: false },
  { id: "magnesium", name: "Magnesium Glycinate 180 caps", shortName: "Magnesium", price: 449, category: "Vitamins & Minerals", featured: false, soldOut: false },
  { id: "zinc", name: "MicroZinc 20mg 30 caps", shortName: "MicroZinc", price: 279, category: "Vitamins & Minerals", featured: false, soldOut: false },
  { id: "nmn-powder", name: "NMN 100g Pure Powder", shortName: "NMN Powder", price: 789, category: "Longevity", featured: true, heroTile: true, soldOut: false },
  { id: "pine-pollen", name: "Pine Pollen 50g", shortName: "Pine Pollen", price: 269, category: "Adaptogens", featured: false, soldOut: false },
  { id: "shilajit", name: "Shilajit Resin 30g", shortName: "Shilajit", price: 450, category: "Longevity", featured: true, soldOut: false },
  { id: "ashwagandha", name: "Shoden Ashwagandha 30 Caps", shortName: "Ashwagandha", price: 279, category: "Adaptogens", featured: false, soldOut: false },
  { id: "slc-nmn", name: "SLC Enteric NMN Zinc Free 60ct", shortName: "SLC NMN", price: 349, category: "Longevity", featured: false, soldOut: false },
  { id: "tongkat-solaray", name: "Solaray Tongkat Ali 400mg 60 caps", shortName: "Tongkat Ali (Solaray)", price: 269, category: "Adaptogens", featured: false, soldOut: false },
  { id: "tongkat-extract", name: "Tongkat Ali Extract 60 caps", shortName: "Tongkat Ali Extract", price: 319, category: "Adaptogens", featured: false, soldOut: false },
  { id: "vitamin-d3k2", name: "Vitamin D3 + K2 + C 60 Tablets", shortName: "Vitamin D3+K2", price: 249, category: "Vitamins & Minerals", featured: false, soldOut: false },
  { id: "creatine", name: "Creapure Creatine Monohydrate 300g", shortName: "Creatine", price: 319, category: "Amino Acids & Protein", featured: false, soldOut: true },
  { id: "taurine", name: "Taurine Powder 250g", shortName: "Taurine", price: 229, category: "Amino Acids & Protein", featured: false, soldOut: true },
];

export const categories: Category[] = ["Mushrooms", "Adaptogens", "Longevity", "Vitamins & Minerals", "Amino Acids & Protein"];
