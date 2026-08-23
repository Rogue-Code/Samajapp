-- PLACEHOLDER seed data carried over from the original Lovable prototype.
-- These facilities are FICTIONAL — the names, phone numbers, emails and
-- websites are invented. Replace them with the real community directory
-- before showing this to members.

INSERT INTO public.facilities
  (id, name, category, city, state, address, description, long_description,
   phone, email, website, head, established, capacity, timings, verified)
VALUES
  ('mv-bhatt-school', 'Shri M. V. Bhatt English Medium School', 'School', 'Anand', 'Gujarat',
   'Station Road, Near Town Hall, Anand, Gujarat 388001',
   'Providing quality English medium education since 1995.',
   'An ISO-certified English medium school serving the community for over 25 years. Strong focus on academics, sports, and cultural activities. CBSE curriculum from Nursery to Class 12.',
   '+91 2692 245 678', 'info@mvbhattschool.edu.in', 'mvbhattschool.edu.in',
   'Dr. Rakesh Patel (Principal)', 1995, '2,400 students', 'Mon–Sat, 7:30 AM – 2:30 PM', true),

  ('samaj-hospital', 'Samaj Charitable Hospital', 'Hospital', 'Ahmedabad', 'Gujarat',
   'Ashram Road, Navrangpura, Ahmedabad, Gujarat 380009',
   'Multi-specialty community hospital with subsidized treatment for members.',
   '150-bed multi-specialty hospital offering cardiology, orthopedics, maternity, and emergency care. Community members get up to 40% discount on treatments.',
   '+91 79 2658 1234', 'care@samajhospital.org', 'samajhospital.org',
   'Dr. Mahesh Shah (Medical Director)', 1982, '150 beds', '24×7 Emergency', true),

  ('samaj-hostel-surat', 'Samaj Boys Hostel', 'Hostel', 'Surat', 'Gujarat',
   'Athwa Lines, Surat, Gujarat 395007',
   'Affordable, safe stay for students and working professionals.',
   '120-room boys hostel with mess, study hall, gym, and Wi-Fi. Walking distance from Veer Narmad South Gujarat University.',
   '+91 261 222 4455', 'hostel@samajsurat.org', 'samajsurat.org/hostel',
   'Shri Kiritbhai Patel (Warden)', 2008, '120 rooms', 'Open 24×7 · Office 9 AM – 8 PM', true),

  ('samaj-wadi-vadodara', 'Samaj Wadi Community Hall', 'Community Hall', 'Vadodara', 'Gujarat',
   'Alkapuri, Vadodara, Gujarat 390007',
   '1,200 capacity hall for weddings, functions and gatherings.',
   'Air-conditioned hall with stage, in-house catering, parking for 200 vehicles, and 8 guest rooms. Member discount of 15% on bookings.',
   '+91 265 233 8899', 'bookings@samajwadi.org', 'samajwadi.org',
   'Shri Rameshbhai Mehta (Manager)', 2015, '1,200 persons', 'Bookings: 10 AM – 7 PM', true),

  ('dharamshala-dwarka', 'Samaj Dharamshala Dwarka', 'Dharamshala', 'Dwarka', 'Gujarat',
   'Near Dwarkadhish Temple, Dwarka, Gujarat 361335',
   'Affordable stay for pilgrims visiting Dwarka.',
   '60 clean, comfortable rooms with attached bath. Walking distance from Dwarkadhish Temple. Pure vegetarian mess. Member rates from ₹400/night.',
   '+91 2892 234 567', 'dwarka@samajdharamshala.org', 'samajdharamshala.org',
   'Shri Naranbhai Bhatt (Manager)', 1998, '60 rooms', 'Check-in 12 PM · Check-out 10 AM', true),

  ('samaj-bank', 'Samaj Co-operative Bank', 'Bank', 'Rajkot', 'Gujarat',
   'Yagnik Road, Rajkot, Gujarat 360001',
   'Community co-operative bank with 18 branches across Gujarat.',
   'Full-service co-operative bank offering savings, FDs, home loans, and business loans with competitive rates for community members.',
   '+91 281 245 6789', 'info@samajbank.coop', 'samajbank.coop',
   'Shri Hasmukh Patel (Chairman)', 1971, '18 branches', 'Mon–Sat, 10 AM – 5 PM', true),

  ('vidya-coaching', 'Vidya Coaching Center', 'Coaching Center', 'Anand', 'Gujarat',
   'Vidyanagar Road, Anand, Gujarat 388120',
   'JEE, NEET and Board coaching with proven track record.',
   'Specialized coaching for classes 9–12 and competitive exams. Small batches, experienced faculty, 80% top-rank results.',
   '+91 2692 256 700', 'admissions@vidyacoaching.in', 'vidyacoaching.in',
   'Prof. Snehal Desai (Director)', 2010, '800 students', 'Mon–Sun, 6 AM – 10 PM', false),

  ('samaj-trust', 'Samaj Seva Trust', 'Trust', 'Mumbai', 'Maharashtra',
   'Matunga East, Mumbai, Maharashtra 400019',
   'Charitable trust supporting education, healthcare and welfare.',
   'Registered public trust running scholarships, medical aid, and senior care programs. ₹5 crore disbursed annually to deserving families.',
   '+91 22 2401 5566', 'contact@samajsevatrust.org', 'samajsevatrust.org',
   'Shri Bhavesh Joshi (Trustee)', 1965, '5,000+ beneficiaries/year', 'Mon–Fri, 10 AM – 6 PM', true)

ON CONFLICT (id) DO NOTHING;
