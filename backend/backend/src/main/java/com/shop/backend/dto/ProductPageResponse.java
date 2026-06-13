package com.shop.backend.dto;

import java.util.List;

public class ProductPageResponse {

    private List<ProductResponse> items;
    private int currentPage;
    private int totalPages;
    private long totalItems;

    public ProductPageResponse(List<ProductResponse> items, int currentPage, int totalPages, long totalItems) {
        this.items = items;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
    }

    public List<ProductResponse> getItems() {
        return items;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public long getTotalItems() {
        return totalItems;
    }
}