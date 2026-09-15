import { useState, useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import {
  MapPin, Search, Users, Star, Heart, Share2,
  ChevronDown, ArrowRight, Menu, X, Check,
  Bell, User, LogOut, Phone, Mail, MessageCircle,
  Download, Copy, Building2,
  CreditCard, Shield, Award, Gift, Calendar,
  IndianRupee, Globe, Instagram, Linkedin,
  PartyPopper, Filter, ChevronLeft, ChevronRight, Sparkles, TrendingUp, LocateFixed,
  BarChart2, Plus, Minus, Zap, Scale,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ──────────────────────── TYPES ────────────────────────
type Page = "home" | "search" | "detail" | "review" | "payment" | "confirmation" | "profile" | "admin";

interface Experience {
  id: number;
  name: string;
  location: string;
  city: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  capacity: string;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  tags: string[];
  available: string;
  isFeatured: boolean;
}

// ──────────────────────── CONSTANTS ────────────────────────
const GOLD = "#C9A227";
const GOLD_LIGHT = "#FBF0D4";

// ──────────────────────── DATA ────────────────────────
const experiences: Experience[] = [
  // ── BANGALORE ──────────────────────────────────────
  {
    id: 1,
    name: "Skydeck Brewery & Grill",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    type: "Brewery",
    price: 1800,
    rating: 4.8,
    reviews: 450,
    capacity: "20–150",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&auto=format", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format"],
    description: "Perched 12 floors above Koramangala, Skydeck offers an unparalleled brewery experience with 24 craft beers on tap, panoramic city views, and a private corporate floor for up to 80 guests.",
    amenities: ["Open Bar", "Live Music", "Valet Parking", "Private Deck", "AV Setup", "Corporate Billing", "Dedicated Host", "Customised Menu"],
    tags: ["Brewery", "Rooftop", "Live Music", "Outdoor"],
    available: "Available this Friday",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Olive Garden Private Dining",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    type: "Team Lunch",
    price: 1200,
    rating: 4.8,
    reviews: 567,
    capacity: "10–60",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format"],
    description: "A serene garden restaurant with private dining rooms. Known for exceptional Mediterranean cuisine—the favourite of Bangalore's tech leaders for intimate team lunches and investor dinners.",
    amenities: ["Private Rooms", "Veg & Non-Veg Menu", "Full Bar", "Parking", "Corporate Billing"],
    tags: ["Lunch", "Garden", "Mediterranean", "Private"],
    available: "Available weekdays",
    isFeatured: false,
  },
  {
    id: 3,
    name: "The Vault Speakeasy",
    location: "MG Road, Bangalore",
    city: "Bangalore",
    type: "Club Night",
    price: 2600,
    rating: 4.7,
    reviews: 209,
    capacity: "25–100",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&h=800&fit=crop&auto=format"],
    description: "A Prohibition-era speakeasy hidden behind a bookshelf door on MG Road. Craft cocktails, jazz, and a hand-picked spirits menu make this Bangalore's most atmospheric corporate night-out.",
    amenities: ["Cocktail Bar", "Jazz Band", "Private Lounge", "Curated Menu", "VIP Entry", "Corporate Package"],
    tags: ["Club", "Speakeasy", "Jazz", "Cocktails"],
    available: "Thu–Sat evenings",
    isFeatured: false,
  },
  {
    id: 4,
    name: "Whitefield Greens Outing",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    type: "Team Outing",
    price: 950,
    rating: 4.5,
    reviews: 334,
    capacity: "20–200",
    image: "https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=1200&h=800&fit=crop&auto=format"],
    description: "A sprawling 5-acre outdoor venue perfect for large team outings. Choose from cricket tournaments, treasure hunts, barbecues, and team-building workshops with dedicated facilitators.",
    amenities: ["Outdoor Games", "BBQ Setup", "Team Activities", "Catering", "Parking", "First Aid"],
    tags: ["Outing", "Outdoor", "Team Building", "Games"],
    available: "Weekends & holidays",
    isFeatured: false,
  },
  {
    id: 5,
    name: "Rooftop Namma Bengaluru",
    location: "UB City, Bangalore",
    city: "Bangalore",
    type: "Rooftop",
    price: 2100,
    rating: 4.6,
    reviews: 178,
    capacity: "20–80",
    image: "https://images.unsplash.com/photo-1573047330199-9a915400744f?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1573047330199-9a915400744f?w=1200&h=800&fit=crop&auto=format"],
    description: "Atop UB City mall, this rooftop lounge offers sweeping views of Cubbon Park and Bangalore's skyline. Signature cocktails, wood-fired platters, and a dedicated private terrace for corporate groups.",
    amenities: ["Skyline View", "Private Terrace", "Cocktail Bar", "DJ", "Parking", "Corporate Billing"],
    tags: ["Rooftop", "View", "Cocktails", "Outdoor"],
    available: "Available weekends",
    isFeatured: true,
  },
  {
    id: 6,
    name: "Toit Taproom Corporate",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    type: "Team Dinner",
    price: 1500,
    rating: 4.9,
    reviews: 621,
    capacity: "15–80",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&auto=format"],
    description: "Bangalore's legendary craft beer destination, now with a dedicated corporate dining floor. Flagship beers brewed on-site, an extensive gastropub menu, and warm brick interiors perfect for team celebrations.",
    amenities: ["Craft Beer", "Private Dining", "Full Menu", "AV Screen", "Parking", "Corporate Invoice"],
    tags: ["Dinner", "Brewery", "Gastropub", "Craft Beer"],
    available: "Available daily",
    isFeatured: false,
  },

  // ── MUMBAI ──────────────────────────────────────────
  {
    id: 7,
    name: "The Grand Ballroom",
    location: "BKC, Mumbai",
    city: "Mumbai",
    type: "Office Party",
    price: 3200,
    rating: 4.9,
    reviews: 312,
    capacity: "50–500",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop&auto=format", "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&auto=format"],
    description: "Mumbai's most prestigious corporate event venue. The Grand Ballroom blends timeless elegance with state-of-the-art AV, a stage, and a dedicated event coordinator for seamless execution.",
    amenities: ["Full Catering", "Stage & AV", "Valet Parking", "Green Room", "Event Coordinator", "GST Invoice"],
    tags: ["Ballroom", "Indoor", "Large Capacity", "Premium"],
    available: "Available next week",
    isFeatured: true,
  },
  {
    id: 8,
    name: "Harbor View Seafood Club",
    location: "Bandra, Mumbai",
    city: "Mumbai",
    type: "Team Dinner",
    price: 2800,
    rating: 4.7,
    reviews: 291,
    capacity: "20–120",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format"],
    description: "Perched over the Arabian Sea, Harbor View serves the finest coastal cuisine in a setting that feels like an exclusive members club. Perfect for leadership dinners and client entertainment.",
    amenities: ["Sea View", "Private Dining", "Fine Dining Menu", "Sommelier", "Valet", "Corporate Invoice"],
    tags: ["Dinner", "Seafood", "Sea View", "Premium"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 9,
    name: "Dome Mumbai Rooftop",
    location: "Marine Lines, Mumbai",
    city: "Mumbai",
    type: "Rooftop",
    price: 3500,
    rating: 4.8,
    reviews: 389,
    capacity: "20–100",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&auto=format"],
    description: "Iconic rooftop perched atop the InterContinental with postcard views of Marine Drive. Known as Mumbai's most glamorous sunset spot—reserve the private cabana section for corporate celebrations.",
    amenities: ["Marine Drive View", "Cabana Section", "Premium Bar", "Sunset Packages", "Valet", "GST Invoice"],
    tags: ["Rooftop", "Luxury", "View", "Sunset"],
    available: "Available daily",
    isFeatured: true,
  },
  {
    id: 10,
    name: "The Bombay Canteen Private",
    location: "Lower Parel, Mumbai",
    city: "Mumbai",
    type: "Team Lunch",
    price: 1800,
    rating: 4.8,
    reviews: 442,
    capacity: "12–60",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=800&fit=crop&auto=format"],
    description: "The private dining room at one of Mumbai's most celebrated restaurants. Contemporary Indian cuisine, natural light, and a curated cocktail menu—an elevated choice for team lunches and leadership gatherings.",
    amenities: ["Private Room", "Contemporary Indian", "Craft Cocktails", "Natural Light", "Corporate Billing"],
    tags: ["Lunch", "Private", "Indian", "Contemporary"],
    available: "Available weekdays",
    isFeatured: false,
  },
  {
    id: 11,
    name: "EBar Juhu Beach Party",
    location: "Juhu, Mumbai",
    city: "Mumbai",
    type: "Office Party",
    price: 2400,
    rating: 4.6,
    reviews: 198,
    capacity: "40–300",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop&auto=format"],
    description: "Mumbai's finest beach-side event venue right on Juhu Beach. Bonfire setups, live bands, fire shows, and a full bar under the stars—perfect for office parties that want to break the routine.",
    amenities: ["Beach Access", "Bonfire", "Live Band", "Full Bar", "DJ", "Corporate Package"],
    tags: ["Beach", "Party", "Outdoor", "Live Music"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 12,
    name: "Woodside Brewery Powai",
    location: "Powai, Mumbai",
    city: "Mumbai",
    type: "Brewery",
    price: 1600,
    rating: 4.5,
    reviews: 267,
    capacity: "20–120",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&auto=format"],
    description: "A lakeside brewery near the Powai Lake with 18 beers brewed on-premise. The industrial-chic private hall hosts up to 120 guests with direct lake views—a favourite for tech company celebrations.",
    amenities: ["Lake View", "Craft Beer", "Private Hall", "Live Music Weekends", "Parking", "Corporate Billing"],
    tags: ["Brewery", "Lake View", "Industrial", "Craft Beer"],
    available: "Available daily",
    isFeatured: false,
  },

  // ── GURGAON / NCR ───────────────────────────────────
  {
    id: 13,
    name: "Terrace 22 Rooftop",
    location: "Cyber City, Gurgaon",
    city: "Gurgaon",
    type: "Rooftop",
    price: 2400,
    rating: 4.7,
    reviews: 228,
    capacity: "15–80",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=800&fit=crop&auto=format"],
    description: "An open-air rooftop on the 22nd floor of Cyber Hub with breathtaking skyline views, curated menus, and a full craft cocktail bar. The private corporate section accommodates 80 guests.",
    amenities: ["Private Section", "Cocktail Bar", "DJ Setup", "Corporate Billing", "Parking"],
    tags: ["Rooftop", "Outdoor", "DJ", "Skyline View"],
    available: "Available Saturday",
    isFeatured: true,
  },
  {
    id: 14,
    name: "Cyber Hub Brewhouse",
    location: "DLF Cyber Hub, Gurgaon",
    city: "Gurgaon",
    type: "Brewery",
    price: 1700,
    rating: 4.6,
    reviews: 312,
    capacity: "20–100",
    image: "https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=1200&h=800&fit=crop&auto=format"],
    description: "Right in the heart of Cyber Hub, this two-floor brewhouse brews 16 ales and lagers in-house. The private mezzanine fits 60 guests with an exclusive tap menu and corporate-friendly billing.",
    amenities: ["In-house Brews", "Mezzanine Section", "Full Menu", "AV Screen", "Parking", "GST Invoice"],
    tags: ["Brewery", "Mezzanine", "Craft Beer", "Corporate"],
    available: "Available daily",
    isFeatured: false,
  },
  {
    id: 15,
    name: "Sector 29 Club District",
    location: "Sector 29, Gurgaon",
    city: "Gurgaon",
    type: "Club Night",
    price: 2000,
    rating: 4.5,
    reviews: 156,
    capacity: "30–180",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop&auto=format"],
    description: "NCR's premier corporate nightlife strip. Book the private VIP suite with a dedicated DJ slot, bottle service, and a reserved dance floor section. Ideal for sales wins and team milestones.",
    amenities: ["VIP Suite", "Bottle Service", "Private DJ", "Reserved Dance Floor", "Security", "Corporate Tab"],
    tags: ["Club", "VIP", "DJ", "Night"],
    available: "Fri & Sat evenings",
    isFeatured: false,
  },
  {
    id: 16,
    name: "Leela Ambience Team Lunch",
    location: "Ambience Mall, Gurgaon",
    city: "Gurgaon",
    type: "Team Lunch",
    price: 1400,
    rating: 4.7,
    reviews: 203,
    capacity: "10–50",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&fit=crop&auto=format"],
    description: "A sophisticated all-day dining restaurant inside The Leela Ambience. Private dining rooms with butler service, an extensive buffet for corporate lunches, and seamless GST invoicing for finance teams.",
    amenities: ["Private Room", "Butler Service", "Buffet Option", "Veg & Non-Veg", "Parking", "GST Invoice"],
    tags: ["Lunch", "Luxury", "Hotel", "Buffet"],
    available: "Available weekdays",
    isFeatured: false,
  },
  {
    id: 17,
    name: "Golf Course Road Outing",
    location: "Golf Course Road, Gurgaon",
    city: "Gurgaon",
    type: "Team Outing",
    price: 1100,
    rating: 4.4,
    reviews: 142,
    capacity: "15–100",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=800&fit=crop&auto=format"],
    description: "A curated half-day corporate outing experience along Golf Course Road. Includes go-karting, laser tag, a catered lunch break, and customised team-building challenges for groups of all sizes.",
    amenities: ["Go-Karting", "Laser Tag", "Lunch Included", "Team Activities", "Parking", "Facilitator"],
    tags: ["Outing", "Activities", "Team Building", "Fun"],
    available: "Weekends",
    isFeatured: false,
  },

  // ── HYDERABAD ───────────────────────────────────────
  {
    id: 18,
    name: "Social District Club",
    location: "Jubilee Hills, Hyderabad",
    city: "Hyderabad",
    type: "Club Night",
    price: 2200,
    rating: 4.6,
    reviews: 183,
    capacity: "30–200",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop&auto=format"],
    description: "Hyderabad's premier corporate club experience. Private booths, world-class resident DJs, and a curated spirits selection. Ideal for team milestones, sales celebrations, and year-end parties.",
    amenities: ["Private Booths", "Open Bar", "Live DJ", "Security", "VIP Entry", "Corporate Package"],
    tags: ["Club", "Night", "DJ", "VIP"],
    available: "Fri & Sat evenings",
    isFeatured: false,
  },
  {
    id: 19,
    name: "Skybar HITEC City",
    location: "HITEC City, Hyderabad",
    city: "Hyderabad",
    type: "Rooftop",
    price: 1900,
    rating: 4.6,
    reviews: 211,
    capacity: "20–90",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=800&fit=crop&auto=format"],
    description: "Hyderabad's most popular tech-belt rooftop, right above HITEC City. Craft cocktails, biryani bites, and a 180° view of the Cyberabad skyline—an effortless post-work team sundowner spot.",
    amenities: ["Skyline View", "Cocktail Menu", "Snack Menu", "Corporate Billing", "Valet"],
    tags: ["Rooftop", "Sundowner", "Cocktails", "View"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 20,
    name: "Golkonda Biryani Feast",
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    type: "Team Lunch",
    price: 800,
    rating: 4.7,
    reviews: 489,
    capacity: "20–150",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=800&fit=crop&auto=format"],
    description: "The most authentic Hyderabadi dum biryani experience, served in private banquet halls. Traditional décor, dum-cooked biryani for large groups, and the city's best haleem—ideal for affordable team lunches.",
    amenities: ["Private Banquet", "Dum Biryani", "Veg Options", "Large Capacity", "Parking", "GST Invoice"],
    tags: ["Lunch", "Biryani", "Traditional", "Affordable"],
    available: "Available daily",
    isFeatured: false,
  },
  {
    id: 21,
    name: "Brew & Cue Hyderabad",
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    type: "Brewery",
    price: 1500,
    rating: 4.5,
    reviews: 176,
    capacity: "20–80",
    image: "https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=1200&h=800&fit=crop&auto=format"],
    description: "A craft brewery and pool hall combo—Hyderabad's most unique corporate after-work venue. Exclusive brews, billiards, and a private courtyard for team gatherings near the IT corridor.",
    amenities: ["Craft Beer", "Pool Tables", "Private Courtyard", "Full Menu", "Parking", "Corporate Tab"],
    tags: ["Brewery", "Games", "Casual", "Outdoor"],
    available: "Available daily",
    isFeatured: false,
  },

  // ── DELHI ───────────────────────────────────────────
  {
    id: 22,
    name: "Khan Market Dining Club",
    location: "Khan Market, Delhi",
    city: "Delhi",
    type: "Team Dinner",
    price: 2200,
    rating: 4.7,
    reviews: 318,
    capacity: "15–80",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&fit=crop&auto=format"],
    description: "A private dining club nestled in Delhi's most prestigious market. Chef's tasting menus, a curated wine cellar, and a hushed atmosphere that makes every corporate dinner feel like a board-level affair.",
    amenities: ["Chef's Menu", "Wine Cellar", "Private Room", "Sommelier", "Valet", "Corporate Invoice"],
    tags: ["Dinner", "Fine Dining", "Wine", "Exclusive"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 23,
    name: "Hauz Khas Village Rooftop",
    location: "Hauz Khas, Delhi",
    city: "Delhi",
    type: "Rooftop",
    price: 1800,
    rating: 4.6,
    reviews: 267,
    capacity: "20–100",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&auto=format"],
    description: "Delhi's most bohemian rooftop, overlooking the ancient Hauz Khas lake and ruins. Art installations, live indie music, and farm-to-table menus attract the city's creative corporate crowd.",
    amenities: ["Lake View", "Live Music", "Farm-to-Table", "Bar", "Outdoor Seating", "Corporate Billing"],
    tags: ["Rooftop", "Bohemian", "Lake View", "Indie Music"],
    available: "Tue–Sun evenings",
    isFeatured: false,
  },
  {
    id: 24,
    name: "Connaught Place Office Party",
    location: "Connaught Place, Delhi",
    city: "Delhi",
    type: "Office Party",
    price: 2600,
    rating: 4.5,
    reviews: 145,
    capacity: "50–300",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop&auto=format"],
    description: "A grand heritage event space in the iconic Connaught Place with colonial-era architecture, a full banquet setup, and professional event management. Delhi's most photographed office party venue.",
    amenities: ["Heritage Décor", "Full Catering", "Stage", "AV Setup", "Event Manager", "GST Invoice"],
    tags: ["Party", "Heritage", "Banquet", "Indoor"],
    available: "Available on weekends",
    isFeatured: false,
  },
  {
    id: 25,
    name: "Delhi Brewery Janakpuri",
    location: "Janakpuri, Delhi",
    city: "Delhi",
    type: "Brewery",
    price: 1400,
    rating: 4.4,
    reviews: 198,
    capacity: "20–100",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&auto=format"],
    description: "West Delhi's first craft brewery with a dedicated corporate events hall. Eight signature beers brewed in-house, a sprawling garden section, and a team-friendly pub menu that works for any celebration.",
    amenities: ["Garden Section", "Craft Beer", "Private Hall", "DJ Weekends", "Parking", "Corporate Billing"],
    tags: ["Brewery", "Garden", "Craft Beer", "West Delhi"],
    available: "Available daily",
    isFeatured: false,
  },

  // ── PUNE ────────────────────────────────────────────
  {
    id: 26,
    name: "Koregaon Park Rooftop Soirée",
    location: "Koregaon Park, Pune",
    city: "Pune",
    type: "Rooftop",
    price: 1600,
    rating: 4.6,
    reviews: 189,
    capacity: "15–70",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=800&fit=crop&auto=format"],
    description: "A chic rooftop terrace in Pune's most vibrant neighbourhood, surrounded by tree canopies and ambient lighting. Tapas menus, signature cocktails, and a fireplace section for cooler evenings.",
    amenities: ["Canopy View", "Fireplace", "Tapas Menu", "Cocktail Bar", "DJ", "Corporate Billing"],
    tags: ["Rooftop", "Chic", "Cocktails", "Canopy"],
    available: "Available daily",
    isFeatured: false,
  },
  {
    id: 27,
    name: "Baner Brewhouse",
    location: "Baner, Pune",
    city: "Pune",
    type: "Brewery",
    price: 1300,
    rating: 4.5,
    reviews: 221,
    capacity: "20–100",
    image: "https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=1200&h=800&fit=crop&auto=format"],
    description: "Pune's favourite IT-belt brewery, located in the heart of Baner. Fifteen craft beers on tap, a giant outdoor beer garden, and a dedicated private room for corporate groups of 20 to 100 guests.",
    amenities: ["Beer Garden", "Private Room", "15 Craft Beers", "Full Menu", "Parking", "GST Invoice"],
    tags: ["Brewery", "Beer Garden", "Outdoor", "Craft Beer"],
    available: "Available daily",
    isFeatured: false,
  },
  {
    id: 28,
    name: "Viman Nagar Team Lunch",
    location: "Viman Nagar, Pune",
    city: "Pune",
    type: "Team Lunch",
    price: 900,
    rating: 4.5,
    reviews: 303,
    capacity: "10–60",
    image: "https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=1200&h=800&fit=crop&auto=format"],
    description: "A bright, airy restaurant in Viman Nagar popular among Pune's startup and IT crowd. Pre-set corporate lunch menus, quick service, and flexible seating arrangements for groups up to 60.",
    amenities: ["Set Menu", "Fast Service", "Veg & Non-Veg", "Group Discount", "Parking", "Corporate Billing"],
    tags: ["Lunch", "Quick", "Startup-Friendly", "Affordable"],
    available: "Available weekdays",
    isFeatured: false,
  },

  // ── CHENNAI ─────────────────────────────────────────
  {
    id: 29,
    name: "ECR Beach Outing Club",
    location: "ECR, Chennai",
    city: "Chennai",
    type: "Team Outing",
    price: 1000,
    rating: 4.6,
    reviews: 267,
    capacity: "20–150",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop&auto=format"],
    description: "Chennai's most popular team outing destination on the East Coast Road. Beach volleyball, water sports, bonfire evenings, BBQ, and professional team-building workshops — all in one full-day package.",
    amenities: ["Beach Volleyball", "Water Sports", "BBQ", "Bonfire", "Lunch Included", "Team Facilitator"],
    tags: ["Outing", "Beach", "Water Sports", "Team Building"],
    available: "Weekends & holidays",
    isFeatured: false,
  },
  {
    id: 30,
    name: "Anna Nagar Rooftop Grill",
    location: "Anna Nagar, Chennai",
    city: "Chennai",
    type: "Team Dinner",
    price: 1100,
    rating: 4.5,
    reviews: 198,
    capacity: "20–80",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&auto=format"],
    description: "A breezy rooftop grill restaurant in Chennai's residential hub, Anna Nagar. Tandoor platters, South Indian fusion bites, and an open bar—perfect for mid-sized team dinners with a relaxed vibe.",
    amenities: ["Rooftop", "Tandoor Grill", "South Indian Menu", "Bar", "Parking", "Corporate Billing"],
    tags: ["Dinner", "Rooftop", "Grill", "South Indian"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 31,
    name: "OMR Tech Park Celebration",
    location: "OMR, Chennai",
    city: "Chennai",
    type: "Office Party",
    price: 1800,
    rating: 4.4,
    reviews: 132,
    capacity: "30–200",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&auto=format"],
    description: "A purpose-built corporate party venue on Chennai's IT corridor. Modular banquet spaces, in-house catering, a DJ booth, and themed décor packages—the go-to for Chennai's tech companies at year-end.",
    amenities: ["Modular Banquet", "In-house Catering", "DJ Booth", "Themed Décor", "Parking", "GST Invoice"],
    tags: ["Party", "IT Corridor", "Banquet", "Themed"],
    available: "Available weekends",
    isFeatured: false,
  },

  // ── BANGALORE (continued) ───────────────────────────
  {
    id: 32,
    name: "The Permit Room Speakeasy",
    location: "Richmond Road, Bangalore",
    city: "Bangalore",
    type: "Team Dinner",
    price: 1900,
    rating: 4.8,
    reviews: 388,
    capacity: "15–70",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&fit=crop&auto=format"],
    description: "A sophisticated cocktail-forward restaurant tucked into a colonial bungalow on Richmond Road. Experimental South Indian cuisine, an award-winning bar programme, and a private veranda room for up to 40 guests.",
    amenities: ["Private Veranda", "Craft Cocktails", "Chef's Menu", "Full Bar", "Valet", "Corporate Billing"],
    tags: ["Dinner", "Colonial", "Cocktails", "South Indian"],
    available: "Tue–Sun evenings",
    isFeatured: false,
  },
  {
    id: 33,
    name: "Cubbon Pavilion Team Lunch",
    location: "Cubbon Park, Bangalore",
    city: "Bangalore",
    type: "Team Lunch",
    price: 1050,
    rating: 4.6,
    reviews: 274,
    capacity: "10–50",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=800&fit=crop&auto=format"],
    description: "A sun-drenched pavilion restaurant bordering Cubbon Park. Garden seating, a refreshing salad and grill menu, and a calm atmosphere that makes midday team lunches genuinely enjoyable.",
    amenities: ["Garden Seating", "Salad Bar", "Veg & Non-Veg", "Mocktail Bar", "Parking", "Corporate Billing"],
    tags: ["Lunch", "Garden", "Outdoor", "Relaxed"],
    available: "Available weekdays",
    isFeatured: false,
  },
  {
    id: 34,
    name: "Zero Gravity HSR",
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    type: "Office Party",
    price: 2200,
    rating: 4.5,
    reviews: 193,
    capacity: "30–180",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop&auto=format"],
    description: "HSR Layout's premier party venue with a 4,000 sq ft main hall, LED lighting rigs, a DJ stage, and a full production team on standby. Known for seamless year-end office parties for 50 to 180 guests.",
    amenities: ["LED Rig", "DJ Stage", "Full Catering", "Bar", "Production Team", "GST Invoice"],
    tags: ["Party", "LED", "DJ", "Large Venue"],
    available: "Fri & Sat",
    isFeatured: false,
  },
  {
    id: 35,
    name: "Windmills Craftworks",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    type: "Brewery",
    price: 1600,
    rating: 4.7,
    reviews: 412,
    capacity: "20–120",
    image: "https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1559818488-c9c46b91f0cc?w=1200&h=800&fit=crop&auto=format"],
    description: "A craft brewery and live music venue in one expansive space in Whitefield. Twelve house beers, a wood-fired kitchen, and weekend jazz sessions—reserve the private loft for corporate groups up to 50.",
    amenities: ["Craft Beer", "Live Music", "Wood-fired Kitchen", "Private Loft", "Parking", "Corporate Billing"],
    tags: ["Brewery", "Live Music", "Jazz", "Loft"],
    available: "Available daily",
    isFeatured: false,
  },

  // ── MUMBAI (continued) ──────────────────────────────
  {
    id: 36,
    name: "Neel Bandra Dinner Club",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    type: "Team Dinner",
    price: 2500,
    rating: 4.7,
    reviews: 341,
    capacity: "15–80",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format"],
    description: "A celebrated modern Indian restaurant in Bandra with an intimate private dining room overlooking the street. Tasting menus inspired by regional Indian traditions, a curated wine list, and discreet service.",
    amenities: ["Private Dining Room", "Tasting Menu", "Wine List", "Valet", "Sommelier", "Corporate Invoice"],
    tags: ["Dinner", "Modern Indian", "Wine", "Intimate"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 37,
    name: "Altitude Rooftop Andheri",
    location: "Andheri West, Mumbai",
    city: "Mumbai",
    type: "Rooftop",
    price: 2000,
    rating: 4.5,
    reviews: 223,
    capacity: "20–100",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&auto=format"],
    description: "A stylish rooftop bar above the Andheri entertainment district. Retractable glass canopy, peppy cocktails, Asian small plates, and a resident DJ on weekends—great for post-event team unwinding.",
    amenities: ["Glass Canopy", "Asian Menu", "Cocktail Bar", "Resident DJ", "Corporate Billing", "Parking"],
    tags: ["Rooftop", "Cocktails", "Asian", "DJ"],
    available: "Available daily",
    isFeatured: false,
  },
  {
    id: 38,
    name: "Worli Sea Face Sundowner",
    location: "Worli, Mumbai",
    city: "Mumbai",
    type: "Team Outing",
    price: 1700,
    rating: 4.6,
    reviews: 187,
    capacity: "15–60",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=800&fit=crop&auto=format"],
    description: "A curated sunset outing along Worli Sea Face—start with a guided coastal walk, transition to a private terrace sundowner with cocktails and chaat, and end with a sit-down team dinner. Mumbai at its finest.",
    amenities: ["Guided Walk", "Sundowner Setup", "Chaat & Cocktails", "Sit-down Dinner", "Photography", "Coordinator"],
    tags: ["Outing", "Sunset", "Sea View", "Experiential"],
    available: "Tue–Sun evenings",
    isFeatured: false,
  },
  {
    id: 39,
    name: "G Bar Colaba Club",
    location: "Colaba, Mumbai",
    city: "Mumbai",
    type: "Club Night",
    price: 3000,
    rating: 4.6,
    reviews: 248,
    capacity: "20–120",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop&auto=format"],
    description: "South Mumbai's most exclusive nightclub in a renovated 1930s warehouse. Live international DJs, bottle service, a dedicated VIP mezzanine with private bar—Colaba's answer to a world-class corporate night out.",
    amenities: ["VIP Mezzanine", "Bottle Service", "International DJ", "Private Bar", "Security", "Corporate Tab"],
    tags: ["Club", "VIP", "Warehouse", "International DJ"],
    available: "Thu–Sat evenings",
    isFeatured: false,
  },
  {
    id: 40,
    name: "Versova Team Lunch",
    location: "Versova, Mumbai",
    city: "Mumbai",
    type: "Team Lunch",
    price: 1300,
    rating: 4.5,
    reviews: 211,
    capacity: "10–55",
    image: "https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=1200&h=800&fit=crop&auto=format"],
    description: "A fisherman's village eatery turned corporate lunch hotspot in Versova. Fresh catch-of-the-day menus, a breezy open-air courtyard, and a relaxed team vibe that recharges energy for afternoon sessions.",
    amenities: ["Courtyard Seating", "Seafood Menu", "Fresh Catch", "Mocktails", "Parking", "Corporate Billing"],
    tags: ["Lunch", "Seafood", "Courtyard", "Coastal"],
    available: "Available weekdays",
    isFeatured: false,
  },

  // ── HYDERABAD (continued) ───────────────────────────
  {
    id: 41,
    name: "Novotel HITEC Celebration Hall",
    location: "HITEC City, Hyderabad",
    city: "Hyderabad",
    type: "Office Party",
    price: 2800,
    rating: 4.7,
    reviews: 176,
    capacity: "50–400",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop&auto=format"],
    description: "Hyderabad's go-to five-star venue for large corporate parties. The grand pillarless ballroom fits 400 guests, with full AV production, a customised F&B menu, and a dedicated events team from briefing to cleanup.",
    amenities: ["Pillarless Ballroom", "Full Production AV", "Custom Menu", "Valet", "Events Team", "GST Invoice"],
    tags: ["Party", "5-Star", "Ballroom", "Large"],
    available: "Available on request",
    isFeatured: false,
  },
  {
    id: 42,
    name: "Sekura Rooftop Madhapur",
    location: "Madhapur, Hyderabad",
    city: "Hyderabad",
    type: "Rooftop",
    price: 2100,
    rating: 4.6,
    reviews: 198,
    capacity: "20–80",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=800&fit=crop&auto=format"],
    description: "Madhapur's most stylish rooftop lounge, perched atop a boutique hotel overlooking the IT district. Signature cocktails, Mediterranean mezze, and an infinity pool edge that doubles as a party backdrop.",
    amenities: ["Pool Edge", "Mediterranean Menu", "Signature Cocktails", "Private Cabana", "Valet", "Corporate Billing"],
    tags: ["Rooftop", "Pool", "Mediterranean", "Luxury"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 43,
    name: "Lamakaan Cultural Outing",
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    type: "Team Outing",
    price: 700,
    rating: 4.5,
    reviews: 156,
    capacity: "15–80",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=800&fit=crop&auto=format"],
    description: "An open cultural space in Banjara Hills offering team outings with a twist—improv workshops, open-mic slots, creative storytelling sessions, and a courtyard barbecue to wrap up the day.",
    amenities: ["Improv Workshop", "Open Mic", "Storytelling", "Courtyard BBQ", "Photography", "Facilitator"],
    tags: ["Outing", "Cultural", "Creative", "Workshop"],
    available: "Weekends",
    isFeatured: false,
  },

  // ── DELHI (continued) ───────────────────────────────
  {
    id: 44,
    name: "Dramz Whisky Bar",
    location: "Mehrauli, Delhi",
    city: "Delhi",
    type: "Club Night",
    price: 2800,
    rating: 4.7,
    reviews: 224,
    capacity: "20–80",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&h=800&fit=crop&auto=format"],
    description: "Delhi's most celebrated whisky bar, housed in a restored Mehrauli haveli. 350+ single malts, a private tasting room, live jazz Wednesday through Saturday, and a legendary charcuterie board.",
    amenities: ["350+ Whiskies", "Private Tasting Room", "Live Jazz", "Charcuterie", "Heritage Décor", "Corporate Tab"],
    tags: ["Club", "Whisky", "Jazz", "Heritage"],
    available: "Wed–Sat evenings",
    isFeatured: false,
  },
  {
    id: 45,
    name: "Aerocity Team Lunch Hub",
    location: "Aerocity, Delhi",
    city: "Delhi",
    type: "Team Lunch",
    price: 1600,
    rating: 4.6,
    reviews: 289,
    capacity: "10–70",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=800&fit=crop&auto=format"],
    description: "A business-focused dining hub inside Delhi's Aerocity precinct. Multiple cuisine options under one roof—Japanese, Indian, Continental—with private meeting-room dining and one-hour delivery guarantee for time-pressed teams.",
    amenities: ["Multi-cuisine", "Meeting Room Dining", "1-hr Guarantee", "Buffet Option", "GST Invoice", "Parking"],
    tags: ["Lunch", "Business", "Multi-cuisine", "Aerocity"],
    available: "Available weekdays",
    isFeatured: false,
  },
  {
    id: 46,
    name: "Lodi Garden Sundowner",
    location: "Lodi Colony, Delhi",
    city: "Delhi",
    type: "Team Outing",
    price: 1500,
    rating: 4.7,
    reviews: 201,
    capacity: "15–60",
    image: "https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=1200&h=800&fit=crop&auto=format"],
    description: "A curated corporate outing package anchored at The Lodhi hotel gardens. Heritage walk through Lodi Garden, a private sunset cocktail reception on the terrace, and a sit-down dinner under the stars.",
    amenities: ["Heritage Walk", "Sunset Cocktails", "Private Terrace", "Sit-down Dinner", "Butler Service", "Corporate Billing"],
    tags: ["Outing", "Heritage", "Sunset", "Luxury"],
    available: "Tue–Sun evenings",
    isFeatured: false,
  },
  {
    id: 47,
    name: "Rooftop Republic CP",
    location: "Connaught Place, Delhi",
    city: "Delhi",
    type: "Rooftop",
    price: 2000,
    rating: 4.5,
    reviews: 267,
    capacity: "20–100",
    image: "https://images.unsplash.com/photo-1573047330199-9a915400744f?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1573047330199-9a915400744f?w=1200&h=800&fit=crop&auto=format"],
    description: "Six floors above Connaught Place's iconic inner circle, Rooftop Republic commands 360° views of central Delhi. Grilled platters, craft beers, and live acoustic sets every Thursday and Friday evening.",
    amenities: ["360° View", "Craft Beer", "Live Acoustic", "Grilled Menu", "Corporate Billing", "Accessible"],
    tags: ["Rooftop", "360 View", "Live Music", "Craft Beer"],
    available: "Available daily",
    isFeatured: false,
  },

  // ── PUNE (continued) ────────────────────────────────
  {
    id: 48,
    name: "FC Road Team Dinner",
    location: "FC Road, Pune",
    city: "Pune",
    type: "Team Dinner",
    price: 1400,
    rating: 4.6,
    reviews: 231,
    capacity: "15–70",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&auto=format"],
    description: "A buzzing bistro on Pune's most energetic street. The mezzanine private section fits 30 comfortably, with an eclectic European menu, a thoughtful wine list, and a warm team-friendly atmosphere.",
    amenities: ["Mezzanine Section", "European Menu", "Wine List", "Cocktail Bar", "Parking", "Corporate Billing"],
    tags: ["Dinner", "European", "Bistro", "Wine"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 49,
    name: "Hinjewadi Office Celebration",
    location: "Hinjewadi, Pune",
    city: "Pune",
    type: "Office Party",
    price: 1600,
    rating: 4.4,
    reviews: 143,
    capacity: "30–200",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&auto=format"],
    description: "Purpose-built for Pune's IT park crowd—right at the Hinjewadi Phase 1 junction. Plug-and-play party packages with AV, DJ, catering, and themed décor. Fits teams of 30 to 200 with zero setup headache.",
    amenities: ["Plug-and-play Setup", "DJ", "Themed Décor", "Full Catering", "Parking", "GST Invoice"],
    tags: ["Party", "IT Park", "Plug-and-play", "Themed"],
    available: "Fri & Sat",
    isFeatured: false,
  },
  {
    id: 50,
    name: "Amanora Club Night Hadapsar",
    location: "Hadapsar, Pune",
    city: "Pune",
    type: "Club Night",
    price: 1800,
    rating: 4.5,
    reviews: 167,
    capacity: "25–150",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop&auto=format"],
    description: "Pune's newest club in the fast-growing Hadapsar belt. Cutting-edge sound system, international guest DJs every month, and private booth packages with bottle service—ideal for southeast Pune's corporate crowd.",
    amenities: ["Private Booths", "Bottle Service", "Guest DJs", "Premium Sound", "Lounge Area", "Corporate Tab"],
    tags: ["Club", "DJ", "Bottle Service", "Modern"],
    available: "Fri & Sat evenings",
    isFeatured: false,
  },

  // ── CHENNAI (continued) ─────────────────────────────
  {
    id: 51,
    name: "Savera Terrace Dinner",
    location: "Dr Radhakrishnan Salai, Chennai",
    city: "Chennai",
    type: "Team Dinner",
    price: 1700,
    rating: 4.6,
    reviews: 214,
    capacity: "20–90",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&fit=crop&auto=format"],
    description: "A heritage hotel terrace in the heart of Chennai. Multi-cuisine spread, attentive service, and a breeze off the Bay of Bengal. The private dining annex hosts corporate dinners of 20 to 90 guests with full GST support.",
    amenities: ["Sea Breeze", "Multi-cuisine", "Private Annex", "Butler Service", "Valet", "GST Invoice"],
    tags: ["Dinner", "Heritage", "Terrace", "Multi-cuisine"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 52,
    name: "T Nagar Brewpub",
    location: "T Nagar, Chennai",
    city: "Chennai",
    type: "Brewery",
    price: 1200,
    rating: 4.4,
    reviews: 178,
    capacity: "20–80",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&auto=format"],
    description: "Chennai's first neighbourhood craft brewpub, bringing eight rotating house beers to T Nagar. Compact private section for 20, a full South Indian snack menu alongside brewery classics, and one of the city's best happy hours.",
    amenities: ["8 Rotating Beers", "Private Section", "South Indian Snacks", "Happy Hour", "Parking", "Corporate Billing"],
    tags: ["Brewery", "Neighbourhood", "South Indian", "Casual"],
    available: "Available daily",
    isFeatured: false,
  },
  {
    id: 53,
    name: "Phoenix MarketCity Team Lunch",
    location: "Velachery, Chennai",
    city: "Chennai",
    type: "Team Lunch",
    price: 950,
    rating: 4.4,
    reviews: 243,
    capacity: "10–60",
    image: "https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1658227412301-75d89b92aae0?w=1200&h=800&fit=crop&auto=format"],
    description: "A curated private dining space on the top floor of Phoenix MarketCity. Set corporate lunch menus with Indian, Chinese, and Continental options, private AV screen for presentations, and zero parking hassle.",
    amenities: ["Set Lunch Menu", "AV Screen", "Multi-cuisine", "Mall Parking", "Private Room", "GST Invoice"],
    tags: ["Lunch", "Mall", "Private", "Presentation-friendly"],
    available: "Available weekdays",
    isFeatured: false,
  },

  // ── KOLKATA ─────────────────────────────────────────
  {
    id: 54,
    name: "Park Street Jazz & Dine",
    location: "Park Street, Kolkata",
    city: "Kolkata",
    type: "Team Dinner",
    price: 1400,
    rating: 4.7,
    reviews: 298,
    capacity: "15–80",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format"],
    description: "Kolkata's most celebrated dining corridor, now with a private dining club. Live jazz every evening, colonial-era interiors, and a menu that traces Bengal's culinary history—perfect for teams that appreciate culture.",
    amenities: ["Live Jazz", "Private Club Room", "Bengali Cuisine", "Continental Menu", "Bar", "Corporate Invoice"],
    tags: ["Dinner", "Jazz", "Colonial", "Cultural"],
    available: "Available evenings",
    isFeatured: false,
  },
  {
    id: 55,
    name: "Salt Lake Rooftop Lounge",
    location: "Salt Lake, Kolkata",
    city: "Kolkata",
    type: "Rooftop",
    price: 1200,
    rating: 4.5,
    reviews: 167,
    capacity: "20–80",
    image: "https://images.unsplash.com/photo-1573047330199-9a915400744f?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1573047330199-9a915400744f?w=1200&h=800&fit=crop&auto=format"],
    description: "A relaxed rooftop lounge in Kolkata's planned IT township of Salt Lake. City views, local craft beers, fusion street food platters, and a casual corporate vibe that suits teams across all seniority levels.",
    amenities: ["City View", "Craft Beer", "Fusion Street Food", "Lounge Seating", "Parking", "Corporate Billing"],
    tags: ["Rooftop", "Casual", "Street Food", "Craft Beer"],
    available: "Available daily",
    isFeatured: false,
  },
  {
    id: 56,
    name: "Victoria Memorial Outing",
    location: "Maidan, Kolkata",
    city: "Kolkata",
    type: "Team Outing",
    price: 850,
    rating: 4.6,
    reviews: 189,
    capacity: "15–100",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&h=600&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=800&fit=crop&auto=format"],
    description: "A uniquely Kolkata team outing — heritage walk through the Victoria Memorial grounds, a guided city tram tour, followed by a private high tea at a century-old Park Street café. History, culture, and team bonding.",
    amenities: ["Heritage Walk", "Tram Tour", "High Tea", "Guide Included", "Photography", "Group Coordinator"],
    tags: ["Outing", "Heritage", "Cultural", "Historic"],
    available: "Weekends & public holidays",
    isFeatured: false,
  },
];

