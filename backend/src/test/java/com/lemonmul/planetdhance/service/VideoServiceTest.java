package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.repo.TagRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Slice;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Transactional
@Rollback(value = false)
class VideoServiceTest {

    @Autowired
    VideoService videoService;
    @Autowired
    TagRepo tagRepo;
    @Autowired
    EntityManager em;

//    @BeforeEach
//    public void before(){
//        List<Tag> tags=new ArrayList<>();
//        tags.add(tagRepo.findByNameAndType("title1",TagType.TITLE));
//        tags.add(tagRepo.findByNameAndType("artist1",TagType.ARTIST));
//        tags.add(tagRepo.findByNameAndType("user1",TagType.NICKNAME));
//        tags.add(tagRepo.findByNameAndType("ko",TagType.NATION));
//
//        for (Tag tag : tags) {
//            VideoTag.createVideoTag(video1,tag);
//        }
//
//        Like.createLike(video1,user1);
//    }

    @Test
    public void findPublicNewestVideoList(){
        //given
        Nation nation1=Nation.createNation("\uD83C\uDDF0\uD83C\uDDF7","ko");
        em.persist(nation1);

        User user1=User.createUser("user1",null,null,nation1);
        em.persist(user1);
        User user2=User.createUser("user2",null,null,nation1);
        em.persist(user2);

        Music music1=Music.createMusic("title1","artist1","album img1","model url1","guide url1","mv url1");
        em.persist(music1);
        Music music2=Music.createMusic("title2","artist2","album img2","model url2","guide url2","mv url2");
        em.persist(music2);

        List<Video> videos=new ArrayList<>();
        for(int i=0;i<5;i++){
            Video video = Video.createVideo("video url" + i, VideoScope.PUBLIC, "thumbnail url" + i, user1, music1);
            videos.add(video);
            em.persist(video);
        }
        for(int i=5;i<10;i++){
            Video video = Video.createVideo("video url" + i, VideoScope.PUBLIC, "thumbnail url" + i, user1, music2);
            videos.add(video);
            em.persist(video);
        }
        Video video1 = Video.createVideo("video url!!", VideoScope.PRIVATE, "thumbnail url!!", user2, music1);
        videos.add(video1);
        em.persist(video1);
        for(int i=10;i<15;i++){
            Video video = Video.createVideo("video url" + i, VideoScope.PUBLIC, "thumbnail url" + i, user2, music2);
            videos.add(video);
            em.persist(video);
        }

        //when
        int size=18;
        Slice<Video> newestVideoList = videoService.findPublicNewestVideoList(videos.get(videos.size()-1).getId(),18, VideoScope.PUBLIC);
//        Slice<Video> newestVideoList = videoService.findPublicNewestVideoList(21,18, VideoScope.PUBLIC);

        //then
//        System.out.println("videos.get(videos.size()-1).getId() = " + videos.get(videos.size()-1).getId());
        for (Video video : newestVideoList) {
            System.out.println("video = " + video.getId()+" "+video.getRegDate());
        }

    }
}