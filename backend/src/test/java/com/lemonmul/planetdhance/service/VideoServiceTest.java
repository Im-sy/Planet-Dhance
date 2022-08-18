package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.*;
import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import com.lemonmul.planetdhance.entity.user.Basic;
import com.lemonmul.planetdhance.entity.user.Role;
import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import com.lemonmul.planetdhance.entity.video.VideoScope;
import com.lemonmul.planetdhance.repo.MusicRepo;
import com.lemonmul.planetdhance.repo.NationRepo;
import com.lemonmul.planetdhance.repo.TagRepo;
import com.lemonmul.planetdhance.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Slice;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Transactional
@Rollback(value = false)
class VideoServiceTest {

    @Autowired
    VideoService videoService;

    @Autowired
    RankingService rankingService;
    @Autowired
    MusicRepo musicRepo;
    @Autowired
    TagRepo tagRepo;
    @Autowired
    NationRepo nationRepo;
    @Autowired
    UserRepo userRepo;
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
    public void findNewestVideoList(){
        //given
//        initdb();

        //when
        int page=0;
        int size=18;
        Music music=musicRepo.findById(4L).get();
        Slice<Video> latestVideoList = videoService.findLatestVideoList(page,size,music, VideoScope.PUBLIC);

        //then
        for (Video video : latestVideoList) {
            System.out.println("video = " + video.getId()+" "+video.getRegDate());
        }

    }

    @Test
    public void findHitLikeVideoList() {
        //given
        initTestDb();
        rankingService.ranking();

//        Music music=musicRepo.findById(4L).get();
//        printHitLikeList(0, 5,music);
//        printHitLikeList(1, 5,music);

    }

    private void printHitLikeList(int page, int size,Music music) {
        //when

        Slice<Video> hitLikeVideoList = videoService.findMusicVideoList(page, size, music,VideoScope.PUBLIC);

        //then
        for (Video video : hitLikeVideoList) {
            System.out.println("video = " + video.getVideoUrl()+" "+video.getOrderWeight());
        }
    }

    @Test
    public void initDb(){
        createNationTable();
        createUserTable();
        createArtistAndMusicTable();

    }

