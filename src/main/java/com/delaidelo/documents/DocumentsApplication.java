package com.delaidelo.documents;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan
@Configuration
@EnableAutoConfiguration
@SpringBootConfiguration
public class DocumentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DocumentsApplication.class, args);
	}
}
