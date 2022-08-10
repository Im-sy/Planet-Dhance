package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.user.Basic;
import com.lemonmul.planetdhance.entity.Nation;
import com.lemonmul.planetdhance.entity.user.Role;
import com.lemonmul.planetdhance.entity.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
        Nation nation1=Nation.createNation("\uD83C\uDDF0\uD83C\uDDF7","ko",-3,-3,-2.5);
        em.persist(nation1);

        Basic basic = Basic.createBasic("1217jdk@naver.com", "1217jdk", "", "", nation1, Role.USER, "1234");
//        userService.signUp(basic);
    }

    @Test
    public void ranking(){
//        Map<Nation, List<User>> ranking = userService.ranking();
//        Map<Nation,Integer> counts=new HashMap<>();
//
//        for (Map.Entry<Nation, List<User>> entry : ranking.entrySet()) {
//            int count=0;
//            for (User user : entry.getValue()) {
//                count+=user.getClears().size();
//            }
//            counts.put(entry.getKey(),count);
//            System.out.println("==============count = " + count+" "+entry.getKey().getName());
//        }
//
//        List<Map.Entry<Nation, Integer>> collect = counts.entrySet().stream().sorted(Map.Entry.comparingByValue(Comparator.reverseOrder())).collect(Collectors.toList());
//        for (Map.Entry<Nation, Integer> entry : collect) {
//            System.out.println("--------------entry = " + entry.getKey().getName()+" "+entry.getValue());
//        }
        Map<Nation, Integer> ranking = userService.ranking();
    }
}