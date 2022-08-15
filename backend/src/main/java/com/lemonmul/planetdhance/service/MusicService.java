package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Artist;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.repo.MusicRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MusicService {

    private final MusicRepo musicRepo;

    /**
    * 전체 음악 데이터 반환
    */
    public Optional<Music> getMusicInfo(Long id) throws Exception{

        if (musicRepo.findById(id).isEmpty())
            throw new Exception("Music Not Found");

        return musicRepo.findById(id);
    }

    /**
     * 곡 조회 - 가수 (발매일순)
     */
    public List<Music> findArtistVideoList(Artist artist){
        return musicRepo.findByArtistOrderByRelDateDesc(artist);
    }

    /**
     * 곡 조회 - 곡 제목 (발매일순)
     */
    public List<Music> findTitleVideoList(String title){
        return musicRepo.findByTitleOrderByRelDate(title);
    }
}
