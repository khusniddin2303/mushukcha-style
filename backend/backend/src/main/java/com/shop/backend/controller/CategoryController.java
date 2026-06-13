package com.shop.backend.controller;

import com.shop.backend.dto.CategoryRequest;
import com.shop.backend.dto.CategoryResponse;
import com.shop.backend.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public List<CategoryResponse> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/categories/featured")
    public List<CategoryResponse> getFeaturedCategories() {
        return categoryService.getFeaturedCategories();
    }

    @GetMapping("/categories/{id}")
    public CategoryResponse getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/categories/{id}/featured")
    public CategoryResponse toggleFeaturedCategory(@PathVariable Long id) {
        return categoryService.toggleFeaturedCategory(id);
    }
}