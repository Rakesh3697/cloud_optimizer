package com.cloudcost.service;

import com.cloudcost.model.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CloudService {

    public Map<String, CostBreakdown> calculateCosts(Inputs inputs) {
        Map<String, CostBreakdown> result = new HashMap<>();

        // Base Rates (Simulated)
        result.put("AWS", generateCosts(inputs, 1.05, "AWS"));
        result.put("Azure", generateCosts(inputs, 1.00, "Azure"));
        result.put("GCP", generateCosts(inputs, 0.95, "GCP"));

        return result;
    }

    private CostBreakdown generateCosts(Inputs inputs, double providerBaseRate, String providerName) {
        CostBreakdown cb = new CostBreakdown();

        // --- 1. Null-safe extraction and defaults for all string inputs ---
        final String safeStorageType = Optional.ofNullable(inputs.storageType).orElse("SSD/Standard");
        final String safePricingModel = Optional.ofNullable(inputs.pricingModel).orElse("On-demand");
        final String safeRegion = Optional.ofNullable(inputs.region).orElse("US-East");
        final String safeDbType = Optional.ofNullable(inputs.dbType).orElse("SQL");

        // 2. Calculate Base Resources (Total vCPU/RAM)
        // We assume vCPUs, ram, and numInstances are properly handled as int/double on the frontend payload, 
        // preventing NullPointerException if they are used directly in multiplication.
        double totalVcpus = inputs.vCPUs * inputs.numInstances;
        double totalRam = inputs.ram * inputs.numInstances;
        
        // Base Hourly Rates (Generic assumption)
        double cpuRate = 0.04; 
        double ramRate = 0.005;
        
        // Storage Rate check is now SAFE (using safeStorageType)
        double storageRate = safeStorageType.contains("SSD") ? 0.10 : 0.05; 
        double bandwidthRate = 0.08;

        // Apply Regional Adjustments
        double regionMultiplier = safeRegion.equals("US-East") ? 1.0 : 1.2; 

        // 3. Calculate Raw Monthly Costs (730 hours/month)
        double computeCost = ((totalVcpus * cpuRate) + (totalRam * ramRate)) * 730;
        double storageCost = inputs.storageSize * storageRate;
        
        // Database type check is now SAFE (using safeDbType)
        double dbCost = inputs.dbSize * (safeDbType.equals("SQL") ? 0.12 : 0.08); 
        double netCost = inputs.bandwidth * bandwidthRate;

        // 4. Apply Advanced Toggles (The Multipliers)
        
        // High Availability (Multi-AZ usually doubles data/sync costs or adds overhead)
        if (inputs.highAvailability) {
            computeCost *= 1.4; // +40% for HA setup
            dbCost *= 1.8;      // +80% for Multi-AZ DB
        }

        // Pricing Model Discounts (Check is now SAFE using safePricingModel)
        if (safePricingModel.equals("Reserved")) {
            computeCost *= 0.6; // 40% discount
        } else if (safePricingModel.equals("Spot")) {
            computeCost *= 0.3; // 70% discount
        }

        // Service Costs
        double servicesCost = 0.0;
        if (inputs.aiMlIntegration) servicesCost += 150.0;
        if (inputs.serverless) {
            computeCost *= 0.8;
            servicesCost += 50.0;
        }

        // Apply Provider Rate & Region
        computeCost *= providerBaseRate * regionMultiplier;
        storageCost *= providerBaseRate * regionMultiplier;
        dbCost *= providerBaseRate * regionMultiplier;
        netCost *= providerBaseRate * regionMultiplier;
        // servicesCost doesn't usually use providerBaseRate, but let's apply a general adjustment
        servicesCost *= regionMultiplier;


        // Apply Performance Weight (1-10 scale)
        if (inputs.performanceWeight > 7) {
            // High performance generally means more expensive hardware/services
            double perfMultiplier = 1.0 + ((inputs.performanceWeight - 7) * 0.03); 
            computeCost *= perfMultiplier;
        }
        
        // Apply Sustainability Focus (May increase cost for renewable energy regions/certified hardware)
        if (inputs.sustainabilityFocus) {
             servicesCost += 20;
        }


        // 5. Build the breakdown and total
        cb.breakdown = Map.of(
            "Compute", Math.round(computeCost * 100.0) / 100.0,
            "Storage", Math.round(storageCost * 100.0) / 100.0,
            "Database", Math.round(dbCost * 100.0) / 100.0,
            "Networking", Math.round(netCost * 100.0) / 100.0,
            "Services", Math.round(servicesCost * 100.0) / 100.0
        );

        cb.total = computeCost + storageCost + dbCost + netCost + servicesCost;
        return cb;
    }

    public String recommendProvider(Map<String, CostBreakdown> costs) {
        // We assume costs map is never empty in a successful calculation
        return costs.entrySet().stream()
                .min(Comparator.comparing(e -> e.getValue().total))
                .get().getKey();
    }
}