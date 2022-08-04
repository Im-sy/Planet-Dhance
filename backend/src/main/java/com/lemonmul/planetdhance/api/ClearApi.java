package com.lemonmul.planetdhance.api;

import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.User;
import com.lemonmul.planetdhance.repo.MusicRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.service.ClearService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clear")
public class ClearApi {

    private final ClearService clearService;

    /*
    * 챌린지 종료 시
    * 챌린지 clear 했을 경우 clear 테이블 저장
    *
    * 요청 파라미터 예시: /clear/{userId}/save
    * */
    @PostMapping("/{userId}/save")
    public void saveClear(int clearOrNot, @PathVariable long userId, long musicId){
        if (clearOrNot == 1){
            Clear.createClear();
            clearService.clear(toClear(userId, musicId));
        }
    }

    /*
    * My page 진입 시
    * clear 곡 리스트 반환
    * size: 5개?
    *
    * 요청 파라미터 예시: /clear/{userId}/musics
    * */
    @GetMapping("{userId}/musics")
    public List<ClearMusicDto> clearList(@PathVariable Long userId){
        int size = 5;
        List<Music> musicList = ClearService.findClearMusicList();
        return musicList.map(ClearMusicDto::new);
    }

    private Clear toClear(Long userId, Long musicId){

        User user = UserRepo.findById(userId);
        Music music = MusicRepo.findById(musicId);

        return Clear.createClear(music, user);
        }

    @Data
    static class ClearMusicDto{
        private String title;
        private String imgUrl;
    }
}
