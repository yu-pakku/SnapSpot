export interface Spot {
  id: number;
  imageSrc: string;
  title: string;
  name: string;
  location: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}