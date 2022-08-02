package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Music {
    @Column(columnDefinition = "INT UNSIGNED", name ="music_id")
//    @Column(name ="music_id")
    @Id
    @GeneratedValue
    private int id;

    private String title;

    private String artist;

    private String imgUrl;

    private String modelUrl;

    private String guideUrl;

    private String mvUrl;

    @OneToMany(mappedBy = "music")
    private List<Clear> clears;

    @OneToMany(mappedBy = "music")
    private List<Video> videos;
}
