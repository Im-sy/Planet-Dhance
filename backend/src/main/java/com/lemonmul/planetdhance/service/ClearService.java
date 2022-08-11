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
import java.util.Optional;

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
    @Transactional
    public void clearChallenge(long userId, long musicId){
        // userId, musicId validation 체크하고 service 요청해주세요
        Clear clear = toClear(userId, musicId);
        clearRepo.save(clear);
    }

    /*
     * 클리어 곡 가져오기
     * */
    public List<Music> findClearMusicList(Long userId, int size){
        Optional<User> user = userRepo.findById(userId);
        if (user.isPresent()){

            List<Clear> clears = clearRepo.findClearsByUserOrderByIdDesc(user.get()); // Clears list
            List<Music> musics = new ArrayList<>(); // Music List 초기화

            if (clears.size() <= size){
                for (Clear clear:clears) {
                    Music music = musicRepo.findById(clear.getId()).orElse(null); // Clear 곡 Id로 clear 추가
                    musics.add(music);
                }
            }else {
                clears.subList(0, size);
                for (Clear clear:clears) {
                    Music music = musicRepo.findById(clear.getId()).orElse(null); // Clear 곡 Id로 clear
                    musics.add(music);
                }
            }

            return musics;

        }else{
            return null;
        }
    }

    private Clear toClear(Long userId, Long musicId){

        User user = userRepo.findById(userId).orElse(null);
        Music music = musicRepo.findById(musicId).orElse(null);

        return Clear.createClear(music, user);
    }
}
