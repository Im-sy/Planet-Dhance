package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.repo.ClearRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClearService {

    private final ClearRepo clearRepo;

    /*
    * 클리어 테이블 저장
    * */
    public void clearChallenge(Clear clear){
        clearRepo.save(clear);
    }

    /*
    * 클리어 곡 가져오기
    * */
    public List<Music> findClearMusicList(Long userId){
        return ClearRepo.
    };

}
