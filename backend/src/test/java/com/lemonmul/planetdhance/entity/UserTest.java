package com.lemonmul.planetdhance.entity;

import com.lemonmul.planetdhance.entity.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@SpringBootTest
@Transactional
class UserTest {

    @Autowired
    EntityManager em;

    @Test
    void createUser() {
        Nation nation1=Nation.createNation("\uD83C\uDDF0\uD83C\uDDF7","ko","img",-3,-3,-2.5);
        em.persist(nation1);

        User user1= User.createUser("email1@xx.xx","user1",null,null,nation1);
        em.persist(user1);
        User user2=User.createUser("email2@xx.xx","user2",null,null,nation1);
        em.persist(user2);
    }
}