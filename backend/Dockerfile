FROM openjdk:23-jdk-slim
LABEL authors="Artem Stasyuk"

# Set the working directory
WORKDIR /app

# Copy the Maven project files
COPY pom.xml ./
COPY src ./src

# Package the application
RUN mvn package

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "target/la_bella_ferdinanda-0.0.1-SNAPSHOT.jar"]