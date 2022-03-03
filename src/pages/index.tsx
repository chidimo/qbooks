import {Link} from 'react-router-dom';
import {useApi} from 'src/api/ApiContext';
import {useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import {URLSearchParamsInit} from 'react-router-dom';
import {SearchBox} from 'src/components/SearchBox';

const Home = () => {
  const api = useApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');

  useEffect(() => {
    if (searchTerm) {
      setSearchParams({
        searchTerm: searchParams.get('searchTerm'),
      } as URLSearchParamsInit);
    }
  }, []);

  const {books, loading} = api.bookApi.query.useBookList();

  if (loading && !books) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <SearchBox
        searchTerm={searchTerm}
        placeholder="Search books"
        onChange={value => {
          setSearchParams({searchTerm: value});
        }}
      />

      {loading && <p>Refreshing</p>}
      {books?.map((book: any) => {
        return (
          <Link to={`/book/${book.id}`} key={book.id}>
            <div>{book.title}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default Home;
