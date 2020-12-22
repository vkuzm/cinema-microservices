FROM openjdk:8-jdk-alpine
ADD target/movies-service.jar /app/movies-service.jar
ENTRYPOINT ["java","-jar","/app/movies-service.jar"]
EXPOSE 8082