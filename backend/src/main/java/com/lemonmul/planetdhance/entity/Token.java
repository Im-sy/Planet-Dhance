package com.lemonmul.planetdhance.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Token {

    @Column(name ="token_id")
    @Id @GeneratedValue
    private Long id;

    private String email;

    @Column(length = 500)
    private String token;

    public Token(String email, String token){
        this.email = email;
        this.token = token;
    }
}
