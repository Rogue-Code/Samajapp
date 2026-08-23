# Family Connect Hub

MASTER UI/UX GENERATION PROMPT

You are a senior product designer and mobile UX architect with experience designing modern applications for Indian communities, social ecosystems, and family-based digital platforms.

Create a high-fidelity mobile-first interactive UI/UX prototype for a Community & Family Management Application.

The design must feel:

Modern

Minimal

Professional

Trustworthy

Easy for all age groups

Optimized for Indian users

Friendly and community-driven

The prototype should feel like a polished startup product inspired by:

WhatsApp Business

LinkedIn Community

Facebook Groups

Modern fintech onboarding apps

GLOBAL DESIGN SYSTEM

Visual Style

Use:

Soft white/light backgrounds

Rounded cards (16px–24px radius)

Smooth shadows

Spacious layouts

Large touch-friendly buttons

Clean typography

Minimal but engaging visual hierarchy

Soft dividers and elegant spacing

Subtle animations and transitions

Avoid:

Clutter

Overly bright gradients

Heavy shadows

Complex layouts

Too many colors

COLOR SYSTEM

Primary Color:

Deep Blue (#1D4ED8)
OR

Saffron Orange (#EA580C)

Secondary:

White (#FFFFFF)

Light Gray (#F3F4F6)

Success:

Green (#16A34A)

Error:

Red (#DC2626)

Text:

Dark Gray (#111827)

Medium Gray (#6B7280)

TYPOGRAPHY

Use clean modern typography:

Large headings

Comfortable readable body text

Clear hierarchy

Mobile accessibility friendly

Suggested:

Inter

SF Pro

Poppins

Nunito

INTERACTION DESIGN

Add:

Smooth transitions between screens

Loading states

OTP success animation

Button hover/tap states

Micro-interactions

Swipe interactions where useful

Progress indicators during onboarding

Skeleton loading states

RESPONSIVENESS

Design mobile-first for:

Android devices

Indian mid-range smartphones

Responsive layouts

Use:

Bottom navigation

Sticky CTA buttons

Scrollable onboarding forms

Safe spacing for thumb reach

APPLICATION FLOW

Design the following 5 connected screens with proper user journey navigation:

Login Page

OTP Verification Page

Identification/Profile Setup Page

Family Verification Page

Home Dashboard Page

All screens must feel connected as part of one coherent ecosystem.

SCREEN 1 — LOGIN PAGE

Purpose

User enters mobile number to receive OTP.

Layout Requirements

Top Area

Community/family app logo

Friendly illustration or icon

Welcome heading

Subtitle text

Example:
“Connect with your family & community digitally.”

Input Section

Include:

Country selector (+91)

Mobile number input field

Validation state

Focus state

Error state

CTA

Primary Button:
“Send OTP”

Behavior:

Disabled until valid number entered

Animated loading state

Secondary Actions

Small links:

Help

Contact Support

Language Selector

UX Requirements

Minimal onboarding friction

Trust-building layout

Clean whitespace

Smooth navigation to OTP page

SCREEN 2 — OTP VERIFICATION PAGE

Purpose

Verify user identity securely.

Components

Header

Back button

Title: “Verify OTP”

Subtitle showing masked phone number

Example:
“We sent a 6-digit OTP to +91 XXXXXXX210”

OTP Input

6 separate input boxes

Auto-focus progression

Auto-submit on completion

Error shake animation if incorrect

Actions

Primary Button:
“Verify & Continue”

Secondary:

Resend OTP

Countdown timer

Change mobile number

UX Expectations

Smooth success transition

Success checkmark animation

Accessible keyboard interactions

SCREEN 3 — IDENTIFICATION / PROFILE SETUP

Purpose

Collect user identity and community details.

Layout

Top Progress Section

Include:

Progress indicator

Step title

Completion percentage

Example:
“Step 2 of 4 — Profile Setup”

Profile Card

Circular profile photo upload

Camera/edit icon overlay

Image preview

Form Fields

Include modern styled inputs/dropdowns:

Full Name

Village

Occupation

Marital Status

Date of Birth

Use:

Floating labels

Modern dropdowns

Icons inside fields

Validation states

Family Admin Section

Question:
“Are you Family Admin?”

Options:

Yes

No

Use:

Segmented toggle
OR

Modern radio cards

CTA

Sticky bottom button:
“Save & Continue”

UX Expectations

Scrollable mobile form

Elegant spacing

Smooth keyboard behavior

Lightweight interactions

SCREEN 4 — FAMILY VERIFICATION PAGE

Purpose

Verify connected family members.

Header

Title:
“Family Members”

Subtitle:
“Verify and manage your family connections.”

Family Member Cards

Each card should include:

Profile image

Full name

Relationship

Age or DOB

Verification badge

Status indicator

Examples:

Verified

Pending

Needs Approval

Interaction Features

Include:

Swipe card interactions

Expand/collapse details

Add family member button

Floating action button (FAB)

CTA

Primary Button:
“Complete Verification”

UX Requirements

Strong hierarchy

Family-tree/community feel

Green verification indicators

Easy readability for elderly users

SCREEN 5 — HOME DASHBOARD

Purpose

Main community engagement experience.

HEADER SECTION

Include:

Search bar

Notification icon

User avatar/profile

Optional:

Greeting message

Example:
“Good Morning, Ramesh 👋”

HERO CAROUSEL

Carousel cards for:

Community announcements

Events

Advertisements

News

Temple/community notices

Use:

Auto-scroll

Pagination dots

Smooth swipe interaction

MAIN CONTENT MODULES

Create modern card sections for:

Latest News

News cards

Thumbnail images

Quick preview text

Community Posts

User posts

Reactions/comments

Events

Event date cards

RSVP button

Announcements

Highlight cards

Priority tags

Jobs Section

Job opportunities

Apply CTA

BOTTOM NAVIGATION

Tabs:

Home

Committee

Jobs

Events

Profile

Use:

Floating active indicator

Modern rounded nav bar

Icon + label combination

OPTIONAL ADVANCED FEATURES

Include if possible:

Dark mode preview

English + Gujarati language switch

Accessibility font scaling

Notification center

Skeleton loaders

Empty states

Success/error toast messages

Pull-to-refresh interactions

DESIGN QUALITY REQUIREMENTS

The final prototype must:

Look like a real production-ready startup app

Feel modern and polished

Use consistent spacing

Use reusable components

Have intuitive navigation

Include realistic placeholder data

Include interactive states

Maintain accessibility best practices

PROTOTYPE REQUIREMENTS

Generate:

Fully connected clickable prototype

Mobile-first layouts

High-fidelity UI

Realistic onboarding flow

Smooth transitions between all 5 screens

Reusable design system

Consistent component hierarchy

IMPORTANT IMPLEMENTATION RULES

If generating React/JSX:

Use a single self-contained component

Include all imports

Use inline styles or Tailwind

Use reusable components

Define all states before use

Include placeholder data

No undefined variables

No external APIs

Mobile-first responsive structure

Use Lucide icons where needed

Include all navigation interactions

FINAL OUTPUT EXPECTATION

The final result should resemble:

A polished Figma prototype

Modern startup onboarding experience

Production-grade community app

Elegant Indian family ecosystem platform

The UI should emotionally communicate:

Trust

Community

Simplicity

Family connection

Digital modernization

This version is substantially stronger for generating high-quality outputs because it embeds:

Full UX direction

Modern design system rules

Interaction logic

Accessibility expectations

Mobile behavioral guidance

Validation states

Startup-grade visual hierarchy

Production implementation constraints

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://chaudhary-samaj.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fadfd572-0286-4ba2-9687-88e3e9f13a58).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
