package com.lemonmul.planetdhance.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DTYPE")
@ToString
public class User {
    @Column(name ="user_id")
    @Id
    @GeneratedValue
    private Long id;

    protected String email;

    protected String nickname;

    protected String introduce;

    protected String imgUrl;

    protected LocalDateTime regDate;

    protected LocalDateTime renewDate;

    @Enumerated(EnumType.STRING)
    protected Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    protected Nation nation;

    @OneToMany(mappedBy = "from")
    protected List<Follow> froms=new ArrayList<>();

    @OneToMany(mappedBy = "to")
    protected List<Follow> tos=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    protected List<Like> likes=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    protected List<Clear> clears=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    protected List<Video> videos=new ArrayList<>();

    //==생성 메서드==//
    public static User createUser(String email, String nickname,String introduce,String imgUrl,Nation nation){
        User user=new User();
        user.email = email;
        user.nickname=nickname;
        user.setIntroduce(introduce);
        user.setImgUrl(imgUrl);
        user.regDate=LocalDateTime.now();
        user.renewDate=user.regDate;
        user.role=Role.USER;
        user.nation=nation;
        //Tag 테이블에 nickname 추가
        Tag.createTag(user.nickname, TagType.NICKNAME,user.imgUrl);
        return user;
    }

    public void setImgUrl(String imgUrl){
        if(imgUrl==null){
            //TODO 기본 이미지 설정
            imgUrl="default img path";
        }
        this.imgUrl=imgUrl;
    }

    public void setIntroduce(String introduce){
        //기본 자기소개 설정
        if(introduce==null){
            introduce="hello!";
        }
        this.introduce=introduce;
    }

    public void setRenewDate(LocalDateTime renewDate){
        this.renewDate=renewDate;
    }

}
