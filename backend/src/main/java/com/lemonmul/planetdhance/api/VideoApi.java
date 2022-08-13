package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.ChallengeRequest;
import com.lemonmul.planetdhance.dto.GridResponse;
import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.service.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import com.lemonmul.planetdhance.service.LikeService;
import com.lemonmul.planetdhance.service.MusicService;
import com.lemonmul.planetdhance.service.UserService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final LikeService likeService;
    private final RankingService rankingService;

    private static final int listSize =18;

    /**
     * 해당 곡 최신 영상 리스트 - 곡 페이지 latest 무한 스크롤
     *
     * 요청 파라미터 예시: /video/{곡 아이디}/latest/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/{music_id}/latest/{page}")
    public ResponseEntity<?> latestList(@PathVariable Long music_id, @PathVariable int page) {
        try {
            Music music=musicService.getMusicInfo(music_id);
            Slice<Video> videoList = videoService.findLatestVideoList(page, listSize,music, VideoScope.PUBLIC);
            return new ResponseEntity<>(new GridResponse("latest",videoList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 해당 곡 조회수&좋아요 영상 리스트 - 곡 페이지 hit&like 무한 스크롤
     *
     * 요청 파라미터 예시: /video/{곡 아이디}/hitlike/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/{music_id}/hitlike/{page}")
    public ResponseEntity<?> hitlikeList(@PathVariable Long music_id,@PathVariable int page) {
        try {
            Music music=musicService.getMusicInfo(music_id);
            Slice<Video> videoList = videoService.findHitLikeVideoList(page, listSize,music, VideoScope.PUBLIC);
            return new ResponseEntity<>(new GridResponse("hitlike",videoList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 국가 랭킹, 인기 영상 리스트 - 메인 페이지 진입
     *
     * 요청 파라미터 예시: /video/main
     * 영상 리스트 size는 12개
     */
    @GetMapping("/main")
    public MainPageResponse mainListAndRankingAndArtistList() {
        int size=12;
        Slice<Ranking> ranking = rankingService.getRanking();
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
    public GridResponse mainList(@PathVariable int page){
        return new GridResponse("main",videoService.findMainPageVideoList(page,listSize,VideoScope.PUBLIC));
    }

    /**
     * 랜덤 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/random/{user_id}
     * size는 기본값 10개
     */
    @GetMapping("/random/{user_id}")
    public ResponseEntity<?> randomVideoInfoList(@PathVariable Long user_id) {
        int size=10;

        try {
            List<Video> videoList = videoService.findRandomVideoInfoList(size);
            User user = userService.findById(user_id);
            List<Like> likeList = likeService.findLikeByUserAndVideos(user, videoList);

            List<VideoPlayDto> result=new ArrayList<>();
            for (Video video : videoList) {
                result.add(new VideoPlayDto(video,likeList));
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 챌린지 영상 업로드
     *
     * 요청 파라미터 예시: /video/upload
     * form-data로 영상, 썸네일, 공개 여부, 로그인 유저 아이디, 곡 아이디, 클리어 여부, 커스텀 태그 리스트 받기
     */
    @PostMapping(value = "/upload",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE,
                    MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> uploadChallengeVideo(@RequestPart MultipartFile videoFile,@RequestPart MultipartFile imgFile,
                                        @RequestPart ChallengeRequest challengeRequest) {
        try {
            return new ResponseEntity<>(videoService.uploadChallengeVideo(videoFile, imgFile, challengeRequest), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Data
    static class VideoPlayDto {
        private Long musicId;
        private Long hit;
        private String videoUrl;
        private boolean like=false;
        private int likeCnt;
        private List<TagDto> tagList;

        public VideoPlayDto(Video video,List<Like> likeList) {
            musicId=video.getMusic().getId();
            hit=video.getHit();
            videoUrl= video.getVideoUrl();
            for (Like l : likeList) {
                if(l.getVideo().getId().equals(video.getId())) {
                    like=true;
                    break;
                }
            }
            likeCnt=video.getLikes().size();
            tagList=video.getVideoTags().stream().map(TagDto::new).collect(Collectors.toList());
        }
    }

    @Data
    static class TagDto{
        private Long id;
        /** 태그명 */
        private String type;
        /** 태그타입 */
        private TagType className;

        public TagDto(VideoTag videoTag) {
            id=videoTag.getTag().getId();
            type = videoTag.getTag().getName();
            className =videoTag.getTag().getType();
        }
    }

    /**
     * 메인 페이지 진입 시 반환 객체
     */
    @Data
    static class MainPageResponse{
        private List<RankingDto> rankingList;
        private String prevPage="main";
        private Slice<VideoDto> videoList;

        public MainPageResponse(Slice<Ranking> ranking,Slice<Video> videos) {
            rankingList = ranking.map(RankingDto::new).stream().collect(Collectors.toList());
            videoList=videos.map(VideoDto::new);
        }
    }

    @Data
    static class RankingDto {
        private String nationName;
        private String nationFlag;
        private double x,y,z;
        private int clearCnt;

        public RankingDto(Ranking ranking) {
            this.nationName = ranking.getNation().getName();
            this.nationFlag = ranking.getNation().getFlag();
            this.x = ranking.getNation().getX();
            this.y = ranking.getNation().getY();
            this.z = ranking.getNation().getZ();
            this.clearCnt = ranking.getClearCnt();
        }
    }
}
