import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Spinner from '../spinner/Spinner';
import AppHeader from "../appHeader/AppHeader";
// import { ComicsPage, MainPage, Page404, SingleComicPage } from "../pages";

import './app.css';


const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicsPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:comicsId" element={<SingleComicPage />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;