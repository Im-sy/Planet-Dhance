package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DTYPE")
public class User {
    @Column(columnDefinition = "INT UNSIGNED", name ="user_id")
//    @Column(name ="user_id")
    @Id
    @GeneratedValue
    private int id;

    private String nickname;

    private String introduce;

    private String imgUrl;

    private LocalDateTime regDate;

    private LocalDateTime renewDate;

    @Enumerated(EnumType.STRING)
    private Role role;

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

    public User(String imgUrl){
        this.imgUrl = imgUrl;
    }
}
