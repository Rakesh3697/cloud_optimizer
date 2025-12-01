package com.cloudcost.model;

import java.util.Map;

public class CostResponse {
    public Map<String, CostBreakdown> costs;
    public String cheapest;
    public String mostExpensive;
    public double savings;
    public String recommendation;
}