// ── 3 distinctive images per venue (carousel) ──────────────────
const _p = (id: string) => `https://images.unsplash.com/${id}?w=800&h=600&fit=crop&auto=format`;
const VENUE_GALLERY: Record<number, [string, string, string]> = {
  // Breweries
  1:  [_p("photo-1558618666-fcd25c85cd64"), _p("photo-1559818488-c9c46b91f0cc"), _p("photo-1573047330199-9a915400744f")],
  6:  [_p("photo-1517248135467-4c7edcad34c4"), _p("photo-1558618666-fcd25c85cd64"), _p("photo-1559818488-c9c46b91f0cc")],
  12: [_p("photo-1559818488-c9c46b91f0cc"), _p("photo-1558618666-fcd25c85cd64"), _p("photo-1551632811-561732d1e306")],
  14: [_p("photo-1558618666-fcd25c85cd64"), _p("photo-1566737236500-c8ac43014a67"), _p("photo-1559818488-c9c46b91f0cc")],
  21: [_p("photo-1559818488-c9c46b91f0cc"), _p("photo-1566737236500-c8ac43014a67"), _p("photo-1542626991-cbc4e32524cc")],
  25: [_p("photo-1566737236500-c8ac43014a67"), _p("photo-1558618666-fcd25c85cd64"), _p("photo-1658227412301-75d89b92aae0")],
  27: [_p("photo-1558618666-fcd25c85cd64"), _p("photo-1559818488-c9c46b91f0cc"), _p("photo-1658227412301-75d89b92aae0")],
  35: [_p("photo-1566737236500-c8ac43014a67"), _p("photo-1517248135467-4c7edcad34c4"), _p("photo-1558618666-fcd25c85cd64")],
  52: [_p("photo-1558618666-fcd25c85cd64"), _p("photo-1566737236500-c8ac43014a67"), _p("photo-1466978913421-dad2ebd01d17")],
  // Rooftops
  5:  [_p("photo-1573047330199-9a915400744f"), _p("photo-1551632811-561732d1e306"), _p("photo-1533174072545-7a4b6ad7a6c3")],
  9:  [_p("photo-1551632811-561732d1e306"), _p("photo-1533174072545-7a4b6ad7a6c3"), _p("photo-1573047330199-9a915400744f")],
  13: [_p("photo-1533174072545-7a4b6ad7a6c3"), _p("photo-1573047330199-9a915400744f"), _p("photo-1551632811-561732d1e306")],
  19: [_p("photo-1573047330199-9a915400744f"), _p("photo-1533174072545-7a4b6ad7a6c3"), _p("photo-1551632811-561732d1e306")],
  23: [_p("photo-1551632811-561732d1e306"), _p("photo-1573047330199-9a915400744f"), _p("photo-1466978913421-dad2ebd01d17")],
  26: [_p("photo-1533174072545-7a4b6ad7a6c3"), _p("photo-1551632811-561732d1e306"), _p("photo-1466978913421-dad2ebd01d17")],
  37: [_p("photo-1551632811-561732d1e306"), _p("photo-1533174072545-7a4b6ad7a6c3"), _p("photo-1573047330199-9a915400744f")],
  42: [_p("photo-1551632811-561732d1e306"), _p("photo-1414235077428-338989a2e8c0"), _p("photo-1533174072545-7a4b6ad7a6c3")],
  47: [_p("photo-1533174072545-7a4b6ad7a6c3"), _p("photo-1551632811-561732d1e306"), _p("photo-1573047330199-9a915400744f")],
  55: [_p("photo-1573047330199-9a915400744f"), _p("photo-1551632811-561732d1e306"), _p("photo-1517248135467-4c7edcad34c4")],
  // Team Dinners
  8:  [_p("photo-1414235077428-338989a2e8c0"), _p("photo-1544025162-d76694265947"), _p("photo-1466978913421-dad2ebd01d17")],
  22: [_p("photo-1544025162-d76694265947"), _p("photo-1466978913421-dad2ebd01d17"), _p("photo-1414235077428-338989a2e8c0")],
  30: [_p("photo-1517248135467-4c7edcad34c4"), _p("photo-1573047330199-9a915400744f"), _p("photo-1544025162-d76694265947")],
  32: [_p("photo-1544025162-d76694265947"), _p("photo-1466978913421-dad2ebd01d17"), _p("photo-1414235077428-338989a2e8c0")],
  36: [_p("photo-1466978913421-dad2ebd01d17"), _p("photo-1544025162-d76694265947"), _p("photo-1414235077428-338989a2e8c0")],
  48: [_p("photo-1466978913421-dad2ebd01d17"), _p("photo-1544025162-d76694265947"), _p("photo-1559818488-c9c46b91f0cc")],
  51: [_p("photo-1544025162-d76694265947"), _p("photo-1414235077428-338989a2e8c0"), _p("photo-1533174072545-7a4b6ad7a6c3")],
  54: [_p("photo-1414235077428-338989a2e8c0"), _p("photo-1466978913421-dad2ebd01d17"), _p("photo-1566737236500-c8ac43014a67")],
  // Team Lunches
  2:  [_p("photo-1414235077428-338989a2e8c0"), _p("photo-1544025162-d76694265947"), _p("photo-1466978913421-dad2ebd01d17")],
  10: [_p("photo-1466978913421-dad2ebd01d17"), _p("photo-1414235077428-338989a2e8c0"), _p("photo-1544025162-d76694265947")],
  16: [_p("photo-1544025162-d76694265947"), _p("photo-1414235077428-338989a2e8c0"), _p("photo-1466978913421-dad2ebd01d17")],
  20: [_p("photo-1466978913421-dad2ebd01d17"), _p("photo-1517248135467-4c7edcad34c4"), _p("photo-1414235077428-338989a2e8c0")],
  28: [_p("photo-1517248135467-4c7edcad34c4"), _p("photo-1466978913421-dad2ebd01d17"), _p("photo-1544025162-d76694265947")],
  33: [_p("photo-1466978913421-dad2ebd01d17"), _p("photo-1658227412301-75d89b92aae0"), _p("photo-1414235077428-338989a2e8c0")],
  40: [_p("photo-1658227412301-75d89b92aae0"), _p("photo-1414235077428-338989a2e8c0"), _p("photo-1466978913421-dad2ebd01d17")],
  45: [_p("photo-1544025162-d76694265947"), _p("photo-1466978913421-dad2ebd01d17"), _p("photo-1414235077428-338989a2e8c0")],
  53: [_p("photo-1466978913421-dad2ebd01d17"), _p("photo-1544025162-d76694265947"), _p("photo-1658227412301-75d89b92aae0")],
  // Club Nights
  3:  [_p("photo-1566737236500-c8ac43014a67"), _p("photo-1516450360452-9312f5e86fc7"), _p("photo-1517248135467-4c7edcad34c4")],
  15: [_p("photo-1516450360452-9312f5e86fc7"), _p("photo-1566737236500-c8ac43014a67"), _p("photo-1530103862676-de8c9debad1d")],
  18: [_p("photo-1516450360452-9312f5e86fc7"), _p("photo-1530103862676-de8c9debad1d"), _p("photo-1566737236500-c8ac43014a67")],
  39: [_p("photo-1566737236500-c8ac43014a67"), _p("photo-1516450360452-9312f5e86fc7"), _p("photo-1530103862676-de8c9debad1d")],
  44: [_p("photo-1566737236500-c8ac43014a67"), _p("photo-1544025162-d76694265947"), _p("photo-1516450360452-9312f5e86fc7")],
  50: [_p("photo-1516450360452-9312f5e86fc7"), _p("photo-1566737236500-c8ac43014a67"), _p("photo-1530103862676-de8c9debad1d")],
  // Office Parties
  7:  [_p("photo-1519167758481-83f550bb49b3"), _p("photo-1540575467063-178a50c2df87"), _p("photo-1530103862676-de8c9debad1d")],
  11: [_p("photo-1530103862676-de8c9debad1d"), _p("photo-1540575467063-178a50c2df87"), _p("photo-1519167758481-83f550bb49b3")],
  24: [_p("photo-1540575467063-178a50c2df87"), _p("photo-1519167758481-83f550bb49b3"), _p("photo-1530103862676-de8c9debad1d")],
  31: [_p("photo-1540575467063-178a50c2df87"), _p("photo-1530103862676-de8c9debad1d"), _p("photo-1519167758481-83f550bb49b3")],
  34: [_p("photo-1519167758481-83f550bb49b3"), _p("photo-1530103862676-de8c9debad1d"), _p("photo-1540575467063-178a50c2df87")],
  41: [_p("photo-1519167758481-83f550bb49b3"), _p("photo-1540575467063-178a50c2df87"), _p("photo-1544025162-d76694265947")],
  49: [_p("photo-1540575467063-178a50c2df87"), _p("photo-1519167758481-83f550bb49b3"), _p("photo-1530103862676-de8c9debad1d")],
  // Team Outings
  4:  [_p("photo-1658227412301-75d89b92aae0"), _p("photo-1542626991-cbc4e32524cc"), _p("photo-1530103862676-de8c9debad1d")],
  17: [_p("photo-1542626991-cbc4e32524cc"), _p("photo-1658227412301-75d89b92aae0"), _p("photo-1530103862676-de8c9debad1d")],
  29: [_p("photo-1530103862676-de8c9debad1d"), _p("photo-1658227412301-75d89b92aae0"), _p("photo-1542626991-cbc4e32524cc")],
  38: [_p("photo-1658227412301-75d89b92aae0"), _p("photo-1530103862676-de8c9debad1d"), _p("photo-1542626991-cbc4e32524cc")],
  43: [_p("photo-1542626991-cbc4e32524cc"), _p("photo-1530103862676-de8c9debad1d"), _p("photo-1658227412301-75d89b92aae0")],
  46: [_p("photo-1658227412301-75d89b92aae0"), _p("photo-1542626991-cbc4e32524cc"), _p("photo-1544025162-d76694265947")],
  56: [_p("photo-1542626991-cbc4e32524cc"), _p("photo-1658227412301-75d89b92aae0"), _p("photo-1466978913421-dad2ebd01d17")],
};

