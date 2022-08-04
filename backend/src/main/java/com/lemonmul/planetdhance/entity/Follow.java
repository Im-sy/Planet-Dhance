package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow {
    @Column(name ="follow_id")
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id")
    private User from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id")
    private User to;

    //==생성 메서드==//
    public static Follow createFollow(User from,User to){
        Follow follow=new Follow();
        follow.setFrom(from);
        follow.setTo(to);
        return follow;
    }

    //==연관관계 메서드==//
    public void setFrom(User from){
        this.from=from;
        from.getTos().add(this);
    }

    public void setTo(User to){
        this.to=to;
        to.getFroms().add(this);
    }

}
