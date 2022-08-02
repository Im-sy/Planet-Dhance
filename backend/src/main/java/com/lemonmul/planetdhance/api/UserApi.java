package com.lemonmul.planetdhance.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserApi {

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
