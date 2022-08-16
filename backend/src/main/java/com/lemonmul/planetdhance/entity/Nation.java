package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private String imgUrl;

    private double x,y,z;

    @OneToMany(mappedBy = "nation")
    private List<User> users=new ArrayList<>();

    //==생성 메서드==//
    public static Nation createNation(String flag,String name,String imgUrl,double x,double y,double z){
        Nation nation=new Nation();
        nation.flag = flag;
        nation.setName(name);
        nation.setImgUrl(imgUrl);
        nation.x=x;
        nation.y=y;
        nation.z=z;
        return nation;
    }

    private void setName(String name){
        this.name=name;
    }
}