const BOOKINGS = [
  { id: "POS-2024-0041", venue: "Skydeck Brewery & Grill", date: "Dec 20, 2024", guests: 35, total: 63000, advance: 6300, status: "Upcoming", type: "Team Dinner" },
  { id: "POS-2024-0029", venue: "Terrace 22 Rooftop", date: "Nov 15, 2024", guests: 20, total: 48000, advance: 4800, status: "Completed", type: "Office Party" },
  { id: "POS-2024-0018", venue: "Olive Garden Private Dining", date: "Oct 08, 2024", guests: 12, total: 14400, advance: 1440, status: "Completed", type: "Team Lunch" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "HR Director, Swiggy",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format",
    quote: "PartyOS transformed how we organise team events. What used to take 3 days of emails now takes under 10 minutes. Every single venue has been exceptional.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Founder, Growthschool",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    quote: "The quality of venues is exceptional and the booking process is seamless. We used PartyOS for our annual company offsite—absolutely flawless execution.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Executive Assistant, Meesho",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&auto=format",
    quote: "I book 4–5 team events a month. PartyOS is the only platform that truly understands corporate needs—proper invoices, advance payments, and instant WhatsApp confirmations.",
    rating: 5,
  },
  {
    name: "Karan Bajaj",
    role: "VP Engineering, Razorpay",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    quote: "We've tried other platforms but nothing comes close. PartyOS has the best venue selection in Bangalore and the GST billing makes our finance team very happy.",
    rating: 5,
  },
  {
    name: "Sneha Rao",
    role: "People Operations Lead, CRED",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format",
    quote: "Booked our entire Q4 team calendar through PartyOS. The dedicated host at each venue made every event feel premium without any extra effort on our end.",
    rating: 5,
  },
  {
    name: "Vikram Nair",
    role: "Chief of Staff, PhonePe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
    quote: "The 10-minute booking promise is real. I booked a dinner for 80 people during a meeting and it was confirmed before the meeting ended. Remarkable.",
    rating: 5,
  },
  {
    name: "Divya Krishnan",
    role: "Admin Manager, Zepto",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    quote: "PartyOS is the only tool I recommend to every admin and EA I know. Saves hours, venues are vetted, and the support team actually picks up the phone.",
    rating: 5,
  },
  {
    name: "Aditya Sinha",
    role: "Co-founder, Navi",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&auto=format",
    quote: "From a rooftop brewery to an intimate team dinner—PartyOS nails the brief every single time. Our team looks forward to these events more than anything.",
    rating: 5,
  },
  {
    name: "Ritu Desai",
    role: "HR Business Partner, Ola",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&auto=format",
    quote: "The advance payment model is genius—secures the slot without committing the full budget upfront. Our CFO actually approved it without any pushback.",
    rating: 5,
  },
  {
    name: "Nikhil Joshi",
    role: "Head of Culture, Urban Company",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&auto=format",
    quote: "We run monthly team events across Mumbai and Bangalore. PartyOS handles all of it without a single hiccup. The multi-city support is a game-changer.",
    rating: 5,
  },
  {
    name: "Meera Iyer",
    role: "Executive Assistant, Infosys BPM",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b2d2d8d1?w=100&h=100&fit=crop&auto=format",
    quote: "Five-star venues at startup speed. I get instant confirmations, proper invoices, and zero back-and-forth with the venue. This is how corporate events should work.",
    rating: 5,
  },
  {
    name: "Siddharth Kapoor",
    role: "Founding Team, Slice",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format",
    quote: "Our year-end party at the venue PartyOS recommended got a 4.9 internal rating from the team. That kind of score usually takes months of planning. Here it took a day.",
    rating: 5,
  },
  {
    name: "Pooja Menon",
    role: "Team Lead, Freshworks",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&auto=format",
    quote: "Freshworks Chennai relies on PartyOS for everything from team lunches to large offsites. The consistency in quality across every venue is what keeps us coming back.",
    rating: 5,
  },
];

