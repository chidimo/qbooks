const AUTHOR = `
  id
  name
`;

const GENRE = `
  id
  name
`;

const TAG = `
  id
  name
`;

export const BOOK = `
  id
  title
  price
  likes
  rating
  currency
  image_url
  featured
  available_copies
  full_description
  number_of_purchases
  published_at
  authors {
    ${AUTHOR}
  }
  genres {
    ${GENRE}
  }
  tags {
    ${TAG}
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
