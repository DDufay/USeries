import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {getSerieSeasonById} from "../actions/series";
import {SerieSeasonEpisode} from "./SerieSaisonEpisode";

export const SerieSeasonItem = ({ serie }) => {
    const [tab, setTab] = useState(serie.seasons[0].id);
    const dispatch = useDispatch();

    const onSeasonCLick = season => {
        setTab(season.id);
        dispatch(getSerieSeasonById(serie.id, season.season_number));
    };

    useEffect(() => {
        dispatch(getSerieSeasonById(serie.id, serie.seasons[0].season_number));
    }, []);

    return <>
        <div className="tabs">
            {(serie.seasons || []).map(season => {
                return <div
                    className={`tab ${season.id === tab ? 'tab-active' : ''}`}
                    key={season.id}
                    onClick={() => onSeasonCLick(season)}
                >
                    {season.name}
                </div>
            })}
        </div>

        <div className="flex flex--column">
            {(serie.seasons.find(s => s.id === tab).episodes || []).map(episode => <SerieSeasonEpisode key={episode.id} episode={episode} /> )}
        </div>
    </>
};
