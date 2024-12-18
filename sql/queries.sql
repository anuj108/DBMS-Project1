-- Fetch all products
SELECT * FROM products;

-- Add a new product
INSERT INTO products (name, price, category) VALUES ('Laptop', 50000, 'Electronics');

-- Delete a product
DELETE FROM products WHERE id = 1;
