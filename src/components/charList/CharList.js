import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endCharList, setEndCharList] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    // componentDidMount() {
    //     this.onRequest();
    // }

    const onRequest = (offset, isHas) => {
        isHas ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(res => uploadItems(res))
    }

    const itemRef = useRef([]);

    const uploadItems = (res) => {
        let ended = false;
        if (res.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...res]);
        setNewItemLoading(false);
        setEndCharList(ended);
        setOffset(offset => offset + 9);

        // this.setState(({ offset, chars }) => ({
        //     chars: [...chars, ...res],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     endCharList: ended,
        // }));
    }

    const onFocus = (id) => {
        itemRef.current.forEach(element => {
            element.classList.remove('char__item_selected');
        });

        itemRef.current[id].classList.add('char__item_selected');
        itemRef.current[id].focus();
    }

    const errorContent = error ? <ErrorMessage /> : null;
    const loadingContent = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list" >
            {errorContent}
            {loadingContent}
            <CharItem
                chars={chars}
                onCharSelected={props.onCharSelected}
                setRef={itemRef}
                onFocus={onFocus} />
            <button
                className="button button__main button__long "
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': endCharList ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

const CharItem = (props) => {
    const { chars, onCharSelected, setRef, onFocus } = props;
    const arrChars = Array.from(chars);

    const res = arrChars.map((item, i) => {
        let imgStyle = { objectFit: 'cover' };
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { objectFit: 'unset' };
        }

        return (
            <CSSTransition key={item.id} timeout={1000} classNames="char__item">
                <li
                    tabIndex={0}
                    ref={el => setRef.current[i] = el}
                    className="char__item "
                    key={item.id}
                    onClick={() => {
                        onCharSelected(item.id);
                        onFocus(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            onCharSelected(item.id);
                            onFocus(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            </CSSTransition>
        )
    });
    
    return (
        <ul className="char__grid">
            <TransitionGroup component={null}>
                {res}
            </TransitionGroup>
        </ul>
    )
}

export default CharList;