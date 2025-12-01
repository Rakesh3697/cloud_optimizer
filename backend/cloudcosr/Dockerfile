# Stage 1: Build the application
FROM eclipse-temurin:25-jdk AS build

# Set working directory
WORKDIR /app

# Copy Maven/Gradle files first to cache dependencies
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the rest of the source code
COPY src ./src

# Build the jar
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:25-jre

# Set working directory
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (Spring Boot default)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
