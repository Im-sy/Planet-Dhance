package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.dto.*;
import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.entity.tag.Tag;
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
@CrossOrigin
public class VideoApi {

    private final VideoService videoService;
    private final MusicService musicService;
    private final UserService userService;
    private final LikeService likeService;
    private final ArtistService artistService;
    private final RankingService rankingService;
    private final TagService tagService;

    //TODO 기본값 18
    private static final int listSize =9;
    private static final int infoSize=11;

    /**
     * 국가 랭킹, 인기 영상 리스트 - 메인 페이지 진입
     *
     * 요청 파라미터 예시: /video/main/0
     * 영상 리스트 size는 18개
     */
    @GetMapping("/main/0")
    public MainPageResponse mainListAndRankingAndArtistList() {
        List<Tag> tags = tagService.findArtistTop5();
        Slice<Ranking> ranking = rankingService.getRanking();
        Slice<Video> videoList = videoService.findMainPageVideoList(0, listSize, VideoScope.PUBLIC);
        return new MainPageResponse(tags,ranking,videoList);
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
        try {
            List<Video> videoList = videoService.findRandomVideoInfoList(infoSize);
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
     * 가수 태그의 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/artist/{user_id}
     */
    @GetMapping("/{video_id}/artist/{user_id}")
    public ResponseEntity<?> artistVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            List<Music> musicList=musicService.findArtistVideoList(video.getMusic().getArtist());
            Slice<Video> videoList=videoService.findNextArtistVideoList(0,infoSize,video.getOrderWeight(),musicList,VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 곡 태그의 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/title/{user_id}
     */
    @GetMapping("/{video_id}/title/{user_id}")
    public ResponseEntity<?> musicVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            Slice<Video> videoList=videoService.findNextMusicVideoList(0,infoSize,video.getOrderWeight(),video.getMusic(),VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 커스텀 태그의 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/custom/{user_id}
     * TODO 커스텀 태그 만들면 테스트해보기 -> 안됨 ㅠㅠ 어느 커스텀 태그인지 구별할 인자 받아와야 함
     */
    @GetMapping("/{video_id}/custom/{user_id}")
    public ResponseEntity<?> customVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);

            List<VideoTag> videoTags = video.getVideoTags();
            Tag tag=null;
            for (VideoTag videoTag : videoTags) {
                if(videoTag.getTag().getType().equals(TagType.NATION)){
                    tag=videoTag.getTag();
                    break;
                }
            }
            List<VideoTag> findVideoTags=tag.getVideoTags();

            Slice<Video> videoList=videoService.findNextCustomVideoList(0,infoSize,video.getOrderWeight(),findVideoTags,VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 국가 태그의 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/nation/{user_id}
     */
    @GetMapping("/{video_id}/nation/{user_id}")
    public ResponseEntity<?> nationVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            List<VideoTag> videoTags = video.getVideoTags();
            Tag tag=null;
            for (VideoTag videoTag : videoTags) {
                if(videoTag.getTag().getType().equals(TagType.NATION)){
                    tag=videoTag.getTag();
                    break;
                }
            }
            List<VideoTag> findVideoTags=tag.getVideoTags();

            Slice<Video> videoList=videoService.findNextCustomVideoList(0,infoSize,video.getOrderWeight(),findVideoTags,VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 닉네임 태그의 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/nickname/{user_id}
     */
    @GetMapping("/{video_id}/nickname/{user_id}")
    public ResponseEntity<?> userVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            User videoUser = userService.findById(video.getUser().getId());
            Slice<Video> videoList=videoService.findNextUserVideoList(0,infoSize,video_id,videoUser,VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 로그인한 사용자가 좋아요한 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/like/{user_id}
     */
    @GetMapping("/{video_id}/like/{user_id}")
    public ResponseEntity<?> likeVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            User user = userService.findById(user_id);
            Slice<Video> videoList=videoService.findNextLikeVideoList(0,infoSize,video_id, user.getLikes());

            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 곡의 재생할 최신 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/latest/{user_id}
     */
    @GetMapping("/{video_id}/latest/{user_id}")
    public ResponseEntity<?> latestVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            Slice<Video> videoList=videoService.findNextLatestVideoList(0,infoSize,video_id,video.getMusic(),VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 곡의 재생할 인기 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/hitlike/{user_id}
     */
    @GetMapping("/{video_id}/hitlike/{user_id}")
    public ResponseEntity<?> hitlikeVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            Slice<Video> videoList=videoService.findNextMusicVideoList(0,infoSize,video.getOrderWeight(),video.getMusic(),VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 메인 페이지의 재생할 영상 정보 리스트
     *
     * 요청 파라미터 예시: /video/{video_id}/main/{user_id}
     */
    @GetMapping("/{video_id}/main/{user_id}")
    public ResponseEntity<?> mainVideoInfoList(@PathVariable Long video_id, @PathVariable Long user_id) {
        try {
            Video video = videoService.findById(video_id);
            Slice<Video> videoList=videoService.findNextMainPageVideoList(0,infoSize,video.getOrderWeight(),VideoScope.PUBLIC);

            User user = userService.findById(user_id);
            List<Like> likeList=likeService.findLikeByUserAndVideos(user,videoList.stream().toList());

            return new ResponseEntity<>(new VideoInfoResponse(videoList,likeList), HttpStatus.OK);
        }catch (Exception e) {
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
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> uploadChallengeVideo(@RequestPart List<MultipartFile> inputFile,@RequestPart ChallengeRequest challengeRequest) {
        try {
            return new ResponseEntity<>(videoService.uploadChallengeVideo(inputFile, challengeRequest), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

//    /**
//     * 챌린지 영상 수정
//     *
//     * 요청 파라미터 예시: /video/update
//     */
//    @PutMapping(value = "/update")
//    public ResponseEntity<?> upddateChallengeVideo(){
//
//    }

    /**
     * 조회수 올리기
     *
     * 요청 파라미터 예시: /video/hit/{video_id}
     */
    @PostMapping("/hit/{video_id}")
    public boolean addHitCount(@PathVariable Long video_id){
        return videoService.addHitCount(video_id);
    }

    @Data
    public static class TagDto{
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
        private List<ArtistDto> artistList;
        private List<RankingDto> rankingList;
        private String prevPage="main";
        private Slice<VideoDto> videoList;

        public MainPageResponse(List<Tag> tags,Slice<Ranking> ranking,Slice<Video> videos) {
            artistList=tags.stream().map(ArtistDto::new).collect(Collectors.toList());
            rankingList = ranking.map(RankingDto::new).stream().collect(Collectors.toList());
            videoList=videos.map(VideoDto::new);
        }
    }

    @Data
    static class ArtistDto{
        private Long tagId;
        private String name;
        private String imgUrl;

        public ArtistDto(Tag tag) {
            tagId=tag.getId();
            name=tag.getName();
            imgUrl=tag.getImgUrl();
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
            this.nationFlag = ranking.getNation().getImgUrl();
            this.x = ranking.getNation().getX();
            this.y = ranking.getNation().getY();
            this.z = ranking.getNation().getZ();
            this.clearCnt = ranking.getClearCnt();
        }
    }
}
