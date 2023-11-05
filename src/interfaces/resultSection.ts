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

export interface GeneralItem {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface ResultSectionProps {
  items: Item[] | undefined;
  isSearchStart: boolean;
}
