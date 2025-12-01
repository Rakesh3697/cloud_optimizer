package com.cloudcost.controller;

import com.cloudcost.model.*;
import com.cloudcost.service.CloudService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CloudController {

    private final CloudService cloudService;

    public CloudController(CloudService cloudService) {
        this.cloudService = cloudService;
    }

    @PostMapping("/calculate")
    public CostResponse calculate(@RequestBody Inputs inputs) {

        Map<String, CostBreakdown> costs = cloudService.calculateCosts(inputs);

        List<Map.Entry<String, CostBreakdown>> sorted =
                costs.entrySet().stream()
                        .sorted(Comparator.comparing(e -> e.getValue().total))
                        .toList();

        String cheapest = sorted.get(0).getKey();
        String mostExpensive = sorted.get(sorted.size() - 1).getKey();

        double savings = ((sorted.get(sorted.size() - 1).getValue().total
                - sorted.get(0).getValue().total)
                / sorted.get(sorted.size() - 1).getValue().total) * 100;

        CostResponse response = new CostResponse();
        response.costs = costs;
        response.cheapest = cheapest;
        response.mostExpensive = mostExpensive;
        response.savings = Math.round(savings * 100.0) / 100.0;
        response.recommendation = cloudService.recommendProvider(costs);

        return response;
    }
}
