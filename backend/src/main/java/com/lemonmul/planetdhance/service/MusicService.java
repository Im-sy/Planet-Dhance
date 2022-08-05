package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.repo.MusicRepo;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // CUD 할 땐 함수 위에 따로 Transctional 처리하기
public class MusicService {

    private final MusicRepo musicRepo;

    /**
    * 전체 음악 데이터 반환
    */
    public Optional<Music> getMusicInfo(Long id){
        return musicRepo.findById(id);
    }

    /**
     * 곡 조회 - 가수
     */
    public List<Music> findArtistVideoList(String artist){
        return musicRepo.findByArtistOrderByRelDateDesc(artist);
    }

    /**
     * 곡 조회 - 곡 제목
     */
    public List<Music> findTitleVideoList(String title){
        return musicRepo.findByTitle(title);
    }
}
