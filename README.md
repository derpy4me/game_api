# Overview

This project was built to tie Typescript, Prisma and GraphQL into a usable API for queries and mutating videos games stored in a database.

## Description

This GraphQL server contains four tables for storing video games, their publishers and which platforms they are hosted on.

## How to Use

Ensure yarn has been installed on your computer. If yarn is not installed, click here [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)  
In the project directory run `yarn` to install dependencies  
Scripts have been created for running the project. Run `yarn start` to initiate the server on **localhost:4000**  
Navigating to the URL you will be introduced to Apollo's sandbox environment where Queries and Mutations will be available.

## Purpose

In two weeks I was able to understand how to build ORMs and use Prisma to build a Sqlite database. GraphQL queries and mutations are built using the Apollo Sandbox Server
for interaction with the Sqlite database allowing for CRUD operations. Typescript ensured that many bugs were caught in the beginning saving time hunting down undefined or null values.

## Demonstration

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running (starting the server and navigating through the web pages) and a walk-through of the code.}  
[Software Demo Video](http://youtube.link.goes.here)

# Web Pages

I used Apollo Sandbox Server for the interactive webpages allowing for more backend functionality and learning.

# Development Environment

- Yarn was used as the npm package manager
- This project was written in typescript
- Prisma was used as the database ORM (Object-Relational Mapping) library
- Apollo Server was used for GraphQL queries and mutations

# Useful Websites

- [How to GraphQL](https://www.howtographql.com/graphql-js/0-introduction/)
- [Prisma Docs](https://www.prisma.io/docs/getting-started/quickstart)
- [Prisma With Sqlite](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- [Digital Ocean How to Build GraphQL API](https://www.digitalocean.com/community/tutorials/how-to-build-a-graphql-api-with-prisma-and-deploy-to-digitalocean-s-app-platform)

# Future Work

- Separation of Resolvers by file
- Grouping of Queries and Mutations by type
- Addition of more video games, publishers and platforms
- Migrate from Sqlite database to PostgreSQL
