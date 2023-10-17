export interface Item {
  id: number;
  name: string;
  thumbnail: Thumbnail;
  description: string;
  comics: GeneralItems;
  series: GeneralItems;
}

interface Thumbnail {
  extension?: string;
  path?: string;
}

interface GeneralItems {
  available: number;
  returned: number;
  collectionURI: string;
  items: GeneralItem[];
}

interface GeneralItem {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface Props {
  items: Item[];
}

export interface State {
  currentPage: number;
  items: Item[];
  myRef: React.RefObject<HTMLDivElement>;
}
