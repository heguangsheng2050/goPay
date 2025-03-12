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

## Testing Queries

```sql
-- Check all transactions
SELECT * FROM transdemo;

-- Check specific transaction types
SELECT * FROM transdemo WHERE tx_type = 'SALE';

-- Check transaction status
SELECT status, COUNT(*) FROM transdemo GROUP BY status;
```