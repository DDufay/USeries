import React, {useEffect, useState} from 'react';
import {useSpring} from "react-spring";
import {useScroll} from "react-use-gesture";
import {useDispatch, useSelector} from "react-redux";

import {Results, ResultsScrollable, SearchForm} from "./index";
import {getlatestSeriesEntities, getPopularSeriesEntities, getSearchedSeries} from "../reducers/series";
import {getLatestSeries, getPopularSeries, resetResearch, searchSeries} from "../actions/series";
import {useDebounce} from "../hooks/Debounce";

export const Series = () => {
    const dispatch = useDispatch();
    const popularSeries = useSelector(getPopularSeriesEntities);
    const latestSeries = useSelector(getlatestSeriesEntities);
    const searchedSeries = useSelector(getSearchedSeries);
    const [state, setState] = useState({
        isSearching: false, //todo fetching movieReducer
        active: "search", // todo remove
        query: ""
    });

    const queryDebounce = useDebounce(state.query, 500);

    useEffect(() => {
        dispatch(getPopularSeries());
        dispatch(getLatestSeries());
    }, []);

    useEffect(() => {
        queryDebounce && dispatch(searchSeries(queryDebounce));
    }, [queryDebounce]);

    useEffect(() => {
        if (state.query === "") {
            dispatch(resetResearch());
        }
    }, [state.query]);

    const onTextChange = ({target: {value}}) => {
        setState({
            ...state,
            isSearching: value.length > 0,
            query: value
        });
    };

    const onClear = () => {
        setState({
            ...state,
            query: "",
            isSearching: false
        })
    };

    const clamp = (value, clampAt = 30) => {
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
        <SearchForm onTextChange={onTextChange} value={state.query} onClear={onClear} />
        {state.query === "" && <React.Fragment>
            <div className="lastest-movies">Séries populaires</div>
            <div className="movie-list-scrollable" {...bind()}>
                <ResultsScrollable
                    isSearching={state.isSearching}
                    movies={popularSeries}
                    springStyle={style}
                    type="serie"
                />
            </div>
            <div className="show-movies">
                <div className="lastest-movies">Séries à l'affiche</div>
                <div className="movie-list">
                    <Results
                        isSearching={state.isSearching}
                        movies={latestSeries}
                        type="serie"
                    />
                </div>
            </div>
        </React.Fragment>}
        {searchedSeries && state.query !== "" && <div>
            <div className="movie-list">
                <Results
                    isSearching={state.isSearching}
                    movies={searchedSeries}
                    type="movie"
                />
            </div>
        </div>}
    </div>;
};
