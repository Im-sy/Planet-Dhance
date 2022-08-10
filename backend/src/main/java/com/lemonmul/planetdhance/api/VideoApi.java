package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
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
     * 국가 랭킹, 인기 가수, 인기 영상 리스트 - 메인 페이지 진입
     *
     * 요청 파라미터 예시: /video/main
     * 영상 리스트 size는 12개
     */
//    @GetMapping("/main")
//    public MainPageResponse mainListAndRankingAndArtistList(){
//
//
//    }

    /**
     * 인기 영상 리스트 - 메인 페이지 무한 스크롤
     *
     * 요청 파라미터 예시: /video/main/{page 번호}
     * size는 기본값 18
     */
    @GetMapping("/main/{page}")
    public Slice<VideoDto> mainList(@PathVariable int page){
        return videoService.findMainPageVideoList(page,listSize,VideoScope.PUBLIC).map(VideoDto::new);
    }

    /**
     * 랜덤 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/random/{user_id}
     * size는 기본값 10개
     * TODO 좋아요 여부, 해시태그 리스트 해결하기
     */
    @GetMapping("/random")
    public List<VideoPlayDto> randomVideoInfoList(){
        return videoService.findRandomVideoInfoList(infoSize).stream()
                .map(VideoPlayDto::new).collect(Collectors.toList());
    }

    @Data
    static class VideoPlayDto {
        private Long hit;
        private String videoUrl;
        private List<String> tagList;
        private boolean like;
        private int likeCnt;

        public VideoPlayDto(Video video) {
            hit=video.getHit();
            videoUrl= video.getVideoUrl();
            likeCnt=video.getLikes().size();
        }
    }

    @Data
    static class MainPageResponse{

    }

    @Data
    static class TagDto{
        private Long id;
        private String name;
        private TagType type;

        public TagDto(Tag tag) {
            id=tag.getId();
            name= tag.getName();
            type=tag.getType();
        }
    }

}
