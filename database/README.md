# GoPay Database Microservice

This microservice provides the PostgreSQL database for the GoPay project.

## Database Credentials

- **Database Name**: payDemo
- **Username**: gopay_admin
- **Password**: gP@y2024S3cur3!
- **Port**: 5432

## Schema Details

### Enum Types
1. transaction_type:
   - SALE
   - CREDIT
   - REFUND
   - VOID

2. transaction_status:
   - pending
   - successful
   - failed

### Table: transdemo
- id: bigserial (starts from 100000000001)
- tx_date: datetime (US Eastern Time)
- tx_type: transaction_type enum
- payment: JSON type (payment details)
- payer: JSON type (customer information)
- status: transaction_status enum

## Running the Database

```bash
# Build and start the database
docker-compose up -d

# Check logs
docker-compose logs -f

# Connect to database using psql
docker-compose exec postgres psql -U gopay_admin -d payDemo

# Stop the database
docker-compose down
```

## Testing the Database

There are multiple ways to test the database:

### 1. Using the Test Script

The easiest way to run tests is using the provided shell script:

```bash
# Make the script executable
chmod +x database/scripts/run_tests.sh

# Run the tests
./database/scripts/run_tests.sh
```

This script will:
- Insert test transactions
- Run verification queries
- Show transaction statistics
- Display results in a formatted way

### 2. Manual Testing with SQL File

A comprehensive set of test queries is provided in `scripts/test_queries.sql`. These queries test:

1. Enum Types Verification
2. Table Structure
3. Transaction Querying
4. Data Insertion (SALE and REFUND examples)
5. Transaction Type Statistics
6. Status Aggregation
7. Pending Transaction Search
8. Customer Transaction History
9. Transaction Statistics with Time Zones

To run these queries:

```bash
# Option 1: Using psql from host machine
PGPASSWORD=gP@y2024S3cur3! psql -h localhost -p 5432 -U gopay_admin -d payDemo -f database/scripts/test_queries.sql

# Option 2: Using Docker container
docker compose exec -T postgres psql -U gopay_admin -d payDemo -f /scripts/test_queries.sql
```

### 3. Interactive Testing

For interactive testing, connect to the database:

```bash
# Option 1: Using psql from host machine
PGPASSWORD=gP@y2024S3cur3! psql -h localhost -p 5432 -U gopay_admin -d payDemo

# Option 2: Using Docker container
docker compose exec postgres psql -U gopay_admin -d payDemo
```

### Sample Queries

```sql
-- Check enum types
SELECT typname, enumlabel 
FROM pg_enum e 
JOIN pg_type t ON e.enumtypid = t.oid
WHERE typname IN ('transaction_type', 'transaction_status');

-- Query transactions with payment details
SELECT 
    id,
    tx_date AT TIME ZONE 'America/New_York' as eastern_time,
    tx_type,
    payment->>'payment_type' as payment_type,
    payment->>'masked_payment' as card_number,
    status
FROM transdemo;

-- Get transaction statistics
SELECT 
    tx_type,
    status,
    COUNT(*) as count
FROM transdemo 
GROUP BY tx_type, status
ORDER BY tx_type, status;
```