package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "likes")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Like {

    @Id @GeneratedValue
    @Column(columnDefinition="INT UNSIGNED",name = "like_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //==생성 메서드==//
    public static Like createLike(Video video,User user){
        Like like=new Like();
        like.setVideo(video);
        like.setUser(user);
        return like;
    }

    //==연관관계 메서드==//
    public void setVideo(Video video){
        this.video=video;
        video.getLikes().add(this);
    }

    public void setUser(User user){
        this.user=user;
        user.getLikes().add(this);
    }
}