    private void createNationTable(){
        Nation nation=Nation.createNation("\uD83C\uDDF0\uD83C\uDDF7","Korea","/resource/nation/img/korea.png",-3,-3,-2.5);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION, nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDEF\uD83C\uDDF5","Japan","/resource/nation/img/japan.png",-3,-3,-1.8);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDFB\uD83C\uDDF3","Vietnam","/resource/nation/img/vietnam.png",-1.8,-3.3,-2.7);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDE8\uD83C\uDDF3","China","/resource/nation/img/china.png",-1.7,-1.5,-4.2);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDE7\uD83C\uDDF7","Brazil","/resource/nation/img/brazil.png",1.8,-4.3,1.3);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDEA\uD83C\uDDEC","Egypt","/resource/nation/img/egypt.png",3.3,-3,-3);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDFA\uD83C\uDDF8","USA","/resource/nation/img/usa.png",-1.5,-3,3.5);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDE8\uD83C\uDDE6","Canada","/resource/nation/img/canada.png",-2.5,-1,4);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDEA\uD83C\uDDFA","Europe","/resource/nation/img/europe.png",5,0,0);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDFF\uD83C\uDDE6","RSA","/resource/nation/img/rsa.png",2,-4.5,-1);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83C\uDDE6\uD83C\uDDFA","Australia","/resource/nation/img/australia.png",-0.3,-4.5,-0.7);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
        nation=Nation.createNation("\uD83E\uDE90","Dhance","/resource/nation/img/dhance.png",-3,-3,-2.5);
        em.persist(nation);
        em.persist(Tag.createTag(nation.getName(), TagType.NATION,nation.getImgUrl()));
    }

    private void createUserTable(){
        User user1= Basic.createBasic("email1@xx.xx", "user1", null, null, nationRepo.findByName("Korea").get(), Role.USER,"123");
        em.persist(user1);
        em.persist(Tag.createTag(user1.getNickname(),TagType.NICKNAME, user1.getImgUrl()));
        User user2= Basic.createBasic("email2@xx.xx", "user2", null, null, nationRepo.findByName("USA").get(), Role.USER,"123");
        em.persist(user2);
        em.persist(Tag.createTag(user2.getNickname(),TagType.NICKNAME,user2.getImgUrl()));
    }

    private void createArtistAndMusicTable(){
        Artist artist=Artist.createArtist("NAYEON","/resource/artist/img/nayeon.jpg");
        artist.setOrderWeight(5L);
        em.persist(artist);
        Music music=Music.createMusic("POP!",artist,"/resource/music/img/pop_img.jpg","model url1","/resource/music/guide/pop_guide.mp4","https://youtu.be/f6YDKF0LVWw", LocalDateTime.of(2022,6,24,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("BTS","/resource/artist/img/bts.JPG");
        artist.setOrderWeight(20L);
        em.persist(artist);
        music=Music.createMusic("Permission to Dance",artist,"/resource/music/img/PtoD_img.jpg","model url1","/resource/music/guide/PtoD_guide.mp4","https://youtu.be/CuklIb9d3fI", LocalDateTime.of(2021,7,9,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("CHUNG HA","/resource/artist/img/chungha.jpg");
        em.persist(artist);
        music=Music.createMusic("Sparkling",artist,"/resource/music/img/sparkling_img.jpg","model url1","/resource/music/guide/sparkling_guide.mp4","https://youtu.be/lDV5cM9YE4g", LocalDateTime.of(2022,7,11,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("TWICE","/resource/artist/img/twice.jpg");
        em.persist(artist);
        music=Music.createMusic("TT",artist,"/resource/music/img/TT_img.jpg","model url1","/resource/music/guide/TT_guide.mp4","https://youtu.be/ePpPVE-GGJw", LocalDateTime.of(2016,10,24,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("Girls' Generation","/resource/artist/img/snsd.jpg");
        em.persist(artist);
        music=Music.createMusic("FOREVER 1",artist,"/resource/music/img/Forever1_img.jpg","model url1","/resource/music/guide/Forever1_guide.mp4","https://youtu.be/Qpf26PtBXgo", LocalDateTime.of(2022,8,5,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

//        artist=Artist.createArtist("ZICO","img");
//        em.persist(artist);
//        music=Music.createMusic("Any Song",artist,"img","model url1","img","https://youtu.be/UuV2BmJ1p_I", LocalDateTime.of(2022,6,24,0,0));
//        em.persist(music);
//        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
//        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("IVE","/resource/artist/img/ive.jpg");
        artist.setOrderWeight(2L);
        em.persist(artist);
        music=Music.createMusic("LOVE DIVE",artist,"/resource/music/img/lovedive_img.jpg","model url1","/resource/music/guide/LoveDive_guide.mp4","https://youtu.be/Y8JFxS1HlDo", LocalDateTime.of(2020,4,5,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("IU","/resource/artist/img/iu.jpg");
        artist.setOrderWeight(4L);
        em.persist(artist);
        music=Music.createMusic("my dream patissiere",artist,"/resource/music/img/Patissiere_img.png","model url1","/resource/music/guide/Patissiere_guide.mp4","https://youtu.be/bgQIzPnPI88", LocalDateTime.of(2010,11,13,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("SEVENTEEN","/resource/artist/img/seventeen.jpeg");
        em.persist(artist);
        music=Music.createMusic("HOT",artist,"/resource/music/img/hot_img.jpg","model url1","/resource/music/guide/hot_guide.mp4","https://youtu.be/gRnuFC4Ualw", LocalDateTime.of(2022,5,27,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("SUPER JUNIOR","/resource/artist/img/superjunior.jpg");
        artist.setOrderWeight(3L);
        em.persist(artist);
        music=Music.createMusic("Sorry, Sorry",artist,"/resource/music/img/SorrySorry_img.jpg","model url1","/resource/music/guide/SorrySorry_guide.mp4","https://youtu.be/x6QA3m58DQw", LocalDateTime.of(2022,3,12,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));

        artist=Artist.createArtist("(G)I-DLE","/resource/artist/img/gidle.jpg");
        em.persist(artist);
        music=Music.createMusic("TOMBOY",artist,"/resource/music/img/Tomboy_img.jpg","model url1","/resource/music/guide/Tomboy_guide.mp4","https://youtu.be/Jh4QFaPmdss", LocalDateTime.of(2022,3,14,0,0));
        em.persist(music);
        em.persist(Tag.createTag(music.getArtist().getName(),TagType.ARTIST,music.getArtist().getImgUrl()));
        em.persist(Tag.createTag(music.getTitle(),TagType.TITLE, music.getImgUrl()));
    }

    private void initTestDb() {
//        //nation
//        Nation nation1=Nation.createNation("\\uD83C\\uDDF0\\uD83C\\uDDF7","ko","img",-3,-3,-2.5);
//        em.persist(nation1);
//        em.persist(Tag.createTag(nation1.getName(), TagType.NATION,"korea img"));
//        Nation nation2=Nation.createNation("\\uD83C\\uDDFA\\uD83C\\uDDF8","us","img",-1.5,-3,3.5);
//        em.persist(nation2);
//        em.persist(Tag.createTag(nation2.getName(), TagType.NATION,"usa img"));
        createNationTable();

//        //user
//        User user1=User.createUser("email1@xx.xx","user1",null,"/temp/0641e470-94f8-4347-a67f-40814645c890.png",nation1);
//        em.persist(user1);
//        em.persist(Tag.createTag(user1.getNickname(),TagType.NICKNAME, user1.getImgUrl()));
//        User user2=User.createUser("email2@xx.xx","user2",null,"/temp/0641e470-94f8-4347-a67f-40814645c890.png",nation2);
//        em.persist(user2);
//        em.persist(Tag.createTag(user2.getNickname(),TagType.NICKNAME,user2.getImgUrl()));
        createUserTable();

//        //artist
//        Artist artist1=Artist.createArtist("artist1","/temp/55167a30-7e09-4633-b25f-d7770936aee8.png");
//        em.persist(artist1);
//        Artist artist2=Artist.createArtist("artist2","/temp/55167a30-7e09-4633-b25f-d7770936aee8.png");
//        em.persist(artist2);
//
//        //music
//        Music music1=Music.createMusic("title1",artist1,"/temp/55167a30-7e09-4633-b25f-d7770936aee8.png","model url1","/temp/f4e6396b-be12-47ab-b9ee-0ee657c913a0.webm","https://youtu.be/f6YDKF0LVWw", LocalDateTime.now());
//        em.persist(music1);
//        em.persist(Tag.createTag(music1.getArtist().getName(),TagType.ARTIST,music1.getArtist().getImgUrl()));
//        em.persist(Tag.createTag(music1.getTitle(),TagType.TITLE, music1.getImgUrl()));
//        Music music2=Music.createMusic("title2",artist2,"/temp/55167a30-7e09-4633-b25f-d7770936aee8.png","model url2","/temp/f4e6396b-be12-47ab-b9ee-0ee657c913a0.webm","https://youtu.be/f6YDKF0LVWw",LocalDateTime.now());
//        em.persist(Tag.createTag(music2.getArtist().getName(),TagType.ARTIST,music2.getArtist().getImgUrl()));
//        em.persist(Tag.createTag(music2.getTitle(),TagType.TITLE, music2.getImgUrl()));
//        em.persist(music2);
////        Music music3=Music.createMusic("title3","artist2","album img3","model url3","guide url3","mv url3",LocalDateTime.now());
////        em.persist(Tag.createTag(music3.getArtist(),TagType.ARTIST,"artist img3"));
////        em.persist(Tag.createTag(music3.getTitle(),TagType.TITLE, music3.getImgUrl()));
////        em.persist(music3);
        createArtistAndMusicTable();

        User user1=userRepo.findByNickname("user1").get();
        User user2=userRepo.findByNickname("user2").get();
        Music music1=musicRepo.findTestByTitle("Permission to Dance");
        Music music2=musicRepo.findTestByTitle("POP!");

        //video, like, tag
        List<Video> videos=new ArrayList<>();
        for(int i=0;i<5;i++){
            Video video = Video.createVideo("/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm", "/temp/9e7de94f-a832-4af3-9125-fbdd90277b18.png", VideoScope.PUBLIC, user1,music1);
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user1.getNickname(),TagType.NICKNAME));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user1.getNation().getName(),TagType.NATION));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music1.getArtist().getName(),TagType.ARTIST));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music1.getTitle(),TagType.TITLE));
            for(int j=0;j<i;j++){
                video.addHit();
            }
            video.addLikeWeight();
            videos.add(video);
            em.persist(video);
        }
        for(int i=5;i<10;i++){
            Video video = Video.createVideo("/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm",  "/temp/9e7de94f-a832-4af3-9125-fbdd90277b18.png", VideoScope.PUBLIC,user1,music2);
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user1.getNickname(),TagType.NICKNAME));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user1.getNation().getName(),TagType.NATION));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music2.getArtist().getName(),TagType.ARTIST));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music2.getTitle(),TagType.TITLE));
            for(int j=4;j<i;j++){
                video.addHit();
            }
            video.addLikeWeight();
            video.addLikeWeight();
            videos.add(video);
            em.persist(video);
            em.persist(Like.createLike(video,user1));
            em.persist(Like.createLike(video,user2));
        }
//        Video video1 = Video.createVideo("video url!!", VideoScope.PRIVATE, "thumbnail url!!", user2, music1);
//        VideoTag.createVideoTag(video1,tagRepo.findByNameAndType(user2.getNickname(),TagType.NICKNAME));
//        VideoTag.createVideoTag(video1,tagRepo.findByNameAndType(user2.getNation().getName(),TagType.NATION));
//        VideoTag.createVideoTag(video1,tagRepo.findByNameAndType(music1.getArtist().getName(),TagType.ARTIST));
//        VideoTag.createVideoTag(video1,tagRepo.findByNameAndType(music1.getTitle(),TagType.TITLE));
//        videos.add(video1);
//        em.persist(video1);
//        em.persist(Like.createLike(video1,user2));
        for(int i=10;i<15;i++){
            Video video = Video.createVideo("/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm",  "/temp/9e7de94f-a832-4af3-9125-fbdd90277b18.png",VideoScope.PUBLIC,user2, music2);
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user2.getNickname(),TagType.NICKNAME));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user2.getNation().getName(),TagType.NATION));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music2.getArtist().getName(),TagType.ARTIST));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music2.getTitle(),TagType.TITLE));
            for(int j=7;j<i;j++){
                video.addHit();
            }
            videos.add(video);
            em.persist(video);
        }
        for(int i=16;i<20;i++){
            Video video = Video.createVideo("/temp/c2d6f99a-8e0c-4413-a8ab-6e809b6b7d1b.webm",  "/temp/9e7de94f-a832-4af3-9125-fbdd90277b18.png", VideoScope.PUBLIC, user2,music2);
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user2.getNickname(),TagType.NICKNAME));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(user2.getNation().getName(),TagType.NATION));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music2.getArtist().getName(),TagType.ARTIST));
            VideoTag.createVideoTag(video,tagRepo.findTestByNameAndType(music2.getTitle(),TagType.TITLE));
            for(int j=15;j<i;j++){
                video.addHit();
            }
            video.addLikeWeight();
            video.addLikeWeight();
            videos.add(video);
            em.persist(video);
        }

        //clear
        em.persist(Clear.createClear(music1,user1));
//        em.persist(Clear.createClear(music1,user2));
        em.persist(Clear.createClear(music2,user1));
        em.persist(Clear.createClear(music2,user2));

        //follow
        em.persist(Follow.createFollow(user1,user2));
        em.persist(Follow.createFollow(user2,user1));
    }

}