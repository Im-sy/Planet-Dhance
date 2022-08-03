package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Video;
import com.lemonmul.planetdhance.entity.VideoScope;
import com.lemonmul.planetdhance.repo.VideoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VideoService {

    private final VideoRepo videoRepo;

    /**
     * 영상 리스트 - 최신
     */
    public Slice<Video> findPublicNewestVideoList(int lastId,int size,VideoScope videoScope){
        Pageable pageable=PageRequest.of(0,size);
        return videoRepo.findByIdLessThanAndScopeOrderByRegDateDesc(lastId,videoScope,pageable);
    }
}
