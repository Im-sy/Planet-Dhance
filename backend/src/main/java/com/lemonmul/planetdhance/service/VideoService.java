package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
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
    public Slice<Video> findNewestVideoList(int page, int size, VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByScopeOrderByRegDateDesc(scope,pageable);
    }

    /**
     * 영상 리스트 - 조회수&좋아요
     *
     * 조회수&좋아요 가중치 같으면 최신순
     */
    public Slice<Video> findHitLikeVideoList(int page,int size,VideoScope scope){
        Pageable pageable=PageRequest.of(page,size);
        return videoRepo.findByScopeOrderByOrderWeightDescRegDateDesc(scope,pageable);
    }
}
