-- transactions 
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view their own transactions" ON transactions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Allow users to insert their own transactions" ON transactions
  FOR INSERT WITH CHECK (user_id = auth.uid()); 

CREATE POLICY "Allow users to update their own transactions" ON transactions
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid()); 

CREATE POLICY "Allow users to delete their own transactions" ON transactions
  FOR DELETE USING (user_id = auth.uid());   

-- categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view their own categories" ON categories
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Allow users to insert their own categories" ON categories
  FOR INSERT WITH CHECK (user_id = auth.uid()); 

CREATE POLICY "Allow users to update their own categories" ON categories
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());    

CREATE POLICY "Allow users to delete their own categories" ON categories
  FOR DELETE USING (user_id = auth.uid());  

-- liabilities
ALTER TABLE liabilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view their own liabilities" ON liabilities    
  FOR SELECT USING (user_id = auth.uid());      

CREATE POLICY "Allow users to insert their own liabilities" ON liabilities
  FOR INSERT WITH CHECK (user_id = auth.uid()); 

CREATE POLICY "Allow users to update their own liabilities" ON liabilities
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());    

CREATE POLICY "Allow users to delete their own liabilities" ON liabilities
  FOR DELETE USING (user_id = auth.uid());  

-- assets
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view their own assets" ON assets    
  FOR SELECT USING (user_id = auth.uid());  

CREATE POLICY "Allow users to insert their own assets" ON assets
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow users to update their own assets" ON assets
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());    

CREATE POLICY "Allow users to delete their own assets" ON assets
  FOR DELETE USING (user_id = auth.uid());  

-- investments
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view their own investments" ON investments    
  FOR SELECT USING (user_id = auth.uid());  

CREATE POLICY "Allow users to insert their own investments" ON investments
  FOR INSERT WITH CHECK (user_id = auth.uid()); 

CREATE POLICY "Allow users to update their own investments" ON investments
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());    

CREATE POLICY "Allow users to delete their own investments" ON investments
  FOR DELETE USING (user_id = auth.uid());  

