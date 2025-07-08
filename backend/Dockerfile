FROM maven:3.9.10-eclipse-temurin-24-alpine AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM amazoncorretto:24.0.1-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "--enable-native-access=ALL-UNNAMED" , "-Xms256m", "-Xmx512m", "-jar", "app.jar"]
