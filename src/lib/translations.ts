/**
 * App strings, English and Gujarati.
 *
 * Covers the auth and profile-setup screens; the rest of the app still has its
 * text inline and reads English regardless of the selected language. Add keys
 * here as screens are converted.
 *
 * Values stored in the database stay English no matter what is displayed — the
 * gender and marital-status keys below are display labels only, never the value
 * written to `profiles`.
 *
 * The Gujarati is written to be read by community members rather than
 * transliterated word-for-word from the English. It has NOT been reviewed by a
 * native speaker; treat it as a first pass.
 */

const en = {
  // Shared
  "common.contactSupport": "Contact Support",
  "common.terms": "Terms",
  "common.privacyPolicy": "Privacy Policy",
  // Split rather than interpolated: these sentences wrap clickable links, and
  // Gujarati puts the verb at the end, so a single template cannot hold both.
  "common.byContinuingPrefix": "By continuing you agree to our",
  "common.and": "&",
  "common.byContinuingSuffix": "",
  "common.back": "Back",
  "common.cancel": "Cancel",
  "common.clear": "Clear",
  "common.close": "Close",
  "common.clearSearch": "Clear search",
  "common.save": "Save",
  "common.saved": "Saved",
  "common.share": "Share",
  "common.copiedToClipboard": "Copied to clipboard",
  "common.about": "About",
  "common.contact": "Contact",
  "common.phone": "Phone",
  "common.caughtUp": "You're all caught up",
  "common.memberCountOne": "{count} member",
  "common.memberCount": "{count} members",
  "common.loading": "Loading Sangath…",
  "common.emailAddress": "Email Address",
  "common.emailPlaceholder": "you@email.com",

  // Login
  "login.welcome": "Welcome to Sangath",
  "login.tagline": "Connect with your family & community digitally.",
  "login.emailHelp": "We'll email you a 6-digit code to sign in. No password needed.",
  "login.sendCode": "Send login code",
  "login.sendingCode": "Sending code...",
  "login.newHere": "New to Sangath?",
  "login.signUp": "Sign Up",

  // Sign up
  "signup.title": "Create your account",
  "signup.subtitle":
    "Enter your email and we'll send you a 6-digit code to verify it. No password needed.",
  "signup.emailHelp": "We'll only use this to sign you in and keep your account secure.",
  "signup.sendCode": "Send verification code",
  // Split around the two links it wraps, like the login consent line.
  "signup.consentPrefix": "By creating an account you agree to our",
  "signup.consentMiddle": "and confirm you have read our",
  "signup.consentSuffix": ", including who in the community can see your mobile number.",
  "signup.haveAccount": "Already have an account?",
  "signup.login": "Login",

  // OTP step
  "otp.title": "Enter the code",
  "otp.sentToPrefix": "We sent a 6-digit code to",
  "otp.sentToSuffix": ". It expires in a few minutes.",
  "otp.verify": "Verify & continue",
  "otp.verifying": "Verifying...",
  "otp.didntGet": "Didn't get it?",
  "otp.resendIn": "Resend in {seconds}s",
  "otp.resend": "Resend code",
  "otp.digitLabel": "Digit {n}",

  // Profile setup
  "profile.title": "Profile Setup",
  "profile.lastStep": "Last step",
  "profile.subtitle": "Tell us about yourself to connect with your community.",
  "profile.fullName": "Full Name",
  "profile.fullNamePlaceholder": "Ramesh Patel",
  "profile.gender": "Gender",
  "profile.gender.male": "Male",
  "profile.gender.female": "Female",
  "profile.gender.other": "Other",
  "profile.village": "Village / City",
  "profile.occupation": "Occupation",
  "profile.occupation.BusinessOwner": "Business Owner",
  "profile.occupation.Farmer": "Farmer",
  "profile.occupation.GovernmentService": "Government Service",
  "profile.occupation.PrivateService": "Private Service",
  "profile.occupation.Teacher": "Teacher",
  "profile.occupation.Doctor": "Doctor",
  "profile.occupation.Engineer": "Engineer",
  "profile.occupation.Lawyer": "Lawyer",
  "profile.occupation.Trader": "Trader",
  "profile.occupation.SelfEmployed": "Self-Employed",
  "profile.occupation.Homemaker": "Homemaker",
  "profile.occupation.Student": "Student",
  "profile.occupation.Retired": "Retired",
  "profile.occupationOther": "Other",
  "profile.occupationOtherLabel": "Please specify",
  "profile.occupationOtherPlaceholder": "Type your occupation",
  "profile.dob": "Date of Birth",
  "profile.maritalStatus": "Marital Status",
  "profile.marital.Single": "Single",
  "profile.marital.Married": "Married",
  "profile.marital.Divorced": "Divorced",
  "profile.marital.Widowed": "Widowed",
  "profile.marital.Separated": "Separated",
  "profile.familyAdminQuestion": "No family code above? Then you're the Family Admin.",
  "profile.familyAdminYes": "Yes, I am the Family Admin",
  "profile.familyAdminYesHelp": "Creates your family and a code you can share.",
  "profile.familyAdminRequiredHint":
    "Every member is mapped to a family — enter a code above to join one, or confirm you're the admin to start one.",
  "profile.familyAdminSkipped": "You're joining an existing family",
  "profile.familyCodeLabel": "Family Code (optional)",
  "profile.familyCodePlaceholder": "e.g. AB12CD",
  "profile.familyCodeHelp":
    "Have a code from your family admin? Enter it to join their family. Leave blank if you don't have one yet.",
  "profile.familyCodeInvalid": "No family uses this code. Check with your family admin.",
  "profile.familyCodeMatch": "You'll join {name}'s family once they approve.",
  "profile.familyRelationLabel": "Your relation to them",
  "profile.save": "Save & Continue",
  "profile.saving": "Saving...",
  "profile.signOut": "Sign out",

  // Photo picker
  "photo.add": "Add photo",
  "photo.change": "Change photo",
  "photo.addAria": "Add profile photo",
  "photo.changeAria": "Change profile photo",
  "photo.adjustTitle": "Adjust photo",
  "photo.adjustHint": "Drag to reposition, or use the slider to zoom.",
  "photo.use": "Use photo",
  "photo.saving": "Saving",
  "photo.zoom": "Zoom",
  "photo.notAnImage": "Please choose an image file.",
  "photo.cannotOpen": "That image could not be opened. Try another one.",
  "photo.cannotProcess": "Could not process the image on this device.",
  "photo.uploadFailed": "Upload failed. Please try again.",

  // Village picker
  "place.placeholder": "Search your village or city",
  "place.searchPlaceholder": "Type a village, city or state",
  "place.useCustom": "Use “{value}”",
  "place.notInList": "Not in the list",
  "place.noMatch": "No places matched. Keep typing to enter your own.",

  // Auth errors
  "error.invalidEmail": "Please enter a valid email address.",
  "error.noAccount": "No account found for this email. Please sign up first.",
  "error.badCode": "Incorrect or expired verification code. Please request a new one.",
  "error.tooMany": "Too many attempts. Please wait a moment before trying again.",
  "error.generic": "Something went wrong. Please try again.",

  // Bottom navigation
  "nav.home": "Home",
  "nav.facilities": "Facilities",
  "nav.fundraiser": "Fundraiser",
  "nav.profile": "Profile",

  // Home
  "home.morning": "Good Morning",
  "home.afternoon": "Good Afternoon",
  "home.evening": "Good Evening",
  // Stands in for the member's name before their profile has one.
  "home.friend": "there",
  "home.notifications": "Notifications",
  "home.profileAria": "Profile",
  "home.searchPlaceholder": "Search members by name, village or work...",
  "home.noMembers": "No members found",
  "home.noMembersHint": "Try a different name, village or occupation.",
  "home.upcomingEvents": "Upcoming Events",
  "home.noEvents": "No events yet",
  "home.noEventsHint":
    "Add gatherings or camps in the admin console. Only you can see this prompt — members see nothing until an event is added.",
  "home.going": "Going",
  "home.register": "Register",
  "home.sponsored": "Sponsored",
  "home.noSponsors": "No sponsors yet",
  "home.noSponsorsHint":
    "Add local businesses or partners in the admin console. Only you can see this prompt — members see nothing until a sponsor is added.",
  "home.prevSlide": "Previous",
  "home.nextSlide": "Next",
  "home.goToSlide": "Go to slide {n}",
  "home.latestNews": "Latest News",
  "home.noNews": "No announcements yet",
  "home.noNewsHint": "Community news will show up here.",
  "home.readMore": "Read More",
  "home.viewAll": "View All",

  // Roles
  "role.member": "Member",
  "role.committee": "Committee",
  "role.admin": "Admin",

  // My Profile (account)
  "account.title": "My Profile",
  "account.yourProfile": "Your profile",
  "account.personalInfo": "Personal Information",
  "account.lockedFieldHint":
    "Name, date of birth and gender can't be changed here. Contact an admin if any of these need correcting.",
  "account.mobile": "Mobile Number",
  "account.city": "City",
  "account.state": "State",
  "account.genderUnset":
    "Not set — your mobile number is hidden from other members until you set this.",
  "account.select": "Select",
  "account.familyInfo": "Family Information",
  "account.familyAdminBadge": "You're the Family Admin",
  "account.familyAdminCodeHelp": "Share this code with your family so they can join you.",
  "account.copyCode": "Copy code",
  "account.copied": "Copied!",
  "account.partOfFamily": "You're part of {name}'s family.",
  "account.pendingApproval": "Waiting for {name} to approve your request",
  "account.cancelRequest": "Cancel request",
  "account.familyMembers": "Family Members",
  "account.noneAdded": "None added yet",
  "account.verified": "Verified",
  "account.verifiedOf": "{done} of {total}",
  "account.manageFamily": "Manage Family Members",
  "account.communityManagement": "Community Management",
  "account.yourRole": "Your role",
  "account.openAdmin": "Open Admin Console",
  "account.updateProfile": "Update Profile",
  "account.unsavedChanges": "You have unsaved changes.",
  "account.profileUpdated": "Profile Updated",
  "account.legal": "Legal",
  "account.termsOfUse": "Terms of Use",
  "account.signOut": "Sign Out",
  "account.dangerZone": "Danger Zone",
  "account.deleteExplain":
    "Deleting your account removes your profile, your family members and your photo for good. Community news you published stays in the feed without your name.",
  "account.deleteAccount": "Delete Account",

  // Facility categories. The stored value stays English — these are labels only.
  "facilityCat.School": "School",
  "facilityCat.College": "College",
  "facilityCat.Hostel": "Hostel",
  "facilityCat.Hospital": "Hospital",
  "facilityCat.Bank": "Bank",
  "facilityCat.CommunityHall": "Community Hall",
  "facilityCat.Dharamshala": "Dharamshala",
  "facilityCat.Trust": "Trust",
  "facilityCat.CoachingCenter": "Coaching Center",
  "facilityCat.BusinessCenter": "Business Center",
  "facilityCat.AllCategories": "All Categories",

  // Facilities directory
  "facilities.countLine": "{shown} of {total} listings",
  "facilities.searchPlaceholder": "Search facilities, schools, hospitals, hostels...",
  "facilities.noneYet": "No facilities listed yet",
  "facilities.noneYetHint": "The community directory hasn't been set up yet.",
  "facilities.noMatch": "No facilities found",
  "facilities.noMatchHint": "Try a different search.",

  // Facility detail
  "facility.notFound": "Facility not found",
  "facility.backToDirectory": "Back to Directory",
  "facility.verified": "Verified",
  "facility.email": "Email",
  "facility.website": "Website",
  "facility.address": "Address",
  "facility.officeDetails": "Office Details",
  "facility.keyInfo": "Key Information",
  "facility.established": "Established",
  "facility.capacity": "Capacity",
  "facility.timings": "Timings",
  "facility.head": "Head",

  // Post categories. The stored value stays English — these are labels only.
  "postCat.Announcement": "Announcement",
  "postCat.Event": "Event",
  "postCat.Education": "Education",
  "postCat.Scholarship": "Scholarship",
  "postCat.Achievement": "Achievement",
  "postCat.Obituary": "Obituary",
  "postCat.EmergencyNotice": "Emergency Notice",
  "postCat.GeneralUpdate": "General Update",

  // Bylines in the news feed, which spell the role out more than the badge does.
  "newsRole.admin": "Administrator",
  "newsRole.committee": "Committee Member",
  "newsRole.member": "Member",

  // News & announcements
  "news.community": "Community",
  "news.title": "News & Announcements",
  "news.noPosts": "No announcements yet",
  "news.noPostsHint": "Community news will appear here once the committee posts.",
  "news.createPost": "Create Post",
  "news.postOptions": "Post options",
  "news.pinnedAnnouncement": "Pinned Announcement",
  "news.pin": "Pin",
  "news.unpin": "Unpin",
  "news.delete": "Delete",
  "news.formerMember": "Former member",
  "news.titleLabel": "Title",
  "news.titlePlaceholder": "Add a clear, descriptive title",
  "news.contentLabel": "Post Content",
  "news.contentPlaceholder": "Write your announcement, notice or update...",
  "news.categoryLabel": "Category",
  "news.featured": "Featured Announcement",
  "news.featuredHint": "Pin to top of the feed",
  "news.publish": "Publish",
  "news.publishing": "Publishing...",

  // Sponsor detail
  "sponsor.notFound": "Sponsor not found",
  "sponsor.backToHome": "Back to Home",
  "sponsor.owner": "Owner",
  "sponsor.visitWebsite": "Visit website",
  "sponsor.viewFacility": "View in directory",
  // Shown under the artwork so the commercial relationship stays clear on the
  // page itself, not only on the Home section heading.
  "sponsor.disclosure": "This is a paid sponsor of the community.",

  // Delete account
  "delete.warning":
    "This cannot be undone. Your login stops working immediately and you would have to sign up again from scratch.",
  "delete.permanentlyDeleted": "Permanently deleted",
  "delete.itemProfile": "Your profile and every detail in it",
  "delete.itemFamily": "Your family members and their details",
  "delete.itemPhoto": "Your profile photo",
  "delete.itemSaved": "Your saved posts and saved facilities",
  "delete.keptTitle": "Kept, without your name",
  "delete.keptNews": "Community news you published stays in the feed, with the byline removed",
  "delete.keptEvents": "Events you created stay on the calendar",
  // {word} is the literal confirmation word, which stays English because that
  // is what has to be typed into the box.
  "delete.confirmLabel": "Type {word} to confirm",
  "delete.deleting": "Deleting...",
  "delete.confirmButton": "Delete my account permanently",
  "delete.keep": "Keep my account",
  "delete.failed": "Could not delete your account. Please try again.",

  // Relative time
  "time.justNow": "Just now",
  "time.minAgoOne": "{count} min ago",
  "time.minAgo": "{count} mins ago",
  "time.hourAgoOne": "{count} hour ago",
  "time.hourAgo": "{count} hours ago",
  "time.yesterday": "Yesterday",
  "time.daysAgo": "{count} days ago",
} as const;

