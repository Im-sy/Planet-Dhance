package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class User {
    @Column(columnDefinition = "INT UNSIGNED", name ="user_id")
    @Id
    @GeneratedValue
    private int id;

    private String nickname;

    private String email;

    private String pwd;

    private String introduce;

    private String imgUrl;

    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @OneToMany(mappedBy = "from")
    private List<Follow> froms;

    @OneToMany(mappedBy = "to")
    private List<Follow> tos;

    @OneToMany(mappedBy = "user")
    private List<Like> likes;

    @OneToMany(mappedBy = "user")
    private List<Clear> clears;
}
