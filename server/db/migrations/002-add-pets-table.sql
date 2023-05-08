CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_type TEXT,
  birth_date Text,
  pet_name TEXT,
  pet_description TEXT
);
