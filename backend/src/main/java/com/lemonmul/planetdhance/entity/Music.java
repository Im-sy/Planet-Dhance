package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.video.Video;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Artist artist;

    private String imgUrl;

    private String modelUrl;

    private String guideUrl;

    private String mvUrl;

    private LocalDateTime relDate;

    @OneToMany(mappedBy = "music")
    private List<Clear> clears=new ArrayList<>();

    @OneToMany(mappedBy = "music")
    private List<Video> videos=new ArrayList<>();

    //==생성 메서드==//

    public static Music createMusic(String title,Artist artist,String imgUrl,String modelUrl,String guideUrl,String mvUrl, LocalDateTime relDate){
        Music music=new Music();
        music.setTitle(title);
        music.setArtist(artist);
        music.imgUrl = imgUrl;
        music.modelUrl = modelUrl;
        music.guideUrl = guideUrl;
        music.mvUrl = mvUrl;
        music.setRelDate(relDate);
        return music;
    }

    //==연관관계 메서드==//
    public void setArtist(Artist artist){
        this.artist=artist;
        artist.getMusics().add(this);
    }

    private void setTitle(String title){
        this.title=title;
    }

    public void setRelDate(LocalDateTime relDate) {
        this.relDate = relDate;
    }
}
