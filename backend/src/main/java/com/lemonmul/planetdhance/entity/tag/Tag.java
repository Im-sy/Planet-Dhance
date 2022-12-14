package com.lemonmul.planetdhance.entity.tag;

import com.lemonmul.planetdhance.api.VideoApi;
import com.lemonmul.planetdhance.dto.TagRequestDto;
import com.lemonmul.planetdhance.entity.VideoTag;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag {

    @Id @GeneratedValue
    @Column(name ="tag_id")
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private TagType type;

    private String imgUrl;

    private int hit;

    @OneToMany(mappedBy = "tag")
    private List<VideoTag> videoTags=new ArrayList<>();

    //==생성 메서드==//
    public static Tag createTag(String name,TagType type,String imgUrl){
        Tag tag=new Tag();
        tag.name=name;
        tag.type=type;
        tag.imgUrl=imgUrl;
        tag.hit=0;
        return tag;
    }

    public static Tag createCustomTag(TagRequestDto tagRequestDto){
        Tag tag=new Tag();
        tag.name= tagRequestDto.getType();
        tag.type=TagType.CUSTOM;
        tag.imgUrl=null;
        tag.hit=0;
        return tag;
    }

    public void setImgUrl(String imgUrl){
        this.imgUrl=imgUrl;
    }

    //==비즈니스 로직==//
    public void addHit(){
        this.hit++;
    }

}
