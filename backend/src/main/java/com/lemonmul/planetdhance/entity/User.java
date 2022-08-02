package com.lemonmul.planetdhance.entity;

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

    private LocalDateTime renewDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @OneToMany(mappedBy = "from")
    private List<Follow> froms=new ArrayList<>();

    @OneToMany(mappedBy = "to")
    private List<Follow> tos=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Like> likes=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Clear> clears=new ArrayList<>();

}
