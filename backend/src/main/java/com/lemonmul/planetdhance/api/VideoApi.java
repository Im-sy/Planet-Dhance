package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.service.MusicService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/video")
public class VideoApi {

    private final VideoService videoService;
    private final MusicService musicService;

    private static final int size=18;

    /**
     * 영상 리스트 - 최신
     *
     * 요청 파라미터 예시: /video/{곡 아이디}/latest/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/{music_id}/latest/{page}")
    public Slice<VideoDto> newestList(@PathVariable Long music_id,@PathVariable int page){
        Music music=musicService.getMusicInfo(music_id).get();
        Slice<Video> videoList = videoService.findNewestVideoList(page,size,music, VideoScope.PUBLIC);
        return videoList.map(VideoDto::new);
    }

    /**
     * 영상 리스트 - 조회수&좋아요
     *
     * 요청 파라미터 예시: /video/{곡 아이디}/hitlike/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/list/{music_id}/hitlike/{page}")
    public Slice<VideoDto> hitlikeList(@PathVariable Long music_id,@PathVariable int page){
        Music music=musicService.getMusicInfo(music_id).get();
        Slice<Video> videoList = videoService.findHitLikeVideoList(page,size,music, VideoScope.PUBLIC);
        return videoList.map(VideoDto::new);
    }

}
