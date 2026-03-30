# STS 4006 - Data Structures & Algorithms MCQs

A neobrutalist, client-side React quiz application specifically designed for the STS 4006 Soft Skills course. It contains over 630 Multiple Choice Questions covering 21 critical Data Structures and Algorithms topics.

## Features

- **Topic-wise Quizzes**: 21 unique topics including Loop Detection, BST Recovery, Dial's Algorithm, Bellman-Ford, and more.
- **Comprehensive Exam**: An "All Topics Mixed" mode that generates a 50-question mock exam featuring guaranteed representation from every topic.
- **Double Randomization**: Both the question order and the A/B/C/D option sequence are shuffled dynamically using the Fisher-Yates algorithm every time a quiz is started.
- **Immediate Answer Review**: After finishing the quiz, users can review their selections against the correct answers seamlessly on the results page.
- **Neobrutalist Design**: A beautifully sharp, high-contrast, black-and-white aesthetic built to be distraction-free.

## Tech Stack

- **React 18** (Vite)
- **React Router v6**
- **Vanilla CSS**
- Fully static and client-side (no database, no backend).

## Running Locally

To run the application on your local machine:

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## Deployment (Vercel)

This application is configured for an effortless deployment to [Vercel](https://vercel.com/).

Because it relies on client-side routing (`react-router-dom`), a `vercel.json` file is included in the root directory to properly route all requests to the Single Page App (SPA) fallback:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
