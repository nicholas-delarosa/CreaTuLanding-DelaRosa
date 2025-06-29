import { useRef } from 'react';
const songs = [
    '/src/assets/audio/before.mp3',
    '/src/assets/audio/big-shot.mp3',
    '/src/assets/audio/board-please.mp3',
    '/src/assets/audio/bye.mp3',
    '/src/assets/audio/castle-town.mp3',
    '/src/assets/audio/chance.mp3',
    '/src/assets/audio/core.mp3',
    '/src/assets/audio/cyber-city.mp3',
    '/src/assets/audio/cyber-world.mp3',
    '/src/assets/audio/dont-forget.mp3',
    '/src/assets/audio/down.mp3',
    '/src/assets/audio/fame.mp3',
    '/src/assets/audio/green.mp3',
    '/src/assets/audio/hero.mp3',
    '/src/assets/audio/holy.mp3',
    '/src/assets/audio/homed.mp3',
    '/src/assets/audio/hotel.mp3',
    '/src/assets/audio/jevil.mp3',
    '/src/assets/audio/knife.mp3',
    '/src/assets/audio/lost.mp3',
    '/src/assets/audio/medium.mp3',
    '/src/assets/audio/menu-full.mp3',
    '/src/assets/audio/power.mp3',
    '/src/assets/audio/quiz.mp3',
    '/src/assets/audio/rude.mp3',
    '/src/assets/audio/ruder.mp3',
    '/src/assets/audio/showtime.mp3',
    '/src/assets/audio/start-menu.mp3',
    '/src/assets/audio/trash.mp3',
    '/src/assets/audio/tunnel.mp3',
    '/src/assets/audio/tv-time.mp3',
    '/src/assets/audio/tv-world.mp3'
];

function getRandomSong() {
    return songs[Math.floor(Math.random() * songs.length)];
}

function MusicPlayer() {
    const audioRef = useRef(null);

    const playRandomSong = () => {
        if (audioRef.current) {
            audioRef.current.src = getRandomSong();
            audioRef.current.play();
        }
    };

    return (
        <div className="music-player">
            <button className="button" onClick={playRandomSong}>
                Música de compras al azar
            </button>
            <audio ref={audioRef} loop />
        </div>
    );
}

export default MusicPlayer;