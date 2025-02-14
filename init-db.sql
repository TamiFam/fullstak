-- Создание таблицы debtors (должники)
CREATE TABLE IF NOT EXISTS debtors (
    debtor_id SERIAL PRIMARY KEY, -- Уникальный идентификатор должника
    first_name VARCHAR(50) NOT NULL, -- Имя должника
    last_name VARCHAR(50) NOT NULL, -- Фамилия должника
    phone_number VARCHAR(15) NOT NULL, -- Номер телефона
    registration_date DATE NOT NULL -- Дата регистрации
);

-- Создание таблицы debts (долги)
CREATE TABLE IF NOT EXISTS debts (
    debt_id SERIAL PRIMARY KEY, -- Уникальный идентификатор долга
    debtor_id INTEGER REFERENCES debtors(debtor_id) ON DELETE CASCADE, -- Связь с таблицей debtors
    debt_amount NUMERIC(10, 0) NOT NULL, -- Сумма долга
    issue_date DATE NOT NULL, -- Дата выдачи долга
    due_date DATE NOT NULL -- Дата погашения долга
);

-- Вставка 1000 записей в таблицы debtors и debts
DO $$
DECLARE
    first_names TEXT[] := ARRAY['Иван', 'Сергей', 'Алексей', 'Дмитрий', 'Андрей', 'Максим', 'Николай', 'Павел', 'Владимир', 'Евгений'];
    last_names TEXT[] := ARRAY['Иванов', 'Петров', 'Сидоров', 'Кузнецов', 'Смирнов', 'Попов', 'Лебедев', 'Морозов', 'Волков', 'Соловьев'];
BEGIN
    -- Вставка 1000 записей в таблицу debtors
    FOR i IN 1..1000 LOOP
        INSERT INTO debtors (first_name, last_name, phone_number, registration_date)
        VALUES (
            first_names[(i % array_length(first_names, 1)) + 1], -- Случайное имя
            last_names[(i % array_length(last_names, 1)) + 1], -- Случайная фамилия
            '+791' || LPAD((FLOOR(random() * 100000000))::TEXT, 8, '0'), -- Генерация номера телефона из 11 цифр
            CURRENT_DATE - (i * INTERVAL '1 day') -- Дата регистрации
        );
    END LOOP;

    -- Вставка 1000 записей в таблицу debts
    FOR i IN 1..1000 LOOP
        INSERT INTO debts (debtor_id, debt_amount, issue_date, due_date)
        VALUES (
            (i % 1000) + 1,  -- Это обеспечит, что debtor_id будет от 1 до 1000
            (random() * 10000 + 1000)::NUMERIC(10, 0),  -- Сумма долга от 1000 до 11000
            CURRENT_DATE - (i * INTERVAL '1 day'), -- Дата выдачи долга
            CURRENT_DATE + (random() * 30 + 1) * INTERVAL '1 day'  -- Срок погашения через 1-30 дней
        );
    END LOOP;
END $$;