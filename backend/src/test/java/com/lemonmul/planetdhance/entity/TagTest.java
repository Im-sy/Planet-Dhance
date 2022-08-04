package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.tag.Tag;
import com.lemonmul.planetdhance.entity.tag.TagType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@SpringBootTest
@Transactional
@Rollback(value = false)
class TagTest {

    @Autowired
    EntityManager em;

    @Test
    void createTag() {
        em.persist(Tag.createTag("title1",TagType.TITLE,"album img1"));
        em.persist(Tag.createTag("title2",TagType.TITLE,"album img2"));
        em.persist(Tag.createTag("artist1",TagType.ARTIST,"artist img1"));
        em.persist(Tag.createTag("artist2",TagType.ARTIST,"artist img2"));
        em.persist(Tag.createTag("ko", TagType.NATION,"nation img"));
        em.persist(Tag.createTag("user1", TagType.NICKNAME,"default img path"));
        em.persist(Tag.createTag("user2", TagType.NICKNAME,"default img path"));
    }
}