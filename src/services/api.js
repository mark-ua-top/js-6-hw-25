import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmJkYWRiZWQ1YzJiYjkwODZiYjRmNzQ3NWQ5YmZiZiIsIm5iZiI6MTc4MjYyODQ5Mi42NjMsInN1YiI6IjZhNDBjMDhjYzA2MmZkMTZjMWViODJmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6BYZgl4oqmYYMgLohrA8Tl34WCVP_JOHiEEvplZ4pk8`,
    },
    params: {
        language: 'uk-UA',
    },
});

export const fetchTrendingMovies = async () => {
    const { data } = await axiosInstance.get('/trending/movie/day');
    return data.results;
};

export const searchMovies = async query => {
    const { data } = await axiosInstance.get('/search/movie', {
        params: { query },
    });
    return data.results;
};

export const fetchMovieDetails = async movieId => {
    const { data } = await axiosInstance.get(`/movie/${movieId}`);
    return data;
};

export const fetchMovieCredits = async movieId => {
    const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
    return data.cast;
};

export const fetchMovieReviews = async movieId => {
    const { data } = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return data.results;
};

export const fetchMovieVideos = async movieId => {
    const { data } = await axiosInstance.get(`/movie/${movieId}/videos`, {
        params: { language: 'en-US' },
    });
    return data.results;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';