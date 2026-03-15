-- Delete old categories that used the removed types 
DELETE FROM categories
WHERE type NOT IN ('income', 'expense');

-- Delete transactions that used removed types 
DELETE FROM transactions
WHERE type NOT IN ('income', 'expense');

-- Updates categories type check
ALTER TABLE categories
    DROP CONSTRAINT categories_type_check;
ALTER TABLE categories
    ADD CONSTRAINT categories_type_check 
    CHECK (type IN ('income', 'expense'));

-- Update transactions type check
ALTER TABLE transactions
    DROP CONSTRAINT transactions_type_check;
ALTER TABLE transactions
    ADD CONSTRAINT transactions_type_check 
    CHECK (type IN ('income', 'expense'));
