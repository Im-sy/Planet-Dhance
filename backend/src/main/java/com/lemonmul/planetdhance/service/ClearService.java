package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.repo.ClearRepo;
import com.lemonmul.planetdhance.repo.MusicRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClearService {

    private final ClearRepo clearRepo;
    private final UserRepo userRepo;
    private final MusicRepo musicRepo;

    /*
     * 클리어 테이블 저장
     * */
    public void clearChallenge(long userId, long musicId){
        Clear clear = toClear(userId, musicId);
        clearRepo.save(clear);
    }

    /*
     * 클리어 곡 가져오기
     * */
    public List<Music> findClearMusicList(Long userId, int size){
        User user = userRepo.findById(userId).get();
        List<Clear> clears = clearRepo.findClearsByUserOrderByIdDesc(user).subList(0, size); // Clears list
        List<Music> musics = new ArrayList<>(); // Music List 초기화
        for (Clear clear:clears) {
            Music music = musicRepo.findById(clear.getId()).get(); // Clear 곡 Id로 clear
            musics.add(music);
        }
        return musics;
    }

    private Clear toClear(Long userId, Long musicId){

        User user = userRepo.findById(userId).get();
        Music music = musicRepo.findById(musicId).get();

        return Clear.createClear(music, user);
    }
}
