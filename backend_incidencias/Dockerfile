# ---------- Etapa 1: Construcción del JAR ----------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos los archivos necesarios para resolver dependencias
COPY pom.xml .
RUN mvn -q dependency:go-offline

# Copiamos el resto del proyecto
COPY . .
RUN mvn -q package -DskipTests

# ---------- Etapa 2: Imagen final ----------
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copiamos el JAR generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto donde arranca Spring Boot (el que tengas configurado, normalmente 8080)
EXPOSE 8080

# Comando de inicio
ENTRYPOINT ["java", "-jar", "app.jar"]
