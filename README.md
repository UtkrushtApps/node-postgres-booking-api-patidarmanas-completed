# Task Overview
Utkrusht runs live technical interviews where candidates book 30-minute time slots with expert providers for specific assessments. The provided Node.js Express API already exposes endpoints for listing providers, viewing available time slots, and creating bookings, but all of these endpoints currently operate on mock in-memory data with no persistence or database integration. Your task is to design a PostgreSQL schema from scratch to accurately store providers, candidates, and bookings, then integrate that schema into the existing Express API so the platform can safely handle real bookings, prevent scheduling conflicts, and support future growth.

### Objectives
- Design a PostgreSQL schema from an initially empty `schema.sql` file that can store providers, candidates, and bookings in a way that reflects the API's business flows and data shapes.
- Define primary keys, foreign keys, and appropriate constraints so that invalid or conflicting bookings are prevented at the database level.
- Populate `data/sample_data.sql` with sample providers, candidates, and bookings so that the existing API endpoints return meaningful results once wired to the database.
- Integrate PostgreSQL into the existing Node.js Express application by adding a connection layer and replacing mock in-memory data in the controllers with real SQL queries.
- Ensure that the API endpoints for listing providers, viewing available slots, and creating bookings behave consistently while now persisting and reading data from PostgreSQL.
- Aim for a design and integration that can be extended as the platform grows, with clear naming, consistent data types, and straightforward query patterns.

### How to Verify
- Call the GET `/api/providers` endpoint and confirm that it returns providers stored in PostgreSQL rather than the original hardcoded mock array.
- Call the GET `/api/bookings` and GET `/api/bookings/:id` endpoints and verify that they reflect the records inserted through your `data/sample_data.sql` and any new bookings created via the POST endpoint.
- Use a PostgreSQL client to inspect the tables and confirm that providers, candidates, and bookings exist with the expected fields, relationships, and constraints.
- Create a booking through the POST `/api/bookings` endpoint and verify that the data is written to the database and persists across server restarts.
- Attempt to create a booking that would conflict with an existing one and verify that your schema and integration prevent this and surface a clear, consistent error response.

### Helpful Tips
- Consider how to represent providers, candidates, and bookings as separate tables that match the structures returned by the existing API responses.
- Consider which fields should uniquely identify a booking so that conflicting reservations can be identified and handled.
- Consider what relationships and constraints are necessary between providers, candidates, and bookings to keep the data consistent over time.
- Think about which endpoints currently return mock arrays or hardcoded objects and how those should map to SELECT, INSERT, and UPDATE statements in PostgreSQL.
- Think about how to coordinate the schema defined in `schema.sql` with the data you insert in `data/sample_data.sql` so the API returns meaningful, realistic records.
