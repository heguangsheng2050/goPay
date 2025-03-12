#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting database tests...${NC}"

# Function to run SQL query and display results
run_query() {
    echo -e "\n${GREEN}Running: $1${NC}"
    PGPASSWORD=gP@y2024S3cur3! psql -h localhost -p 5432 -U gopay_admin -d payDemo -c "$1"
    if [ $? -ne 0 ]; then
        echo -e "${RED}Query failed. Please check the error message above.${NC}"
        return 1
    fi
}

# Insert test data
echo -e "\n${GREEN}Inserting test transactions...${NC}"
PGPASSWORD=gP@y2024S3cur3! psql -h localhost -p 5432 -U gopay_admin -d payDemo << 'EOF'
-- Test SALE transaction
INSERT INTO transdemo (tx_type, payment, payer, status) VALUES
(
    'SALE',
    '{
        "payment_type": "Credit Card",
        "masked_payment": "************3333",
        "cvv": "789",
        "expiration_date": "11/25"
    }',
    '{
        "firstName": "Test",
        "lastName": "User",
        "address1": "789 Test Ave",
        "city": "Austin",
        "state": "TX",
        "zipcode": "78701",
        "phone": "512-555-3333",
        "email": "test.user@example.com"
    }',
    'pending'
);

-- Test REFUND transaction
INSERT INTO transdemo (tx_type, payment, payer, status) VALUES
(
    'REFUND',
    '{
        "payment_type": "ACH",
        "masked_payment": "*********4444",
        "routing_number": "021000021"
    }',
    '{
        "firstName": "Sarah",
        "lastName": "Test",
        "address1": "444 Test Blvd",
        "city": "Denver",
        "state": "CO",
        "zipcode": "80201",
        "phone": "303-555-4444",
        "email": "sarah.test@example.com"
    }',
    'successful'
);
EOF

# Run test queries
echo -e "\n${GREEN}Running test queries...${NC}"

# Check enum types
run_query "SELECT typname, enumlabel FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE typname IN ('transaction_type', 'transaction_status');"

# Count transactions by type
run_query "SELECT tx_type, COUNT(*) FROM transdemo GROUP BY tx_type ORDER BY tx_type;"

# Count transactions by status
run_query "SELECT status, COUNT(*) FROM transdemo GROUP BY status ORDER BY status;"

# Show recent transactions
run_query "SELECT id, tx_date AT TIME ZONE 'America/New_York' as eastern_time, tx_type, payment->>'payment_type' as payment_type, status FROM transdemo ORDER BY tx_date DESC LIMIT 5;"

echo -e "\n${GREEN}Tests completed!${NC}"