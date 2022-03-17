import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
// import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComic = (props) => {
    const [comics, setComics] = useState(null);

    const { error, loading, clearError, getComics } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [props.comicsId])

    const onRequest = () => {
        if (!props.comicsId) {
            console.log('no id');
            return;
        }
        console.log('onRequest');
        getComics(props.comicsId)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (res) => {
        setComics(res);
    }

    const content = comics ? <ComicsView comics={comics} /> : null;

    return (
        <div className="single-comic">
            {content}
        </div>
    )
}

const ComicsView = ({comics}) => {
    const { thumbnail, title, description, pages, price } = comics;
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">
                    {description !== 'No description' ? description : "This comics don't have a description"}
                </p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic;