package com.lemonmul.planetdhance.entity.video;

import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.VideoTag;
import com.lemonmul.planetdhance.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Video {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name ="video_id")
    private Long id;

    private String videoUrl;

    @Enumerated(EnumType.STRING)
    private VideoScope scope;

    private String imgUrl;

    private int hit;

    private int likeCnt;

    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id")
    private Music music;

    @OneToMany(mappedBy = "video")
    private List<VideoTag> videoTags=new ArrayList<>();

    @OneToMany(mappedBy = "video")
    private List<Like> likes=new ArrayList<>();

    //==생성 메서드==//
    public static Video createVideo(String videoUrl,VideoScope scope,String imgUrl,User user,Music music){
        Video video=new Video();
        video.videoUrl=videoUrl;
        video.scope=scope;
        video.imgUrl=imgUrl;
        video.hit=0;
        video.likeCnt=0;
        video.regDate=LocalDateTime.now();
        video.setUser(user);
        video.setMusic(music);
        //TODO 인자로 받아온 custom tag들 Tag 테이블에 추가 여기서?
//        Tag.createTag("",TagType.CUSTOM,"");
        return video;
    }

    //==연관관계 메서드==//
    private void setUser(User user){
        this.user=user;
        user.getVideos().add(this);
        //최신 업로드일 갱신
        user.setRenewDate(this.regDate);
    }

    private void setMusic(Music music){
        this.music=music;
        music.getVideos().add(this);
    }

    public void setScope(VideoScope videoScope){
        this.scope=videoScope;
    }

    public void setImgUrl(String imgUrl){
        this.imgUrl=imgUrl;
    }

    //==비즈니스 로직==//
    public void addHit(){
        this.hit++;
    }

    public void addLikeCnt(){
        this.likeCnt++;
    }

}
