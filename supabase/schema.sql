-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income','expense','investment','liability','asset')),
  icon TEXT,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Liabilities
CREATE TABLE liabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  interest_rate NUMERIC DEFAULT 0,
  start_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assets
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  type TEXT CHECK (type IN ('property', 'vehicle', 'equipment', 'electronics', 'other')),
  purchase_value NUMERIC NOT NULL,
  purchase_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
 );

-- Investments
CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  market TEXT NOT NULL CHECK (market IN ('NEPSE', 'NSE', 'NYSE', 'other')),
  company_name TEXT,
  shares_count NUMERIC,
  buy_price NUMERIC NOT NULL,
  buy_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions 
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense','investment','liability','asset')),
  amount NUMERIC NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT,
  liabilities_id UUID REFERENCES liabilities(id) ON DELETE SET NULL,
  liabilities_type TEXT CHECK (liabilities_type IN ('borrowed', 'payment')),
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  investment_id UUID REFERENCES investments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
 );


