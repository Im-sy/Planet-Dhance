package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VideoRepo extends JpaRepository<Video,Long> {

    //해당 아이디보다 작은 최신 영상 리스트
    Slice<Video> findByIdLessThanAndScopeOrderByRegDateDesc(Long lastId, VideoScope scope, Pageable pageable);

    //해당 아이디보다 작은 조회수 많은 영상 리스트
    Slice<Video> findByIdLessThanAndScopeOrderByLikeCntDescHitDesc(Long lastId,VideoScope scope,Pageable pageable);

    @Query("select v.id,v.hit,v.likeCnt,v.hit+v.likeCnt*3 as weight from Video v order by weight desc")
    Slice<Video> findByScope(VideoScope scope);
}
