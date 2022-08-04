package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepo extends JpaRepository<Video,Integer> {

    //해당 아이디보다 작은 공개 최신 영상 리스트
    Slice<Video> findByIdLessThanAndScopeOrderByRegDateDesc(int lastId, VideoScope scope, Pageable pageable);
}
