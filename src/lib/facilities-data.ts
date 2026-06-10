export type FacilityCategory =
  | "School" | "College" | "Hostel" | "Hospital" | "Bank"
  | "Community Hall" | "Dharamshala" | "Trust" | "Coaching Center" | "Business Center";

export type Facility = {
  id: string;
  name: string;
  category: FacilityCategory;
  city: string;
  state: string;
  address: string;
  description: string;
  longDescription: string;
  phone: string;
  email: string;
  website: string;
  head: string;
  established: number;
  capacity: string;
  timings: string;
  verified: boolean;
  emoji: string;
  bg: string;
};

export const facilities: Facility[] = [
  {
    id: "mv-bhatt-school",
    name: "Shri M. V. Bhatt English Medium School",
    category: "School",
    city: "Anand", state: "Gujarat",
    address: "Station Road, Near Town Hall, Anand, Gujarat 388001",
    description: "Providing quality English medium education since 1995.",
    longDescription: "An ISO-certified English medium school serving the community for over 25 years. Strong focus on academics, sports, and cultural activities. CBSE curriculum from Nursery to Class 12.",
    phone: "+91 2692 245 678", email: "info@mvbhattschool.edu.in", website: "mvbhattschool.edu.in",
    head: "Dr. Rakesh Patel (Principal)", established: 1995, capacity: "2,400 students",
    timings: "Mon–Sat, 7:30 AM – 2:30 PM", verified: true,
    emoji: "🏫", bg: "from-primary via-accent-saffron to-warning",
  },
  {
    id: "samaj-hospital",
    name: "Samaj Charitable Hospital",
    category: "Hospital",
    city: "Ahmedabad", state: "Gujarat",
    address: "Ashram Road, Navrangpura, Ahmedabad, Gujarat 380009",
    description: "Multi-specialty community hospital with subsidized treatment for members.",
    longDescription: "150-bed multi-specialty hospital offering cardiology, orthopedics, maternity, and emergency care. Community members get up to 40% discount on treatments.",
    phone: "+91 79 2658 1234", email: "care@samajhospital.org", website: "samajhospital.org",
    head: "Dr. Mahesh Shah (Medical Director)", established: 1982, capacity: "150 beds",
    timings: "24×7 Emergency", verified: true,
    emoji: "🏥", bg: "from-destructive via-accent-saffron to-warning",
  },
  {
    id: "samaj-hostel-surat",
    name: "Samaj Boys Hostel",
    category: "Hostel",
    city: "Surat", state: "Gujarat",
    address: "Athwa Lines, Surat, Gujarat 395007",
    description: "Affordable, safe stay for students and working professionals.",
    longDescription: "120-room boys hostel with mess, study hall, gym, and Wi-Fi. Walking distance from Veer Narmad South Gujarat University.",
    phone: "+91 261 222 4455", email: "hostel@samajsurat.org", website: "samajsurat.org/hostel",
    head: "Shri Kiritbhai Patel (Warden)", established: 2008, capacity: "120 rooms",
    timings: "Open 24×7 · Office 9 AM – 8 PM", verified: true,
    emoji: "🏨", bg: "from-success via-primary to-accent-saffron",
  },
  {
    id: "samaj-wadi-vadodara",
    name: "Samaj Wadi Community Hall",
    category: "Community Hall",
    city: "Vadodara", state: "Gujarat",
    address: "Alkapuri, Vadodara, Gujarat 390007",
    description: "1,200 capacity hall for weddings, functions and gatherings.",
    longDescription: "Air-conditioned hall with stage, in-house catering, parking for 200 vehicles, and 8 guest rooms. Member discount of 15% on bookings.",
    phone: "+91 265 233 8899", email: "bookings@samajwadi.org", website: "samajwadi.org",
    head: "Shri Rameshbhai Mehta (Manager)", established: 2015, capacity: "1,200 persons",
    timings: "Bookings: 10 AM – 7 PM", verified: true,
    emoji: "🏛️", bg: "from-warning via-accent-saffron to-destructive",
  },
  {
    id: "dharamshala-dwarka",
    name: "Samaj Dharamshala Dwarka",
    category: "Dharamshala",
    city: "Dwarka", state: "Gujarat",
    address: "Near Dwarkadhish Temple, Dwarka, Gujarat 361335",
    description: "Affordable stay for pilgrims visiting Dwarka.",
    longDescription: "60 clean, comfortable rooms with attached bath. Walking distance from Dwarkadhish Temple. Pure vegetarian mess. Member rates from ₹400/night.",
    phone: "+91 2892 234 567", email: "dwarka@samajdharamshala.org", website: "samajdharamshala.org",
    head: "Shri Naranbhai Bhatt (Manager)", established: 1998, capacity: "60 rooms",
    timings: "Check-in 12 PM · Check-out 10 AM", verified: true,
    emoji: "🛕", bg: "from-accent-saffron to-destructive",
  },
  {
    id: "samaj-bank",
    name: "Samaj Co-operative Bank",
    category: "Bank",
    city: "Rajkot", state: "Gujarat",
    address: "Yagnik Road, Rajkot, Gujarat 360001",
    description: "Community co-operative bank with 18 branches across Gujarat.",
    longDescription: "Full-service co-operative bank offering savings, FDs, home loans, and business loans with competitive rates for community members.",
    phone: "+91 281 245 6789", email: "info@samajbank.coop", website: "samajbank.coop",
    head: "Shri Hasmukh Patel (Chairman)", established: 1971, capacity: "18 branches",
    timings: "Mon–Sat, 10 AM – 5 PM", verified: true,
    emoji: "🏦", bg: "from-success to-primary",
  },
  {
    id: "vidya-coaching",
    name: "Vidya Coaching Center",
    category: "Coaching Center",
    city: "Anand", state: "Gujarat",
    address: "Vidyanagar Road, Anand, Gujarat 388120",
    description: "JEE, NEET and Board coaching with proven track record.",
    longDescription: "Specialized coaching for classes 9–12 and competitive exams. Small batches, experienced faculty, 80% top-rank results.",
    phone: "+91 2692 256 700", email: "admissions@vidyacoaching.in", website: "vidyacoaching.in",
    head: "Prof. Snehal Desai (Director)", established: 2010, capacity: "800 students",
    timings: "Mon–Sun, 6 AM – 10 PM", verified: false,
    emoji: "📚", bg: "from-primary to-success",
  },
  {
    id: "samaj-trust",
    name: "Samaj Seva Trust",
    category: "Trust",
    city: "Mumbai", state: "Maharashtra",
    address: "Matunga East, Mumbai, Maharashtra 400019",
    description: "Charitable trust supporting education, healthcare and welfare.",
    longDescription: "Registered public trust running scholarships, medical aid, and senior care programs. ₹5 crore disbursed annually to deserving families.",
    phone: "+91 22 2401 5566", email: "contact@samajsevatrust.org", website: "samajsevatrust.org",
    head: "Shri Bhavesh Joshi (Trustee)", established: 1965, capacity: "5,000+ beneficiaries/year",
    timings: "Mon–Fri, 10 AM – 6 PM", verified: true,
    emoji: "🤝", bg: "from-warning to-accent-saffron",
  },
];

export const states = ["All States", "Gujarat", "Maharashtra", "Rajasthan", "Delhi"];
export const categories: (FacilityCategory | "All Categories")[] = [
  "All Categories", "School", "College", "Hostel", "Hospital", "Bank",
  "Community Hall", "Dharamshala", "Trust", "Coaching Center", "Business Center",
];
export const cities = ["All Cities", "Ahmedabad", "Surat", "Anand", "Vadodara", "Rajkot", "Dwarka", "Mumbai"];

export function getFacility(id: string) {
  return facilities.find((f) => f.id === id);
}
