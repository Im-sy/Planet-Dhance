package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Nation {
    @Column(columnDefinition = "INT UNSIGNED", name ="nation_id")
    @Id
    @GeneratedValue
    private int id;

    private String flag;

    private String name;

    @OneToMany(mappedBy = "user")
    private List<User> users;
}
