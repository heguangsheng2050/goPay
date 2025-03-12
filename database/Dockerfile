FROM postgres:16.8

# Install additional packages
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV POSTGRES_DB=payDemo
ENV POSTGRES_USER=gopay_admin
ENV POSTGRES_PASSWORD=gP@y2024S3cur3!

# Copy initialization scripts
COPY init/ /docker-entrypoint-initdb.d/

EXPOSE 5432