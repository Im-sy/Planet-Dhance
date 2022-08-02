package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Clear {
    @Column(columnDefinition = "INT UNSIGNED", name ="clear_id")
//    @Column(name ="clear_id")
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id")
    private Music music;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //==생성 메서드==//
    public static Clear createClear(Music music,User user){
        Clear clear=new Clear();
        clear.setMusic(music);
        clear.setUser(user);
        return clear;
    }

    //==연관관계 메서드==//
    private void setMusic(Music music){
        this.music=music;
        music.getClears().add(this);
    }

    private void setUser(User user){
        this.user=user;
        user.getClears().add(this);
    }
}
