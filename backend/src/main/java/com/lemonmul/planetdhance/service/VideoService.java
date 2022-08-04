package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.repo.VideoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
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
    public Slice<Video> findPublicNewestVideoList(Long lastId,int size,VideoScope scope){
        Pageable pageable=PageRequest.of(0,size);
        return videoRepo.findByIdLessThanAndScopeOrderByRegDateDesc(lastId,scope,pageable);
    }

    /**
     * 영상 리스트 - 조회수&좋아요
     */
    public Slice<Video> findPublicHitAndLikeVideoList(Long lastId,int size,VideoScope scope){
        Pageable pageable=PageRequest.of(0,size);
        Slice<Video> hitVideoList = videoRepo.findByIdLessThanAndScopeOrderByLikeCntDescHitDesc(lastId, scope, pageable);
        return hitVideoList;
    }
}
