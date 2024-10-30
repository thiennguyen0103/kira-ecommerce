type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
};
