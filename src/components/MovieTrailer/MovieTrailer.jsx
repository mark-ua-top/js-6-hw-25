import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieVideos } from '../../services/api';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import styles from './MovieTrailer.module.css';

const MovieTrailer = ({ movieId }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const getVideos = async () => {
            try {
                setIsLoading(true);

                const data = await fetchMovieVideos(movieId);

                const trailers = data.filter(
                    video =>
                        video.site === 'YouTube' &&
                        (video.type === 'Trailer' || video.type === 'Teaser')
                );

                setVideos(trailers);
            } catch (err) {
                console.error('Error fetching videos:', err);
            } finally {
                setIsLoading(false);
            }
        };

        getVideos();
    }, [movieId]);

    if (isLoading) return <Loader />;

    if (videos.length === 0) {
        return (
            <p className={styles.empty}>
                Трейлери для цього фільму відсутні.
            </p>
        );
    }

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                {videos.map(video => (
                    <li key={video.id} className={styles.item}>
                        <button
                            className={styles.previewBtn}
                            onClick={() => setSelectedVideo(video)}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                alt={video.name}
                                className={styles.thumbnail}
                            />
                            <span className={styles.playIcon}>▶</span>
                        </button>
                        <p className={styles.videoName}>{video.name}</p>
                    </li>
                ))}
            </ul>

            {selectedVideo && (
                <Modal onClose={() => setSelectedVideo(null)}>
                    <div className={styles.playerWrapper}>
                        <iframe
                            className={styles.player}
                            src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                            title={selectedVideo.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

MovieTrailer.propTypes = {
    movieId: PropTypes.number.isRequired,
};

export default MovieTrailer;