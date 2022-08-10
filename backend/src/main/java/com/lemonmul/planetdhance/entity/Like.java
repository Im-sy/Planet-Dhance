package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.user.User;
import com.lemonmul.planetdhance.entity.video.Video;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "likes")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like {

    @Id @GeneratedValue
    @Column(name ="like_id")
    private Long id;

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
    private void setVideo(Video video){
        this.video=video;
        video.getLikes().add(this);
        video.addLikeWeight();
    }

    private void setUser(User user){
        this.user=user;
        user.getLikes().add(this);
    }
}
