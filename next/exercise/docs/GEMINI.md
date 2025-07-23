# Gemini Project Brief: Personal Vocabulary & Notebook

## 1. Project Overview

This is a Next.js application designed as a personal tool for learning and reference. Its core features include vocabulary books and general-purpose notebooks. A key feature is the integration of Azure Text-to-Speech (TTS) to provide audio for words and sentences, with a loop playback capability.

## 2. Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: JavaScript / TypeScript
- **Database ORM**: Prisma
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Text-to-Speech (TTS)**: Microsoft Azure Cognitive Services
- **Rich Text Editor**: Lexical and/or CKEditor

## 3. Project Structure Highlights

-   `src/app/`: Contains the main application pages and API routes.
    -   `notebook-words-english/`: Logic for the English vocabulary book.
    -   `notebooks/`: Logic for the general notebooks feature.
    -   `words/` & `words-api/`: Likely related to vocabulary management and its API.
    -   `lexical/`: Contains components or configuration for the Lexical rich text editor.
-   `src/components/ui/`: Houses the `shadcn/ui` components.
-   `src/lib/`: Shared utilities, including the Prisma client instance (`prisma.ts`).
-   `prisma/`: Contains the Prisma schema file (`schema.prisma`) for database modeling.
-   `public/refs/`: Stores static reference assets, notably pre-generated `.mp3` audio files for English (in `gsl/`) and other materials.
-   `scripts/`: Includes Node.js scripts for fetching audio from Azure TTS (`fetch-azure-tts.js`, `fetch-azure-tts-chinese.js`).

## 4. Key Functionality

-   **Vocabulary Management**: Create and manage lists of words, likely with definitions and examples.
-   **Notebooks**: Create rich-text notes using an editor like Lexical or CKEditor.
-   **Audio Playback**: Words and sentences can be played back as audio. The application supports looping the audio.
-   **TTS Integration**: Utilizes scripts to fetch synthesized audio from Azure, supporting both English and Chinese.

## 5. Development Notes

-   To run the application, use standard Next.js commands like `npm run dev`.
-   To populate audio files, the scripts in the `scripts/` directory need to be executed (e.g., `node scripts/fetch-azure-tts.js`).
-   Database migrations are managed by Prisma (`npx prisma migrate dev`).
