export const Movie = data => {
    return {
        id: data.id || '',
        title: data.title || '',
        date: data.release_date || '',
        overview: data.overview || '',
        vote: data.vote_average || '',
        picture: data.poster_path ? process.env.REACT_APP_MOVIE_DB_IMG + 'w300' + data.poster_path : process.env.PUBLIC_URL + '/placeholder.png',
    }
};
