package com.movie.movie.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.movie.model.Movie;
import com.movie.movie.service.MovieService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MovieController.class)
class MovieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MovieService service;

    @Autowired
    private ObjectMapper objectMapper;

    private Movie movie;

    @BeforeEach
    void setUp() {
        movie = new Movie();
        movie.setId("1");
        movie.setTitle("Inception");
    }

    @Test
    void testGetAllMovies() throws Exception {
        Mockito.when(service.getAllMovies()).thenReturn(Arrays.asList(movie));

        mockMvc.perform(get("/api/movies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title", is("Inception")));
    }

    @Test
    void testGetMovieById() throws Exception {
        Mockito.when(service.getMovieById("1")).thenReturn(Optional.of(movie));

        mockMvc.perform(get("/api/movies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Inception")));
    }

    @Test
    void testAddMovie() throws Exception {
        Mockito.when(service.addMovie(any(Movie.class))).thenReturn(movie);

        mockMvc.perform(post("/api/movies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(movie)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Inception")));
    }

    @Test
    void testDeleteMovie() throws Exception {
        Mockito.doNothing().when(service).deleteMovie("1");

        mockMvc.perform(delete("/api/movies/1"))
                .andExpect(status().isOk());
    }
}
