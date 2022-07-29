package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Music {
    @Column(columnDefinition = "INT UNSIGNED", name ="music_id")
    @Id
    @GeneratedValue
    private int id;

    private String title;

    private String artist;

    private String img_url;

    private String model_url;

    private String guide_url;

    private String mv_url;

    @OneToMany(mappedBy = "music")
    private List<Clear> clears;

    @OneToMany(mappedBy = "music")
    private List<Video> videos;
}
