package com.lemonmul.planetdhance.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Artist {
    @Column(name = "artist_id")
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String imgUrl;

    private Long orderWeight;

    @OneToMany(mappedBy = "artist")
    private List<Music> musics=new ArrayList<>();

    //==생성 메서드==//
    public static Artist createArtist(String name,String imgUrl){
        Artist artist=new Artist();
        artist.name=name;
        artist.imgUrl=imgUrl;
        artist.orderWeight=0L;
        return artist;
    }

    public void setOrderWeight(Long orderWeight){
        this.orderWeight=orderWeight;
    }

    //==비즈니스 로직==//
    public void addOrderWeight(){
        orderWeight++;
    }
}
