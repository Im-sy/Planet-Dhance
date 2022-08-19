// ClearService.java
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
    public void clearChallenge(long userId, long musicId) throws Exception {
        if (userRepo.findById(userId).isEmpty())
            throw new Exception("User Not Found");
        if (musicRepo.findById(musicId).isEmpty())
            throw new Exception(("Music Not Found"));
        Clear clear = toClear(userId, musicId);
        clearRepo.save(clear);
    }

    /*
     * 클리어 곡 가져오기
     * */
    public List<Music> findClearMusicList(Long userId, int size) throws Exception{
        Optional<User> user = userRepo.findById(userId);
        if (user.isPresent()){
            // Clears list
            List<Clear> clears = clearRepo.findClearsByUserOrderByIdDesc(user.get());
            // Music List 초기화
            List<Music> musics = new ArrayList<>();

            if (clears.size() <= size){
                for (Clear clear:clears) {
                    // Clear 곡 Id로 clear 추가
                    Music music = musicRepo.findById(clear.getMusic().getId()).orElseThrow(()-> new Exception("Music Not Found"));
                    musics.add(music);
                }
            } else {
                clears.subList(0, size);
                for (Clear clear:clears) {
                    // Clear 곡 Id로 clear 추가
                    Music music = musicRepo.findById(clear.getMusic().getId()).orElseThrow(()-> new Exception("Music Not Found"));
                    musics.add(music);
                }
            }
            System.out.println(musics);
            return musics;

        }else {
            throw new Exception("User Not Found");
        }
    }

    private Clear toClear(Long userId, Long musicId) throws Exception {

        User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User Not Found"));
        Music music = musicRepo.findById(musicId).orElseThrow(() -> new Exception("Music Not Found"));

        return Clear.createClear(music, user);
    }
}