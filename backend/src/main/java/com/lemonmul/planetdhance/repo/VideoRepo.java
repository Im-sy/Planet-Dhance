package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.VideoTag;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepo extends JpaRepository<Video,Long> {

    //해당 곡의 최신 영상 리스트
    Slice<Video> findByMusicAndScopeOrderByRegDateDesc(Music music,VideoScope scope, Pageable pageable);

    //해당 곡의 정렬 가중치 높은 영상 리스트 (가중치 같으면 최신순)
    Slice<Video> findByMusicAndScopeOrderByOrderWeightDescRegDateDesc(Music music,VideoScope scope, Pageable pageable);

    //해당 곡들의 정렬 가중치 높은 영상 리스트 (가중치 같으면 최신순)
    Slice<Video> findByMusicInAndScopeOrderByOrderWeightDescRegDateDesc(List<Music> musicList, VideoScope scope, Pageable pageable);
    Slice<Video> findByOrderWeightLessThanEqualAndMusicInAndScopeOrderByOrderWeightDescRegDateDesc(Long orderWeight, List<Music> musicList, VideoScope scope, Pageable pageable);


    //해당 태그들의 정렬 가중치 높은 영상 리스트 (가중치 같으면 최신순)
    Slice<Video> findByVideoTagsInAndScopeOrderByOrderWeightDescRegDateDesc(List<VideoTag> videoTagList,VideoScope scope,Pageable pageable);
    Slice<Video> findByOrderWeightLessThanEqualAndVideoTagsInAndScopeOrderByOrderWeightDescRegDateDesc(Long orderWeight, List<VideoTag> videoTagList, VideoScope scope, Pageable pageable);

    //메인 페이지 인기 영상 리스트
    Slice<Video> findMainByScopeOrderByOrderWeightDescRegDateDescIdDesc(VideoScope scope,Pageable pageable);
    Slice<Video> findMainByOrderWeightLessThanEqualAndScopeOrderByOrderWeightDescRegDateDescIdDesc(Long orderWeight,VideoScope scope,Pageable pageable);

    //랜덤 영상 정보 리스트
    @Query(value = "select * from video order by rand() limit :size",nativeQuery = true)
    List<Video> findRandom(@Param("size") int size);

    //좋아요한 최신순 영상 리스트
    Slice<Video> findByLikesInOrderByRegDateDesc(List<Like> likeList,Pageable pageable);

    //해당 유저의 최신 영상 리스트
    Slice<Video> findByUserAndScopeOrderByRegDateDesc(User user, VideoScope scope, Pageable pageable);
    Slice<Video> findByOrderWeightLessThanEqualAndUserAndScopeOrderByRegDateDesc(Long orderWeight, User user, VideoScope scope, Pageable pageable);

    //해당 유저의 최신 영상 리스트 (공개, 비공개)
    Slice<Video> findByUserOrderByRegDateDesc(User user, Pageable pageable);

}
