import React, {useEffect, useState} from 'react';
import {useSpring} from "react-spring";
import {useScroll} from "react-use-gesture";
import {useDispatch, useSelector} from "react-redux";

import {Results, ResultsScrollable} from "./index";
import {getlatestSeriesEntities, getPopularSeriesEntities} from "../reducers/series";
import {getLatestSeries, getPopularSeries} from "../actions/series";

export const Series = () => {
    const dispatch = useDispatch();
    const popularSeries = useSelector(getPopularSeriesEntities);
    const latestSeries = useSelector(getlatestSeriesEntities);
    const [state, setState] = useState({
        isSearching: false, //todo fetching movieReducer
        active: "search", // todo remove
        query: ""
    });

    useEffect(() => {
        dispatch(getPopularSeries());
        dispatch(getLatestSeries());
    }, []);

    const clamp = (value: number, clampAt: number = 30) => {
        if (value > 0) {
            return value > clampAt ? clampAt : value;
        } else {
            return value < -clampAt ? -clampAt : value;
        }
    };
    const [style, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)"
    }));

    const bind = useScroll(event => {
        set({
            transform: `perspective(500px) rotateY(${
                event.scrolling ? clamp(event.delta[0]) : 0
            }deg)`
        });
    });

    return <div className="movies">
        {/*<SearchForm onTextChange={onTextChange} />*/}
        <div className="lastest-movies">Séries populaires</div>
        <div className="movie-list-scrollable" {...bind()}>
            <ResultsScrollable
                isSearching={state.isSearching}
                movies={popularSeries}
                springStyle={style}
            />
        </div>
        <div className="show-movies">
            <div className="lastest-movies">Séries à l'affiche</div>
            <div className="movie-list">
                <Results
                    isSearching={state.isSearching}
                    movies={latestSeries}
                />
            </div>
        </div>
    </div>;
};
