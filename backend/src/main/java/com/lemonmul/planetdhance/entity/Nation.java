package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Nation {
    @Column(columnDefinition = "INT UNSIGNED", name ="nation_id")
//    @Column(name ="nation_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String flag;

    private String name;

    @OneToMany(mappedBy = "nation")
    private List<User> users=new ArrayList<>();

    //==생성 메서드==//
    public static Nation createNation(String flag,String name){
        Nation nation=new Nation();
        nation.flag = flag;
        nation.setName(name);
        return nation;
    }

    private void setName(String name){
        this.name=name;
    }
}
