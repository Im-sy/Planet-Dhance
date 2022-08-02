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
public class Tag {

    @Id @GeneratedValue
    @Column(columnDefinition="INT UNSIGNED",name = "tag_id")
    private int id;

    private String name;

    @Enumerated(EnumType.STRING)
    private TagType type;

    private String imgUrl;

    private int hit;

    @OneToMany(mappedBy = "tag")
    private List<VideoTag> videoTags=new ArrayList<>();
}
