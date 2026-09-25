-- Ghost Factory™ Seed Data for MOBILE DETAIL DISPATCH OS

INSERT INTO mobile_vans (code, title, category, base_price_cents, status) VALUES
('CODE-01', 'Executive Concierge Mobile Detail', 'Autonomous Mobile Detailing & Fleet Rig Dispatch OS', 64000, 'ACTIVE'),
('CODE-02', 'Single-Stage Machine Enhancement & Sealant', 'Autonomous Mobile Detailing & Fleet Rig Dispatch OS', 22500, 'ACTIVE'),
('CODE-03', 'Executive Residential Fleet Detail (3+ Cars)', 'Autonomous Mobile Detailing & Fleet Rig Dispatch OS', 28500, 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

INSERT INTO service_dispatches (client_name, contact_phone, scheduled_date, deposit_paid_cents, booking_status) VALUES
('Sterling Productions LLC', '+1 (555) 234-5678', CURRENT_DATE, 50000, 'CONFIRMED'),
('Vanguard Athletic Group', '+1 (555) 876-5432', CURRENT_DATE + INTERVAL '1 day', 25000, 'SCHEDULED');

INSERT INTO client_addons (session_code, metric_value, verification_hash) VALUES
('SESS-1001', 99.80, 'a7c92b8d0e1f3a5b7c9e0d2f4a6b8c0e'),
('SESS-1002', 100.00, 'b8d0e2f4a6c8e0d2f4a6b8c0e2f4a6b8');
