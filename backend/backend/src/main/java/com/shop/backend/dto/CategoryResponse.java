package com.shop.backend.dto;

public class CategoryResponse {

    private Long id;
    private String name;
    private boolean featured;
    private long productCount;

    public CategoryResponse() {
    }

    public CategoryResponse(Long id, String name, boolean featured, long productCount) {
        this.id = id;
        this.name = name;
        this.featured = featured;
        this.productCount = productCount;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public long getProductCount() {
        return productCount;
    }

    public void setProductCount(long productCount) {
        this.productCount = productCount;
    }
}