const ADMIN_REVENUE = [
  { month: "Jul", revenue: 14.2, bookings: 89 },
  { month: "Aug", revenue: 18.9, bookings: 114 },
  { month: "Sep", revenue: 21.0, bookings: 132 },
  { month: "Oct", revenue: 17.5, bookings: 108 },
  { month: "Nov", revenue: 23.8, bookings: 156 },
  { month: "Dec", revenue: 31.0, bookings: 201 },
];

const LEAD_PIPELINE = [
  {
    stage: "Inquiry", color: "#6366F1",
    leads: [
      { company: "Razorpay", contact: "Rohan K.", team: 45, budget: "₹2,500/pp" },
      { company: "Zepto", contact: "Meera S.", team: 20, budget: "₹1,800/pp" },
    ],
  },
  {
    stage: "Contacted", color: "#F59E0B",
    leads: [
      { company: "PhonePe", contact: "Aditya M.", team: 80, budget: "₹2,000/pp" },
    ],
  },
  {
    stage: "Negotiation", color: "#EC4899",
    leads: [
      { company: "CRED", contact: "Nisha P.", team: 35, budget: "₹3,000/pp" },
    ],
  },
  {
    stage: "Booked", color: "#10B981",
    leads: [
      { company: "Meesho", contact: "Ananya R.", team: 60, budget: "₹2,200/pp" },
    ],
  },
  {
    stage: "Completed", color: "#059669",
    leads: [
      { company: "Swiggy", contact: "Priya S.", team: 120, budget: "₹3,500/pp" },
      { company: "Growthschool", contact: "Rahul M.", team: 30, budget: "₹2,800/pp" },
    ],
  },
];

const FAQs = [
  { q: "How does PartyOS work?", a: "Browse curated venues, select your experience, and confirm your booking in under 5 minutes. We handle all coordination with the venue—you show up and celebrate." },
  { q: "What is the advance payment?", a: "We collect a 10% advance to secure your booking. The balance is settled directly with the venue before or on the event day." },
  { q: "Can I get a GST invoice?", a: "Yes, absolutely. GST invoices are generated automatically for every booking and available to download from your booking history." },
  { q: "What if I need to cancel?", a: "Cancellations more than 7 days before the event receive a full refund of the advance. Within 7 days, the advance is non-refundable." },
  { q: "Do you support large corporate teams?", a: "Yes. We have venues that accommodate 5 to 500+ guests. Use the team size filter to find the right fit for your group." },
];

// fires once per session across search + detail pages
let _discountNudgeFired = false;

const CORPORATE_LOGOS = ["Swiggy", "Razorpay", "Meesho", "CRED", "PhonePe", "Zepto", "Growthschool", "Navi"];

// ──────────────────────── TESTIMONIAL CAROUSEL ────────────────────────
const CARDS_VISIBLE = 3;

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;
  const maxIndex = total - CARDS_VISIBLE;

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(maxIndex, i + 1));

  useEffect(() => {
    const t = setInterval(() => setActive(i => i >= maxIndex ? 0 : i + 1), 4000);
    return () => clearInterval(t);
  }, [maxIndex]);

  // card width = 1/3 of container; shift by one card width per step
  const cardWidthPct = 100 / CARDS_VISIBLE;

  return (
    <div className="relative">
      {/* Cards track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * cardWidthPct}%)` }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex-shrink-0 px-3" style={{ width: `${cardWidthPct}%` }}>
              <div className="p-8 rounded-2xl h-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={13} fill={GOLD} color={GOLD} />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover bg-gray-700" />
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        disabled={active === 0}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
      >
        <ChevronLeft size={18} color="#fff" />
      </button>
      <button
        onClick={next}
        className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        disabled={active === maxIndex}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
      >
        <ChevronRight size={18} color="#fff" />
      </button>

      {/* Dots — one per slide position */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              background: i === active ? GOLD : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ──────────────────────── UI ATOMS ────────────────────────
function GoldBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide"
      style={{ background: GOLD_LIGHT, color: GOLD }}
    >
      {label}
    </span>
  );
}

function StarRating({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <Star size={13} fill={GOLD} color={GOLD} />
      <span className="font-semibold text-gray-900">{rating}</span>
      {reviews !== undefined && <span className="text-gray-400">({reviews.toLocaleString()})</span>}
    </span>
  );
}

function GoldBtn({ children, onClick, className = "", disabled = false }: {
  children: ReactNode; onClick?: () => void; className?: string; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ background: GOLD }}
    >
      {children}
    </button>
  );
}

function PrimaryBtn({ children, onClick, className = "" }: {
  children: ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] ${className}`}
      style={{ background: "#111111" }}
    >
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick, className = "" }: {
  children: ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 ${className}`}
    >
      {children}
    </button>
  );
}

