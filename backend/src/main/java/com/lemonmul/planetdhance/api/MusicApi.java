package com.lemonmul.planetdhance.api;


import com.lemonmul.planetdhance.dto.GridResponse;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.service.MusicService;
import com.lemonmul.planetdhance.service.TagService;
import com.lemonmul.planetdhance.service.UserService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/music")
@CrossOrigin
public class MusicApi {

    private final MusicService musicService;
    private final VideoService videoService;
    private final UserService userService;
    private final TagService tagService;

    //TODO 기본값 18
    private static final int size=9;

    /**
    * 챌린지 페이지 진입 시
    *
    * 요청 파라미터 예시: /music/{곡 아이디}/challenge/{로그인한 사용자 아이디}
    *
    */
    @GetMapping("/{music_id}/challenge/{user_id}")
    public ResponseEntity<?> musicForChallenge(@PathVariable Long music_id,@PathVariable Long user_id) {
        try {
            Music music = musicService.getMusicInfo(music_id);
            User user = userService.findById(user_id);

            List<Tag> tagList=new ArrayList<>();
            tagList.add(tagService.findByNameAndType(music.getTitle(), TagType.TITLE));
            tagList.add(tagService.findByNameAndType(music.getArtist().getName(),TagType.ARTIST));
            tagList.add(tagService.findByNameAndType(user.getNickname(),TagType.NICKNAME));
            tagList.add(tagService.findByNameAndType(user.getNation().getName(),TagType.NATION));

            return new ResponseEntity<>(new MusicChallengeResponse(music,tagList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * 뮤비,최신 영상 리스트,조회수&좋아요 영상 리스트(곡 페이지로 이동)
     *
     * 요청 파라미터 예시: /music/list/{곡 아이디}
     * size 는 기본값 18
     */
    @GetMapping("/list/{music_id}")
    public ResponseEntity<?> mvAndVideoLists(@PathVariable Long music_id){
        try {
            Music music=musicService.getMusicInfo(music_id);
            int page=0;
            Slice<Video> latestVideoList = videoService.findLatestVideoList(page,size, music,VideoScope.PUBLIC);
            Slice<Video> hitLikeVideoList = videoService.findMusicVideoList(page, size, music, VideoScope.PUBLIC);

            return new ResponseEntity<>(new MusicPageResponse(music,latestVideoList,hitLikeVideoList), HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 해당 곡 최신 영상 리스트 - 곡 페이지 latest 무한 스크롤
     *
     * 요청 파라미터 예시: /music/{곡 아이디}/latest/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/{music_id}/latest/{page}")
    public ResponseEntity<?> latestList(@PathVariable Long music_id, @PathVariable int page) {
        try {
            Music music=musicService.getMusicInfo(music_id);
            Slice<Video> videoList = videoService.findLatestVideoList(page, size,music, VideoScope.PUBLIC);
            return new ResponseEntity<>(new GridResponse("latest",videoList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 해당 곡 조회수&좋아요 영상 리스트 - 곡 페이지 hit&like 무한 스크롤
     *
     * 요청 파라미터 예시: /music/{곡 아이디}/hitlike/{page번호}
     * size는 기본값 18
     */
    @GetMapping("/{music_id}/hitlike/{page}")
    public ResponseEntity<?> hitlikeList(@PathVariable Long music_id,@PathVariable int page) {
        try {
            Music music=musicService.getMusicInfo(music_id);
            Slice<Video> videoList = videoService.findMusicVideoList(page, size,music, VideoScope.PUBLIC);
            return new ResponseEntity<>(new GridResponse("hitlike",videoList), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Data
    static class MusicChallengeResponse {
        private String musicModelUrl;
        private String musicGuideUrl;
        private List<TagDto> tagList;

        public MusicChallengeResponse(Music music,List<Tag> tags) {
            musicModelUrl = music.getModelUrl();
            musicGuideUrl = music.getGuideUrl();
            tagList=tags.stream().map(TagDto::new).collect(Collectors.toList());
        }
    }

    @Data
    static class MusicPageResponse{
        String mvUrl;
        GridResponse latestList;
        GridResponse hitlikeList;

        public MusicPageResponse(Music music,Slice<Video> latest,Slice<Video> hitlike) {
            mvUrl=music.getMvUrl();
            latestList=new GridResponse("latest",latest);
            hitlikeList=new GridResponse("hitlike",hitlike);
        }
    }

    @Data
    static class TagDto{
        private Long id;
        private String type;
        private TagType className;

        public TagDto(Tag tag) {
            id=tag.getId();
            type=tag.getName();
            className=tag.getType();
        }
    }
}
