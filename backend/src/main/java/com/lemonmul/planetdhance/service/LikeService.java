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
    public boolean addLike(Long userId,Long videoId){
        //TODO Optional 처리
        User user = userRepo.findById(userId).get();
        Video video = videoRepo.findById(videoId).get();

        if (likeRepo.findByUserAndVideo(user,video).isEmpty()){
            likeRepo.save(Like.createLike(video,user));
            return true;
        }
        else{
            return false;
        }
    }

    @Transactional
    public boolean removeLike(Long userId,Long videoId){
        //TODO Optional 처리
        User user = userRepo.findById(userId).get();
        Video video = videoRepo.findById(videoId).get();

        Optional<Like> like = likeRepo.findByUserAndVideo(user, video);
        if (like.isPresent()){
            likeRepo.delete(like.get());
            return true;
        }
        else{
            return false;
        }
    }
}
