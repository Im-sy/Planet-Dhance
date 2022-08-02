package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Repository
public class UserRepo {
    @PersistenceContext
    private EntityManager em;

    public Optional<User> findOne(Long id){
        return Optional.ofNullable(em.find(User.class, id));
    }

    public Optional<User> findByOAuthId(String oauthid){
        return Optional.ofNullable(em.find(User.class, oauthid));
    }

    @Transactional
    public void save(User member){
        em.persist(member);
    }
}
