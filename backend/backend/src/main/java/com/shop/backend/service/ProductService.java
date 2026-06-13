package com.shop.backend.service;

import com.shop.backend.dto.ProductRequest;
import com.shop.backend.dto.ProductResponse;
import com.shop.backend.exception.CategoryNotFoundException;
import com.shop.backend.exception.ProductNotFoundException;
import com.shop.backend.model.Category;
import com.shop.backend.model.Product;
import com.shop.backend.repository.CategoryRepository;
import com.shop.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.shop.backend.model.Product;
import org.springframework.data.domain.Sort;
import java.util.List;
import com.shop.backend.dto.ProductPageResponse;


@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    private ProductResponse mapToResponse(Product product) {
        String categoryName = product.getCategory() != null ? product.getCategory().getName() : null;

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                categoryName,
                product.getImageUrl(),
                product.getCurrency(),
                product.getDescription(),
                product.isNewArrival()
        );
    }

    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.getCategoryId()));

        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setCategory(category);
        product.setImageUrl(request.getImageUrl());
        product.setCurrency(request.getCurrency());
        product.setDescription(request.getDescription());
        product.setNewArrival(request.isNewArrival());


        Product savedProduct = productRepository.save(product);
        return mapToResponse(savedProduct);
    }

    public ProductPageResponse getAllProducts(String name, Long categoryId, String sort, int page, int size) {

        List<Product> products;

        if (name != null && !name.isEmpty() && categoryId != null) {
            products = productRepository.findAll().stream()
                    .filter(p -> p.getName().toLowerCase().contains(name.toLowerCase()))
                    .filter(p -> p.getCategory() != null && p.getCategory().getId().equals(categoryId))
                    .toList();

        } else if (name != null && !name.isEmpty()) {
            products = productRepository.findByNameContainingIgnoreCase(name);

        } else if (categoryId != null) {
            products = productRepository.findByCategoryId(categoryId);

        } else {
            products = productRepository.findAll();
        }

        if (sort != null && !sort.isEmpty()) {
            if (sort.equals("priceAsc")) {
                products = products.stream()
                        .sorted((a, b) -> Double.compare(a.getPrice(), b.getPrice()))
                        .toList();

            } else if (sort.equals("priceDesc")) {
                products = products.stream()
                        .sorted((a, b) -> Double.compare(b.getPrice(), a.getPrice()))
                        .toList();

            } else if (sort.equals("nameAsc")) {
                products = products.stream()
                        .sorted((a, b) -> a.getName().compareToIgnoreCase(b.getName()))
                        .toList();

            } else if (sort.equals("newest")) {
                products = products.stream()
                        .sorted((a, b) -> Long.compare(b.getId(), a.getId()))
                        .toList();
            }
        }

        int start = page * size;
        int end = Math.min(start + size, products.size());

        if (start > products.size()) {
            return new ProductPageResponse(
                    List.of(),
                    page,
                    0,
                    products.size()
            );
        }

        List<ProductResponse> items = products.subList(start, end)
                .stream()
                .map(this::mapToResponse)
                .toList();

        int totalPages = (int) Math.ceil((double) products.size() / size);

        return new ProductPageResponse(
                items,
                page,
                totalPages,
                products.size()
        );
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        return mapToResponse(product);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.getCategoryId()));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setCurrency(request.getCurrency());
        product.setCategory(category);
        product.setImageUrl(request.getImageUrl());
        product.setDescription(request.getDescription());
        product.setNewArrival(request.isNewArrival());

        Product updatedProduct = productRepository.save(product);
        return mapToResponse(updatedProduct);
    }

    public String deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        productRepository.delete(product);
        return "Product deleted successfully";
    }

    public List<ProductResponse> getNewArrivals() {

        return productRepository.findAll()
                .stream()
                .filter(Product::isNewArrival)
                .map(this::mapToResponse)
                .toList();
    }
}