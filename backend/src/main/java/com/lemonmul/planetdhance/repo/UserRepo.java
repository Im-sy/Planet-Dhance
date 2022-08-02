package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Social;
import com.lemonmul.planetdhance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findById(int id);
    Optional<User> findByEmail(String email);
    @Query("from Social")
    Optional<Social> findByOauth2Sub(String oauth2Sub);
}
