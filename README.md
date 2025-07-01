Twitter Clone - This is a [Next.js](https://nextjs.org) project.

## About the project

This project was created to learn Next.js (including Server‑Side Rendering and Client‑Side Rendering), dynamic routing, API integration, authentication workflows, MongoDB database integration using Mongoose schemas, as well as Tailwind CSS. It was completed as an assignment during a Full‑Stack bootcamp at Redi School of Digital Integration in June 2025.

Milestones of the Fullstack Project:

## Milestone 1 - Next.js Basics

Learning Objectives

Understand Next.js Basics:

The difference between a React SPA and a Next.js application.
The App Router in Next.js and how it differs from React Router.
Server-side rendering (SSR) vs. static site generation (SSG).
Set Up a Next.js Project:

Installing Next.js and creating a structured project.
Understanding the file-based routing system.
Fetching Data in Next.js:

Learn how SSR and SSG impact fetching external data.
Use fetch() and API routes to retrieve tweets from an external API.
Build a Simple Twitter Clone (Part 1):

Design a basic Tweet feed component.
Fetch dummy tweets from an API and display them dynamically.

Setting Up Next.js Project:
npx create-next-app@latest twitter-clone-new
cd twitter-clone-new
npm install
npm run dev

App runs at http://localhost:3000
Uses App Router instead of Page Router

## Milestone 2 - Tailwind CSS & UI Design

Learning Objectives:

Understanding the utility-first approach.
Setting up Tailwind in a Next.js project.
Building a Consistent UI

Creating reusable components using Tailwind.
Using spacing, typography, and color utilities.
Responsive Design

Implementing a mobile-first design.
Utilizing breakpoints for different screen sizes.
Enhancing the Twitter Clone

Improving the tweet cards, navigation bar, and user profiles.
Adding hover effects, animations, and dark mode.

## Milestone 3 - API, Routing, Backend

Learning Objectives:

Getting to know backend development.
Learning how to create backend endpoints using Next.js API routes.
At this point: Not using a database, we are storing data in files.

## Milestone 4 - Introduction to Databases

Learning Objectives:

Getting to know about Relational and Non-Relational databases
Using databases in twitter-clone-new
Posting tweets
Defining schemas in ORM (Object-Relational Mapper) - mongoose
Connecting to MongoDB and Posting tweets

## Milestone 5 - API, Routing & Security

Learning Objectives:

Building dynamic API routes to interact with a database
Applying Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) for optimal performance
Managing global state using Context API - Creating a Global Auth Context
-- Avoids prop drilling
-- Centralized authentication state management
-- Allows global access to user data

Creating User Registration & Login
-- Creating a sign-up and login form
-- Storing user credentials securely in MongoDB
-- Hashing passwords using bcrypt

JWT Authentication
-- Generating JWT tokens upon login
-- Storing tokens in cookies for persistence
-- Using tokens to authenticate API requests

Connecting to MongoDB for Users and Likes
