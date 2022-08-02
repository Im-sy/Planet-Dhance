package com.lemonmul.planetdhance.api;


import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.service.MusicService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.Banner;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Music")
public class MusicApi {

    private final MusicService musicService;

    /*
    * 곡 검색 페이지 진입 시
    * title, artist, mv_url, img_url 전달
    *
    * 요청 파라미터 예시: /Music/Search
    * 원하는 column 만 가져오기..?
     */
    @GetMapping("/Search/{id}")
    public MusicDto musicForSearch(@PathVariable Integer id){
        Optional<Music> music = musicService.getMusicInfo(id);
        Optional<MusicDto> musicDto = music.map(MusicDto::new); // 응..?..

        return musicDto;
    }

    /*
    * 챌린지 페이지 진입 시
    *
    * 요청 파라미터 예시: /Music/Challenge
    *
    * */
    @GetMapping("/Challenge/{id}")
    public Music musicForChallenge(@PathVariable Integer id){
        return musicService.getMusicInfo(id);
    }

    @Data
    static class MusicDto {
        private String musicTitle;
        private String musicArtist;
        private String musicMvUrl;
        private String musicImgUrl;

        public MusicDto(Music music) {
            musicTitle = music.getTitle();
            musicArtist = music.getMvUrl();
            musicMvUrl = music.getMvUrl();
            musicImgUrl = music.getImgUrl();
        }
    }
}
