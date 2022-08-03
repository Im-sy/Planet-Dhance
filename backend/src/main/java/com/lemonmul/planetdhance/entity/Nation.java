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
    @Column(name ="nation_id")
    @Id
    @GeneratedValue
    private Long id;

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
