import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';

class CharList extends Component {
    componentDidMount() {
        this.onRequest();
    }

    state = {
        chars: [],
        error: false,
        loading: true,
        newItemLoading: false,
        offset: 210,
        endCharList: false,
    }

    marvelService = new MarvelService();

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    uploadItems = (res) => {
        let ended = false;
        if (res.length < 9) {
            ended = true;
        }

        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...res],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            endCharList: ended,
        }));
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(res => this.uploadItems(res))
            .catch(this.onError);
    }

    render() {
        const { loading, error, chars, offset, newItemLoading, endCharList } = this.state;
        const errorContent = error ? <ErrorMessage /> : null;
        const loadingContent = loading ? <Spinner /> : null;
        const content = !(error || loading) ? <CharItem chars={chars} onCharSelected={this.props.onCharSelected} /> : null;

        return (
            <div className="char__list">
                {errorContent}
                {loadingContent}
                {content}
                <button 
                    className="button button__main button__long "
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': endCharList ? 'none' : 'block'}}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

// class CharItem extends Component {
//     render() {
//         const { chars } = this.props;
//         const arrChars = Array.from(chars);
//         let imgStyle = { 'objectFit': 'cover' };

//         return (
//             <ul className="char__grid">
//                 {
//                     arrChars.map((item) => {
//                         if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                             imgStyle = { 'objectFit': 'unset' };
//                         }
//                         return (
//                             <li
//                                 className="char__item"
//                                 key={item.id}
//                                 onClick={() => this.props.onCharSelected(item.id)}
//                             >
//                                 <img src={item.thumbnail} alt={item.name} style={imgStyle} />
//                                 <div className="char__name">{item.name}</div>
//                             </li>
//                         )
//                     })
//                 }
//             </ul>
//         )
//     }
// }

const CharItem = (props) => {
    const { chars, onCharSelected } = props;
    const arrChars = Array.from(chars);
    return (
        <ul className="char__grid">
            {
                arrChars.map((item) => {
                    let imgStyle = { objectFit: 'cover' };
                    if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                        imgStyle = { objectFit: 'unset'};
                    }
                    console.log(item.thumbnail)
                    return (
                        <li
                            className="char__item"
                            key={item.id}
                            onClick={() => onCharSelected(item.id)}
                        >
                            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                            <div className="char__name">{item.name}</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default CharList;