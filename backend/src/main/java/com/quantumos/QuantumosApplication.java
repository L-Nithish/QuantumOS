package com.quantumos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class QuantumosApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuantumosApplication.class, args);
	}

	@org.springframework.context.annotation.Bean
	public org.springframework.web.client.RestClient.Builder restClientBuilder() {
		return org.springframework.web.client.RestClient.builder();
	}

	@Bean
	public CommandLineRunner initDatabaseSchema(JdbcTemplate jdbcTemplate) {
		return args -> {
			try {
				jdbcTemplate.execute("ALTER TABLE projects ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0 NOT NULL");
				System.out.println("Database schema patch applied: added progress column to projects table.");
			} catch (Exception e) {
				System.err.println("Failed to apply database schema patch: " + e.getMessage());
			}
		};
	}
}
