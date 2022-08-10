package com.lemonmul.planetdhance.entity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class NationTest {
    @Autowired
    EntityManager em;

    @Test
    void createNation() {
        Nation nation1=Nation.createNation("\uD83C\uDDF0\uD83C\uDDF7","ko",-3,-3,-2.5);
        em.persist(nation1);
    }
}