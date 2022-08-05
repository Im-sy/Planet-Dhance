package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepo extends JpaRepository<Video,Long> {

    //해당 아이디보다 작은 최신 영상 리스트
    Slice<Video> findByScopeOrderByRegDateDesc(VideoScope scope, Pageable pageable);

    //정렬 가중치 높은 영상 리스트 (가중치 같으면 최신순)
    Slice<Video> findByScopeOrderByOrderWeightDescRegDateDesc(VideoScope scope, Pageable pageable);

}
