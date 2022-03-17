import { useHttp } from '../hooks/http.hooks';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBasse = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=8a17a113572c0cc54f25ffd3610ec859';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {        
        const res = await request(`${_apiBasse}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBasse}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBasse}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBasse}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);

    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0, 250) + "..." : 'No description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ? comics.description.slice(0, 250) + "..." : 'No description',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price ? comics.prices[0].price : 'No price',
            language: comics.textObjects.language || 'en-us',
            homepage: comics.resourceURI,
            pages: comics.pageCount ? comics.pageCount + ' pages' : 'No pages',
        }
    }

    return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics }
}


export default useMarvelService;