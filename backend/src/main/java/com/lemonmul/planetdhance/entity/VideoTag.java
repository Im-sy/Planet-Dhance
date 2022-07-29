package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class VideoTag {

    @Id @GeneratedValue
    @Column(columnDefinition="INT UNSIGEND",name = "video_tag_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
