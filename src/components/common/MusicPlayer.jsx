import { useRef } from 'react';
const songs = [
    '/src/assets/audio/1-sanctuary.mp3',
    '/src/assets/audio/2-sanctuary.mp3',
    '/src/assets/audio/3-sanctuary.mp3',
    '/src/assets/audio/before.mp3',
    '/src/assets/audio/big-shot.mp3',
    '/src/assets/audio/board-please.mp3',
    '/src/assets/audio/burning-eyes.mp3',
    '/src/assets/audio/bye.mp3',
    '/src/assets/audio/castle-town.mp3',
    '/src/assets/audio/catmike.mp3',
    '/src/assets/audio/catmikent.mp3',
    '/src/assets/audio/chance.mp3',
    '/src/assets/audio/core.mp3',
    '/src/assets/audio/cyber-city.mp3',
    '/src/assets/audio/cyber-world.mp3',
    '/src/assets/audio/dark-place.mp3',
    '/src/assets/audio/dark-zone.mp3',
    '/src/assets/audio/dont-forget.mp3',
    '/src/assets/audio/down.mp3',
    '/src/assets/audio/dump.mp3',
    '/src/assets/audio/fame.mp3',
    '/src/assets/audio/fno.mp3',
    '/src/assets/audio/friends.mp3',
    '/src/assets/audio/funk.mp3',
    '/src/assets/audio/green.mp3',
    '/src/assets/audio/guardian.mp3',
    '/src/assets/audio/hero.mp3',
    '/src/assets/audio/higher.mp3',
    '/src/assets/audio/ho-ho-ho-home.mp3',
    '/src/assets/audio/holy.mp3',
    '/src/assets/audio/homed.mp3',
    '/src/assets/audio/hometown.mp3',
    '/src/assets/audio/hope.mp3',
    '/src/assets/audio/hotel.mp3',
    '/src/assets/audio/hymn.mp3',
    '/src/assets/audio/jevil.mp3',
    '/src/assets/audio/knife.mp3',
    '/src/assets/audio/lost.mp3',
    '/src/assets/audio/medium.mp3',
    '/src/assets/audio/menu-full.mp3',
    '/src/assets/audio/night.mp3',
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