package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.repo.LikeRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import com.lemonmul.planetdhance.repo.VideoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LikeService {

    private final LikeRepo likeRepo;
    private final UserRepo userRepo;
    private final VideoRepo videoRepo;

    public List<Like> findLikeByUserAndVideos(User user, List<Video> videos){
        return likeRepo.findByUserAndVideoIn(user,videos);
    }

    @Transactional
    public boolean addLike(Long userId,Long videoId) throws Exception {
        User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User Not Found"));
        Video video = videoRepo.findById(videoId).orElseThrow(() -> new Exception("Video Not Found"));

        if(likeRepo.findByUserAndVideo(user,video).isPresent())
            throw new Exception("Already Like");

        likeRepo.save(Like.createLike(video, user));
        return true;
    }

    @Transactional
    public boolean removeLike(Long userId,Long videoId) throws Exception {
        User user = userRepo.findById(userId).orElseThrow(() -> new Exception("User Not Found"));
        Video video = videoRepo.findById(videoId).orElseThrow(() -> new Exception("Video Not Found"));

        Optional<Like> like = likeRepo.findByUserAndVideo(user, video);

        if(like.isEmpty())
            throw new Exception("Not Yet Like");

        likeRepo.delete(like.get());
        return true;
    }
}
