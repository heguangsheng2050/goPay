-- Create custom types
DO $$ 
BEGIN
    -- Create transaction type enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE transaction_type AS ENUM ('SALE', 'CREDIT', 'REFUND', 'VOID');
    END IF;
    
    -- Create transaction status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_status') THEN
        CREATE TYPE transaction_status AS ENUM ('pending', 'successful', 'failed');
    END IF;
END $$;

-- Drop existing sequence if exists
DROP SEQUENCE IF EXISTS transdemo_id_seq;

-- Create sequence with proper minimum value
CREATE SEQUENCE transdemo_id_seq
    START WITH 100000000001
    INCREMENT BY 1
    MINVALUE 100000000001
    NO MAXVALUE
    CACHE 1;

-- Create transdemo table
CREATE TABLE IF NOT EXISTS transdemo (
    id BIGINT DEFAULT nextval('transdemo_id_seq') PRIMARY KEY CHECK (id >= 100000000001),
    tx_date TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'America/New_York'),
    tx_type transaction_type NOT NULL,
    payment JSONB NOT NULL,
    payer JSONB NOT NULL,
    status transaction_status NOT NULL DEFAULT 'pending'
);

-- Set sequence ownership
ALTER SEQUENCE transdemo_id_seq OWNED BY transdemo.id;

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_transdemo_status ON transdemo(status);
CREATE INDEX IF NOT EXISTS idx_transdemo_tx_date ON transdemo(tx_date);

-- Insert sample data
INSERT INTO transdemo (tx_type, payment, payer, status) VALUES
(
    'SALE',
    '{
        "payment_type": "Credit Card",
        "masked_payment": "************1234",
        "encrypted_payment": null,
        "cvv": "123",
        "expiration_date": "12/25"
    }',
    '{
        "firstName": "John",
        "lastName": "Doe",
        "address1": "123 Main St",
        "address2": "Apt 4B",
        "city": "New York",
        "state": "NY",
        "zipcode": "10001",
        "phone": "212-555-1234",
        "email": "john.doe@example.com"
    }',
    'successful'
),
(
    'CREDIT',
    '{
        "payment_type": "ACH",
        "masked_payment": "*********5678",
        "encrypted_payment": null,
        "routing_number": "021000021"
    }',
    '{
        "firstName": "Jane",
        "lastName": "Smith",
        "address1": "456 Park Ave",
        "city": "Boston",
        "state": "MA",
        "zipcode": "02108",
        "phone": "617-555-5678",
        "email": "jane.smith@example.com"
    }',
    'pending'
),
(
    'REFUND',
    '{
        "payment_type": "Credit Card",
        "masked_payment": "************9012",
        "encrypted_payment": null,
        "cvv": "456",
        "expiration_date": "03/26"
    }',
    '{
        "firstName": "Robert",
        "lastName": "Johnson",
        "address1": "789 Oak Road",
        "city": "Chicago",
        "state": "IL",
        "zipcode": "60601",
        "phone": "312-555-9012",
        "email": "robert.j@example.com"
    }',
    'successful'
),
(
    'SALE',
    '{
        "payment_type": "Credit Card",
        "masked_payment": "************4567",
        "encrypted_payment": null,
        "cvv": "789",
        "expiration_date": "09/25"
    }',
    '{
        "firstName": "Alice",
        "lastName": "Brown",
        "address1": "321 Pine St",
        "city": "San Francisco",
        "state": "CA",
        "zipcode": "94101",
        "phone": "415-555-4567",
        "email": "alice.b@example.com"
    }',
    'pending'
),
(
    'VOID',
    '{
        "payment_type": "Credit Card",
        "masked_payment": "************7890",
        "encrypted_payment": null,
        "cvv": "321",
        "expiration_date": "06/24"
    }',
    '{
        "firstName": "Michael",
        "lastName": "Wilson",
        "address1": "567 Elm St",
        "city": "Seattle",
        "state": "WA",
        "zipcode": "98101",
        "phone": "206-555-7890",
        "email": "michael.w@example.com"
    }',
    'failed'
);