export type StringKey = keyof typeof en;

const gu: Partial<Record<StringKey, string>> = {
  // Shared
  "common.contactSupport": "સપોર્ટનો સંપર્ક કરો",
  "common.terms": "શરતો",
  "common.privacyPolicy": "ગોપનીયતા નીતિ",
  "common.byContinuingPrefix": "આગળ વધીને તમે અમારી",
  "common.and": "અને",
  "common.byContinuingSuffix": "સ્વીકારો છો",
  "common.back": "પાછળ",
  "common.cancel": "રદ કરો",
  "common.clear": "સાફ કરો",
  "common.close": "બંધ કરો",
  "common.clearSearch": "શોધ સાફ કરો",
  "common.save": "સાચવો",
  "common.saved": "સાચવ્યું",
  "common.share": "શેર કરો",
  "common.copiedToClipboard": "ક્લિપબોર્ડમાં કૉપી થયું",
  "common.about": "વિશે",
  "common.contact": "સંપર્ક",
  "common.phone": "ફોન",
  "common.caughtUp": "તમે બધું જોઈ લીધું",
  "common.memberCountOne": "{count} સભ્ય",
  "common.memberCount": "{count} સભ્યો",
  "common.loading": "સંગત લોડ થઈ રહ્યું છે…",
  "common.emailAddress": "ઈમેલ સરનામું",
  "common.emailPlaceholder": "you@email.com",

  // Login
  "login.welcome": "સંગતમાં આપનું સ્વાગત છે",
  "login.tagline": "તમારા પરિવાર અને સમાજ સાથે ડિજિટલ રીતે જોડાઓ.",
  "login.emailHelp": "સાઇન ઇન કરવા માટે અમે તમને 6 અંકનો કોડ ઈમેલ કરીશું. પાસવર્ડની જરૂર નથી.",
  "login.sendCode": "લોગિન કોડ મોકલો",
  "login.sendingCode": "કોડ મોકલી રહ્યા છીએ...",
  "login.newHere": "સંગતમાં નવા છો?",
  "login.signUp": "સાઇન અપ કરો",

  // Sign up
  "signup.title": "તમારું એકાઉન્ટ બનાવો",
  "signup.subtitle":
    "તમારું ઈમેલ દાખલ કરો, અમે તેની ચકાસણી માટે 6 અંકનો કોડ મોકલીશું. પાસવર્ડની જરૂર નથી.",
  "signup.emailHelp":
    "અમે આનો ઉપયોગ ફક્ત તમને સાઇન ઇન કરવા અને એકાઉન્ટ સુરક્ષિત રાખવા માટે કરીશું.",
  "signup.sendCode": "ચકાસણી કોડ મોકલો",
  "signup.consentPrefix": "એકાઉન્ટ બનાવીને તમે અમારી",
  "signup.consentMiddle": "સ્વીકારો છો અને પુષ્ટિ કરો છો કે તમે અમારી",
  // Leading space is deliberate: this follows a link, and unlike the English
  // suffix (which starts with a comma) Gujarati continues with a word.
  "signup.consentSuffix": " વાંચી છે, જેમાં સમાજમાં કોણ તમારો મોબાઇલ નંબર જોઈ શકે તે સામેલ છે.",
  "signup.haveAccount": "પહેલેથી એકાઉન્ટ છે?",
  "signup.login": "લોગિન કરો",

  // OTP step
  "otp.title": "કોડ દાખલ કરો",
  "otp.sentToPrefix": "અમે",
  "otp.sentToSuffix": " પર 6 અંકનો કોડ મોકલ્યો છે. તે થોડી મિનિટોમાં સમાપ્ત થશે.",
  "otp.verify": "ચકાસો અને આગળ વધો",
  "otp.verifying": "ચકાસી રહ્યા છીએ...",
  "otp.didntGet": "કોડ મળ્યો નથી?",
  "otp.resendIn": "{seconds} સેકન્ડમાં ફરી મોકલો",
  "otp.resend": "કોડ ફરી મોકલો",
  "otp.digitLabel": "અંક {n}",

  // Profile setup
  "profile.title": "પ્રોફાઇલ સેટઅપ",
  "profile.lastStep": "છેલ્લું પગલું",
  "profile.subtitle": "તમારા સમાજ સાથે જોડાવા માટે તમારા વિશે જણાવો.",
  "profile.fullName": "પૂરું નામ",
  "profile.fullNamePlaceholder": "રમેશ પટેલ",
  "profile.gender": "લિંગ",
  "profile.gender.male": "પુરુષ",
  "profile.gender.female": "સ્ત્રી",
  "profile.gender.other": "અન્ય",
  "profile.village": "ગામ / શહેર",
  "profile.occupation": "વ્યવસાય",
  "profile.occupation.BusinessOwner": "વ્યવસાય માલિક",
  "profile.occupation.Farmer": "ખેડૂત",
  "profile.occupation.GovernmentService": "સરકારી નોકરી",
  "profile.occupation.PrivateService": "ખાનગી નોકરી",
  "profile.occupation.Teacher": "શિક્ષક",
  "profile.occupation.Doctor": "ડૉક્ટર",
  "profile.occupation.Engineer": "ઇજનેર",
  "profile.occupation.Lawyer": "વકીલ",
  "profile.occupation.Trader": "વેપારી",
  "profile.occupation.SelfEmployed": "સ્વરોજગાર",
  "profile.occupation.Homemaker": "ગૃહિણી",
  "profile.occupation.Student": "વિદ્યાર્થી",
  "profile.occupation.Retired": "નિવૃત્ત",
  "profile.occupationOther": "અન્ય",
  "profile.occupationOtherLabel": "કૃપા કરીને જણાવો",
  "profile.occupationOtherPlaceholder": "તમારો વ્યવસાય લખો",
  "profile.dob": "જન્મ તારીખ",
  "profile.maritalStatus": "વૈવાહિક સ્થિતિ",
  "profile.marital.Single": "અપરિણીત",
  "profile.marital.Married": "પરિણીત",
  "profile.marital.Divorced": "છૂટાછેડા લીધેલ",
  "profile.marital.Widowed": "વિધવા / વિધુર",
  "profile.marital.Separated": "અલગ રહેતા",
  "profile.familyAdminQuestion": "ઉપર કોડ ન નાખ્યો? તો તમે કુટુંબ એડમિન છો.",
  "profile.familyAdminYes": "હા, હું કુટુંબ એડમિન છું",
  "profile.familyAdminYesHelp": "તમારું કુટુંબ અને શેર કરવા માટેનો કોડ બનાવે છે.",
  "profile.familyAdminRequiredHint":
    "દરેક સભ્યને કુટુંબ સાથે જોડવામાં આવે છે — જોડાવા માટે ઉપર કોડ નાખો, અથવા કુટુંબ શરૂ કરવા માટે એડમિન તરીકે પુષ્ટિ કરો.",
  "profile.familyAdminSkipped": "તમે હાલના કુટુંબમાં જોડાઈ રહ્યા છો",
  "profile.familyCodeLabel": "કુટુંબ કોડ (વૈકલ્પિક)",
  "profile.familyCodePlaceholder": "દા.ત. AB12CD",
  "profile.familyCodeHelp":
    "તમારા કુટુંબ એડમિન પાસેથી કોડ મળ્યો છે? તેમના કુટુંબમાં જોડાવા માટે દાખલ કરો. હજુ ન હોય તો ખાલી રાખો.",
  "profile.familyCodeInvalid": "આ કોડ સાથે કોઈ કુટુંબ મળ્યું નથી. તમારા કુટુંબ એડમિન સાથે તપાસો.",
  "profile.familyCodeMatch": "{name} ની મંજૂરી પછી તમે તેમના કુટુંબમાં જોડાશો.",
  "profile.familyRelationLabel": "તેમની સાથે તમારો સંબંધ",
  "profile.save": "સાચવો અને આગળ વધો",
  "profile.saving": "સાચવી રહ્યા છીએ...",
  "profile.signOut": "સાઇન આઉટ",

  // Photo picker
  "photo.add": "ફોટો ઉમેરો",
  "photo.change": "ફોટો બદલો",
  "photo.addAria": "પ્રોફાઇલ ફોટો ઉમેરો",
  "photo.changeAria": "પ્રોફાઇલ ફોટો બદલો",
  "photo.adjustTitle": "ફોટો ગોઠવો",
  "photo.adjustHint": "ખસેડવા માટે ખેંચો, અથવા ઝૂમ કરવા સ્લાઇડરનો ઉપયોગ કરો.",
  "photo.use": "આ ફોટો વાપરો",
  "photo.saving": "સાચવી રહ્યા છીએ",
  "photo.zoom": "ઝૂમ",
  "photo.notAnImage": "કૃપા કરીને ઈમેજ ફાઇલ પસંદ કરો.",
  "photo.cannotOpen": "આ ઈમેજ ખોલી શકાઈ નથી. બીજી પસંદ કરો.",
  "photo.cannotProcess": "આ ડિવાઇસ પર ઈમેજ પ્રોસેસ થઈ શકી નથી.",
  "photo.uploadFailed": "અપલોડ નિષ્ફળ ગયું. ફરી પ્રયાસ કરો.",

  // Village picker
  "place.placeholder": "તમારું ગામ કે શહેર શોધો",
  "place.searchPlaceholder": "ગામ, શહેર કે રાજ્ય લખો",
  "place.useCustom": "“{value}” વાપરો",
  "place.notInList": "યાદીમાં નથી",
  "place.noMatch": "કોઈ સ્થળ મળ્યું નથી. તમારું પોતાનું લખવા માટે લખતા રહો.",

  // Auth errors
  "error.invalidEmail": "કૃપા કરીને માન્ય ઈમેલ સરનામું દાખલ કરો.",
  "error.noAccount": "આ ઈમેલ માટે કોઈ એકાઉન્ટ મળ્યું નથી. પહેલા સાઇન અપ કરો.",
  "error.badCode": "ખોટો અથવા સમાપ્ત થયેલ ચકાસણી કોડ. નવો કોડ મંગાવો.",
  "error.tooMany": "ઘણા પ્રયાસો થયા. થોડી વાર પછી ફરી પ્રયાસ કરો.",
  "error.generic": "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો.",

  // Bottom navigation
  "nav.home": "હોમ",
  "nav.facilities": "સુવિધાઓ",
  "nav.fundraiser": "ફાળો",
  "nav.profile": "પ્રોફાઇલ",

  // Home
  "home.morning": "સુપ્રભાત",
  "home.afternoon": "શુભ બપોર",
  "home.evening": "શુભ સાંજ",
  "home.friend": "મિત્ર",
  "home.notifications": "સૂચનાઓ",
  "home.profileAria": "પ્રોફાઇલ",
  "home.searchPlaceholder": "નામ, ગામ કે વ્યવસાયથી સભ્યો શોધો...",
  "home.noMembers": "કોઈ સભ્ય મળ્યા નથી",
  "home.noMembersHint": "બીજું નામ, ગામ કે વ્યવસાય અજમાવો.",
  "home.upcomingEvents": "આગામી કાર્યક્રમો",
  "home.noEvents": "હજી કોઈ કાર્યક્રમ નથી",
  "home.noEventsHint":
    "એડમિન કન્સોલમાં મેળાવડા કે કેમ્પ ઉમેરો. આ સૂચના ફક્ત તમને દેખાય છે — કાર્યક્રમ ઉમેરાય ત્યાં સુધી સભ્યોને કંઈ દેખાતું નથી.",
  "home.going": "હાજર રહીશ",
  "home.register": "નોંધણી કરો",
  "home.sponsored": "પ્રાયોજિત",
  "home.noSponsors": "હજી કોઈ પ્રાયોજક નથી",
  "home.noSponsorsHint":
    "એડમિન કન્સોલમાં સ્થાનિક વ્યવસાયો કે ભાગીદારો ઉમેરો. આ સૂચના ફક્ત તમને દેખાય છે — પ્રાયોજક ઉમેરાય ત્યાં સુધી સભ્યોને કંઈ દેખાતું નથી.",
  "home.prevSlide": "પાછલું",
  "home.nextSlide": "આગલું",
  "home.goToSlide": "સ્લાઇડ {n} પર જાઓ",
  "home.latestNews": "તાજા સમાચાર",
  "home.noNews": "હજી કોઈ જાહેરાત નથી",
  "home.noNewsHint": "સમાજના સમાચાર અહીં દેખાશે.",
  "home.readMore": "વધુ વાંચો",
  "home.viewAll": "બધું જુઓ",

  // Roles
  "role.member": "સભ્ય",
  "role.committee": "સમિતિ",
  "role.admin": "એડમિન",

  // My Profile (account)
  "account.title": "મારી પ્રોફાઇલ",
  "account.yourProfile": "તમારી પ્રોફાઇલ",
  "account.personalInfo": "વ્યક્તિગત માહિતી",
  "account.lockedFieldHint":
    "નામ, જન્મ તારીખ અને લિંગ અહીંથી બદલી શકાતા નથી. જો કંઈ સુધારવું હોય તો એડમિનનો સંપર્ક કરો.",
  "account.mobile": "મોબાઇલ નંબર",
  "account.city": "શહેર",
  "account.state": "રાજ્ય",
  "account.genderUnset":
    "સેટ કરેલું નથી — જ્યાં સુધી તમે આ સેટ ન કરો ત્યાં સુધી તમારો મોબાઇલ નંબર બીજા સભ્યોથી છુપાયેલો રહેશે.",
  "account.select": "પસંદ કરો",
  "account.familyInfo": "કુટુંબની માહિતી",
  "account.familyAdminBadge": "તમે કુટુંબ એડમિન છો",
  "account.familyAdminCodeHelp": "તમારા કુટુંબને જોડાવા માટે આ કોડ શેર કરો.",
  "account.copyCode": "કોડ કૉપિ કરો",
  "account.copied": "કૉપિ થયું!",
  "account.partOfFamily": "તમે {name} ના કુટુંબનો ભાગ છો.",
  "account.pendingApproval": "{name} ની મંજૂરીની રાહ જોવાઈ રહી છે",
  "account.cancelRequest": "વિનંતી રદ કરો",
  "account.familyMembers": "કુટુંબના સભ્યો",
  "account.noneAdded": "હજી કોઈ ઉમેર્યું નથી",
  "account.verified": "ચકાસાયેલ",
  "account.verifiedOf": "{total} માંથી {done}",
  "account.manageFamily": "કુટુંબના સભ્યો સંભાળો",
  "account.communityManagement": "સમાજ સંચાલન",
  "account.yourRole": "તમારી ભૂમિકા",
  "account.openAdmin": "એડમિન કન્સોલ ખોલો",
  "account.updateProfile": "પ્રોફાઇલ અપડેટ કરો",
  "account.unsavedChanges": "તમારા ફેરફારો હજુ સાચવ્યા નથી.",
  "account.profileUpdated": "પ્રોફાઇલ અપડેટ થઈ",
  "account.legal": "કાનૂની",
  "account.termsOfUse": "વપરાશની શરતો",
  "account.signOut": "સાઇન આઉટ",
  "account.dangerZone": "જોખમી વિભાગ",
  "account.deleteExplain":
    "એકાઉન્ટ કાઢી નાખવાથી તમારી પ્રોફાઇલ, તમારા કુટુંબના સભ્યો અને તમારો ફોટો કાયમ માટે દૂર થઈ જશે. તમે પ્રકાશિત કરેલા સમાચાર તમારા નામ વગર ફીડમાં રહેશે.",
  "account.deleteAccount": "એકાઉન્ટ કાઢી નાખો",

  // Facility categories
  "facilityCat.School": "શાળા",
  "facilityCat.College": "કૉલેજ",
  "facilityCat.Hostel": "છાત્રાલય",
  "facilityCat.Hospital": "હોસ્પિટલ",
  "facilityCat.Bank": "બેંક",
  "facilityCat.CommunityHall": "સમાજવાડી",
  "facilityCat.Dharamshala": "ધર્મશાળા",
  "facilityCat.Trust": "ટ્રસ્ટ",
  "facilityCat.CoachingCenter": "કોચિંગ સેન્ટર",
  "facilityCat.BusinessCenter": "બિઝનેસ સેન્ટર",
  "facilityCat.AllCategories": "બધી શ્રેણીઓ",

  // Facilities directory
  "facilities.countLine": "{total} માંથી {shown} યાદી",
  "facilities.searchPlaceholder": "સુવિધા, શાળા, હોસ્પિટલ, છાત્રાલય શોધો...",
  "facilities.noneYet": "હજી કોઈ સુવિધા નોંધાઈ નથી",
  "facilities.noneYetHint": "સમાજની ડિરેક્ટરી હજી તૈયાર થઈ નથી.",
  "facilities.noMatch": "કોઈ સુવિધા મળી નથી",
  "facilities.noMatchHint": "બીજી શોધ અજમાવો.",

  // Facility detail
  "facility.notFound": "સુવિધા મળી નથી",
  "facility.backToDirectory": "ડિરેક્ટરી પર પાછા",
  "facility.verified": "ચકાસાયેલ",
  "facility.email": "ઈમેલ",
  "facility.website": "વેબસાઇટ",
  "facility.address": "સરનામું",
  "facility.officeDetails": "ઓફિસ વિગતો",
  "facility.keyInfo": "મુખ્ય માહિતી",
  "facility.established": "સ્થાપના",
  "facility.capacity": "ક્ષમતા",
  "facility.timings": "સમય",
  "facility.head": "વડા",

  // Post categories
  "postCat.Announcement": "જાહેરાત",
  "postCat.Event": "કાર્યક્રમ",
  "postCat.Education": "શિક્ષણ",
  "postCat.Scholarship": "શિષ્યવૃત્તિ",
  "postCat.Achievement": "સિદ્ધિ",
  "postCat.Obituary": "શ્રદ્ધાંજલિ",
  "postCat.EmergencyNotice": "તાત્કાલિક સૂચના",
  "postCat.GeneralUpdate": "સામાન્ય અપડેટ",

  // Bylines in the news feed
  "newsRole.admin": "વ્યવસ્થાપક",
  "newsRole.committee": "સમિતિ સભ્ય",
  "newsRole.member": "સભ્ય",

  // News & announcements
  "news.community": "સમાજ",
  "news.title": "સમાચાર અને જાહેરાતો",
  "news.noPosts": "હજી કોઈ જાહેરાત નથી",
  "news.noPostsHint": "સમિતિ પોસ્ટ કરશે ત્યારે સમાજના સમાચાર અહીં દેખાશે.",
  "news.createPost": "પોસ્ટ બનાવો",
  "news.postOptions": "પોસ્ટ વિકલ્પો",
  "news.pinnedAnnouncement": "પિન કરેલી જાહેરાત",
  "news.pin": "પિન કરો",
  "news.unpin": "પિન હટાવો",
  "news.delete": "કાઢી નાખો",
  "news.formerMember": "ભૂતપૂર્વ સભ્ય",
  "news.titleLabel": "શીર્ષક",
  "news.titlePlaceholder": "સ્પષ્ટ અને વર્ણનાત્મક શીર્ષક લખો",
  "news.contentLabel": "પોસ્ટની વિગત",
  "news.contentPlaceholder": "તમારી જાહેરાત, સૂચના કે અપડેટ લખો...",
  "news.categoryLabel": "શ્રેણી",
  "news.featured": "વિશેષ જાહેરાત",
  "news.featuredHint": "ફીડમાં ટોચ પર પિન કરો",
  "news.publish": "પ્રકાશિત કરો",
  "news.publishing": "પ્રકાશિત કરી રહ્યા છીએ...",

  // Sponsor detail
  "sponsor.notFound": "પ્રાયોજક મળ્યા નથી",
  "sponsor.backToHome": "હોમ પર પાછા",
  "sponsor.owner": "માલિક",
  "sponsor.visitWebsite": "વેબસાઇટ જુઓ",
  "sponsor.viewFacility": "ડિરેક્ટરીમાં જુઓ",
  "sponsor.disclosure": "આ સમાજના પ્રાયોજક છે.",

  // Delete account
  "delete.warning":
    "આ પાછું લાવી શકાતું નથી. તમારું લોગિન તરત જ બંધ થઈ જશે અને તમારે ફરીથી નવેસરથી સાઇન અપ કરવું પડશે.",
  "delete.permanentlyDeleted": "કાયમ માટે કાઢી નાખવામાં આવશે",
  "delete.itemProfile": "તમારી પ્રોફાઇલ અને તેની દરેક વિગત",
  "delete.itemFamily": "તમારા કુટુંબના સભ્યો અને તેમની વિગતો",
  "delete.itemPhoto": "તમારો પ્રોફાઇલ ફોટો",
  "delete.itemSaved": "તમે સાચવેલી પોસ્ટ અને સુવિધાઓ",
  "delete.keptTitle": "તમારા નામ વગર રહેશે",
  "delete.keptNews": "તમે પ્રકાશિત કરેલા સમાચાર ફીડમાં રહેશે, નામ દૂર કરીને",
  "delete.keptEvents": "તમે બનાવેલા કાર્યક્રમો કેલેન્ડરમાં રહેશે",
  "delete.confirmLabel": "પુષ્ટિ કરવા {word} લખો",
  "delete.deleting": "કાઢી રહ્યા છીએ...",
  "delete.confirmButton": "મારું એકાઉન્ટ કાયમ માટે કાઢી નાખો",
  "delete.keep": "મારું એકાઉન્ટ રાખો",
  "delete.failed": "તમારું એકાઉન્ટ કાઢી શકાયું નથી. ફરી પ્રયાસ કરો.",

  // Relative time
  "time.justNow": "હમણાં જ",
  "time.minAgoOne": "{count} મિનિટ પહેલાં",
  "time.minAgo": "{count} મિનિટ પહેલાં",
  "time.hourAgoOne": "{count} કલાક પહેલાં",
  "time.hourAgo": "{count} કલાક પહેલાં",
  "time.yesterday": "ગઈકાલે",
  "time.daysAgo": "{count} દિવસ પહેલાં",
};

export const STRINGS = { en, gu } as const;
