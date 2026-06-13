package com.shop.backend.controller;

import com.shop.backend.dto.ProductResponse;
import com.shop.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;
import com.shop.backend.dto.ProductPageResponse;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ProductPageResponse getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return productService.getAllProducts(name, categoryId, sort, page, size);
    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/new-arrivals")
    public List<ProductResponse> getNewArrivals() {
        return productService.getNewArrivals();
    }
}