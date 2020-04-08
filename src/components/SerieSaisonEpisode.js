import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch} from "react-redux";

import {getSerieSeasonById} from "../actions/series";

export const SerieSeasonEpisode = ({ episode }) => {
    const [isWatched, setWatched] = useState(false);
    return <div className="flex justify-space-between episode-detail">
        <div className="flex">
            <div className="number">{episode.episode_number}</div>
            <div className="flex flex--column episode">
                <div className="flex">{episode.name}</div>
                <div className="flex vote">
                    {[...Array(parseInt(episode.vote_average, 10))].map(item => <i key={item} className="fas fa-star" />)}
                    <span> | {moment(episode.air_date).format('D MMM Y')}</span>
                </div>
            </div>
        </div>
        <div className="flex watch">
            {isWatched
                ? <i className="fas fa-check-circle" onClick={() => setWatched(!isWatched)} />
                : <i className="far fa-circle" onClick={() => setWatched(!isWatched)} />
            }
        </div>
    </div>
};
