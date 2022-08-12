package com.lemonmul.planetdhance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PlanetdhanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlanetdhanceApplication.class, args);
	}

}
