export type PricingOption = {
  id: string;
  name: string;
  price: number;
};

export type PricingCategory = {
  id: string;
  name: string;
  options: PricingOption[];
};

/**
 * Feature line items, priced individually. The public estimator that used
 * these was removed with the old pricing section; the /dashboard/pricing
 * editor still reads and writes them — keep this the single copy of this data.
 */
export const featureCategories: PricingCategory[] = [
  {
    id: "auth",
    name: "Auth",
    options: [
      { id: "email_password", name: "Email & Password Signup", price: 350 },
      { id: "phone_otp", name: "Phone Number OTP Login", price: 350 },
      { id: "google_login", name: "Google Sign-In", price: 250 },
      { id: "apple_login", name: "Apple Sign-In", price: 300 },
      { id: "facebook_login", name: "Facebook Login", price: 400 },
      { id: "mfa_auth", name: "Multi-Factor Authentication", price: 150 },
      { id: "forgot_pwd", name: "Forgot Password Flow", price: 130 },
      { id: "user_profile", name: "User Profile Management", price: 250 },
      { id: "rbac", name: "Role-Based Access Control", price: 150 },
      { id: "account_deletion", name: "Account Deactivation & Deletion", price: 150 },
    ],
  },
  {
    id: "core",
    name: "Core",
    options: [
      { id: "onboarding", name: "Onboarding Screens", price: 550 },
      { id: "home_dash", name: "Home Dashboard", price: 1600 },
      { id: "search_func", name: "Search Functionality", price: 650 },
      { id: "advanced_filters", name: "Advanced Filters & Sorting", price: 650 },
      { id: "favorites", name: "Favorites / Wishlist", price: 400 },
      { id: "offline_basic", name: "Offline Mode (Basic)", price: 1250 },
      { id: "offline_sync", name: "Offline Mode (Advanced Sync)", price: 2700 },
      { id: "multi_lang", name: "Multi-language Support", price: 1200 },
      { id: "dark_mode", name: "Dark Mode", price: 2500 },
      { id: "accessibility", name: "Accessibility Support", price: 950 },
    ],
  },
  {
    id: "chat",
    name: "Chat",
    options: [
      { id: "one_to_one", name: "One-to-One Chat", price: 2500 },
      { id: "group_chat", name: "Group Chat", price: 2700 },
      { id: "media_sharing", name: "Media Sharing (Images/Videos)", price: 2500 },
      { id: "voice_notes", name: "Voice Notes", price: 1450 },
      { id: "reactions", name: "Message Reactions", price: 1400 },
      { id: "read_receipts", name: "Read Receipts", price: 1200 },
      { id: "typing_indicators", name: "Typing Indicators", price: 1000 },
      { id: "chat_moderation", name: "Chat Moderation Tools", price: 2400 },
      { id: "e2e_encryption", name: "End-to-End Encryption", price: 2200 },
    ],
  },
  {
    id: "notifications",
    name: "Notifications",
    options: [
      { id: "push_notif", name: "Push Notifications", price: 350 },
      { id: "in_app_notif", name: "In-App Notifications", price: 350 },
      { id: "email_notif", name: "Email Notifications", price: 350 },
      { id: "notif_prefs", name: "Notification Preferences", price: 350 },
      { id: "tx_alerts", name: "Transactional Alerts", price: 350 },
      { id: "marketing_notif", name: "Marketing Campaign Notifications", price: 350 },
    ],
  },
  {
    id: "payments",
    name: "Payments",
    options: [
      { id: "stripe_integration", name: "Stripe Integration", price: 1650 },
      { id: "in_app_purchases", name: "In-App Purchases", price: 1500 },
      { id: "subscriptions", name: "Subscriptions & Plans", price: 1400 },
      { id: "wallet_system", name: "Wallet & Balance System", price: 2000 },
      { id: "promo_codes", name: "Promo Codes & Discounts", price: 800 },
      { id: "refund_mgmt", name: "Refund Management", price: 550 },
      { id: "tax_vat", name: "Tax & VAT Handling", price: 550 },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    options: [
      { id: "product_listings", name: "Product Listings", price: 1700 },
      { id: "pdp", name: "Product Detail Page", price: 1350 },
      { id: "cart_checkout", name: "Cart & Checkout", price: 2300 },
      { id: "order_mgmt", name: "Order Management", price: 1700 },
      { id: "order_tracking", name: "Order Tracking", price: 1700 },
      { id: "vendor_profiles", name: "Vendor Profiles", price: 1500 },
      { id: "vendor_payouts", name: "Vendor Payouts", price: 2600 },
      { id: "reviews_ratings", name: "Reviews & Ratings", price: 1350 },
      { id: "disputes", name: "Dispute Resolution System", price: 2300 },
    ],
  },
  {
    id: "location",
    name: "Location",
    options: [
      { id: "google_maps", name: "Google Maps Integration", price: 1350 },
      { id: "live_tracking", name: "Live Location Tracking", price: 2300 },
      { id: "nearby_places", name: "Nearby Places Search", price: 1500 },
      { id: "geofencing", name: "Geo-fencing", price: 2000 },
      { id: "route_opt", name: "Route Optimization", price: 2600 },
    ],
  },
  {
    id: "admin",
    name: "Admin",
    options: [
      { id: "admin_web", name: "Admin Dashboard (Web)", price: 4500 },
      { id: "user_mgmt_panel", name: "User Management Panel", price: 1700 },
      { id: "cms_panel", name: "Content Management System", price: 2300 },
      { id: "analytics_dash_admin", name: "Analytics Dashboard", price: 2000 },
      { id: "manual_overrides", name: "Manual Overrides & Controls", price: 1500 },
      { id: "audit_logs_admin", name: "Audit Logs & Activity Tracking", price: 1700 },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    options: [
      { id: "user_behavior", name: "User Behavior Tracking", price: 1350 },
      { id: "event_analytics", name: "Event-Based Analytics", price: 1500 },
      { id: "revenue_analytics", name: "Revenue Analytics", price: 1700 },
      { id: "custom_export", name: "Custom Reports Export", price: 1150 },
    ],
  },
  {
    id: "ai",
    name: "AI",
    options: [
      { id: "llm_integration", name: "LLM Chatbot Integration", price: 2500 },
      { id: "rag_pipeline", name: "Custom RAG System", price: 4000 },
      { id: "content_gen", name: "Content Generation (Text/Image)", price: 3000 },
      { id: "predictive_ai", name: "Predictive Analytics", price: 3500 },
      { id: "voice_ai", name: "Voice/Speech Recognition", price: 2000 },
      { id: "vision_ai", name: "Image/Video Analysis", price: 3000 },
      { id: "agentic", name: "Agentic Workflows", price: 4500 },
    ],
  },
  {
    id: "media",
    name: "Media",
    options: [
      { id: "image_upload_proc", name: "Image Upload & Processing", price: 800 },
      { id: "video_streaming_proc", name: "Video Streaming", price: 2500 },
      { id: "audio_processing_sys", name: "Audio Processing", price: 1500 },
      { id: "cloud_storage", name: "Cloud File Storage", price: 600 },
    ],
  },
  {
    id: "security",
    name: "Security",
    options: [
      { id: "mfa_sys", name: "Multi-factor Auth", price: 1200 },
      { id: "sso_sys", name: "SSO (Google, Apple, etc.)", price: 900 },
      { id: "data_enc_sys", name: "End-to-end Encryption", price: 3000 },
      { id: "compliance_sys", name: "HIPAA / GDPR Compliance Prep", price: 4000 },
      { id: "audit_logs_sys", name: "Audit Logs", price: 1500 },
    ],
  },
  {
    id: "system",
    name: "System",
    options: [
      { id: "backend_api", name: "Backend API Development", price: 3600 },
      { id: "db_design", name: "Database Design & Optimization", price: 2200 },
      { id: "cloud_setup", name: "Cloud Setup (AWS/Firebase)", price: 1800 },
      { id: "cicd", name: "CI/CD Pipeline Setup", price: 1450 },
      { id: "crash_rep", name: "Crash Reporting & Monitoring", price: 1150 },
      { id: "app_store", name: "App Store Deployment", price: 1000 },
      { id: "play_store", name: "Play Store Deployment", price: 900 },
      { id: "load_testing", name: "Scalability & Load Testing", price: 2600 },
    ],
  },
];
