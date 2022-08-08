package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.VideoTag;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepo extends JpaRepository<Video,Long> {

    //해당 곡의 최신 영상 리스트
    Slice<Video> findByMusicAndScopeOrderByRegDateDesc(Music music,VideoScope scope, Pageable pageable);

    //해당 곡의 정렬 가중치 높은 영상 리스트 (가중치 같으면 최신순)
    Slice<Video> findByMusicAndScopeOrderByOrderWeightDescRegDateDesc(Music music,VideoScope scope, Pageable pageable);

    //해당 곡들의 정렬 가중치 높은 영상 리스트 (가중치 같으면 최신순)
    Slice<Video> findByMusicInAndScopeOrderByOrderWeightDescRegDateDesc(List<Music> musicList, VideoScope scope, Pageable pageable);

    //해당 태그들의 정렬 가중치 높은 영상 리스트 (가중치 같으면 최신순)
    Slice<Video> findByVideoTagsInAndScopeOrderByOrderWeightDescRegDateDesc(List<VideoTag> videoTagList,VideoScope scope,Pageable pageable);

    //해당 유저의 최신 영상 리스트
    Slice<Video> findByUserAndScopeOrderByRegDate(User user,VideoScope scope,Pageable pageable);

}
