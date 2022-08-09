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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/video")
public class VideoApi {

    private final VideoService videoService;
    private final MusicService musicService;

    private static final int listSize =18;
    private static final int infoSize=10;

    /**
     * 해당 곡 최신 영상 리스트 - 곡 페이지 latest 무한 스크롤
     *
     * 요청 파라미터 예시: /video/list/{곡 아이디}/latest/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/list/{music_id}/latest/{page}")
    public Slice<VideoDto> newestList(@PathVariable Long music_id,@PathVariable int page){
        Music music=musicService.getMusicInfo(music_id).get();
        Slice<Video> videoList = videoService.findNewestVideoList(page, listSize,music, VideoScope.PUBLIC);
        return videoList.map(VideoDto::new);
    }

    /**
     * 해당 곡 조회수&좋아요 영상 리스트 - 곡 페이지 hit&like 무한 스크롤
     *
     * 요청 파라미터 예시: /video/list/{곡 아이디}/hitlike/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/list/{music_id}/hitlike/{page}")
    public Slice<VideoDto> hitlikeList(@PathVariable Long music_id,@PathVariable int page){
        Music music=musicService.getMusicInfo(music_id).get();
        Slice<Video> videoList = videoService.findHitLikeVideoList(page, listSize,music, VideoScope.PUBLIC);
        return videoList.map(VideoDto::new);
    }

    /**
     * 인기 영상 리스트 - 메인 페이지 무한 스크롤
     */
    @GetMapping("/main/{page}")
    public Slice<VideoDto> mainList(@PathVariable int page){
        int size=12;
        return videoService.findMainPageVideoList(page,size,VideoScope.PUBLIC).map(VideoDto::new);
    }



}
