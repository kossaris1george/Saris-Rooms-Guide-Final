
create table if not exists guide_settings (id bigint primary key generated always as identity,key text unique not null,value text);
create table if not exists guide_places (id bigint primary key generated always as identity,category text not null,name text not null,description text,phone text,map_url text,url text,sort_order int default 0,active boolean default true);
alter table guide_settings enable row level security; alter table guide_places enable row level security;
drop policy if exists "public read settings" on guide_settings; drop policy if exists "public read active places" on guide_places; drop policy if exists "authenticated manage settings" on guide_settings; drop policy if exists "authenticated manage places" on guide_places;
create policy "public read settings" on guide_settings for select using (true);
create policy "public read active places" on guide_places for select using (active=true);
create policy "authenticated manage settings" on guide_settings for all using (auth.role()='authenticated') with check (auth.role()='authenticated');
create policy "authenticated manage places" on guide_places for all using (auth.role()='authenticated') with check (auth.role()='authenticated');
insert into guide_settings(key,value) values ('property_name','Ioanna''s City Apartment'),('location','Καλαμιώτισσα, Πόθια, Κάλυμνος'),('wifi_name','IoannasCityApartment'),('wifi_password','NIKOS1991'),('checkin','15:00'),('checkout','11:00'),('phone_1','6945056864'),('phone_2','6945068677'),('email','Ioannascityapartment@gmail.com'),('map_url','https://maps.app.goo.gl/FPd6cxNEdGLeLw5HA'),('facebook_url',''),('instagram_url',''),('airbnb_url',''),('booking_url',''),('google_review_url','') on conflict(key) do update set value=excluded.value;
insert into guide_places(category,name,description,phone,map_url,sort_order,active) values
('souvlaki','Super Serafinó','Σουβλάκι','2243300863','https://maps.app.goo.gl/E1WVfacZEFSNEJou7?g_st=ic',1,true),
('souvlaki','Το Νόστιμο','Σουβλάκι',null,'https://www.google.com/maps/search/?api=1&query=Το%20Νόστιμο%20Κάλυμνος',2,true),
('pizza','Pizza Porto','Πιτσαρία','2243023761','https://www.google.com/maps/search/?api=1&query=Pizza%20Porto%20Κάλυμνος',1,true),
('pizza','Pizza Imia','Πιτσαρία','2243050809','https://www.google.com/maps/search/?api=1&query=Pizza%20Imia%20Κάλυμνος',2,true),
('coffee','Coffee Station','Καφέ • Delivery','2243028833','https://www.google.com/maps/search/?api=1&query=Coffee%20Station%20Kalymnos',1,true),
('coffee','Anasis Bakery and Coffee','Καφέ • Bakery • Delivery','2243029992','https://www.google.com/maps/search/?api=1&query=Anasis%20Bakery%20and%20Coffee%20Kalymnos',2,true),
('bakery','Anasis Bakery and Coffee','Φούρνος • Καφές','2243029992','https://www.google.com/maps/search/?api=1&query=Anasis%20Bakery%20and%20Coffee%20Kalymnos',1,true),
('bakery','Πες Αλεύρι','Αρτοζαχαροπλαστείο','2243111102','https://www.google.com/maps/search/?api=1&query=Πες%20Αλεύρι%20Καλαμιώτισσα%20Κάλυμνος',2,true)
on conflict do nothing;
