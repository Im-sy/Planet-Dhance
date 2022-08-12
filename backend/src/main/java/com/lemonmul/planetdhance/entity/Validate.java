package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Validate {

    @Column(name ="validate_id")
    @Id @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(length = 500)
    private String token;

    public Validate(User user, String token){
        this.user = user;
        this.token = token;
    }
}
