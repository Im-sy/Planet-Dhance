package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class VideoServiceTest {

    @Autowired VideoService videoService;

    @BeforeEach
    public void before(){
        Nation nation1=new Nation("\uD83C\uDDF0\uD83C\uDDF7","ko");
        User user1=User.createUser();
        Music music1=Music.createMusic();
        Tag tag1=Tag.createTag();
        Video video1=createVideo();
        VideoTag videoTag1=VideoTag.createVideoTag();

        Like like1=Like.createLike(video1,user1);

    }

    @Test
    public void findPublicNewestVideoList(){

    }
}