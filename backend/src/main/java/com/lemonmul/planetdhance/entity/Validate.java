package com.lemonmul.planetdhance.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Validate {

    @Column(name ="validate_id")
    @Id @GeneratedValue
    private Long id;

    private Long userid;

    @Column(length = 500)
    private String token;

    public Validate(Long userId, String token){
        this.userid = userId;
        this.token = token;
    }
}
