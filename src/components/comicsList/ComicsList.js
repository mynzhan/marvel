import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';

const ComicsList = (props) => {
    const { error, loading, getAllComics } = useMarvelService();

    const [comics, setComics] = useState([]);
    const [newItem, setNewItem] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItem(true) : setNewItem(false);        
        getAllComics(offset)
            .then(onComicsListLoaded)   
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComics([...comics, ...newComicsList]);
        setNewItem(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(items) {
        const arr = items.map((item, i) => {
            return (
                <li 
                    className="comics__item" 
                    key={i}
                    onClick={() => {
                        props.onComicsSelected(item.id);
                    }}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className='comics__grid'>
                {arr}
            </ul>
        )
    }

    const items = renderItems(comics);
    const errorMsg = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItem ? <Spinner /> : null;


    return (
        <div className="comics__list">
                {errorMsg}
                {items}
                {spinner}            
            <button 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;