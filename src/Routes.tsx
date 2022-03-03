import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Suspense, lazy} from 'react';

import {Container} from 'src/components/Container';
import {ErrorBoundary} from './components/ErrorBoundary';

const Index = lazy(() => import('src/pages/index'));
const BookDetail = lazy(() => import('src/pages/book-detail'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Container />}>
              <Route path="book/:bookId" element={<BookDetail />} />
              <Route path="" element={<Index />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  );
};
