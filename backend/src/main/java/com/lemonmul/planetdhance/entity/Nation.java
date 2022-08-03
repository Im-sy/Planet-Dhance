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

    @OneToMany(mappedBy = "id")
    private List<User> users=new ArrayList<>();

    //==생성 메서드==//
    public static Nation createNation(String flag,String name){
        Nation nation=new Nation();
        nation.flag = flag;
        nation.name = name;
        return nation;
    }

    private void setName(String name){
        this.name=name;
        //TODO 관리자가 생기면 태그 추가 여기서
        Tag.createTag(name,TagType.NATION,"nation img");
    }
}
