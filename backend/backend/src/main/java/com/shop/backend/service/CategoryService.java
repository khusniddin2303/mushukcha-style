package com.shop.backend.service;

import com.shop.backend.dto.CategoryRequest;
import com.shop.backend.dto.CategoryResponse;
import com.shop.backend.exception.CategoryNotFoundException;
import com.shop.backend.model.Category;
import com.shop.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import com.shop.backend.repository.ProductRepository;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.isFeatured(),
                productRepository.countByCategoryId(category.getId())
        );
    }

    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        category.setFeatured(request.isFeatured());

        Category savedCategory = categoryRepository.save(category);
        return mapToResponse(savedCategory);
    }

    public CategoryResponse updateCategory(Long id, String name) {
        if (name == null || name.isBlank()) {
            throw new RuntimeException("Category name is required");
        }

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(name);

        Category savedCategory = categoryRepository.save(category);
        return mapToResponse(savedCategory);
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        return mapToResponse(category);
    }

    public String deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        categoryRepository.delete(category);
        return "Category deleted successfully";
    }

    public List<CategoryResponse> getFeaturedCategories() {

        return categoryRepository.findAll()
                .stream()
                .filter(Category::isFeatured)
                .map(this::mapToResponse)
                .toList();
    }

    public CategoryResponse toggleFeaturedCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        if (!category.isFeatured()) {
            long featuredCount = categoryRepository.findAll()
                    .stream()
                    .filter(Category::isFeatured)
                    .count();

            if (featuredCount >= 3) {
                throw new RuntimeException("You can select only 3 featured categories");
            }
        }

        category.setFeatured(!category.isFeatured());

        Category savedCategory = categoryRepository.save(category);

        return mapToResponse(savedCategory);
    }
}