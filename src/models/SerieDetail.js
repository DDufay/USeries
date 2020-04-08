export const SerieDetail = data => {
    return {
        id: data.id || '',
        title: data.name || '',
        date: data.first_air_date || '',
        overview: data.overview || '',
        vote: data.vote_average || '',
        picture: data.backdrop_path ? process.env.REACT_APP_MOVIE_DB_IMG + 'w780' + data.backdrop_path : process.env.PUBLIC_URL + '/placeholder.png',
        genres: data.genres || [],
        authors: data.created_by || [],
        networks: data.networks || [],
        numberOfEpisodes: data.number_of_episodes,
        numberOfSeasons: data.number_of_seasons,
        seasons: data.seasons || []
    }
};
