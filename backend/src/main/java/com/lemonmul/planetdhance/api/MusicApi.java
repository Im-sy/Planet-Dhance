package com.lemonmul.planetdhance.api;


import com.lemonmul.planetdhance.dto.VideoDto;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.service.MusicService;
import com.lemonmul.planetdhance.service.VideoService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.Banner;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/music")
public class MusicApi {

    private final MusicService musicService;
    private final VideoService videoService;

    private static final int size=5;

    /**
    * 챌린지 페이지 진입 시
    *
    * 요청 파라미터 예시: /music/challenge/{id}
    *
    * */
    @GetMapping("/challenge/{id}")
    public Optional<MusicDto> musicForChallenge(@PathVariable Long id){
        Optional<Music> music = musicService.getMusicInfo(id);
        return music.map(MusicDto::new);
    }

    /**
     * 뮤비,최신 영상 리스트,조회수&좋아요 영상 리스트(곡 페이지로 이동)
     *
     * 요청 파라미터 예시: /music/list/{곡 아이디}
     * size는 기본값 18
     */
    @GetMapping("/list/{music_id}")
    public MusicPageResponse mvAndVideoLists(@PathVariable Long music_id){
        Music music=musicService.getMusicInfo(music_id).get();
        int page=0;
        Slice<Video> newestVideoList = videoService.findNewestVideoList(page,size, music,VideoScope.PUBLIC);
        Slice<Video> hitLikeVideoList = videoService.findHitLikeVideoList(page, size, music, VideoScope.PUBLIC);
        return new MusicPageResponse(music,newestVideoList,hitLikeVideoList);
    }

    @Data
    static class MusicDto {
        private String musicTitle;
        private String musicArtist;
        private String musicModelUrl;
        private String musicGuideUrl;

        public MusicDto(Music music) {
            musicTitle = music.getTitle();
            musicArtist = music.getArtist();
            musicModelUrl = music.getModelUrl();
            musicGuideUrl = music.getGuideUrl();
        }
    }

    @Data
    static class MusicPageResponse{
        String mvUrl;
        Slice<VideoDto> newestList;
        Slice<VideoDto> hitlikeList;

        public MusicPageResponse(Music music,Slice<Video> newest,Slice<Video> hitlike) {
            mvUrl=music.getMvUrl();
            newestList=newest.map(VideoDto::new);
            hitlikeList=hitlike.map(VideoDto::new);
        }
    }
}
