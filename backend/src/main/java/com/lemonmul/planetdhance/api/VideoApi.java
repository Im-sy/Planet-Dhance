package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.service.MusicService;
import com.lemonmul.planetdhance.service.UserService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/video")
public class VideoApi {

    private final VideoService videoService;
    private final MusicService musicService;
    private final UserService userService;

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
     * 국가 랭킹, 인기 영상 리스트 - 메인 페이지 진입
     *
     * 요청 파라미터 예시: /video/main
     * 영상 리스트 size는 12개
     */
    @GetMapping("/main")
    public MainPageResponse mainListAndRankingAndArtistList(){
        int size=12;
        Map<Nation, Integer> ranking = userService.ranking();
        Slice<Video> videoList = videoService.findMainPageVideoList(0, size, VideoScope.PUBLIC);
        return new MainPageResponse(ranking,videoList);
    }

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
        private List<RankingDto> rankingList=new ArrayList<>();
        private Slice<VideoDto> videoList;

        public MainPageResponse(Map<Nation, Integer> ranking,Slice<Video> videos) {
            for (Map.Entry<Nation, Integer> entry : ranking.entrySet()) {
                rankingList.add(new RankingDto(entry));
            }
            Collections.sort(rankingList);
            videoList=videos.map(VideoDto::new);
        }
    }

    @Data
    static class RankingDto implements Comparable<RankingDto>{
        private String nationName;
        private String nationFlag;
        private double x,y,z;
        private int point;

        public RankingDto(Map.Entry<Nation,Integer> entry) {
            Nation nation=entry.getKey();
            nationName=nation.getName();
            nationFlag=nation.getFlag();
            x=nation.getX();
            y=nation.getY();
            z= nation.getZ();
            point=entry.getValue();
        }

        @Override
        public int compareTo(RankingDto o) {
            return o.point-this.point;
        }
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
