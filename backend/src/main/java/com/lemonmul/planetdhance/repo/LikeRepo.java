package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepo extends JpaRepository<Like,Long> {

    //해당 영상을 해당 유저가 좋야요 했는지 확인
    Optional<Like> findByUserAndVideo(User user,Video video);

    //해당 영상들을 해당 유저가 좋아요 했는지 확인
    List<Like> findByUserAndVideoIn(User user, List<Video> videos);
}
