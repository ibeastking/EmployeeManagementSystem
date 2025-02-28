FROM openjdk:21

WORKDIR /ems

COPY target/backend-0.0.1-SNAPSHOT.jar backendapp

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "backendapp" ]