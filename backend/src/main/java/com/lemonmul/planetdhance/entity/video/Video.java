package com.lemonmul.planetdhance.entity.video;

import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.Music;
import com.lemonmul.planetdhance.entity.VideoTag;
import com.lemonmul.planetdhance.entity.tag.Tag;
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

    private String imgUrl;

    @Enumerated(EnumType.STRING)
    private VideoScope scope;

    private Long hit;

    //정렬 가중치(hit+likeCnt*3)
    private Long orderWeight;

    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id")
    private Music music;

    @OneToMany(mappedBy = "video",cascade = CascadeType.ALL)
    private List<VideoTag> videoTags=new ArrayList<>();

    @OneToMany(mappedBy = "video",cascade = CascadeType.ALL)
    private List<Like> likes=new ArrayList<>();

    //==생성 메서드==//
    public static Video createVideo(String videoUrl, String imgUrl, VideoScope scope, User user, Music music){
        Video video=new Video();
        video.videoUrl=videoUrl;
        video.imgUrl=imgUrl;
        video.scope=scope;
        video.hit=0L;
        video.orderWeight =0L;
        video.regDate=LocalDateTime.now();
        video.setUser(user);
        video.setMusic(music);
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
        this.orderWeight++;
    }

    public void addLikeWeight(){
        this.orderWeight+=3;
    }

    public void removeUser(){
        this.user = null;
    }
}
