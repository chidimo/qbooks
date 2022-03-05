type AuthorType = {
  id: string;
  name: string;
};

type GenreType = {
  id: string;
  name: string;
};

type TagType = {
  id: string;
  name: string;
};

export declare type BookType = {
  id: string;
  title: string;
  price: number;
  likes: number;
  rating: number;
  currency: string;
  image_url: string;
  featured: boolean | null;
  available_copies: number;
  sellableQuantity: number; // client-only field
  availableForSale: boolean;// client-only field
  full_description: string;
  number_of_purchases: number;
  published_at: string;
  authors: AuthorType[];
  tags: TagType[];
  genres: GenreType[];
};

export declare type UseSingleBookType = {
  error: any;
  loading: boolean;
  book: BookType;
};

export declare type UseBookListType = {
  error: any;
  loading: boolean;
  books: BookType[];
  totalBooks: number;
};

export declare type WhereClauseType = {
  featured?: boolean | null;
  searchTerm?: string | null;
};

export declare type BookAPI = {
  query: {
    useBookList: (where?: WhereClauseType) => UseBookListType;
    useSingleBook: (id: string) => UseSingleBookType;
  };
};