// ──────────────────────── NAVBAR ────────────────────────
function Navbar({
  page, setPage, isLoggedIn, setShowLogin, navCity, setNavCity,
}: {
  page: Page; setPage: (p: Page) => void; isLoggedIn: boolean; setShowLogin: (v: boolean) => void;
  navCity: string; setNavCity: (c: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const cities = ["Bangalore", "Mumbai", "Gurgaon", "Hyderabad", "Delhi", "Pune", "Chennai", "Kolkata"];

  const CITY_COORDS: Record<string, [number, number]> = {
    Bangalore: [12.97, 77.59], Mumbai: [19.08, 72.88], Gurgaon: [28.46, 77.03],
    Hyderabad: [17.39, 78.49], Delhi: [28.61, 77.21], Pune: [18.52, 73.86],
    Chennai: [13.08, 80.27], Kolkata: [22.57, 88.36],
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        let nearest = "", minDist = Infinity;
        for (const [city, [clat, clng]] of Object.entries(CITY_COORDS)) {
          const d = Math.hypot(lat - clat, lng - clng);
          if (d < minDist) { minDist = d; nearest = city; }
        }
        setNavCity(nearest);
        setLocating(false);
      },
      () => setLocating(false)
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#111111" }}>
            <PartyPopper size={15} color={GOLD} />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            PartyOS
          </span>
        </button>

        {/* Centre nav links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setPage("search")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Experiences</button>
          {isLoggedIn && (
            <>
              <button onClick={() => setPage("profile")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">My Bookings</button>
              <button onClick={() => setPage("admin")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Admin</button>
            </>
          )}
        </div>

        {/* Right side — city + auth */}
        <div className="hidden md:flex items-center gap-3">
          {/* City picker */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white transition-all">
            <select
              value={navCity}
              onChange={e => setNavCity(e.target.value)}
              className="text-sm font-semibold text-gray-800 bg-transparent border-0 outline-none appearance-none cursor-pointer"
              style={{ minWidth: 100 }}
            >
              <option value="">Select City</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={handleGeolocate}
              title="Detect my location"
              className="flex-none transition-opacity hover:opacity-60"
            >
              <LocateFixed
                size={15}
                style={{ color: GOLD }}
                className={locating ? "animate-pulse" : ""}
              />
            </button>
          </div>

          {/* Auth */}
          {isLoggedIn ? (
            <button
              onClick={() => setPage("profile")}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: GOLD }}
            >
              P
            </button>
          ) : (
            <GoldBtn onClick={() => setShowLogin(true)} className="py-2 px-5">Login / Sign up</GoldBtn>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2">
          <button onClick={() => { setPage("search"); setMenuOpen(false); }} className="block w-full text-left py-2.5 px-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50">Experiences</button>
          {isLoggedIn ? (
            <>
              <button onClick={() => { setPage("profile"); setMenuOpen(false); }} className="block w-full text-left py-2.5 px-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50">My Bookings</button>
              <button onClick={() => { setPage("admin"); setMenuOpen(false); }} className="block w-full text-left py-2.5 px-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50">Admin Dashboard</button>
            </>
          ) : (
            <div className="pt-2">
              <GoldBtn onClick={() => { setShowLogin(true); setMenuOpen(false); }} className="w-full py-2.5">Login / Sign up</GoldBtn>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// ──────────────────────── SEARCH WIDGET ────────────────────────
function SearchWidget({ onSearch, compact = false }: { onSearch: (q: Record<string, string | number>) => void; compact?: boolean }) {
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [budget, setBudget] = useState(3000);

  const cities = ["Bangalore", "Mumbai", "Gurgaon", "Hyderabad", "Delhi", "Pune", "Chennai", "Kolkata"];
  const eventTypes = ["Team Lunch", "Team Dinner", "Office Party", "Rooftop", "Brewery", "Club Night", "Team Outing"];

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-1 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
        <select value={city} onChange={e => setCity(e.target.value)} className="flex-1 min-w-[120px] text-sm bg-transparent border-0 outline-none text-gray-700 px-3 py-2">
          <option value="">All cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />
        <select value={type} onChange={e => setType(e.target.value)} className="flex-1 min-w-[130px] text-sm bg-transparent border-0 outline-none text-gray-700 px-3 py-2">
          <option value="">Any experience</option>
          {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />
        <select value={size} onChange={e => setSize(e.target.value)} className="flex-1 min-w-[110px] text-sm bg-transparent border-0 outline-none text-gray-700 px-3 py-2">
          <option value="">Any size</option>
          {["5-10", "10-20", "20-50", "50-100", "100+"].map(s => <option key={s} value={s}>{s} guests</option>)}
        </select>
        <button onClick={() => onSearch({ city, type, size, budget })} className="rounded-xl px-5 py-2.5 text-white font-semibold text-sm transition-all hover:opacity-90" style={{ background: "#111" }}>
          <Search size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 p-8 max-w-4xl w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            <PartyPopper size={11} style={{ color: GOLD }} /> Event Type
          </label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full text-sm font-medium text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 pb-2 outline-none focus:border-[#C9A227] transition-colors appearance-none">
            <option value="">Any experience</option>
            {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            <Users size={11} style={{ color: GOLD }} /> Team Size
          </label>
          <select value={size} onChange={e => setSize(e.target.value)} className="w-full text-sm font-medium text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 pb-2 outline-none focus:border-[#C9A227] transition-colors appearance-none">
            <option value="">Any size</option>
            {["5-10", "10-20", "20-50", "50-100", "100+"].map(s => <option key={s} value={s}>{s} guests</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            <IndianRupee size={11} style={{ color: GOLD }} /> Budget / person
          </label>
          <input
            type="range" min={500} max={5000} step={100} value={budget}
            onChange={e => setBudget(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: GOLD }}
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>₹500</span>
            <span className="font-bold text-gray-900">₹{budget.toLocaleString()}</span>
            <span>₹5,000</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => onSearch({ city, type, size, budget })}
          className="flex items-center gap-3 px-12 py-4 rounded-2xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-black/20"
          style={{ background: "#111111" }}
        >
          <Search size={18} /> Find Experiences
        </button>
      </div>
    </div>
  );
}

// ──────────────────────── EXPERIENCE CARD ────────────────────────
function ExperienceCard({
  exp, onClick, isComparing = false, onToggleCompare,
}: {
  exp: Experience;
  onClick: () => void;
  isComparing?: boolean;
  onToggleCompare?: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [hoverImg, setHoverImg] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // use curated gallery if available, else fall back to experience images
  const allImages = VENUE_GALLERY[exp.id] ?? Array.from(new Set([exp.image, ...exp.images]));

  const startCarousel = () => {
    if (allImages.length <= 1) return;
    let i = 0;
    hoverTimer.current = setInterval(() => {
      i = (i + 1) % allImages.length;
      setHoverImg(i);
    }, 1500);
  };

  const stopCarousel = () => {
    if (hoverTimer.current) { clearInterval(hoverTimer.current); hoverTimer.current = null; }
    setHoverImg(0);
  };

  const shareText = `Check out ${exp.name} at ${exp.location}!\nStarting ₹${exp.price.toLocaleString()}/person · ⭐${exp.rating}\nBook via PartyOS 🎉`;

  const handleWhatsApp = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    setShowShare(false);
  };

  const handleEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const subject = `Check out ${exp.name} for our team event!`;
    const body = `Hi,\n\nFound this venue for our upcoming team event:\n\n${exp.name}\n${exp.location}\nFrom ₹${exp.price.toLocaleString()}/person · ⭐${exp.rating} (${exp.reviews} reviews)\n\nLet me know what you think!\n\n— Shared via PartyOS`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowShare(false);
  };

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
    setShowShare(false);
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
      style={isComparing ? { outline: `2px solid ${GOLD}`, outlineOffset: "2px" } : {}}
    >
      {/* Image with hover carousel */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-gray-100 flex-shrink-0"
        onMouseEnter={startCarousel}
        onMouseLeave={stopCarousel}
      >
        <img
          src={allImages[hoverImg]}
          alt={exp.name}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Image dots */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
            {allImages.map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{ width: i === hoverImg ? 14 : 5, height: 5, background: i === hoverImg ? "#fff" : "rgba(255,255,255,0.5)" }}
              />
            ))}
          </div>
        )}

        <div className="absolute top-3 left-3">
          <GoldBadge label={exp.type} />
        </div>

        {/* Action buttons: compare + share + heart */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {/* Compare */}
          {onToggleCompare !== undefined && (
            <button
              onClick={e => { e.stopPropagation(); onToggleCompare(); }}
              className="w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors"
              style={isComparing
                ? { background: GOLD }
                : { background: "rgba(255,255,255,0.9)" }
              }
              title={isComparing ? "Remove from compare" : "Add to compare"}
            >
              <Scale size={13} color={isComparing ? "#fff" : "#444"} />
            </button>
          )}

          {/* Share */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={e => { e.stopPropagation(); setShowShare(s => !s); }}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            >
              <Share2 size={13} color="#444" />
            </button>
            {showShare && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-3 pt-2 pb-1.5">Share via</p>
                <button onClick={handleWhatsApp} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors text-left">
                  <MessageCircle size={14} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                </button>
                <button onClick={handleEmail} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-left">
                  <Mail size={14} className="text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">Email</span>
                </button>
                <button onClick={handleCopy} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  {shareCopied ? <Check size={14} className="text-green-500 flex-shrink-0" /> : <Copy size={14} className="text-gray-500 flex-shrink-0" />}
                  <span className="text-sm font-medium text-gray-700">{shareCopied ? "Copied!" : "Copy Link"}</span>
                </button>
                <div className="border-t border-gray-100 mt-1.5 pt-1.5">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (navigator.share) navigator.share({ title: exp.name, text: shareText });
                      setShowShare(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <Share2 size={14} className="text-gray-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">More apps…</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Heart */}
          <button
            onClick={e => { e.stopPropagation(); setLiked(!liked); }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart size={14} fill={liked ? "#EF4444" : "none"} color={liked ? "#EF4444" : "#666"} />
          </button>
        </div>
      </div>

      {/* Card body — flex-col flex-1 keeps all cards same height in a grid row */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-base truncate">{exp.name}</h3>
            <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1 truncate"><MapPin size={11} className="flex-shrink-0" /><span className="truncate">{exp.location}</span></p>
          </div>
          <StarRating rating={exp.rating} reviews={exp.reviews} />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Starts from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">₹{exp.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400">/person</span>
            </div>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap"><Users size={11} /> {exp.capacity} guests</span>
        </div>

        <div className="flex gap-1.5 overflow-hidden" style={{ maxHeight: "1.75rem" }}>
          {exp.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100 whitespace-nowrap flex-shrink-0">{a}</span>
          ))}
          {exp.amenities.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-100 flex-shrink-0">+{exp.amenities.length - 3}</span>
          )}
        </div>

        {/* spacer pushes content up */}
        <div className="flex-1" />
      </div>
    </div>
  );
}

// ──────────────────────── COMPARE BAR ────────────────────────
function CompareBar({ compareList, onCompare, onClear, onRemove }: {
  compareList: Experience[];
  onCompare: () => void;
  onClear: () => void;
  onRemove: (id: number) => void;
}) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-700 flex-shrink-0">
          <Scale size={16} style={{ color: GOLD }} />
          Compare <span className="text-gray-400 font-normal">({compareList.length}/3)</span>
        </div>

        <div className="flex items-center gap-3 flex-1 overflow-x-auto min-w-0">
          {compareList.map(exp => (
            <div key={exp.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-shrink-0">
              <img src={exp.image} alt={exp.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-800 max-w-[100px] truncate">{exp.name}</span>
              <button
                onClick={() => onRemove(exp.id)}
                className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors flex-shrink-0 ml-1"
              >
                <X size={10} />
              </button>
            </div>
          ))}

          {Array.from({ length: Math.max(0, 2 - compareList.length) }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-3 py-2 flex-shrink-0 opacity-50">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Plus size={12} className="text-gray-300" />
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">Add venue</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={onClear} className="text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium">Clear all</button>
          <GoldBtn onClick={onCompare} disabled={compareList.length < 2} className="py-2.5 px-5 text-sm">
            Compare Now <ArrowRight size={14} />
          </GoldBtn>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────── COMPARE MODAL ────────────────────────
function CompareModal({ venues, onClose, setPage, setSelectedExp }: {
  venues: Experience[];
  onClose: () => void;
  setPage: (p: Page) => void;
  setSelectedExp: (e: Experience) => void;
}) {
  const pkgs = (exp: Experience) => [
    { name: "Standard", price: exp.price },
    { name: "Premium", price: Math.round(exp.price * 1.4) },
    { name: "Elite", price: Math.round(exp.price * 1.9) },
  ];

  const allAmenities = Array.from(new Set(venues.flatMap(e => e.amenities)));

  const rows: { label: string; render: (exp: Experience) => ReactNode; shade?: boolean }[] = [
    {
      label: "Rating",
      render: exp => <StarRating rating={exp.rating} reviews={exp.reviews} />,
    },
    {
      label: "Starting Price",
      shade: true,
      render: exp => (
        <span>
          <span className="text-xl font-bold text-gray-900">₹{exp.price.toLocaleString()}</span>
          <span className="text-xs text-gray-400">/person</span>
        </span>
      ),
    },
    {
      label: "Experience Type",
      render: exp => <GoldBadge label={exp.type} />,
    },
    {
      label: "Capacity",
      shade: true,
      render: exp => <span className="text-sm font-semibold text-gray-900">{exp.capacity} guests</span>,
    },
    {
      label: "Packages",
      render: exp => (
        <div className="space-y-1.5 text-left">
          {pkgs(exp).map(pkg => (
            <div key={pkg.name} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-2.5 py-1.5 gap-3">
              <span className="text-gray-500 font-medium">{pkg.name}</span>
              <span className="font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-6 px-4">
      <div className="relative bg-white rounded-3xl w-full max-w-5xl shadow-2xl mb-6">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <div className="flex items-center gap-2.5">
            <Scale size={18} style={{ color: GOLD }} />
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Compare Venues & Deals
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            {/* Venue image + name headers */}
            <thead>
              <tr>
                <th className="text-left px-8 py-6 w-36 align-bottom">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Attribute</span>
                </th>
                {venues.map(exp => (
                  <th key={exp.id} className="px-5 py-4 align-top min-w-[200px]">
                    <div className="rounded-2xl overflow-hidden mb-3 aspect-[16/9] bg-gray-100">
                      <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-bold text-gray-900 text-sm leading-snug">{exp.name}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-0.5">
                      <MapPin size={10} /> {exp.location}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Data rows */}
              {rows.map(row => (
                <tr key={row.label} className={`border-t border-gray-100 ${row.shade ? "bg-gray-50/60" : ""}`}>
                  <td className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">{row.label}</td>
                  {venues.map(exp => (
                    <td key={exp.id} className="px-5 py-4 text-center">{row.render(exp)}</td>
                  ))}
                </tr>
              ))}

              {/* Amenity rows */}
              <tr className="border-t border-gray-200">
                <td className="px-8 py-3" colSpan={venues.length + 1}>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Amenities</span>
                </td>
              </tr>
              {allAmenities.map((amenity, i) => (
                <tr key={amenity} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-gray-50/40" : ""}`}>
                  <td className="px-8 py-3.5 text-sm text-gray-600">{amenity}</td>
                  {venues.map(exp => (
                    <td key={exp.id} className="px-5 py-3.5 text-center">
                      {exp.amenities.includes(amenity) ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ background: `${GOLD}20` }}>
                          <Check size={13} style={{ color: GOLD }} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
                          <X size={13} className="text-gray-300" />
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA row */}
              <tr className="border-t border-gray-200">
                <td className="px-8 py-6" />
                {venues.map(exp => (
                  <td key={exp.id} className="px-5 py-6 text-center">
                    <GoldBtn
                      onClick={() => { setSelectedExp(exp); setPage("detail"); onClose(); }}
                      className="w-full"
                    >
                      Book {exp.name.split(" ")[0]}
                    </GoldBtn>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────── FOOTER ────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: GOLD }}>
                <PartyPopper size={15} color="white" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>PartyOS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">Premium corporate experience booking, made effortless.</p>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {["How it Works", "Experiences", "Pricing", "Enterprise"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {["About", "Blog", "Careers", "Contact"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
            <div className="mt-5">
              <a href="#" className="text-sm font-medium hover:text-white transition-colors" style={{ color: GOLD }}>Become a Partner →</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2024 PartyOS. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield size={13} style={{ color: GOLD }} />
            <span>Trusted by 1,200+ corporate teams across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────── HOME PAGE ────────────────────────
// ─────────────────── FEATURED CARD (landing page only) ───────────────────
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Brewery":     { bg: "#FFF3CD", text: "#92600A" },
  "Rooftop":     { bg: "#E8F4FD", text: "#1565C0" },
  "Club":        { bg: "#F3E5F5", text: "#6A1B9A" },
  "Party":       { bg: "#FCE4EC", text: "#AD1457" },
  "Dinner":      { bg: "#E8F5E9", text: "#2E7D32" },
  "Lunch":       { bg: "#FFF8E1", text: "#F57F17" },
  "Outing":      { bg: "#E0F2F1", text: "#00695C" },
  "Seafood":     { bg: "#E3F2FD", text: "#1976D2" },
  "Garden":      { bg: "#F1F8E9", text: "#558B2F" },
  "Live Music":  { bg: "#F3E5F5", text: "#7B1FA2" },
  "Heritage":    { bg: "#FBE9E7", text: "#BF360C" },
  "Jazz":        { bg: "#EDE7F6", text: "#4527A0" },
  "Cultural":    { bg: "#E0F7FA", text: "#006064" },
  "Sunset":      { bg: "#FFF3E0", text: "#E65100" },
};

function getTagStyle(tag: string) {
  for (const key of Object.keys(TAG_COLORS)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return TAG_COLORS[key];
  }
  return { bg: GOLD_LIGHT, text: "#7A5C00" };
}

function FeaturedCard({ exp, onClick }: { exp: Experience; onClick: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
      style={{ height: 380 }}
    >
      {/* Image — fixed height */}
      <div className="relative overflow-hidden bg-gray-100 flex-none" style={{ height: 200 }}>
        <img src={exp.image} alt={exp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <GoldBadge label={exp.type} />
        </div>
        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart size={14} fill={liked ? "#EF4444" : "none"} color={liked ? "#EF4444" : "#666"} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 overflow-hidden">
        {/* Title — single line */}
        <h3 className="font-semibold text-gray-900 text-base truncate leading-snug mb-0.5">{exp.name}</h3>
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <MapPin size={10} /> {exp.location}
        </p>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={exp.rating} reviews={exp.reviews} />
        </div>

        {/* Tags — highlighted pills */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {exp.tags.slice(0, 3).map(tag => {
            const style = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: style.bg, color: style.text }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1536392706976-e486e2ba97af?w=1920&h=1080&fit=crop&auto=format",
    label: "Team Dinners",
    title: "Unforgettable\nTeam Dinners",
    subtitle: "From intimate bistros to grand banquets — book the perfect dinner experience for your team.",
    cta: "Explore Dinners",
  },
  {
    image: "https://images.unsplash.com/photo-1502614106407-f0b9eca73d6b?w=1920&h=1080&fit=crop&auto=format",
    label: "Rooftop Events",
    title: "Rooftop Celebrations,\nElevated",
    subtitle: "Sky-high venues with panoramic city views — for teams that like to celebrate in style.",
    cta: "Find Rooftops",
  },
  {
    image: "https://images.unsplash.com/photo-1758520144661-73849bde0da1?w=1920&h=1080&fit=crop&auto=format",
    label: "Office Parties",
    title: "Year-End Parties\nDone Right",
    subtitle: "Plug-and-play party venues with DJ, décor, and catering — zero planning stress for you.",
    cta: "Book a Party",
  },
  {
    image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=1920&h=1080&fit=crop&auto=format",
    label: "Brewery Outings",
    title: "Craft Brewery\nTeam Outings",
    subtitle: "House-brewed craft beers, great food, and a relaxed vibe — perfect for Friday wind-downs.",
    cta: "Discover Breweries",
  },
  {
    image: "https://images.unsplash.com/photo-1784104661835-e467d77a7a81?w=1920&h=1080&fit=crop&auto=format",
    label: "Team Lunches",
    title: "Al Fresco\nTeam Lunches",
    subtitle: "Garden courtyards and sun-lit terraces — midday experiences that recharge your whole team.",
    cta: "Browse Lunches",
  },
];

function HomePage({ setPage, setSelectedExp }: { setPage: (p: Page) => void; setSelectedExp: (e: Experience) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const footerSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setActiveSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [isPaused]);

  useEffect(() => {
    const onScroll = () => {
      const searchBottom = searchRef.current?.getBoundingClientRect().bottom ?? 0;
      const footerTop = footerSentinelRef.current?.getBoundingClientRect().top ?? Infinity;
      const windowH = window.innerHeight;
      setShowFloatingBtn(searchBottom < 0 && footerTop > windowH);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = experiences.filter(e => e.isFeatured);

  return (
    <div>
      {/* Hero Carousel */}
      <style>{`
        @keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.09); } }
        .kb-active { animation: kenburns 8s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        .slide-in { animation: slideUp 0.65s ease forwards; }
        .slide-in-delay { animation: slideUp 0.65s 0.12s ease both; }
        .slide-in-delay2 { animation: slideUp 0.65s 0.24s ease both; }
      `}</style>
      <section
        className="relative overflow-hidden"
        style={{ height: "75vh", minHeight: 476 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slides */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeSlide === i ? 1 : 0, zIndex: activeSlide === i ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className={`w-full h-full object-cover${activeSlide === i ? " kb-active" : ""}`}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.12) 100%)" }} />
          </div>
        ))}

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pb-32" style={{ zIndex: 10 }}>
          <h1
            key={`title-${activeSlide}`}
            className="slide-in-delay text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-5 whitespace-pre-line"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {HERO_SLIDES[activeSlide].title}
          </h1>
          <p
            key={`sub-${activeSlide}`}
            className="slide-in-delay2 text-lg sm:text-xl max-w-xl leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            {HERO_SLIDES[activeSlide].subtitle}
          </p>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => setActiveSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border border-white/25 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
          style={{ zIndex: 10, background: "rgba(255,255,255,0.1)" }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setActiveSlide(s => (s + 1) % HERO_SLIDES.length)}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center border border-white/25 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
          style={{ zIndex: 10, background: "rgba(255,255,255,0.1)" }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ zIndex: 10 }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeSlide === i ? 28 : 8,
                height: 8,
                background: activeSlide === i ? GOLD : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>

        {/* Fade to white at the very bottom for SearchWidget overlap */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{ zIndex: 10, background: "linear-gradient(to top, #ffffff 0%, transparent 100%)" }} />
      </section>

      {/* Search Widget floating below carousel */}
      <div ref={searchRef} className="relative -mt-16" style={{ zIndex: 20 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SearchWidget onSearch={() => setPage("search")} />
        </div>
      </div>

      {/* How it Works */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Your Experience, Curated</h2>
          <p className="text-gray-400 mt-3 text-base">From first search to final celebration — we handle every detail.</p>
        </div>

        {/* Flow */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">

          {/* Dashed connector line — desktop only, sits behind the icon circles */}
          <div
            className="hidden md:block absolute"
            style={{ top: 27, left: "16.67%", right: "16.67%", borderTop: "2px dashed #E2D9C5", zIndex: 0 }}
          />

          {[
            {
              icon: Sparkles,
              title: "Discover Your Vibe",
              desc: "Browse 56+ handpicked venues across 8 cities. Tell us your team size, budget, and the kind of experience you're after.",
              detail: "Team Lunches · Rooftops · Breweries · Clubs",
            },
            {
              icon: CreditCard,
              title: "Lock It in Minutes",
              desc: "Choose a package, pick your date, and pay just 10% advance to instantly confirm. No calls, no back-and-forth.",
              detail: "GST Invoice · Instant Confirmation",
            },
            {
              icon: PartyPopper,
              title: "Show Up & Celebrate",
              desc: "We brief the venue on your preferences. You receive a WhatsApp summary. Just arrive — everything is ready.",
              detail: "WhatsApp Reminder · Vendor Coordinated",
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center px-6">
              {/* Icon circle — sits on top of dashed line */}
              <div
                className="relative flex-none w-14 h-14 rounded-full flex items-center justify-center mb-7 bg-white"
                style={{ zIndex: 1, border: `2px dashed ${GOLD}`, boxShadow: `0 0 0 6px #FAFAF8` }}
              >
                <step.icon size={22} style={{ color: GOLD }} />
              </div>

              {/* Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.desc}</p>
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: GOLD_LIGHT, color: "#7A5C00" }}
                >
                  {step.detail}
                </div>
              </div>

              {/* Vertical dot connector — mobile only */}
              {i < 2 && (
                <div className="md:hidden flex flex-col items-center my-4 gap-1">
                  {[0, 1, 2].map(d => <div key={d} className="w-1 h-1 rounded-full bg-gray-300" />)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-20" style={{ background: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Experiences</h2>
              <p className="text-gray-400 mt-2">Handpicked venues loved by corporate teams</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { const el = document.getElementById("featured-carousel"); if (el) el.scrollBy({ left: -340, behavior: "smooth" }); }}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => { const el = document.getElementById("featured-carousel"); if (el) el.scrollBy({ left: 340, behavior: "smooth" }); }}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
          <div
            id="featured-carousel"
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            <style>{`#featured-carousel::-webkit-scrollbar { display: none; }`}</style>
            {experiences.slice(0, 10).map(exp => (
              <div key={exp.id} className="flex-none w-[280px] sm:w-[300px]">
                <FeaturedCard exp={exp} onClick={() => { setSelectedExp(exp); setPage("detail"); }} />
              </div>
            ))}
            <div
              className="flex-none w-[280px] sm:w-[300px] flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-gray-400 transition-all"
              style={{ height: 380 }}
              onClick={() => setPage("search")}
            >
              <div className="text-center p-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: GOLD_LIGHT }}>
                  <ArrowRight size={22} style={{ color: GOLD }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-base">View All Experiences</h3>
                <p className="text-sm text-gray-400">56+ venues across 8 cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials + Trusted By — merged section */}
      <section className="py-14" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Trusted By — top */}
          <div className="mb-10">
            <p className="text-center text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {CORPORATE_LOGOS.map(logo => (
                <span key={logo} className="text-gray-600 font-bold text-lg hover:text-gray-400 transition-colors cursor-default" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-10" />

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>What Our Clients Say</h2>
            <p className="text-gray-500 mt-2 text-sm">1,200+ happy corporate teams and counting</p>
          </div>

          {/* Carousel */}
          <div className="px-6">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Corporate Teams", value: "1,200+" },
            { label: "Curated Venues", value: "500+" },
            { label: "Cities", value: "12" },
            { label: "Avg. Booking Time", value: "4 min" },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GOLD }}>{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-12 sm:p-16 text-center text-white" style={{ background: "#111111" }}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Plan Your Next Event?</h2>
          <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto">Join 1,200+ corporate teams using PartyOS to create memorable experiences.</p>
          <GoldBtn onClick={() => setPage("search")} className="px-10 py-4 text-base">
            Browse Experiences <ArrowRight size={18} />
          </GoldBtn>
        </div>
      </section>

      {/* Footer sentinel — floating btn hides when this comes into view */}
      <div ref={footerSentinelRef} />

      {/* Floating Find Experiences button */}
      <div
        className="fixed bottom-6 transition-all duration-300"
        style={{
          zIndex: 50,
          left: "50%",
          opacity: showFloatingBtn ? 1 : 0,
          transform: `translateX(-50%) translateY(${showFloatingBtn ? "0px" : "16px"})`,
          pointerEvents: showFloatingBtn ? "auto" : "none",
        }}
      >
        <button
          onClick={() => setPage("search")}
          className="flex items-center gap-3 px-12 py-4 rounded-2xl text-white font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all"
          style={{
            background: "#111111",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <Search size={18} /> Find Experiences
        </button>
      </div>
    </div>
  );
}

// ──────────────────────── FILTER DROPDOWN ────────────────────────
function FilterDropdown({ label, active, children }: { label: string; active?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all whitespace-nowrap"
        style={active
          ? { background: "#111111", color: "#fff", borderColor: "#111111" }
          : { background: "#fff", color: "#374151", borderColor: "#e5e7eb" }
        }
      >
        {label}
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[200px] p-2">
          {children}
        </div>
      )}
    </div>
  );
}

// ──────────────────────── SEARCH PAGE ────────────────────────
function SearchPage({ setPage, setSelectedExp, navCity, isLoggedIn, onDiscountNudge }: {
  setPage: (p: Page) => void; setSelectedExp: (e: Experience) => void; navCity: string;
  isLoggedIn: boolean; onDiscountNudge: () => void;
}) {
  const [sortBy, setSortBy] = useState("Recommended");
  const [budgetMax, setBudgetMax] = useState(5000);
  const [experienceFilter, setExperienceFilter] = useState("");
  const [venueTypeFilter, setVenueTypeFilter] = useState("");
  const [foodPrefs, setFoodPrefs] = useState<string[]>([]);
  const [musicPref, setMusicPref] = useState("");
  const [paxMin, setPaxMin] = useState("");
  const [paxMax, setPaxMax] = useState("");
  const [query, setQuery] = useState("");
  const [compareList, setCompareList] = useState<Experience[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const cityFilter = navCity;

  const EXPERIENCE_TYPES = ["Executive sit out", "Dance and Dhamaka", "Peaceful outings", "Activities & fun"];
  const VENUE_TYPES = ["Brewery", "Roof top", "Restro lounge", "Night club", "Sports lounge", "Play arena", "Resort", "Farm house"];
  const FOOD_OPTIONS = ["Food (vegan / veg only)", "Food (veg + non veg)", "Food + liquor"];
  const MUSIC_OPTIONS = ["No music area", "Music in the background", "Live music"];
  const SORT_OPTIONS = ["Recommended", "Best Rated", "Nearby", "Price: Low to High", "Price: High to Low"];

  // Scroll-triggered discount nudge — fires once after scrolling past ~2 card rows
  useEffect(() => {
    if (isLoggedIn) return;
    const onScroll = () => { if (window.scrollY > 620) { onDiscountNudge(); window.removeEventListener("scroll", onScroll); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoggedIn]);

  const toggleFood = (f: string) =>
    setFoodPrefs(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const toggleCompare = (exp: Experience) => {
    setCompareList(prev => {
      const exists = prev.find(e => e.id === exp.id);
      if (exists) return prev.filter(e => e.id !== exp.id);
      if (prev.length >= 3) return prev;
      return [...prev, exp];
    });
  };

  const filtered = experiences.filter(e => {
    if (e.price > budgetMax) return false;
    if (experienceFilter && e.type !== experienceFilter) return false;
    if (cityFilter && e.city !== cityFilter) return false;
    if (venueTypeFilter && !e.tags.some(t => t.toLowerCase() === venueTypeFilter.toLowerCase())) return false;
    if (musicPref && !e.amenities.some(a => a.toLowerCase().includes(musicPref.toLowerCase())) && !e.tags.some(t => t.toLowerCase().includes(musicPref.toLowerCase()))) return false;
    if (paxMin && parseInt(paxMin) > 0) {
      const cap = parseInt(e.capacity.split("–")[1] ?? e.capacity);
      if (!isNaN(cap) && cap < parseInt(paxMin)) return false;
    }
    if (query && !e.name.toLowerCase().includes(query.toLowerCase()) && !e.location.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Best Rated") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const hasActiveFilters = experienceFilter !== "" || venueTypeFilter !== "" || foodPrefs.length > 0 || musicPref !== "" || paxMin !== "" || paxMax !== "" || budgetMax < 5000;

  const clearAll = () => {
    setExperienceFilter(""); setVenueTypeFilter(""); setFoodPrefs([]);
    setMusicPref(""); setPaxMin(""); setPaxMax(""); setBudgetMax(5000);
  };

  return (
    <div className={compareList.length > 0 ? "pb-28" : ""}>
      {/* ── Sticky filter bar ── */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-3 flex flex-col gap-2.5">

          {/* Row 1: Search + Pax + Budget */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search venues, areas…"
                className="bg-transparent text-sm outline-none w-full text-gray-800 placeholder:text-gray-400"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Pax */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <Users size={13} className="text-gray-400 flex-shrink-0" />
              <input
                type="number" min={1} value={paxMin} onChange={e => setPaxMin(e.target.value)}
                placeholder="Min"
                className="bg-transparent text-sm outline-none w-12 text-gray-800 placeholder:text-gray-400"
              />
              <span className="text-gray-300 text-xs">–</span>
              <input
                type="number" min={1} value={paxMax} onChange={e => setPaxMax(e.target.value)}
                placeholder="Max"
                className="bg-transparent text-sm outline-none w-12 text-gray-800 placeholder:text-gray-400"
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">pax</span>
            </div>

            {/* Budget */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 min-w-[220px]">
              <IndianRupee size={13} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500 whitespace-nowrap">Up to</span>
              <input
                type="range" min={500} max={5000} step={100} value={budgetMax}
                onChange={e => setBudgetMax(Number(e.target.value))}
                className="flex-1 h-1"
                style={{ accentColor: GOLD }}
              />
              <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">₹{budgetMax.toLocaleString()}</span>
            </div>
          </div>

          {/* Row 2: Dropdown filters + Clear */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Experience */}
            <FilterDropdown label={experienceFilter || "Experience"} active={!!experienceFilter}>
              {EXPERIENCE_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setExperienceFilter(prev => prev === t ? "" : t)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={experienceFilter === t ? "font-semibold text-gray-900" : "text-gray-700"}>{t}</span>
                  {experienceFilter === t && <Check size={13} style={{ color: GOLD }} />}
                </button>
              ))}
            </FilterDropdown>

            {/* Venue type */}
            <FilterDropdown label={venueTypeFilter || "Venue Type"} active={!!venueTypeFilter}>
              {VENUE_TYPES.map(v => (
                <button
                  key={v}
                  onClick={() => setVenueTypeFilter(prev => prev === v ? "" : v)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={venueTypeFilter === v ? "font-semibold text-gray-900" : "text-gray-700"}>{v}</span>
                  {venueTypeFilter === v && <Check size={13} style={{ color: GOLD }} />}
                </button>
              ))}
            </FilterDropdown>

            {/* Food preference — multi-select */}
            <FilterDropdown
              label={foodPrefs.length > 0 ? `Food (${foodPrefs.length})` : "Food Preference"}
              active={foodPrefs.length > 0}
            >
              {FOOD_OPTIONS.map(f => (
                <button
                  key={f}
                  onClick={() => toggleFood(f)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={foodPrefs.includes(f) ? "font-semibold text-gray-900" : "text-gray-700"}>{f}</span>
                  {foodPrefs.includes(f) && <Check size={13} style={{ color: GOLD }} />}
                </button>
              ))}
            </FilterDropdown>

            {/* Music preference */}
            <FilterDropdown label={musicPref || "Music"} active={!!musicPref}>
              {MUSIC_OPTIONS.map(m => (
                <button
                  key={m}
                  onClick={() => setMusicPref(prev => prev === m ? "" : m)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={musicPref === m ? "font-semibold text-gray-900" : "text-gray-700"}>{m}</span>
                  {musicPref === m && <Check size={13} style={{ color: GOLD }} />}
                </button>
              ))}
            </FilterDropdown>

            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-2 whitespace-nowrap ml-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-900">{sorted.length}</span> experiences found
            {cityFilter && <span className="ml-1">in <span className="font-semibold text-gray-700">{cityFilter}</span></span>}
            {compareList.length > 0 && (
              <span className="ml-3 font-semibold" style={{ color: GOLD }}>· {compareList.length} selected for compare</span>
            )}
          </p>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white outline-none font-medium text-gray-700 cursor-pointer"
          >
            {["Recommended", "Best Rated", "Nearby", "Price: Low to High", "Price: High to Low"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters or changing the city in the header</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map(exp => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                onClick={() => { setSelectedExp(exp); setPage("detail"); }}
                isComparing={!!compareList.find(e => e.id === exp.id)}
                onToggleCompare={() => toggleCompare(exp)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sticky compare bar */}
      <CompareBar
        compareList={compareList}
        onCompare={() => setShowCompareModal(true)}
        onClear={() => setCompareList([])}
        onRemove={id => setCompareList(prev => prev.filter(e => e.id !== id))}
      />

      {/* Compare modal */}
      {showCompareModal && (
        <CompareModal
          venues={compareList}
          onClose={() => setShowCompareModal(false)}
          setPage={setPage}
          setSelectedExp={setSelectedExp}
        />
      )}
    </div>
  );
}

// ──────────────────────── DETAIL PAGE ────────────────────────
function DetailPage({ exp, setPage, isLoggedIn, setShowLogin, onDiscountNudge }: {
  exp: Experience; setPage: (p: Page) => void; isLoggedIn: boolean; setShowLogin: (v: boolean) => void;
  onDiscountNudge: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [guests, setGuests] = useState(20);
  const [selectedPkg, setSelectedPkg] = useState(0);

  // Trigger discount nudge 1.5s after landing on detail page
  useEffect(() => {
    if (isLoggedIn) return;
    const t = setTimeout(onDiscountNudge, 1500);
    return () => clearTimeout(t);
  }, []);

  const packages = [
    { name: "Standard", price: exp.price, includes: ["Welcome Drinks", "3-Course Meal", "Soft Beverages", "Venue Décor"] },
    { name: "Premium", price: Math.round(exp.price * 1.4), includes: ["Open Bar (4 hrs)", "4-Course Meal", "Live Music", "Custom Décor", "Dedicated Host"] },
    { name: "Elite", price: Math.round(exp.price * 1.9), includes: ["Unlimited Premium Bar", "5-Course Gourmet", "Live Band", "Photography", "Valet", "GST Invoice", "Customised Menu"] },
  ];

  const pkg = packages[selectedPkg];
  const subtotal = pkg.price * guests;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;
  const advance = Math.round(total * 0.1);

  const handleBook = () => {
    if (!isLoggedIn) setShowLogin(true);
    else setPage("review");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => setPage("search")} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors font-medium">
        <ChevronLeft size={15} /> Back to search
      </button>

      <div className="lg:grid lg:grid-cols-[1fr_360px] gap-12">
        <div>
          {/* Gallery */}
          <div className="mb-8">
            <div className="rounded-2xl aspect-[16/9] overflow-hidden bg-gray-100 mb-3">
              <img src={exp.images[activeImage]} alt={exp.name} className="w-full h-full object-cover" />
            </div>
            {exp.images.length > 1 && (
              <div className="flex gap-3">
                {exp.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`flex-1 aspect-[3/2] rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-[#C9A227] scale-[0.98]" : "border-transparent opacity-70 hover:opacity-100"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Overview */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {exp.tags.slice(0, 3).map(t => <GoldBadge key={t} label={t} />)}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{exp.name}</h1>
                <p className="text-gray-400 mt-2 flex items-center gap-1.5 text-sm"><MapPin size={13} /> {exp.location}</p>
              </div>
              <StarRating rating={exp.rating} reviews={exp.reviews} />
            </div>
            <p className="text-gray-600 leading-relaxed">{exp.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>What's Included</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {exp.amenities.map(a => (
                <div key={a} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Check size={13} style={{ color: GOLD }} />
                  <span className="text-sm text-gray-700">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Select a Package</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {packages.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPkg(i)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedPkg === i ? "border-[#C9A227]" : "border-gray-100 hover:border-gray-300"}`}
                  style={selectedPkg === i ? { background: `${GOLD_LIGHT}55` } : {}}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-gray-900">{p.name}</span>
                    {selectedPkg === i && <Check size={15} style={{ color: GOLD }} />}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-3">
                    ₹{p.price.toLocaleString()}<span className="text-xs font-normal text-gray-400">/pp</span>
                  </div>
                  <ul className="space-y-1.5">
                    {p.includes.map(item => (
                      <li key={item} className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span style={{ color: GOLD }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Guest Reviews</h2>
            <div className="space-y-6">
              {[
                { name: "Kavya R.", date: "Nov 2024", rating: 5, text: "Absolutely outstanding! The team was blown away by the venue and service. Will definitely book again for our next team event." },
                { name: "Sid M.", date: "Oct 2024", rating: 5, text: "Seamless booking process and the event was flawless. The dedicated host made sure everything ran perfectly." },
                { name: "Preet K.", date: "Sep 2024", rating: 4, text: "Great ambiance and food quality. Parking could be better, but overall a memorable experience for the team." },
              ].map((review, i) => (
                <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">{review.name[0]}</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_, j) => <Star key={j} size={12} fill={GOLD} color={GOLD} />)}</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation */}
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield size={15} style={{ color: GOLD }} /> Cancellation Policy</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 flex-shrink-0 text-green-500" /> Free cancellation up to 7 days before the event — full advance refund</li>
              <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 flex-shrink-0 text-yellow-500" /> 50% advance refund for cancellations 3–7 days before</li>
              <li className="flex items-start gap-2"><X size={14} className="mt-0.5 flex-shrink-0 text-red-400" /> No refund for cancellations within 72 hours of the event</li>
            </ul>
          </div>
        </div>

        {/* Sticky Booking Widget */}
        <div className="mt-8 lg:mt-0">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl p-7 shadow-2xl shadow-black/8">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
              <span className="text-sm text-gray-400">/person</span>
            </div>
            <div className="mb-6"><StarRating rating={exp.rating} reviews={exp.reviews} /></div>

            <div className="space-y-4 mb-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Guests</label>
                <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-3">
                  <button onClick={() => setGuests(Math.max(5, guests - 5))} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center font-bold text-xl">{guests}</span>
                  <button onClick={() => setGuests(guests + 5)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Package</label>
                <select value={selectedPkg} onChange={e => setSelectedPkg(Number(e.target.value))} className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-[#C9A227] transition-colors">
                  {packages.map((p, i) => <option key={i} value={i}>{p.name} — ₹{p.price.toLocaleString()}/pp</option>)}
                </select>
              </div>
            </div>

            <div className="rounded-2xl p-4 space-y-2.5 mb-5" style={{ background: "#F9F7F3" }}>
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹{pkg.price.toLocaleString()} × {guests} guests</span>
                <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>GST (18%)</span>
                <span className="font-medium text-gray-900">₹{taxes.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-2.5 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1" style={{ color: GOLD }}>
                <span>10% Advance Due</span>
                <span>₹{advance.toLocaleString()}</span>
              </div>
            </div>

            <GoldBtn onClick={handleBook} className="w-full py-4 text-base">
              Book This Experience
            </GoldBtn>
            <p className="text-xs text-center text-gray-400 mt-3">Free cancellation up to 7 days before.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────── LOGIN MODAL ────────────────────────
function LoginModal({ onClose, onLogin, discountNudge = false }: { onClose: () => void; onLogin: () => void; discountNudge?: boolean }) {
  const [mode, setMode] = useState<"otp" | "email">("otp");
  const [step, setStep] = useState<"input" | "verify">("input");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10">
          <X size={15} />
        </button>

        {/* Discount nudge banner */}
        {discountNudge && (
          <div className="px-8 pt-7 pb-5" style={{ background: "#111111" }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: GOLD_LIGHT }}>
                <Gift size={18} style={{ color: GOLD }} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>Exclusive offer</p>
                <p className="text-white font-bold text-base leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Login / Sign up for customised discounts
                </p>
                <p className="text-gray-400 text-xs mt-1">Get personalised deals, early access & team pricing</p>
              </div>
            </div>
          </div>
        )}

        <div className={discountNudge ? "p-8 pt-6" : "p-8"}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: GOLD_LIGHT }}>
            <PartyPopper size={26} style={{ color: GOLD }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            {step === "input" ? "Welcome to PartyOS" : "Verify Your Identity"}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {step === "input" ? "Sign in or create your account" : `We sent a code to ${value}`}
          </p>
        </div>

        {step === "input" ? (
          <div className="space-y-5">
            <div className="flex rounded-xl bg-gray-100 p-1">
              {(["otp", "email"] as const).map(m => (
                <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === m ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                  {m === "otp" ? "Mobile OTP" : "Email"}
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">{mode === "otp" ? "Mobile Number" : "Email Address"}</label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#C9A227] transition-colors">
                {mode === "otp" && <span className="px-3 text-sm text-gray-400 border-r border-gray-200 py-3.5 bg-gray-50">+91</span>}
                <input
                  type={mode === "otp" ? "tel" : "email"}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={mode === "otp" ? "98765 43210" : "you@company.com"}
                  className="flex-1 px-4 py-3.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Priya Sharma" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#C9A227] transition-colors" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Company</label>
              <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Swiggy" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#C9A227] transition-colors" />
            </div>

            <GoldBtn onClick={() => value && setStep("verify")} className="w-full py-4">
              Send OTP <ArrowRight size={16} />
            </GoldBtn>
            <p className="text-xs text-center text-gray-400">
              By continuing you agree to our{" "}
              <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>
        ) : (
          <div className="space-y-7">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5 block text-center">Enter 4-digit OTP</label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => { const next = [...otp]; next[i] = e.target.value; setOtp(next); }}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl outline-none focus:border-[#C9A227] transition-colors"
                  />
                ))}
              </div>
            </div>
            <GoldBtn onClick={() => { onLogin(); onClose(); }} className="w-full py-4">
              Verify & Continue <Check size={16} />
            </GoldBtn>
            <button onClick={() => setStep("input")} className="text-sm text-center w-full text-gray-400 hover:text-gray-700 transition-colors">
              ← Change {mode === "otp" ? "number" : "email"}
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────── BOOKING REVIEW ────────────────────────
function BookingReviewPage({ exp, setPage }: { exp: Experience; setPage: (p: Page) => void }) {
  const [copied, setCopied] = useState(false);
  const guests = 20;
  const pkgPrice = Math.round(exp.price * 1.4);
  const subtotal = pkgPrice * guests;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;
  const advance = Math.round(total * 0.1);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <button onClick={() => setPage("detail")} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-8 transition-colors font-medium">
        <ChevronLeft size={15} /> Back to venue
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>Review Your Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-5">
          {/* Venue Card */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="h-36 overflow-hidden bg-gray-100">
              <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h2 className="font-bold text-lg text-gray-900">{exp.name}</h2>
              <p className="text-sm text-gray-400 flex items-center gap-1 mt-1"><MapPin size={12} /> {exp.location}</p>
              <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-gray-100">
                <div><p className="text-xs text-gray-400">Package</p><p className="text-sm font-bold mt-0.5">Premium</p></div>
                <div><p className="text-xs text-gray-400">Guests</p><p className="text-sm font-bold mt-0.5">{guests} people</p></div>
                <div><p className="text-xs text-gray-400">Date</p><p className="text-sm font-bold mt-0.5">Dec 20, 2024</p></div>
              </div>
            </div>
          </div>

          {/* Cancellation */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-2"><Shield size={14} style={{ color: GOLD }} /> Cancellation Policy</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Free cancellation until Dec 13, 2024. After that, the 10% advance is non-refundable.</p>
          </div>

          {/* Share */}
          <div className="p-5 rounded-2xl bg-white border border-gray-100">
            <h3 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-2"><Share2 size={14} /> Share with your team</h3>
            <p className="text-xs text-gray-400 mb-4">Share event details only — negotiated pricing is never included in shared links.</p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-green-50 hover:border-green-200 transition-colors">
                <MessageCircle size={15} className="text-green-600" /> WhatsApp
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <Mail size={15} className="text-blue-600" /> Email
              </button>
              <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
                {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-gray-900 mb-5">Price Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">₹{pkgPrice.toLocaleString()} × {guests} guests</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST (18%)</span>
                <span className="font-medium">₹{taxes.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl" style={{ background: GOLD_LIGHT }}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold" style={{ color: GOLD }}>Advance (10%)</span>
                <span className="font-bold text-xl" style={{ color: GOLD }}>₹{advance.toLocaleString()}</span>
              </div>
              <p className="text-xs mt-1" style={{ color: "#9A7B19" }}>Balance due before/on event day</p>
            </div>

            <GoldBtn onClick={() => setPage("payment")} className="w-full py-4 mt-5">
              Pay ₹{advance.toLocaleString()} Now
            </GoldBtn>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
              <Shield size={11} /> Secured by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────── PAYMENT PAGE ────────────────────────
function PaymentPage({ setPage }: { setPage: (p: Page) => void }) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const advance = 9017;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setPage("confirmation"); }, 2200);
  };

  const paymentMethods = [
    { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm", icon: Zap },
    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
    { id: "netbanking", label: "Net Banking", desc: "All major banks supported", icon: Building2 },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12">
      <button onClick={() => setPage("review")} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-8 transition-colors font-medium">
        <ChevronLeft size={15} /> Back to review
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Secure Payment</h1>
      <p className="text-gray-400 text-sm mb-8">Pay your 10% advance to lock in your booking</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-7">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-400">Booking ID</span>
          <span className="text-sm font-bold text-gray-900 font-mono">POS-2024-0042</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Amount Due</span>
          <span className="text-2xl font-bold" style={{ color: GOLD }}>₹{advance.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3 mb-7">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Payment Method</p>
        {paymentMethods.map(m => (
          <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${method === m.id ? "border-[#C9A227]" : "border-gray-100 hover:border-gray-200"}`} style={method === m.id ? { background: `${GOLD_LIGHT}55` } : {}}>
            <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} style={{ accentColor: GOLD }} />
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
              <m.icon size={19} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{m.label}</p>
              <p className="text-xs text-gray-400">{m.desc}</p>
            </div>
          </label>
        ))}
      </div>

      {method === "upi" && (
        <div className="mb-7">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">UPI ID</label>
          <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#C9A227] transition-colors" />
        </div>
      )}

      <GoldBtn onClick={handlePay} disabled={processing} className="w-full py-4 text-base">
        {processing ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin block" />
            Processing...
          </span>
        ) : (
          <><Shield size={16} /> Pay ₹{advance.toLocaleString()} Securely</>
        )}
      </GoldBtn>
      <p className="text-xs text-center text-gray-400 mt-4">256-bit SSL encryption · Powered by Razorpay</p>
    </div>
  );
}

// ──────────────────────── CONFIRMATION PAGE ────────────────────────
function ConfirmationPage({ exp, setPage }: { exp: Experience; setPage: (p: Page) => void }) {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: GOLD_LIGHT }}>
        <Check size={42} style={{ color: GOLD }} strokeWidth={2.5} />
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>You're Confirmed!</h1>
      <p className="text-gray-500 mb-1">Booking ID: <span className="font-bold text-gray-900 font-mono">POS-2024-0042</span></p>
      <p className="text-sm text-gray-400 mb-10">Confirmation sent to your email and WhatsApp</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 text-left space-y-3">
        {[
          { label: "Venue", value: exp.name },
          { label: "Location", value: exp.location },
          { label: "Date", value: "Friday, December 20, 2024" },
          { label: "Time", value: "7:30 PM onwards" },
          { label: "Guests", value: "20 people" },
          { label: "Package", value: "Premium" },
          { label: "Advance Paid", value: "₹9,017" },
          { label: "Balance Due", value: "₹81,153 (on event day)" },
        ].map(item => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-gray-400">{item.label}</span>
            <span className="font-semibold text-gray-900 text-right ml-4">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <OutlineBtn onClick={() => {}} className="flex-1">
          <Download size={15} /> Download Invoice
        </OutlineBtn>
        <OutlineBtn onClick={() => {}} className="flex-1">
          <Calendar size={15} /> Add to Calendar
        </OutlineBtn>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-green-200 text-green-700 text-sm font-semibold hover:bg-green-50 transition-colors">
          <MessageCircle size={15} /> WhatsApp Update
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-blue-200 text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors">
          <Share2 size={15} /> Share with Team
        </button>
      </div>

      <PrimaryBtn onClick={() => setPage("profile")} className="w-full py-4 text-base">
        View Booking History
      </PrimaryBtn>
    </div>
  );
}

// ──────────────────────── PROFILE PAGE ────────────────────────
function ProfilePage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("bookings");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [notifWa, setNotifWa] = useState(true);

  const tabs = [
    { id: "bookings", label: "Booking History" },
    { id: "saved", label: "Saved Venues" },
    { id: "rewards", label: "Rewards" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 p-7 bg-white border border-gray-100 rounded-3xl">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${GOLD}, #9A7B19)`, fontFamily: "'Playfair Display', serif" }}>
          P
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Priya Sharma</h1>
          <p className="text-gray-400 text-sm">HR Director · Swiggy</p>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className="text-xs text-gray-400 flex items-center gap-1"><Mail size={11} /> priya@swiggy.com</span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Phone size={11} /> +91 98765 43210</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold" style={{ background: GOLD_LIGHT, color: GOLD }}>
            <Award size={14} /> Gold Member
          </div>
          <p className="text-xs text-gray-400 mt-2">3 bookings · 1,850 pts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${activeTab === tab.id ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "bookings" && (
        <div className="space-y-4">
          {BOOKINGS.map(b => (
            <div key={b.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{b.venue}</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${b.status === "Upcoming" ? "bg-green-100 text-green-700" : b.status === "Completed" ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-600"}`}>
                    {b.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{b.type} · {b.date} · {b.guests} guests</p>
                <p className="text-xs text-gray-300 mt-1 font-mono">{b.id}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">₹{b.total.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Advance: ₹{b.advance.toLocaleString()}</p>
                <button className="mt-2 text-xs font-semibold underline text-gray-400 hover:text-gray-700 transition-colors">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "saved" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experiences.slice(0, 4).map(exp => (
            <div key={exp.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl items-center hover:shadow-md transition-shadow cursor-pointer">
              <img src={exp.image} alt={exp.name} className="w-20 h-16 rounded-xl object-cover flex-shrink-0 bg-gray-100" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-gray-900 truncate">{exp.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{exp.location}</p>
                <p className="text-sm font-bold mt-1" style={{ color: GOLD }}>₹{exp.price.toLocaleString()}/person</p>
              </div>
              <Heart size={16} fill="#EF4444" color="#EF4444" className="flex-shrink-0" />
            </div>
          ))}
        </div>
      )}

      {activeTab === "rewards" && (
        <div className="space-y-6">
          <div className="rounded-3xl p-8 text-white" style={{ background: "#111111" }}>
            <p className="text-sm text-gray-500 mb-1">Your Balance</p>
            <div className="text-6xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: GOLD }}>1,850</div>
            <p className="text-sm text-gray-500 mb-6">PartyOS Points</p>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
              {[{ label: "Total Bookings", value: "3" }, { label: "Membership", value: "Gold" }, { label: "To Platinum", value: "2 more" }].map(s => (
                <div key={s.label}>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="font-bold text-white mt-1">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "₹500 Coupon", desc: "Redeemable on next booking", icon: Gift, tag: "Valid till Dec 31" },
              { title: "Priority Support", desc: "Gold member benefit", icon: Zap, tag: "Active" },
              { title: "Referral Code: PRIYA50", desc: "₹500 off for friends", icon: Share2, tag: "Share & earn" },
              { title: "Free Upgrade Voucher", desc: "1 package upgrade", icon: Award, tag: "5th booking reward" },
            ].map(perk => (
              <div key={perk.title} className="p-5 bg-white border border-gray-100 rounded-2xl flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: GOLD_LIGHT }}>
                  <perk.icon size={18} style={{ color: GOLD }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{perk.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{perk.desc}</p>
                  <p className="text-xs font-semibold mt-1.5" style={{ color: GOLD }}>{perk.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-5 max-w-lg">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-5">Notification Preferences</h3>
            <div className="space-y-5">
              {[
                { label: "Email Notifications", val: notifEmail, set: setNotifEmail },
                { label: "SMS Notifications", val: notifSms, set: setNotifSms },
                { label: "WhatsApp Updates", val: notifWa, set: setNotifWa },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                  <button
                    onClick={() => item.set(!item.val)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${item.val ? "" : "bg-gray-200"}`}
                    style={item.val ? { background: GOLD } : {}}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${item.val ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-5">Linked Accounts</h3>
            <div className="space-y-4">
              {[
                { label: "LinkedIn", icon: Linkedin, connected: true },
                { label: "Instagram", icon: Instagram, connected: false },
                { label: "Google", icon: Globe, connected: true },
              ].map(acc => (
                <div key={acc.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <acc.icon size={17} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{acc.label}</span>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full cursor-pointer ${acc.connected ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                    {acc.connected ? "Connected" : "Connect"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Referral Code</h3>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <span className="font-mono font-bold text-xl text-gray-900 flex-1">PRIYA50</span>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: GOLD }}>Copy</button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Share with colleagues — they get ₹500 off, you earn 200 points.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────── ADMIN DASHBOARD ────────────────────────
function AdminDashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
    { id: "leads", label: "Leads", icon: TrendingUp },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "customers", label: "Customers", icon: Users },
    { id: "venues", label: "Venues", icon: Building2 },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  const statsData = [
    { label: "Total Leads", value: "61", delta: "+12% this week", icon: TrendingUp, color: "#6366F1" },
    { label: "Bookings Today", value: "8", delta: "+3 vs yesterday", icon: Check, color: GOLD },
    { label: "Revenue (Dec)", value: "₹31L", delta: "+23% vs Nov", icon: IndianRupee, color: "#10B981" },
    { label: "Pending Payments", value: "₹4.2L", delta: "5 bookings", icon: CreditCard, color: "#F59E0B" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[#111111] hidden md:flex flex-col min-h-screen">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: GOLD }}>
              <PartyPopper size={13} color="white" />
            </div>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>PartyOS Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              style={activeSection === item.id ? { background: "rgba(201,162,39,0.15)", color: GOLD } : {}}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={() => setPage("home")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all font-medium">
            <LogOut size={15} /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-h-screen" style={{ background: "#F5F4F0" }}>
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                {navItems.find(n => n.id === activeSection)?.label ?? "Dashboard"}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">Saturday, December 14, 2024</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Bell size={15} className="text-gray-600" />
              </button>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: GOLD }}>A</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {statsData.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: stat.color + "18" }}>
                    <stat.icon size={15} style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.delta}</p>
              </div>
            ))}
          </div>

          {/* Dashboard view */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Revenue Trend (₹ Lakhs)</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={ADMIN_REVENUE} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                      <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={GOLD} stopOpacity={0.25} />
                          <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => [`₹${v}L`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
                      <Area type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={2.5} fill="url(#goldGrad)" dot={false} activeDot={{ r: 5, fill: GOLD }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Monthly Bookings</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={ADMIN_REVENUE} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => [v, "Bookings"]} contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
                      <Bar dataKey="bookings" fill="#111111" radius={[5, 5, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bookings table */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Recent Bookings</h2>
                  <button className="text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors">View all →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {["Booking ID", "Company", "Venue", "Date", "Amount", "Status"].map(col => (
                          <th key={col} className={`px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 ${col === "Amount" ? "text-right" : "text-left"}`}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "POS-0042", company: "Swiggy", venue: "Skydeck Brewery", date: "Dec 20", amount: "₹90,170", status: "Confirmed" },
                        { id: "POS-0041", company: "CRED", venue: "Grand Ballroom", date: "Dec 22", amount: "₹2,14,000", status: "Pending" },
                        { id: "POS-0040", company: "Razorpay", venue: "Terrace 22", date: "Dec 18", amount: "₹67,200", status: "Confirmed" },
                        { id: "POS-0039", company: "PhonePe", venue: "Social District", date: "Dec 15", amount: "₹1,10,000", status: "Cancelled" },
                      ].map(row => (
                        <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-gray-400">{row.id}</td>
                          <td className="px-6 py-4 font-bold text-gray-900">{row.company}</td>
                          <td className="px-6 py-4 text-gray-600">{row.venue}</td>
                          <td className="px-6 py-4 text-gray-400">{row.date}</td>
                          <td className="px-6 py-4 text-right font-bold text-gray-900">{row.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.status === "Confirmed" ? "bg-green-100 text-green-700" : row.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600"}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Leads pipeline */}
          {activeSection === "leads" && (
            <div>
              <div className="overflow-x-auto">
                <div className="flex gap-4 min-w-max pb-4">
                  {LEAD_PIPELINE.map(col => (
                    <div key={col.stage} className="w-56 bg-white rounded-2xl border border-gray-100 overflow-hidden flex-shrink-0">
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{col.stage}</span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: col.color }}>
                          {col.leads.length}
                        </span>
                      </div>
                      <div className="p-3 space-y-3">
                        {col.leads.map((lead, i) => (
                          <div key={i} className="p-3.5 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer">
                            <p className="text-sm font-bold text-gray-900">{lead.company}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{lead.contact}</p>
                            <div className="flex items-center justify-between mt-2.5">
                              <span className="text-xs text-gray-400"><Users size={10} className="inline mr-1" />{lead.team}</span>
                              <span className="text-xs font-bold" style={{ color: GOLD }}>{lead.budget}</span>
                            </div>
                          </div>
                        ))}
                        <button className="w-full py-2 rounded-xl border-2 border-dashed border-gray-100 text-xs text-gray-300 hover:border-gray-200 hover:text-gray-400 transition-colors font-medium">
                          + Add Lead
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeSection === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Conversion Rate", value: "38%", trend: "↑ +5%" },
                  { label: "Avg. Booking Value", value: "₹89K", trend: "↑ +12%" },
                  { label: "Repeat Customers", value: "42%", trend: "↑ +8%" },
                  { label: "Satisfaction Score", value: "4.8/5", trend: "→ Stable" },
                ].map(m => (
                  <div key={m.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">{m.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{m.value}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">{m.trend}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Revenue by Month (₹ Lakhs)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={ADMIN_REVENUE} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                    <defs>
                      <linearGradient id="goldGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#999" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#999" }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`₹${v}L`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
                    <Area type="monotone" dataKey="revenue" stroke={GOLD} strokeWidth={3} fill="url(#goldGrad2)" dot={{ r: 5, fill: GOLD, strokeWidth: 0 }} activeDot={{ r: 7 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Other sections */}
          {["bookings", "customers", "venues", "payments"].includes(activeSection) && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-5xl mb-5">📋</p>
              <h3 className="font-bold text-xl text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {navItems.find(n => n.id === activeSection)?.label} Management
              </h3>
              <p className="text-sm text-gray-400 max-w-sm mx-auto">This section is ready for your data integration. Connect your backend to populate live records.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ──────────────────────── APP ────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedExp, setSelectedExp] = useState<Experience>(experiences[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [discountNudge, setDiscountNudge] = useState(false);

  const fireDiscountNudge = () => {
    if (isLoggedIn || _discountNudgeFired) return;
    _discountNudgeFired = true;
    setDiscountNudge(true);
    setShowLogin(true);
  };
  const [navCity, setNavCity] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const isAdmin = page === "admin";
  const showFooter = !isAdmin && page !== "confirmation";

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {!isAdmin && (
        <Navbar page={page} setPage={setPage} isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} navCity={navCity} setNavCity={setNavCity} />
      )}

      <main>
        {page === "home" && <HomePage setPage={setPage} setSelectedExp={setSelectedExp} />}
        {page === "search" && <SearchPage setPage={setPage} setSelectedExp={setSelectedExp} navCity={navCity} isLoggedIn={isLoggedIn} onDiscountNudge={fireDiscountNudge} />}
        {page === "detail" && <DetailPage exp={selectedExp} setPage={setPage} isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} onDiscountNudge={fireDiscountNudge} />}
        {page === "review" && <BookingReviewPage exp={selectedExp} setPage={setPage} />}
        {page === "payment" && <PaymentPage setPage={setPage} />}
        {page === "confirmation" && <ConfirmationPage exp={selectedExp} setPage={setPage} />}
        {page === "profile" && <ProfilePage setPage={setPage} />}
        {page === "admin" && <AdminDashboard setPage={setPage} />}
      </main>

      {showFooter && <Footer setPage={setPage} />}

      {showLogin && (
        <LoginModal
          discountNudge={discountNudge}
          onClose={() => { setShowLogin(false); setDiscountNudge(false); }}
          onLogin={() => {
            setIsLoggedIn(true);
            setShowLogin(false);
            setDiscountNudge(false);
          }}
        />
      )}
    </div>
  );
}
