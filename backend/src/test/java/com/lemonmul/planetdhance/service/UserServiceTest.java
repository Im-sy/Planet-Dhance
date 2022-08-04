package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.user.Basic;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.user.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@SpringBootTest
@Transactional
//@Rollback(value = false)
class UserServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    EntityManager em;

    @Test
    public void signup() {
        // given
        Nation nation1=Nation.createNation("\uD83C\uDDF0\uD83C\uDDF7","ko");
        em.persist(nation1);

        Basic basic = Basic.createBasic("1217jdk@naver.com", "1217jdk", "", "", nation1, Role.USER, "1234");
        userService.signUp(basic);
    }
}