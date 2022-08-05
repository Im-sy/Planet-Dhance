package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.video.Video;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Music {
    @Column(name ="music_id")
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String artist;

    private String imgUrl;

    private String modelUrl;

    private String guideUrl;

    private String mvUrl;

    @OneToMany(mappedBy = "music")
    private List<Clear> clears=new ArrayList<>();

    @OneToMany(mappedBy = "music")
    private List<Video> videos=new ArrayList<>();

    //==생성 메서드==//
    public static Music createMusic(String title,String artist,String imgUrl,String modelUrl,String guideUrl,String mvUrl){
        Music music=new Music();
        music.setTitle(title);
        music.setArtist(artist);
        music.imgUrl = imgUrl;
        music.modelUrl = modelUrl;
        music.guideUrl = guideUrl;
        music.mvUrl = mvUrl;
        return music;
    }

    private void setTitle(String title){
        this.title=title;
    }

    private void setArtist(String artist){
        this.artist=artist;
    }
}
