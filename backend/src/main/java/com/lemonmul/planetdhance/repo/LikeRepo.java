package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepo extends JpaRepository<Like,Long> {

    Optional<Like> findByUserAndVideo(User user, Video video);
}
