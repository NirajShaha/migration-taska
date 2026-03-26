package com.automotive.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.Formatter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * Web MVC Configuration for WVTA CoC Management System
 * Handles CORS configuration and LocalDate formatting
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("http://localhost:*", "http://127.0.0.1:*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("Content-Type", "Authorization", "X-Requested-With")
                .exposedHeaders("Content-Type")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new Formatter<LocalDate>() {
            private final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;

            @Override
            public LocalDate parse(String text, Locale locale) {
                return LocalDate.parse(text, formatter);
            }

            @Override
            public String print(LocalDate object, Locale locale) {
                return formatter.format(object);
            }
        });
    }
}
