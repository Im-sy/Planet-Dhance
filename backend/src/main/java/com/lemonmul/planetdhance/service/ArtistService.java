package com.lemonmul.planetdhance.service;

import com.lemonmul.planetdhance.entity.Artist;
import com.lemonmul.planetdhance.repo.ArtistRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepo artistRepo;

    public Artist findByName(String name){
        return artistRepo.findByName(name).get();
    }

    public List<Artist> findTop5(){
        return artistRepo.findTop5ByOrderByOrderWeightDesc();
    }
}
