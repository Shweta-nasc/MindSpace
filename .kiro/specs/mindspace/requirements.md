# Requirements Document

## Introduction

MindSpace is a private-by-default Personal Memory OS — a "second brain" that stores, organizes, searches, and visualizes a person's life data (trips, books, music, journal/diary, movies, coding, photos/videos/files, quotes, projects, achievements, events). It is a cinematic, emotional, living personal universe rather than a portfolio. Core outcomes: keep all life data in one place; instant search across everything; ask natural-language questions over personal data with cited answers; an "Everything Timeline" of life events; private and secure by default; and a foundation that is SaaS-ready for the future.

This document captures requirements for a fresh rebuild on Next.js 15 (App Router) + React + TypeScript (strict) + Tailwind + shadcn/ui. The existing Vite + React + JavaScript prototype is treated as reference material to be archived (not deleted) and ported from.

### Reference vs. Authoritative Decisions

The repository `README.md` is reference material only and is explicitly overridden where it conflicts with locked product decisions:

- **Storage**: README suggested Supabase Storage. The authoritative decision is **Google Drive (the user's own account)**. Drive wins.
- **Search**: README suggested Postgres full-text-search first. The authoritative decision is **Meilisearch for keyword search alongside pgvector for semantic search**. Meilisearch + pgvector win.
- **Legacy code**: README instructs to delete/replace the current implementation. This is **not** followed. The legacy Vite app is **archived, not deleted**, and used as a porting source.
- **Auth/privacy**: README describes a shared client-side password gate. This is replaced by real authentication (Supabase Auth) and server-enforced authorization.

### Phasing (priority tags)

Each requirement is tagged with a phase priority used for sequencing, not scope cutting:

- **P0** Foundation (archive legacy, scaffold, schema plan)
- **P1** Auth + app shell + landing
- **P2** Storage / Drive + uploads
- **P3** Memory model + CMS + Timeline MVP
- **P4** AI search MVP (embeddings + retrieval + assistant)
- **P5** Trips + Maps
- **P6** Domain depth (Journals/Books/Music/Movies/Coding/Gallery/Quotes)
- **P7** Story Mode + Personal Cloud + advanced atmosphere/theming
- **P8** Security hardening (MFA, audit, backups, journal encryption)
- **P9** Polish/scale/observability/optional SaaS

## Glossary

- **MindSpace**: The overall application/platform comprising all client and server components.
- **Owner**: An authenticated user who owns a set of personal memory data. Identified by `auth.uid()`.
- **Landing_Page**: The public, bright, full-bleed photographic entry page ("front door").
- **Background_Slideshow**: The component that cross-dissolves through a curated image set on the Landing_Page.
- **Auth_Service**: The Supabase-Auth-backed component handling sign-in, sign-out, and session issuance.
- **Session_Manager**: The component that validates and refreshes Owner sessions on the client and server.
- **Authorization_Layer**: The server-side and database-level enforcement (Row-Level Security plus server checks) restricting all data access to the requesting Owner.
- **Timeline**: The "Everything Timeline" — a unified, virtualized chronological feed of all memories.
- **Memory**: A canonical record of a life item (e.g., a trip, book, song, journal entry) owned by an Owner.
- **Memory_Item**: A child artifact attached to a Memory (e.g., a photo, note, attachment, highlight).
- **Timeline_Event**: A dated event derived from a Memory that places it on the Timeline.
- **Embedding**: A 1536-dimension vector representation of memory text used for semantic search.
- **Memory_Store**: The Postgres-backed data layer holding Memories, Memory_Items, Timeline_Events, and Embeddings.
- **CMS**: The in-app, Notion-style content editor allowing Owners to create and edit content without editing code.
- **Ingestion_Pipeline**: The asynchronous server pipeline that validates uploads, stores files in Drive, records metadata, generates thumbnails/previews, runs OCR, chunks text, and creates Embeddings.
- **Drive_Connector**: The server component integrating with the Owner's Google Drive via OAuth offline refresh token (scope `drive.file`).
- **URL_Signer**: The server component that issues short-lived signed URLs for private file access.
- **Search_Service**: The Meilisearch-backed instant keyword search component, synced from Postgres on write.
- **Semantic_Search**: The pgvector-backed retrieval component that finds memories by Embedding similarity.
- **AI_Assistant**: The natural-language assistant (gpt-4o-mini) that answers questions strictly scoped to the Owner's data and returns citations.
- **Gallery**: The photo/video browsing experience.
- **Travel_Module**: The trips experience including places, routes, covers, expenses, and packing lists.
- **Map_View**: The Mapbox GL map rendering trips, places, and routes.
- **Journal_Module**: The diary experience with calendar timeline, mood, auto-captured weather/location, and optional encryption.
- **Music_Player**: The Howler.js-based audio player and persistent mini-player.
- **Music_Module**: The music room including playlists, lyrics, and guitar notebook.
- **Book_Library**: The books experience with shelf UI, highlights, progress, ratings, and wishlist.
- **Movies_Module**: The movies experience with poster wall, watchlist, reviews, and quotes.
- **Coding_Module**: The coding room with projects, GitHub/LeetCode integration, snippets, and terminal UI.
- **Quotes_Board**: The quotes and inspiration board.
- **Comfort_Room**: The feel-good/comfort experience.
- **Productivity_Hub**: The hub with clock, weather, Pomodoro, to-dos, goals, habits, pinned notes, and recent activity.
- **Story_Mode**: The Instagram-style replayable memory reels experience.
- **Personal_Cloud**: The unified, searchable file/content browser across all Drive-stored files and content.
- **Theme_Engine**: The component applying per-section themes (accent, mesh, particles) defined in `src/theme/themes.js`.
- **Atmosphere_Engine**: The component rendering dynamic weather/time-of-day visual effects, reduced-motion aware and performance-budgeted.
- **Weather_Service**: The integration with Open-Meteo (or OpenWeather) providing current weather and an `is_day` flag.
- **Settings_Module**: The component managing account, security, theming, and integration settings.
- **Version_History**: The component storing soft-deletes and prior versions of notes and journals.
- **Backup_Service**: The component performing daily backups and supporting documented restore.
- **Reminder_Service**: The component scheduling and delivering reminders/notifications.
- **Audit_Logger**: The component recording sensitive actions for later review.
- **prefers-reduced-motion**: The OS/browser accessibility setting requesting minimized motion.
- **Signed_URL**: A short-lived, server-generated URL granting temporary access to a private Drive file.
- **Sign_In_Surface**: The authentication surface, reachable from the Landing_Page, that presents both Google OAuth and email magic-link sign-in options.
- **Onboarding_Flow**: The first-run guided flow that, after initial authentication, helps the Owner connect Google Drive and bootstrap the `MindSpace/` folder tree.
- **Search_Reconciler**: The component that reindexes the Search_Service from the Memory_Store on demand and on a schedule, detecting and repairing drift between the Memory_Store (Postgres) and the Search_Service (Meilisearch).
- **Share_Service**: The server component that creates, serves, and revokes read-only, time-bounded shares of a Memory or collection.
- **Share_Link**: A server-generated, revocable, time-bounded URL granting read-only access to a specific shared Memory or collection.
- **Account_Service**: The component that performs Owner-initiated data export and account deletion, including cascading removal of Owner-owned records and MindSpace file metadata, and disconnection of the Drive refresh token.
- **PWA_Shell**: The installable Progressive Web App shell — including a web app manifest and service worker — that provides an offline application shell.
- **Notification_Channel**: An Owner-selectable delivery channel for notifications and reminders; supported channels are web push and email.
- **Email_Service**: The Resend-backed component delivering transactional and notification emails.

## Requirements

### Requirement 1: Platform Foundation and Legacy Archival

**User Story:** As the project owner, I want a fresh, strictly-typed Next.js foundation with the legacy prototype preserved, so that I can rebuild cleanly without losing prior work or design assets. _(Phase: P0)_

#### Acceptance Criteria

1. THE MindSpace SHALL be built on Next.js 15 with the App Router, React, and TypeScript in strict mode.
2. THE MindSpace SHALL use Tailwind CSS and shadcn/ui for styling and base components.
3. WHEN the project foundation is established, THE MindSpace SHALL preserve the existing Vite prototype in an archived location within the repository rather than deleting it.
4. THE MindSpace SHALL reuse the 12 per-section theme definitions from `src/theme/themes.js` as the basis for section theming.
5. THE MindSpace SHALL reuse the seed data shapes from `src/data/content.js` as reference for the memory and domain schema.
6. WHEN the production build runs, THE MindSpace SHALL complete with zero TypeScript errors, zero ESLint errors, and zero ESLint warnings.
7. THE MindSpace SHALL read all secrets and credentials exclusively from environment variables using `.env` placeholders, and SHALL NOT contain hardcoded or committed secrets.

### Requirement 2: Landing Page and Photographic Entry

**User Story:** As a visitor, I want a bright, cinematic photographic landing page, so that entering MindSpace feels like opening the front door to a personal universe. _(Phase: P1)_

#### Acceptance Criteria

1. WHEN an unauthenticated visitor opens the root route, THE Landing_Page SHALL display a bright, full-bleed photographic layout, independent of the dark-mode interior.
2. WHILE the Landing_Page is visible, THE Background_Slideshow SHALL cross-dissolve through a curated image set, advancing to the next image every 7 seconds.
3. WHILE an image is displayed and prefers-reduced-motion is not active, THE Background_Slideshow SHALL apply slow Ken Burns motion to that image.
4. WHEN an image is displayed, THE Background_Slideshow SHALL preload the next image before its transition.
5. WHEN the browser tab becomes hidden, THE Background_Slideshow SHALL pause image advancement.
6. WHEN the browser tab becomes visible again, THE Background_Slideshow SHALL resume image advancement.
7. WHERE prefers-reduced-motion is active, THE Background_Slideshow SHALL use a slow fade or static hold and SHALL NOT apply Ken Burns motion.
8. WHEN an image is displayed, THE Background_Slideshow SHALL apply a soft accent tint derived from that image.
9. THE Background_Slideshow SHALL load its initial curated image set from `/public/backgrounds`.
10. THE Landing_Page SHALL render a light scrim behind the wordmark to maintain text legibility over photographs.

### Requirement 3: Landing Navbar and Hero

**User Story:** As a visitor, I want a clear navbar and an inviting hero with an ENTER action, so that I can understand the product and sign in. _(Phase: P1)_

#### Acceptance Criteria

1. THE Landing_Page SHALL display a floating dark glass pill navbar containing a hexagon logo and the label "MINDSPACE" on the left, and HOME, ABOUT, and MORE items on the right.
2. WHILE a navbar item corresponds to the active view, THE Landing_Page SHALL visually highlight that item.
3. WHERE the viewport width is below the mobile breakpoint, THE Landing_Page SHALL collapse the navbar items into a responsive mobile menu.
4. THE Landing_Page SHALL display a large "MindSpace" wordmark in the hero.
5. THE Landing_Page SHALL display a white rounded pill tagline defaulting to "The Web of Life".
6. WHERE daily tagline rotation is enabled, THE Landing_Page SHALL select one configured tagline per calendar day from the configured tagline set.
7. WHEN the visitor activates the green gradient "ENTER" button, THE Landing_Page SHALL open the Sign_In_Surface with Google OAuth presented as the primary sign-in option.
8. WHERE prefers-reduced-motion is not active, THE Landing_Page SHALL render the ENTER button with ripple and glow effects.
9. THE Sign_In_Surface SHALL present both Google OAuth sign-in and email magic-link sign-in options.

### Requirement 4: Authentication and Sessions

**User Story:** As an Owner, I want to sign in securely with Google or email magic-link, so that only I can access my private universe. _(Phase: P1)_

#### Acceptance Criteria

1. THE Auth_Service SHALL support Google OAuth as the primary sign-in method.
2. THE Auth_Service SHALL support email magic-link sign-in.
3. WHEN an Owner completes authentication, THE Session_Manager SHALL establish an authenticated session associated with the Owner's `auth.uid()`.
4. WHEN an Owner signs out, THE Session_Manager SHALL terminate the session and clear client session state.
5. IF an unauthenticated request targets a protected route, THEN THE MindSpace SHALL redirect the request to the Landing_Page.
6. IF a session token is expired, THEN THE Session_Manager SHALL attempt a refresh, and on refresh failure SHALL require re-authentication.
7. WHERE multi-factor authentication is enabled for an Owner, THE Auth_Service SHALL require a second factor before establishing the session. _(Phase: P8)_
8. WHEN an Owner authenticates for the first time, THE Onboarding_Flow SHALL guide the Owner to connect Google Drive and bootstrap the `MindSpace/` folder tree.

### Requirement 5: Owner Profile

**User Story:** As an Owner, I want a profile with my basic details, so that MindSpace can personalize the experience. _(Phase: P1)_

#### Acceptance Criteria

1. WHEN an Owner first authenticates, THE MindSpace SHALL create a profile record associated with the Owner's `auth.uid()`.
2. WHEN an Owner updates profile fields, THE MindSpace SHALL persist the updated profile for that Owner.
3. WHEN a profile is requested, THE Authorization_Layer SHALL return only the profile owned by the requesting Owner.

### Requirement 6: Memory Data Model

**User Story:** As an Owner, I want a canonical structure for all my life data, so that every domain is searchable, datable, and linkable in one system. _(Phase: P3)_

#### Acceptance Criteria

1. THE Memory_Store SHALL represent each life item as a Memory record associated with an Owner, a domain category, a title, free-form notes, tags, and timestamps.
2. THE Memory_Store SHALL represent child artifacts as Memory_Item records linked to a parent Memory.
3. WHEN a Memory has an associated date, THE Memory_Store SHALL create a Timeline_Event referencing that Memory.
4. WHEN a Memory's textual content is created or updated, THE Memory_Store SHALL associate one or more Embeddings of 1536 dimensions with that Memory.
5. WHEN a Memory is queried, THE Memory_Store SHALL return its tags, domain category, and linked Memory_Items.
6. THE Memory_Store SHALL support the domain categories Travel, Diary, Music, Books, Movies, Projects, Quotes, Documents, and Gallery.

### Requirement 7: Frontend CMS (Notion-style Editing)

**User Story:** As an Owner, I want to create and edit content directly in the app, so that I never have to edit code to manage my memories. _(Phase: P3)_

#### Acceptance Criteria

1. WHEN an Owner creates a new entry, THE CMS SHALL persist it as a Memory associated with the Owner.
2. THE CMS SHALL provide a Tiptap-based rich-text editor for Memory notes.
3. WHEN an Owner adds tags to a Memory, THE CMS SHALL persist those tags with the Memory.
4. WHEN an Owner assigns a Memory to a collection, THE CMS SHALL persist the collection membership.
5. WHEN an Owner reorders items via drag-and-drop, THE CMS SHALL persist the new order for that Owner.
6. IF an Owner submits content that fails validation, THEN THE CMS SHALL reject the submission and display a descriptive validation message.
7. WHEN an Owner edits an existing Memory, THE CMS SHALL persist the changes without requiring any code modification.

### Requirement 8: Google Drive Storage Integration

**User Story:** As an Owner, I want my files stored in my own Google Drive, so that I retain ownership and control of my media while MindSpace only tracks metadata. _(Phase: P2)_

#### Acceptance Criteria

1. WHEN an Owner connects Google Drive, THE Drive_Connector SHALL request OAuth access with the `drive.file` scope and obtain an offline refresh token.
2. WHEN a refresh token is obtained, THE Drive_Connector SHALL store the token encrypted server-side.
3. WHEN Drive is first connected, THE Drive_Connector SHALL bootstrap a `MindSpace/` folder tree containing the subfolders Travel, Diary, Music, Books, Movies, Projects, Quotes, Documents, and Gallery.
4. WHEN a file is stored, THE Memory_Store SHALL persist only file metadata, including `drive_file_id`, `file_name`, `mime_type`, tags, category, `upload_date`, `thumbnail_url`, and `size`.
5. THE MindSpace SHALL NOT expose any `drive_file_id` to the client.
6. WHEN a client requests access to a private file, THE URL_Signer SHALL return a short-lived Signed_URL rather than a Drive file identifier.
7. THE MindSpace SHALL keep Drive credentials and server-only encryption keys inaccessible to client code.

### Requirement 9: Uploads and Asynchronous Ingestion Pipeline

**User Story:** As an Owner, I want uploaded files to be validated and automatically processed, so that my media becomes searchable and previewable without manual work. _(Phase: P2)_

#### Acceptance Criteria

1. WHEN an Owner uploads a file, THE Ingestion_Pipeline SHALL validate the file's MIME type and size against allowed limits before storing it.
2. IF an uploaded file fails MIME-type or size validation, THEN THE Ingestion_Pipeline SHALL reject the upload and return a descriptive error.
3. WHEN a file passes validation, THE Ingestion_Pipeline SHALL store the file in the Owner's Drive and record its metadata in the Memory_Store.
4. WHEN a supported image or video file is stored, THE Ingestion_Pipeline SHALL generate a thumbnail or preview and record its `thumbnail_url`.
5. WHEN an image or PDF file is ingested, THE Ingestion_Pipeline SHALL run OCR to extract text content.
6. WHEN text content is extracted from a file, THE Ingestion_Pipeline SHALL chunk the text and generate Embeddings for each chunk.
7. WHILE a file is being processed, THE Ingestion_Pipeline SHALL process it asynchronously without blocking the Owner's interaction with MindSpace.
8. IF an ingestion stage fails for a file, THEN THE Ingestion_Pipeline SHALL record the failure state for that file and allow reprocessing.

### Requirement 10: Everything Timeline

**User Story:** As an Owner, I want a unified chronological feed of my whole life, so that I can scroll through and revisit everything in time order. _(Phase: P3)_

#### Acceptance Criteria

1. WHEN an Owner opens the Timeline, THE Timeline SHALL display Timeline_Events for the Owner in reverse chronological order.
2. THE Timeline SHALL group entries by year, month, and day.
3. WHILE the Owner scrolls a large feed, THE Timeline SHALL virtualize rendering so that only visible entries are mounted.
4. WHEN an Owner applies a filter by domain, tag, place, people, weather, or file-type, THE Timeline SHALL display only entries matching the active filter.
5. WHEN an Owner opens an entry's detail drawer, THE Timeline SHALL display the entry's metadata, notes, weather, location, related media, and semantic links.
6. WHEN the Timeline is requested, THE Authorization_Layer SHALL return only Timeline_Events owned by the requesting Owner.

### Requirement 11: Instant Keyword Search

**User Story:** As an Owner, I want instant, typo-tolerant search across everything, so that I can find any memory in seconds. _(Phase: P4)_

#### Acceptance Criteria

1. WHEN a Memory is created or updated, THE Search_Service SHALL synchronize the corresponding searchable record from Postgres.
2. WHEN a Memory is deleted, THE Search_Service SHALL remove the corresponding searchable record.
3. WHEN an Owner submits a keyword query, THE Search_Service SHALL return matching results with typo tolerance.
4. WHEN search results are returned, THE Authorization_Layer SHALL include only records owned by the requesting Owner.
5. WHEN an Owner submits a query, THE Search_Service SHALL return results ranked by relevance.
6. WHEN reconciliation is triggered on demand, THE Search_Reconciler SHALL reindex the Search_Service from the Memory_Store.
7. WHEN the configured reconciliation schedule elapses, THE Search_Reconciler SHALL reindex the Search_Service from the Memory_Store.
8. WHILE reconciliation runs, THE Search_Reconciler SHALL detect records that differ between the Memory_Store and the Search_Service and update the Search_Service to match the Memory_Store.

### Requirement 12: Semantic Search and AI Assistant

**User Story:** As an Owner, I want to ask natural-language questions about my own data and get cited answers, so that my memories become an intelligent, queryable knowledge base. _(Phase: P4)_

#### Acceptance Criteria

1. WHEN an Owner submits a natural-language question, THE Semantic_Search SHALL retrieve the most similar Memories using Embedding similarity over pgvector.
2. WHEN the AI_Assistant generates an answer, THE AI_Assistant SHALL restrict retrieval and context to Memories owned by the requesting Owner.
3. WHEN the AI_Assistant returns an answer, THE AI_Assistant SHALL include citations linking to the source memory cards used.
4. WHEN constructing a prompt, THE AI_Assistant SHALL isolate system instructions from Owner-supplied content to mitigate prompt injection.
5. IF retrieval returns no Owner-owned Memories relevant to the question, THEN THE AI_Assistant SHALL state that no matching memories were found rather than fabricating an answer.
6. WHEN generating Embeddings for queries and Memories, THE MindSpace SHALL use the `text-embedding-3-small` model producing 1536-dimension vectors.
7. WHEN answering questions, THE AI_Assistant SHALL use the `gpt-4o-mini` model.
8. THE AI_Assistant SHALL support natural-language queries equivalent to "Show my Goa trip", "What books did I finish in 2025?", "Find all guitar songs", "Show journal entries from monsoon season", and "Open photos from my birthday week".

### Requirement 13: Gallery

**User Story:** As an Owner, I want a gallery of my photos and videos, so that I can browse my visual memories beautifully. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner opens the Gallery, THE Gallery SHALL display thumbnails of the Owner's image and video Memory_Items.
2. WHEN an Owner opens a media item, THE Gallery SHALL load the full-resolution media via a Signed_URL.
3. WHEN an Owner filters the Gallery by tag, date, or place, THE Gallery SHALL display only matching media.
4. WHEN the Gallery is requested, THE Authorization_Layer SHALL return only media owned by the requesting Owner.

### Requirement 14: Travel and Maps

**User Story:** As an Owner, I want to record trips with places, routes, expenses, and cinematic visuals on a map, so that my travels become a rich, navigable story. _(Phase: P5)_

#### Acceptance Criteria

1. WHEN an Owner creates a trip, THE Travel_Module SHALL persist the trip with associated places, dates, and a cover image.
2. WHEN an Owner views a trip, THE Map_View SHALL render the trip's places and routes using Mapbox GL.
3. WHEN an Owner adds an expense to a trip, THE Travel_Module SHALL persist the expense and include it in the trip's expense total.
4. WHEN an Owner adds a packing-list item to a trip, THE Travel_Module SHALL persist the item and its checked state.
5. WHEN an Owner views a trip's media, THE Travel_Module SHALL present photos in a polaroid or film-strip layout.
6. WHEN a trip is requested, THE Authorization_Layer SHALL return only trips owned by the requesting Owner.

### Requirement 15: Journal / Diary

**User Story:** As an Owner, I want a private journal with mood, auto-captured context, and optional encryption, so that I can record my inner life safely. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner creates a journal entry, THE Journal_Module SHALL persist the entry with its date, mood, and rich-text content.
2. WHEN a journal entry is created, THE Journal_Module SHALL auto-capture the current weather from the Weather_Service and the Owner's provided location.
3. WHEN an Owner attaches media to a journal entry, THE Journal_Module SHALL link the attachment as a Memory_Item.
4. WHEN an Owner opens the journal, THE Journal_Module SHALL present entries on a calendar timeline.
5. WHERE client-side end-to-end encryption is enabled for the journal, THE Journal_Module SHALL encrypt entry content on the client before transmission so that the server stores only ciphertext. _(Phase: P8)_
6. WHERE a private lock is enabled, THE Journal_Module SHALL require the Owner to unlock the journal before displaying entry content.
7. WHEN journal entries are requested, THE Authorization_Layer SHALL return only entries owned by the requesting Owner.

### Requirement 16: Music Room

**User Story:** As an Owner, I want a music room with a persistent player, playlists, lyrics, and a guitar notebook, so that I can keep and play my musical life. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner plays a track, THE Music_Player SHALL play audio using Howler.js.
2. WHILE an Owner navigates between sections during playback, THE Music_Player SHALL continue playback through a persistent mini-player.
3. WHEN an Owner creates a playlist and adds tracks, THE Music_Module SHALL persist the playlist and its track order.
4. WHEN an Owner views a track with lyrics, THE Music_Module SHALL display the stored lyrics.
5. WHEN an Owner saves a guitar notebook entry, THE Music_Module SHALL persist its chords, tabs, and practice-timer records.
6. WHERE Spotify import is enabled, THE Music_Module SHALL import the Owner's Spotify library data into the Music_Module. _(Phase: P9)_

### Requirement 17: Book Library

**User Story:** As an Owner, I want a book shelf with highlights, progress, ratings, and a wishlist, so that I can track my reading life. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner adds a book, THE Book_Library SHALL persist the book with its title, author, and cover.
2. WHEN an Owner updates reading progress, THE Book_Library SHALL persist the progress value for that book.
3. WHEN an Owner adds a highlight or note to a book, THE Book_Library SHALL persist it as a Memory_Item linked to the book.
4. WHEN an Owner rates a book, THE Book_Library SHALL persist the rating.
5. WHEN an Owner marks a book as wishlist, THE Book_Library SHALL persist its wishlist status and present it in the wishlist view.
6. THE Book_Library SHALL present books in a shelf layout.

### Requirement 18: Movies Room

**User Story:** As an Owner, I want a movies room with a poster wall, watchlist, reviews, and quotes, so that I can curate my film life. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner adds a movie, THE Movies_Module SHALL persist the movie with its title, poster, and watched status.
2. WHEN an Owner adds a movie to the watchlist, THE Movies_Module SHALL persist its watchlist status and present it in the watchlist view.
3. WHEN an Owner writes a review for a movie, THE Movies_Module SHALL persist the review linked to that movie.
4. WHEN an Owner saves a movie quote, THE Movies_Module SHALL persist the quote linked to that movie.
5. THE Movies_Module SHALL present movies in a poster-wall layout.

### Requirement 19: Coding Room

**User Story:** As an Owner, I want a coding room with projects, snippets, and external code stats, so that I can keep my technical life in one place. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner adds a project, THE Coding_Module SHALL persist the project with its name, status, and progress.
2. WHEN an Owner saves a code snippet, THE Coding_Module SHALL persist the snippet with its language and description.
3. WHEN an Owner views a snippet, THE Coding_Module SHALL render it with syntax highlighting in a terminal-style UI.
4. WHERE GitHub integration is connected, THE Coding_Module SHALL display the Owner's GitHub repository and contribution data.
5. WHERE LeetCode integration is connected, THE Coding_Module SHALL display the Owner's LeetCode solved-problem statistics.
6. WHEN code-room data is requested, THE Authorization_Layer SHALL return only data owned by the requesting Owner.

### Requirement 20: Quotes and Inspiration Board

**User Story:** As an Owner, I want a board for quotes and inspiration, so that I can collect and revisit ideas that move me. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner adds a quote, THE Quotes_Board SHALL persist the quote text and its optional author.
2. WHEN an Owner tags a quote, THE Quotes_Board SHALL persist the tags with the quote.
3. WHEN an Owner opens the Quotes_Board, THE Quotes_Board SHALL display the Owner's quotes and inspiration items.

### Requirement 21: Feel-Good / Comfort Room

**User Story:** As an Owner, I want a comfort room of feel-good content, so that I have a calming space to return to. _(Phase: P7)_

#### Acceptance Criteria

1. WHEN an Owner adds an item to the Comfort_Room, THE Comfort_Room SHALL persist the item associated with the Owner.
2. WHEN an Owner opens the Comfort_Room, THE Comfort_Room SHALL display the Owner's saved comfort items.

### Requirement 22: Productivity Hub

**User Story:** As an Owner, I want a productivity hub with clock, weather, Pomodoro, to-dos, goals, habits, pinned notes, and recent activity, so that I can manage my day in MindSpace. _(Phase: P6)_

#### Acceptance Criteria

1. WHEN an Owner opens the Productivity_Hub, THE Productivity_Hub SHALL display the current time and the current weather from the Weather_Service.
2. WHEN an Owner starts a Pomodoro session, THE Productivity_Hub SHALL run a countdown timer for the configured interval.
3. WHEN an Owner adds a to-do, goal, or habit, THE Productivity_Hub SHALL persist it associated with the Owner.
4. WHEN an Owner marks a to-do or habit complete, THE Productivity_Hub SHALL persist the completion state.
5. WHEN an Owner pins a note, THE Productivity_Hub SHALL display the pinned note in the hub.
6. WHEN the Productivity_Hub loads, THE Productivity_Hub SHALL display the Owner's recent activity.

### Requirement 23: Story Mode

**User Story:** As an Owner, I want Instagram-style replayable memory reels, so that I can relive periods of my life as a cinematic story. _(Phase: P7)_

#### Acceptance Criteria

1. WHEN an Owner starts Story_Mode for a set of memories, THE Story_Mode SHALL play the memories as sequential, full-screen reels.
2. WHILE a reel plays, THE Story_Mode SHALL display the memory's associated music, weather, location, and mood.
3. WHEN a reel is generated, THE Story_Mode SHALL include an AI-generated summary of the memory.
4. WHEN an Owner taps forward or back, THE Story_Mode SHALL advance to the next or previous reel.
5. WHERE prefers-reduced-motion is active, THE Story_Mode SHALL reduce transition animations between reels.

### Requirement 24: Personal Cloud

**User Story:** As an Owner, I want a unified, searchable browser of all my files and content, so that I can navigate everything I have stored. _(Phase: P7)_

#### Acceptance Criteria

1. WHEN an Owner opens the Personal_Cloud, THE Personal_Cloud SHALL display the Owner's files and content with category and metadata.
2. WHEN an Owner searches the Personal_Cloud, THE Personal_Cloud SHALL return matching files and content via the Search_Service.
3. WHEN an Owner opens a file from the Personal_Cloud, THE Personal_Cloud SHALL retrieve it via a Signed_URL.
4. WHEN the Personal_Cloud is requested, THE Authorization_Layer SHALL return only files and content owned by the requesting Owner.

### Requirement 25: Per-Section Dynamic Theming

**User Story:** As an Owner, I want each section to have its own distinct atmosphere, so that moving between rooms feels like changing worlds. _(Phase: P7)_

#### Acceptance Criteria

1. WHEN an Owner navigates to a section, THE Theme_Engine SHALL apply that section's theme, including its accent colors, mesh gradient, and particle style, as defined in the section theme set.
2. THE Theme_Engine SHALL support all 12 defined section themes (home, ideas, code, tasks, notes, hobbies, travel, future, journey, music, video, mood).
3. WHERE prefers-reduced-motion is active, THE Theme_Engine SHALL disable particle motion for the applied theme.

### Requirement 26: Dynamic Atmosphere and Weather Effects

**User Story:** As an Owner, I want background visuals that reflect weather and time of day, so that MindSpace feels alive and present. _(Phase: P7)_

#### Acceptance Criteria

1. WHEN current weather and the `is_day` flag are retrieved from the Weather_Service, THE Atmosphere_Engine SHALL render background effects matching the weather condition and day/night state.
2. WHERE prefers-reduced-motion is active, THE Atmosphere_Engine SHALL render a static or minimal-motion background.
3. WHILE rendering atmosphere effects, THE Atmosphere_Engine SHALL operate within a defined performance budget and SHALL lazy-load heavy visual modules.
4. IF the Weather_Service is unavailable, THEN THE Atmosphere_Engine SHALL render a default time-of-day background without error.

### Requirement 27: Private-by-Default Authorization

**User Story:** As an Owner, I want every piece of my data scoped to me by default, so that no one else can read my memories. _(Phase: P1)_

#### Acceptance Criteria

1. THE Authorization_Layer SHALL apply Row-Level Security with a deny-all baseline and explicit allow policies on every user-owned table.
2. WHEN any data query executes, THE Authorization_Layer SHALL scope results to the requesting Owner's `auth.uid()`.
3. IF a request attempts to read data owned by another Owner without an explicit share, THEN THE Authorization_Layer SHALL deny the request.
4. WHEN a client guard permits an action, THE Authorization_Layer SHALL re-verify authorization on the server before performing the action.
5. WHEN external input is received, THE MindSpace SHALL validate it against a Zod schema before processing.

### Requirement 28: Secure File Access and Secret Handling

**User Story:** As an Owner, I want my private files and credentials protected end-to-end, so that sensitive data is never exposed. _(Phase: P2)_

#### Acceptance Criteria

1. WHEN a client requests a private file, THE URL_Signer SHALL issue a Signed_URL that expires after a short, bounded lifetime.
2. THE MindSpace SHALL NOT expose Drive file identifiers or privileged keys to client code.
3. THE MindSpace SHALL store encryption keys only on the server.
4. WHEN logs are written, THE MindSpace SHALL redact secrets and personally identifiable information from log output.
5. THE MindSpace SHALL serve responses with a Content-Security-Policy and secure HTTP headers, and SHALL set cookies with secure attributes.

### Requirement 29: Rate Limiting

**User Story:** As the project owner, I want sensitive endpoints rate-limited, so that abuse and cost overruns are contained. _(Phase: P8)_

#### Acceptance Criteria

1. IF authentication attempts from a source exceed the configured rate limit, THEN THE MindSpace SHALL reject further attempts until the limit window resets.
2. IF upload requests from an Owner exceed the configured rate limit, THEN THE MindSpace SHALL reject further uploads until the limit window resets.
3. IF AI requests from an Owner exceed the configured rate limit, THEN THE MindSpace SHALL reject further AI requests until the limit window resets.
4. IF share-link requests from a source exceed the configured rate limit, THEN THE MindSpace SHALL reject further share-link requests until the limit window resets.

### Requirement 30: Version History and Soft Deletes

**User Story:** As an Owner, I want previous versions of notes and journals retained, so that I can recover from mistakes. _(Phase: P8)_

#### Acceptance Criteria

1. WHEN an Owner edits a note or journal entry, THE Version_History SHALL store the prior version before applying the change.
2. WHEN an Owner deletes a note or journal entry, THE Version_History SHALL perform a soft delete and retain the record.
3. WHEN an Owner restores a prior version, THE Version_History SHALL replace the current content with the selected prior version.
4. WHEN version history is requested, THE Authorization_Layer SHALL return only versions owned by the requesting Owner.

### Requirement 31: Backups and Restore

**User Story:** As the project owner, I want daily backups with a documented restore procedure, so that data can be recovered after a failure. _(Phase: P8)_

#### Acceptance Criteria

1. THE Backup_Service SHALL produce a backup of the Memory_Store at least once per day.
2. WHEN a backup completes, THE Backup_Service SHALL record the backup's timestamp and status.
3. IF a backup fails, THEN THE Backup_Service SHALL record the failure and surface it for review.
4. THE Backup_Service SHALL support restoring the Memory_Store from a selected backup.

### Requirement 32: Reminders and Notifications

**User Story:** As an Owner, I want reminders for meaningful dates and resurfaced memories, so that MindSpace keeps me connected to my life. _(Phase: P9)_

#### Acceptance Criteria

1. WHEN an Owner-configured reminder date arrives, THE Reminder_Service SHALL deliver a notification to the Owner.
2. THE Reminder_Service SHALL support birthday reminders, trip countdowns, and reading reminders.
3. WHEN the Reminder_Service surfaces a memory, THE Reminder_Service SHALL select a past Memory owned by the requesting Owner.
4. WHEN a reminder is requested or delivered, THE Authorization_Layer SHALL scope it to the owning Owner.

### Requirement 33: Observability and Audit Logging

**User Story:** As the project owner, I want sensitive actions audited and errors observable, so that I can detect issues and investigate incidents. _(Phase: P9)_

#### Acceptance Criteria

1. WHEN a sensitive action occurs (sign-in, file access grant, share creation, deletion, or settings change), THE Audit_Logger SHALL record the action with the Owner identity, action type, and timestamp.
2. WHEN an unhandled error occurs, THE MindSpace SHALL report the error to the observability service (Sentry).
3. WHEN audit logs are written, THE Audit_Logger SHALL redact secrets and personally identifiable information.
4. WHEN audit logs are requested, THE Authorization_Layer SHALL return only records permitted to the requesting Owner.

### Requirement 34: Settings and Security Management

**User Story:** As an Owner, I want a settings area to manage my account, integrations, theming, and security, so that I control how MindSpace behaves. _(Phase: P8)_

#### Acceptance Criteria

1. WHEN an Owner updates a setting, THE Settings_Module SHALL persist the setting for that Owner.
2. WHEN an Owner connects or disconnects an integration (Google Drive, GitHub, LeetCode, Spotify), THE Settings_Module SHALL update the integration's connection state.
3. WHERE an Owner enables journal encryption or a private lock, THE Settings_Module SHALL record the preference and apply it to the Journal_Module.
4. WHERE an Owner enables multi-factor authentication, THE Settings_Module SHALL initiate MFA enrollment through the Auth_Service.
5. WHEN settings are requested, THE Authorization_Layer SHALL return only the requesting Owner's settings.

### Requirement 35: Data Surface UX States

**User Story:** As an Owner, I want every data view to handle loading, empty, and error conditions gracefully, so that the experience never feels broken. _(Phase: P3)_

#### Acceptance Criteria

1. WHILE a data surface is loading, THE MindSpace SHALL display a loading state for that surface.
2. WHEN a data surface has no records, THE MindSpace SHALL display an empty state for that surface.
3. IF a data surface fails to load, THEN THE MindSpace SHALL display an error state with a retry affordance.
4. THE MindSpace SHALL render data surfaces with a mobile-first responsive layout and accessible components.

### Requirement 36: Selective Sharing

**User Story:** As an Owner, I want to share a specific memory or collection through a revocable link, so that I can let chosen people view selected parts of my universe without exposing everything. _(Phase: P7)_

#### Acceptance Criteria

1. WHEN an Owner creates a share for a Memory or a collection, THE Share_Service SHALL generate a server-generated Share_Link that grants access to only that Memory or collection.
2. WHEN an Owner creates a Share_Link, THE Share_Service SHALL associate an Owner-specified expiry time with the Share_Link.
3. WHEN a request presents a Share_Link that is unexpired and not revoked, THE Share_Service SHALL provide the shared Memory or collection in read-only form.
4. IF a request presents a Share_Link whose expiry time has passed, THEN THE Share_Service SHALL deny access to the shared content.
5. WHEN an Owner revokes a Share_Link, THE Share_Service SHALL invalidate the Share_Link so that subsequent requests presenting it are denied.
6. WHEN an Owner creates or revokes a Share_Link, THE Authorization_Layer SHALL permit the action only for Memories or collections owned by the requesting Owner.
7. WHEN a Share_Link is created or revoked, THE Audit_Logger SHALL record the action with the Owner identity, action type, and timestamp. _(Satisfies the share-audit reference in Requirement 33.1.)_
8. THE Share_Service SHALL enforce the share-link rate limit specified in Requirement 29.4 on Share_Link creation requests.

### Requirement 37: Account Deletion and Data Export

**User Story:** As an Owner, I want to export all of my data and to delete my account, so that I remain in control of my personal information. _(Phase: P8)_

#### Acceptance Criteria

1. WHEN an Owner requests a data export, THE Account_Service SHALL produce a machine-readable archive containing all data owned by the requesting Owner.
2. WHEN an Owner requests a data export, THE Authorization_Layer SHALL scope the export to data owned by the requesting Owner.
3. WHEN an Owner requests account deletion, THE Account_Service SHALL require explicit confirmation from the Owner before performing the deletion.
4. WHEN an Owner confirms account deletion, THE Account_Service SHALL cascade removal of all records owned by that Owner and the MindSpace file metadata associated with that Owner.
5. WHEN an Owner confirms account deletion, THE Account_Service SHALL disconnect and forget the Owner's Drive refresh token.
6. WHEN an Owner requests account deletion or data export, THE Authorization_Layer SHALL scope the operation to the requesting Owner.
7. IF account deletion is requested without explicit confirmation, THEN THE Account_Service SHALL cancel the deletion and retain the Owner's data.
8. WHEN account deletion completes, THE Audit_Logger SHALL record the deletion with the Owner identity, action type, and timestamp.

### Requirement 38: Installable PWA, Offline Shell, and Notification Delivery

**User Story:** As an Owner, I want MindSpace to be installable with an offline shell and to deliver notifications through my preferred channel, so that I can reach my universe quickly and receive reminders reliably. _(Phase: P9)_

#### Acceptance Criteria

1. THE PWA_Shell SHALL provide a web app manifest and a service worker that enable installation as a Progressive Web App.
2. WHILE the network is unavailable, THE PWA_Shell SHALL serve a cached application shell.
3. WHEN an Owner sets notification preferences, THE Settings_Module SHALL persist the per-Owner Notification_Channel preferences for that Owner.
4. WHEN the Reminder_Service delivers a notification, THE Reminder_Service SHALL deliver it through the Owner's enabled Notification_Channel set.
5. WHERE web push is an enabled Notification_Channel for an Owner, THE Reminder_Service SHALL deliver the notification via web push.
6. WHERE email is an enabled Notification_Channel for an Owner, THE Reminder_Service SHALL deliver the notification via the Email_Service.
7. IF delivery through a Notification_Channel fails, THEN THE Reminder_Service SHALL record the delivery failure for review.

### Requirement 39: Performance and Accessibility Targets

**User Story:** As the project owner, I want measurable performance and accessibility targets, so that MindSpace stays fast and usable for everyone. _(Phase: P9)_

#### Acceptance Criteria

1. THE MindSpace SHALL target a Lighthouse performance score of at least 90 on the Landing_Page, the Timeline, and the search results page.
2. THE MindSpace SHALL target a Lighthouse accessibility score of at least 90 on the Landing_Page, the Timeline, and the search results page.
3. THE MindSpace SHALL target Core Web Vitals thresholds of Largest Contentful Paint at most 2.5 seconds, Interaction to Next Paint at most 200 milliseconds, and Cumulative Layout Shift at most 0.1 on the Landing_Page, the Timeline, and the search results page.
4. THE MindSpace SHALL target WCAG 2.1 Level AA conformance, validated by both automated accessibility checks and manual assistive-technology testing.
5. WHEN an automated accessibility check runs in continuous integration, THE MindSpace SHALL report the accessibility violations detected by the automated checker.

### Requirement 40: Timezone and Seasonality

**User Story:** As an Owner, I want MindSpace to respect my timezone and understand seasonal and relative date references, so that my timeline, filters, reminders, and searches reflect how I actually experience time. _(Phase: P3)_

#### Acceptance Criteria

1. WHEN an Owner first authenticates, THE MindSpace SHALL record the Owner's timezone in the Owner profile.
2. WHEN an Owner updates the timezone setting, THE Settings_Module SHALL persist the updated timezone for that Owner.
3. WHEN the Timeline groups Timeline_Events by year, month, and day, THE Timeline SHALL group them according to the Owner's recorded timezone.
4. WHEN an Owner applies a date filter, THE Timeline SHALL evaluate date boundaries using the Owner's recorded timezone.
5. WHEN the Reminder_Service schedules a reminder, THE Reminder_Service SHALL compute the delivery time using the Owner's recorded timezone.
6. WHEN an Owner submits a seasonal or relative date query, including "monsoon season", "winter evenings", and "birthday week", THE Search_Service SHALL resolve the query to a date range using the Owner's recorded timezone and return matching Memories.
7. WHEN the AI_Assistant interprets a seasonal or relative date reference, THE AI_Assistant SHALL resolve it to a date range using the Owner's recorded timezone.
