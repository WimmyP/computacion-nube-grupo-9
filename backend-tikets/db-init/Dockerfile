FROM alpine/git:latest

WORKDIR /app

# Install postgresql client
RUN apk add --no-cache postgresql-client

# Copy init script and schema
COPY db.sql .
COPY init_db.sh .

# Ensure the script is executable
RUN chmod +x ./init_db.sh

# Command to run the initialization script
CMD ["./init_db.sh"]
