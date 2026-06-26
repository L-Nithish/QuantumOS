# Build stage using Eclipse Temurin JDK 26
FROM eclipse-temurin:26-jdk AS build
COPY . /home/gradle/src
WORKDIR /home/gradle/src
RUN ./gradlew bootJar --no-daemon

# Run stage using Eclipse Temurin JDK 26
FROM eclipse-temurin:26-jdk
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
