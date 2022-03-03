export declare type Book = {
  id: string;
  title: string;
  price: number;
  available_copies: number;
  featured: boolean | null;
};

export declare type UseSingleBookType = {
  error: any;
  loading: boolean;
  book: Book;
};

export declare type UseBookListType = {
  error: any;
  loading: boolean;
  books: Book[];
};

export declare type BookAPI = {
  query: {
    useBookList: () => UseBookListType;
    useSingleBook: (id: string) => UseSingleBookType;
  };
};
