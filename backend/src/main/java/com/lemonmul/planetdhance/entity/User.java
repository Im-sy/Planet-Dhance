package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class User {
    @Column(columnDefinition = "INT UNSIGNED", name ="music_id")
    @Id
    @GeneratedValue
    private int id;

    private String nickname;

    private String email;

    private String pwd;

    private String introduce;

    private String img_url;

    private LocalDateTime reg_date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @OneToMany(mappedBy = "from")
    private List<Follow> froms;

    @OneToMany(mappedBy = "to")
    private List<Follow> tos;
}
