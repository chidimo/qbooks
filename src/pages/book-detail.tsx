import {useParams} from 'react-router-dom';
import {useApi} from 'src/api/ApiContext';

const BookDetail = () => {
  const api = useApi();
  const {bookId} = useParams<Record<any, any>>();
  const {book, loading} = api.bookApi.query.useSingleBook(bookId);

  if (loading && !book) {
    return <div>Loading book</div>;
  }

  return (
    <div>
      {loading && <p>Refreshing</p>}

      <h1>Book Detail: {bookId}</h1>
      <pre>{JSON.stringify(book, null, 2)}</pre>
    </div>
  );
};

export default BookDetail;
