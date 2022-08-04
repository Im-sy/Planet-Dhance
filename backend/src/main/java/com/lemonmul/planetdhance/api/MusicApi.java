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
@RequestMapping("/music")
public class MusicApi {

    private final MusicService musicService;

    /*
    * 챌린지 페이지 진입 시
    *
    * 요청 파라미터 예시: /music/challenge/{id}
    *
    * */
    @GetMapping("/challenge/{id}")
    public Optional<MusicDto> musicForChallenge(@PathVariable Long id){

        Optional<Music> music = musicService.getMusicInfo(id);
        Optional<MusicDto> musicDto = music.map(MusicDto::new);

        return musicDto;
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

    /*
     * 곡 검색 페이지 진입 시 => Community 에서 처리
     */

}
