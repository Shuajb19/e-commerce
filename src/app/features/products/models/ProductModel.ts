export interface Product {
  id: number;
  code: string;
  generic_name_en: string;
  brands?: string;
  categories?: string;
  image_url?: string;
  price?: number;
}
