// src/services/api.js
const API_URL = "http://localhost:8080/api";

export const fetchCloudCosts = async (inputData) => {
    try {
        const response = await fetch(`${API_URL}/calculate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputData),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch cloud costs:", error);
        throw error;
    }
};