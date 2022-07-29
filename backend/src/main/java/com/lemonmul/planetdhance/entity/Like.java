package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "likes")
@Getter
public class Like {

    @Id @GeneratedValue
    @Column(columnDefinition="INT UNSIGNED",name = "like_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
