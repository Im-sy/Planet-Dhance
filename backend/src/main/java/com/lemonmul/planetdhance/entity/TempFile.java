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
@AllArgsConstructor
public class TempFile {

    @Column(name ="file_id")
    @Id
    @GeneratedValue
    private Long id;

    private String fileUrl;

    public TempFile(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}
