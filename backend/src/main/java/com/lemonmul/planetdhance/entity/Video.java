package com.lemonmul.planetdhance.entity;

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
@AllArgsConstructor
public class Video {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition="INT UNSIGNED",name = "video_id")
    private int id;

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

}
