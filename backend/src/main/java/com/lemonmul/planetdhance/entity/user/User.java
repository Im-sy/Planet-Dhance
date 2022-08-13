package com.lemonmul.planetdhance.entity.user;

import com.lemonmul.planetdhance.entity.Clear;
import com.lemonmul.planetdhance.entity.Follow;
import com.lemonmul.planetdhance.entity.Like;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.video.Video;
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
@ToString
public class User {
    @Column(name ="user_id")
    @Id
    @GeneratedValue
    private Long id;

    private String email;

    private String nickname;

    private String introduce;

    @Lob
    private String imgUrl;

    private LocalDateTime regDate;

    private LocalDateTime renewDate;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @OneToMany(mappedBy = "from")
    private List<Follow> froms=new ArrayList<>();

    @OneToMany(mappedBy = "to")
    private List<Follow> tos=new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Like> likes=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Clear> clears=new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Video> videos=new ArrayList<>();

    public User(String imgUrl){
        this.imgUrl = imgUrl;
    }

    public User(String email, String nickname, String introduce, String imgUrl, Nation nation, Role role){
        this.email = email;
        this.nickname = nickname;
        this.setIntroduce(introduce);
        this.imgUrl = imgUrl;
        this.setNation(nation);
        this.role = role;
        this.regDate = LocalDateTime.now();
        this.renewDate=LocalDateTime.of(1000, 1, 1, 0, 0, 0);
    }

    //==생성 메서드==//
    public static User createUser(String email, String nickname,String introduce,String imgUrl,Nation nation){
        User user=new User();
        user.email = email;
        user.nickname=nickname;
        user.setIntroduce(introduce);
        user.imgUrl = imgUrl;
        user.regDate=LocalDateTime.now();
        user.renewDate=LocalDateTime.of(1000, 1, 1, 0, 0, 0);
        user.role=Role.USER;
        user.setNation(nation);
        return user;
    }

    // TODO: null처리에 관한 부분은 반환할 때 dto에서 이루어지므로 여기서는 처리 안해도 괜찮을지도...?
    public void setImgUrl(String imgUrl){
//        if(imgUrl==null){
//            imgUrl="/resource/user/img/default/default_profile.png";
//        }
        this.imgUrl=imgUrl;
    }

    public void setIntroduce(String introduce){
        //기본 자기소개 설정
        if(introduce==null){
            introduce="hello!";
        }
        this.introduce=introduce;
    }

    //==연관관계 메서드==//
    public void setNation(Nation nation){
        this.nation=nation;
        nation.getUsers().add(this);
    }

    public void setRenewDate(LocalDateTime renewDate){
        this.renewDate=renewDate;
    }
}
