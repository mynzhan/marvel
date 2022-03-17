import { useState } from 'react';

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";

const ComicsPage = () => {
    const [selectedComics, setSelectedComics] = useState(null);

    // state = {
    //     selectedChar: null,
    // }

    const onComicsSelected = (id) => {
        setSelectedComics(id);
    }
    return (
        <>
            <AppBanner />
            <SingleComic comicsId={selectedComics} />
            <ComicsList onComicsSelected={onComicsSelected} />
        </>
    )
}

export default ComicsPage;