FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY . .

# 🔑 DAR PERMISOS DE EJECUCIÓN
RUN chmod +x mvnw

# AHORA ya funciona
RUN ./mvnw clean package -DskipTests


FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
