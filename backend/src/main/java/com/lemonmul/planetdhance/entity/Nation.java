package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Nation {
    @Column(columnDefinition = "INT UNSIGNED", name ="nation_id")
    @Id
    @GeneratedValue
    private int id;

    private String flag;

    private String name;

    @OneToMany(mappedBy = "id")
    private List<User> users=new ArrayList<>();

    public Nation(String flag, String name) {
        this.flag = flag;
        this.name = name;
    }
}
