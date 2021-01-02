FROM openjdk:8-jdk-alpine
ADD target/cinema-service.jar /app/cinema-service.jar
ENTRYPOINT ["java","-jar","/app/cinema-service.jar"]
EXPOSE 8082