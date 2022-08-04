package com.lemonmul.planetdhance.security.jwt;

import com.lemonmul.planetdhance.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class JwtToken implements UserDetails {
    private String email;
    private String nickname;
    private String nationName;
    @ElementCollection(fetch = FetchType.EAGER)
//    @Builder.Default
    private List<String> roles = new ArrayList<>();
//
//    public JwtToken(String email, String nickname) {
//        this.email = email;
//        this.nickname = nickname;
//    }

    public JwtToken(User user){
        this.email = user.getEmail();
        this.nickname = user.getNickname();
//        this.nationName = user.getNation().getName();
        this.roles = Collections.singletonList(user.getRole().getKey());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
