package com.lemonmul.planetdhance.repo;

import com.lemonmul.planetdhance.entity.Follow;
import com.lemonmul.planetdhance.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepo extends JpaRepository<Follow, Long> {

    Optional<Follow> findByFromAndTo(User from, User to);

    void deleteByFromAndTo(User from, User to);

    List<Follow> findAllByFrom(User from);

    List<Follow> findAllByTo(User from);
}
