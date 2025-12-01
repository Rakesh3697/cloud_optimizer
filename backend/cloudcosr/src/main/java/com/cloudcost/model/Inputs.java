package com.cloudcost.model;

public class Inputs {
    // Basic Info
    public String useCase;
    public String region;
    
    // Compute
    public int vCPUs;
    public int ram; // GB per instance
    public int numInstances;
    
    // Storage
    public int storageSize; // Total GB
    public String storageType; // "SSD", "HDD", "NVMe"
    
    // Database
    public int dbSize;
    public String dbType; // "SQL", "NoSQL"
    
    // Networking
    public double bandwidth; // GB/month
    
    // Settings & Toggles
    public String pricingModel; // "On-demand", "Reserved", "Spot"
    public boolean autoScaling;
    public boolean serverless;
    public boolean aiMlIntegration;
    public boolean highAvailability;
    public boolean sustainabilityFocus;
    
    // Sliders
    public int performanceWeight; // 1-10
    public int futureProjectionMonths;
}