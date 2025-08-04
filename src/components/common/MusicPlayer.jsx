import { useRef } from 'react';
const songs = [
    '/audio/1-sanctuary.mp3',
    '/audio/2-sanctuary.mp3',
    '/audio/3-sanctuary.mp3',
    '/audio/before.mp3',
    '/audio/big-shot.mp3',
    '/audio/board-please.mp3',
    '/audio/burning-eyes.mp3',
    '/audio/bye.mp3',
    '/audio/castle-town.mp3',
    '/audio/catmike.mp3',
    '/audio/catmikent.mp3',
    '/audio/chance.mp3',
    '/audio/core.mp3',
    '/audio/cyber-city.mp3',
    '/audio/cyber-world.mp3',
    '/audio/dark-place.mp3',
    '/audio/dark-zone.mp3',
    '/audio/dont-forget.mp3',
    '/audio/down.mp3',
    '/audio/dump.mp3',
    '/audio/fame.mp3',
    '/audio/fno.mp3',
    '/audio/friends.mp3',
    '/audio/funk.mp3',
    '/audio/green.mp3',
    '/audio/guardian.mp3',
    '/audio/hero.mp3',
    '/audio/higher.mp3',
    '/audio/ho-ho-ho-home.mp3',
    '/audio/holy.mp3',
    '/audio/homed.mp3',
    '/audio/hometown.mp3',
    '/audio/hope.mp3',
    '/audio/hotel.mp3',
    '/audio/hymn.mp3',
    '/audio/jevil.mp3',
    '/audio/knife.mp3',
    '/audio/lost.mp3',
    '/audio/medium.mp3',
    '/audio/menu-full.mp3',
    '/audio/night.mp3',
    '/audio/power.mp3',
    '/audio/quiz.mp3',
    '/audio/rude.mp3',
    '/audio/ruder.mp3',
    '/audio/showtime.mp3',
    '/audio/start-menu.mp3',
    '/audio/trash.mp3',
    '/audio/tunnel.mp3',
    '/audio/tv-time.mp3',
    '/audio/tv-world.mp3'
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