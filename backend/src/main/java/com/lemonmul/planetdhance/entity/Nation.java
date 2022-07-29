package com.lemonmul.planetdhance.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class Nation {
    @Column(columnDefinition = "INT UNSIGNED", name ="nation_id")
    @Id
    @GeneratedValue
    private int id;

    private String flag;

    private String name;
}
