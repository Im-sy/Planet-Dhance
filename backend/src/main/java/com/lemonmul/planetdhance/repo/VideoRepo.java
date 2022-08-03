package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Video;
import com.lemonmul.planetdhance.entity.VideoScope;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepo extends JpaRepository<Video,Integer> {

    Slice<Video> findByIdLessThanAndScopeOrderByRegDateDesc(int lastId, VideoScope scope, Pageable pageable);
}
