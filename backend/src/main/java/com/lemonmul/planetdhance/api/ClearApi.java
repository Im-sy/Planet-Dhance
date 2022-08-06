package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.MusicRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.service.ClearService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.PrivateKey;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clear")
public class ClearApi {

    private final ClearService clearService;

    /*
     * 챌린지 종료 시
     * 챌린지 clear 했을 경우 clear 테이블 저장
     *
     * Video 업로드에서 처리
     *
     * 아래 맵핑은 Test용
     * */
//    @PostMapping("/add/{userId}/{musicId}")
//    public Result clearSave(@PathVariable Long userId, @PathVariable Long musicId){
//        clearService.clearChallenge(userId, musicId);
//        Result result = new Result();
//        result.setName("DONE");
//        return result;
//    }

//    static class Result{
//        private String name;
//        public String getName(){
//            return name;
//        }
//        public void setName(String name){
//            this.name = name;
//        }
//    }

    /*
     * My page 진입 시
     * clear 곡 리스트 반환(MusicList)
     * size: 5개?
     *
     * 요청 파라미터 예시: /clear/{userId}/musics
     * */
    @GetMapping("/{userId}/musics")
    public List<ClearMusicDto> clearList(@PathVariable Long userId){
        int size = 5; // 반환할 clear 곡 갯수
        List<Music> musicList = clearService.findClearMusicList(userId, size);
        return MusicToClearDto(musicList);
    }


    @Data
    static class ClearMusicDto{
        private String title;
        private String imgUrl;

        public ClearMusicDto(Music music){
            title = music.getTitle();
            imgUrl = music.getImgUrl();
        }
    }

    private List<ClearMusicDto> MusicToClearDto(List<Music> music){
        return music.stream()
                .map(ClearMusicDto::new)
                .collect(Collectors.toList());
    }
}
