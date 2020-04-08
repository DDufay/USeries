import React from 'react';
import {isEmpty} from "lodash";

export const MovieDetailItem = ({ movie }) => {
    return <>
        <div className="tagline">
            <span className="bold">Slogan</span>
            <span className="presentation">{movie.tagline}</span>
        </div>
        <div className="genres">
            <span className="bold">Genres</span>
            <span className="presentation">
                { (movie.genres || []).map(genre => <span key={genre.name}>{genre.name} </span>)}
            </span>
        </div>
        <div className="serie-description">
            <span className="bold">Description</span>
            <div>{movie.overview}</div>
        </div>
        {!isEmpty(movie.video) && <div className="serie-video">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.video[0].key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                allowFullScreen
            />
        </div>}
    </>
};
