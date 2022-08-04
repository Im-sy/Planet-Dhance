package com.lemonmul.planetdhance.entity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MusicTest {

    @Autowired
    EntityManager em;

    @Test
    void createMusic() {
        Music music1=Music.createMusic("title1","artist1","album img1","model url1","guide url1","mv url1");
        em.persist(music1);
        Music music2=Music.createMusic("title2","artist2","album img2","model url2","guide url2","mv url2");
        em.persist(music2);
    }
}