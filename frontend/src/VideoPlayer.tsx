import ReactPlayer from 'react-player/lazy';
import React, {useEffect, useState} from "react";

type VideoPlayerProps = {
    title: string;
    vodPlaylistId: string;
}

const VideoPlayer = ({title, vodPlaylistId}: VideoPlayerProps) => {
    const [playIndex, setPlayIndex] = useState(0);
    const playList = [
        {index:1, url: 'https://youtube.com/shorts/h-f7OpOvcY4?feature=share'},
        {index:2, url: 'https://youtube.com/shorts/yeDwMq0QZCU?feature=share'},
        {index:3, url: 'https://youtube.com/shorts/UHKyOAWXVCM?feature=share'}
    ];

    const handleNextVideo = (video: string | any[], playIndex: number) => {
        if(playIndex === video.length - 1){
            setPlayIndex(0);
        }else{
            setPlayIndex(playIndex + 1);
        }
    }

    const selectVideo = (index: number) => {
        setPlayIndex(index);
    }

    if(playList === null) return <p>Loading...</p>;

    return (
        <>
            <h2>Player Test</h2>
            <ReactPlayer
                url={playList[playIndex].url}
                config={{
                    youtube: {
                        playerVars: {fs: 0, sshowinfo: 0}
                    }
                }}
                playing
                controls
                muted
                progressInterval={1000}
                pip={true}
                onEnded={() => {handleNextVideo(playList, playIndex)}}
                width={'100vw'}
                height={'100vh'}
            />
        </>
    )
}

export default VideoPlayer;