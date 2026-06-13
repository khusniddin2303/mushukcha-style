package com.shop.backend.dto;

public class ProductResponse {

    private Long id;
    private String name;
    private double price;
    private String categoryName;
    private String imageUrl;
    private String currency;
    private String description;
    private boolean newArrival;

    public ProductResponse() {
    }

    public ProductResponse(Long id, String name, double price, String categoryName, String imageUrl, String currency, String description, boolean newArrival) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryName = categoryName;
        this.imageUrl = imageUrl;
        this.currency = currency;
        this.description = description;
        this.newArrival = newArrival;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCurrency() {
        return currency;
    }

    public String getDescription() {
        return description;
    }

    public boolean isNewArrival() {
        return newArrival;
    }

    public void setNewArrival(boolean newArrival) {
        this.newArrival = newArrival;
    }
}