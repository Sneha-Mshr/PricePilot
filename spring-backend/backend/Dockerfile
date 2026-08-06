# PricePilot Spring Boot auth service
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /build

# Cache dependencies separately from source so code edits don't refetch them.
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

COPY src ./src
RUN mvn -B -q clean package -DskipTests


FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
COPY --from=build /build/target/*.jar app.jar

# Spring reads PORT via server.port=${PORT:8080} in application.properties.
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "java -jar app.jar"]
