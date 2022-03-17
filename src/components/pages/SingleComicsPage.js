import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './singleComic.scss';

const SingleComicPage = () => {
    console.log(useParams());
    const { comicsId } = useParams();
    const [comics, setComics] = useState(null);
    const { error, loading, clearError, getComics } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [comicsId])

    const onRequest = () => {
        clearError();
        getComics(comicsId)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (res) => {
        setComics(res);
    }

    const errMsg = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !comics) ? <ComicsView comics={comics} /> : null;

    return (
        <>
            {errMsg}
            {spinner}
            {content}
        </>
    )
}

const ComicsView = ({ comics }) => {
    const { thumbnail, title, description, pages, price, language } = comics;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;