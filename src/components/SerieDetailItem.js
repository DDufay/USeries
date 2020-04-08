import React from 'react';
import {isEmpty} from "lodash";

export const SerieDetailItem = ({ serie }) => {
    return <>
        <div className="authors">
            <span className="bold">Auteurs</span>
            <span className="presentation">
                    { (serie.authors || []).map(author => <span key={author.name}>{author.name} </span>)}
                    </span>
        </div>
        <div className="genres">
            <span className="bold">Genres</span>
            <span className="presentation">
                        { (serie.genres || []).map(genre => <span key={genre.name}>{genre.name} </span>)}
                    </span>
        </div>
        {!isEmpty(serie.video) && <div className="serie-video">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${serie.video[0].key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                allowFullScreen
            />
        </div>}
        <div className="serie-description">
            <span className="bold">Description</span>
            <div>{serie.overview}</div>
        </div>
    </>
};
