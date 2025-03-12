-- Test queries for the payDemo database

-- 1. Check enum types
SELECT typname, enumlabel 
FROM pg_enum e 
JOIN pg_type t ON e.enumtypid = t.oid
WHERE typname IN ('transaction_type', 'transaction_status');

-- 2. Check table structure
\d transdemo

-- 3. Query existing transactions
SELECT 
    id,
    tx_date AT TIME ZONE 'America/New_York' as eastern_time,
    tx_type,
    payment->>'payment_type' as payment_type,
    payment->>'masked_payment' as card_number,
    status
FROM transdemo;

-- 4. Insert a new SALE transaction
INSERT INTO transdemo (tx_type, payment, payer, status) VALUES
(
    'SALE',
    '{
        "payment_type": "Credit Card",
        "masked_payment": "************9012",
        "cvv": "123",
        "expiration_date": "12/25"
    }',
    '{
        "firstName": "Test",
        "lastName": "User",
        "address1": "123 Test St",
        "city": "Boston",
        "state": "MA",
        "zipcode": "02108",
        "phone": "555-0123",
        "email": "test@example.com"
    }',
    'pending'
);

-- 5. Insert a REFUND transaction
INSERT INTO transdemo (tx_type, payment, payer, status) VALUES
(
    'REFUND',
    '{
        "payment_type": "ACH",
        "masked_payment": "*********8765",
        "routing_number": "021000021"
    }',
    '{
        "firstName": "Jane",
        "lastName": "Smith",
        "address1": "456 Main St",
        "city": "Miami",
        "state": "FL",
        "zipcode": "33101",
        "phone": "555-4567",
        "email": "jane@example.com"
    }',
    'successful'
);

-- 6. Query transactions by type
SELECT tx_type, COUNT(*) 
FROM transdemo 
GROUP BY tx_type;

-- 7. Query transactions by status
SELECT status, COUNT(*) 
FROM transdemo 
GROUP BY status;

-- 8. Find all pending transactions
SELECT 
    id,
    tx_date AT TIME ZONE 'America/New_York' as eastern_time,
    tx_type,
    payment->>'payment_type' as payment_type,
    payer->>'firstName' as first_name,
    payer->>'lastName' as last_name
FROM transdemo 
WHERE status = 'pending';

-- 9. Search for a specific customer's transactions
SELECT 
    id,
    tx_date AT TIME ZONE 'America/New_York' as eastern_time,
    tx_type,
    status,
    payment->>'payment_type' as payment_type
FROM transdemo 
WHERE payer->>'email' = 'test@example.com';

-- 10. Get transaction statistics
SELECT 
    tx_type,
    status,
    COUNT(*) as count,
    MIN(tx_date AT TIME ZONE 'America/New_York') as earliest_transaction,
    MAX(tx_date AT TIME ZONE 'America/New_York') as latest_transaction
FROM transdemo 
GROUP BY tx_type, status
ORDER BY tx_type, status;