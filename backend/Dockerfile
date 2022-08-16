FROM openjdk:17-jdk

ARG JAR_FILE=./build/libs/*.jar

COPY ${JAR_FILE} planetdhance_test.jar

ENTRYPOINT ["java", "-jar", "/planetdhance_test.jar"]

