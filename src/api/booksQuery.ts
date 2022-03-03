const AUTHOR = `
  id
  name
`;

export const BOOK = `
  id
  title
  price
  currency
  image_url
  available_copies
  featured
  authors{
    ${AUTHOR}
  }
`;

export const booksQueryString = {
  LIST_BOOKS: `
  query listBooks($where: JSON) {
    books(where:$where) {
      ${BOOK}
    }
  }
  `,

  SINGLE_BOOK: `
  query singleBook($id:ID!, $publicationState: PublicationState) {
    book(id:$id, publicationState:$publicationState){
      id
      title
    }
  }
  `,
};
