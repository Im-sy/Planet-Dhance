package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Follow {
    @Column(columnDefinition = "INT UNSIGNED", name ="follow_id")
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id")
    private User from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id")
    private User to;
}
