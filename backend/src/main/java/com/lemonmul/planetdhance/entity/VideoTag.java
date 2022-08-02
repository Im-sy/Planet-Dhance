package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoTag {

    @Id @GeneratedValue
    @Column(columnDefinition="INT UNSIGNED",name = "video_tag_id")
//    @Column(name ="video_tag_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
