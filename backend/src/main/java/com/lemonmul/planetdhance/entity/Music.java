package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Music {
    @Column(columnDefinition = "INT UNSIGNED", name ="music_id")
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
    private List<Clear> clears=new ArrayList<>();

    @OneToMany(mappedBy = "music")
    private List<Video> videos=new ArrayList<>();
}
