export const SITE = {
    title: "mgks.dev",
    description: "Open source, problem solving and stories by Ghazi Khan.",
    url: "https://mgks.dev",
    author: "Ghazi Khan",
    twitter: "@_enigmazi",
};

export const SOCIALS = [
    { name: "GitHub", url: "https://github.com/mgks", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/mgks", icon: "linkedin" },
    { name: "YouTube", url: "https://youtube.com/@mgks_dev", icon: "youtube" }
];

export const SPONSOR_URL = "https://github.com/sponsors/mgks";

export const TECH_STACK = [
    "JavaScript", "TypeScript", "Node.js", "React", "Rust", "Astro", "PostgreSQL", "AWS"
];

// The "Highlight" section on the homepage
export const HIGHLIGHT = {
    enabled: true,
    title: "Currently Building",
    project: "docmd",
    description: "The minimalist, zero-config documentation generator for Node.js developers.",
    link: "https://github.com/mgks/docmd",
    image: "/assets/images/cover-docmd.png",
    tags: ["Node.js", "Markdown", "Documentation"]
};

// Your Projects List
export const APPS = [
    {
        title: "GitHubTree",
        desc: "Visualize folder structure of any public GitHub repository. Available as a web app, CLI tool, and node.js library.",
        link: "https://githubtree.mgks.dev",
        tags: ["Web App", "API", "CLI", "Node.js", "NPM"],
        icon: `<svg height="64" width="64" xmlns="http://www.w3.org/2000/svg" viewBox="-267 288.9 264.5 225.1" xml:space="preserve"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M-21.8 354.4c-.8-.9-1.3-2.3-1.2-3.5.9-20.1-1.8-39.6-8.6-58.6-.9-2.4-2-3.3-4.5-2.6-5.6 1.7-11.4 3-16.9 5-15.2 5.5-29.1 13.5-42.6 22.2-1.4.9-3.5 1.5-5.2 1.2-22.1-3.9-44.3-3.7-66.5-.3-2.2.3-5-.2-6.8-1.3-15.7-10.2-31.7-20.2-50-25-15.1-4-12-4.8-16.3 8.9-5.1 16.4-7.1 33.4-6 50.6.1 1.2-.8 2.7-1.6 3.8-6.6 7.9-11.7 16.6-14.8 26.4-6 19-4.8 38.2-1 57.3 7.5 37.5 32.8 63.8 70.2 70.3 19.3 3.4 39.2 3.7 57.3 5.2 20.2-1.5 38.9-1.6 57.1-4.5 31.8-5.1 55.8-22 67.8-52.7 4.2-10.7 6.5-22.4 7.9-33.8 3.2-25.1-1.1-48.7-18.3-68.6m-17.7 104.4c-3.3 15.6-12.4 26.3-27.6 31.8-14.7 5.4-29.9 7.6-45.4 8.6-7.5.5-15 .1-22.5.1-20.2.4-40.4-.4-59.9-6.2-24.5-7.3-35.5-21.9-36.2-47.5-.3-9.1.7-17.9 5-26.1 8.5-16.5 23.2-22.3 40.6-22.6 9.5-.1 19.1.7 28.7 1.6 20.1 1.8 40-.1 60-1.2 8.8-.5 17.8-.7 26.4.8 18.5 3.2 32.5 21.6 32.8 42.3 0 6.1-.7 12.4-1.9 18.4"/><path d="M-191.5 424.5c-5.5 5.7-7.4 12.9-7.7 19.3 0 9.6 2.8 17.3 7.7 22.3 6.8 6.9 16.1 6.7 22.6-.3 9.8-10.6 9.7-30.5 0-41-6.5-7.1-16-7.2-22.6-.3m92.1-.8c-11.2 10.3-11.2 33 0 43.2 6.5 5.9 15.3 5.6 21.4-.7 5.6-5.8 7.6-13.1 7.8-21-.2-7.9-2.2-15.1-7.9-20.9-6.1-6.3-14.9-6.5-21.3-.6"/></svg>`
    },
    {
        title: "Migrator",
        desc: "Migrate notes between Google Keep, Apple Notes, Evernote, and Notion.",
        link: "https://migrator.mgks.dev",
        tags: ["Google Keep", "Apple Notes", "Evernote", "Notion"],
        icon: `<svg width="64" height="64" viewBox="149.332 85.334 761.6 853.334" class="icon" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M149.332 853.332V170.668c0-46.934 38.4-85.334 85.334-85.334h512c46.932 0 85.332 38.4 85.332 85.334v682.666c0 46.934-38.4 85.334-85.332 85.334h-512c-46.934 0-85.334-38.4-85.334-85.334" fill="#fbcc00"/><path d="M910.932 512 682.666 704V320z" fill="#e08200"/><path d="M298.668 448h490.666v128H298.668z" fill="#e08200"/></svg>`
    },
    {
        title: "dhwani",
        desc: "A JavaScript library & web app for real-time vocal swar (note) detection for Hindustani classical music.",
        link: "https://dhwani.mgks.dev",
        tags: ["Audio API", "Tool", "Web App", "Node.js", "NPM"],
        icon: `<svg width="64" height="64" viewBox="0 0 1.92 1.92" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.32.8v.24M1.28.8v.24" stroke="#737373" stroke-width=".136" stroke-linecap="round"/><path d="M.56.56v.72" stroke="#df1463" stroke-width=".136" stroke-linecap="round"/><path d="M1.04.56v.72m.48-.72v.72M.8.32v1.2" stroke="#737373" stroke-width=".136" stroke-linecap="round"/></svg>`
    },
    {
        title: "thirsty-ai",
        desc: "Calculate hidden environmental cost of modern Artificial Intelligence usage.",
        link: "https://thirstyai.mgks.dev",
        tags: ["Sustainability", "AI", "OpenAI", "Gemini", "Web App", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    {
        title: "PlanTrip",
        desc: "Visualize, organize, and manage itineraries and travel stops with a clean, visual timeline.",
        link: "https://plantrip.mgks.dev",
        tags: ["Planner", "Calendar", "Travel", "TailwindCSS"],
        icon: ""
    }
];

export const LIBRARIES = [
    {
        title: "docmd",
        desc: "Generate minimal, fast & beautiful docs from Markdown. No React, no bloat, just content. Built for developers.",
        link: "https://docmd.mgks.dev",
        tags: ["Automation", "Web App", "Markdown", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "Android Smart WebView",
        desc: "A simple use webview integrated with native features & plugin support for building hybrid apps.",
        link: "https://github.com/mgks/Android-SmartWebView",
        tags: ["Android", "Java", "WebView", "Hybrid"],
        icon: ""
    },
    {
        title: "fluid.js",
        desc: "A lightweight, zero-dependency fluid simulation for web that reacts to device motion.",
        link: "https://github.com/mgks/fluid.js",
        tags: ["UI", "Frontend", "JavaScript", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "genctx",
        desc: "A node.js CLI tool to generate high-signal code context for AI agents and assistants.",
        link: "https://github.com/mgks/genctx",
        tags: ["AI", "Context", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "tree-fs",
        desc: "Turn text trees into real files. The standard \"Paste & Go\" receiver for AI-generated projects.",
        link: "https://github.com/mgks/tree-fs",
        tags: ["AI", "Filesystem", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "ci-debug",
        desc: "Safely print system info and environment variables with reducted secrets for debugging CI pipelines.",
        link: "https://github.com/mgks/ci-debug",
        tags: ["CI", "Debugger", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "md-fusion",
        desc: "Convert notes between HTML/JSON and Markdown with YAML Frontmatter.",
        link: "https://github.com/mgks/md-fusion",
        tags: ["Markdown", "YAML", "Notion", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "enex-io",
        desc: "High-performance parser and generator for Evernote/Apple Notes (.enex) files.",
        link: "https://github.com/mgks/enex-io",
        tags: ["iOS", "Mac", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "gkeep-parser",
        desc: "Convert Google Keep Takeout exports (HTML) into structured JSON data.",
        link: "https://github.com/mgks/gkeep-parser",
        tags: ["Google", "Keep", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    { 
        title: "clean-context",
        desc: "Code cleaner for AI context, strips comments and noise while strictly protecting strings, URLs, and regex.",
        link: "https://github.com/mgks/clean-context",
        tags: ["JavaScript", "CLI", "Node.js", "NPM"],
        icon: ""
    },
    {
        title: "force-exit-zero",
        desc: "Force a command to exit with code 0 (success), regardless of the result. Perfect for CI pipelines.",
        link: "https://github.com/mgks/force-exit-zero",
        tags: ["CI", "Failsafe", "Node.js", "NPM"],
        icon: ""
    },
    {
        title: "env-must-exist",
        desc: "CLI to assert that environment variables are present. Fails fast in CI/CD if missing.",
        link: "https://github.com/mgks/env-must-exist",
        tags: ["CI", "Failsafe", "Node.js", "NPM"],
        icon: ""
    },
    {
        title: "android-biometric-gate",
        desc: "A secure, lifecycle-aware biometric lock screen for any Android Activity.",
        link: "https://github.com/mgks/android-biometric-gate",
        tags: ["Android", "Kotlin", "Security", "Jitpack"],
        icon: ""
    },
    { 
        title: "android-webview-print-helper",
        desc: "A lightweight utility to easily print Android WebView content to PDF or physical printers.",
        link: "https://github.com/mgks/android-webview-print-helper",
        tags: ["Android", "Kotlin", "WebView", "Print", "Jitpack"],
        icon: ""
    },
    { 
        title: "android-webview-js-bridge",
        desc: "A lightweight, two-way, promise-based bridge between Android Kotlin/Java and JavaScript in WebViews.",
        link: "https://github.com/mgks/android-webview-js-bridge",
        tags: ["Android", "Kotlin", "JavaScript", "WebView", "Jitpack"],
        icon: ""
    },
    { 
        title: "android-webview-fcm-sync",
        desc: "A lightweight utility to sync FCM tokens into Android WebView cookies for targeted push notifications.",
        link: "https://github.com/mgks/android-webview-fcm-sync",
        tags: ["Android", "Kotlin", "WebView", "FCM", "Jitpack"],
        icon: ""
    },
    { 
        title: "android-webview-file-handler",
        desc: "A lightweight library to handle file uploads, camera captures, and permissions in Android WebViews.",
        link: "https://github.com/mgks/android-webview-file-handler",
        tags: ["Android", "Kotlin", "Filesystem", "WebView", "File", "Jitpack"],
        icon: ""
    },
    {
        title: "nineclip",
        desc: "Small clipboard manager to record last 9 clips FILO for devs.",
        link: "https://github.com/wrksp8/nineclip",
        tags: ["Rust", "MacOS", "Archived"],
        icon: "",
        archived: true
    },
    { 
        title: "shaml",
        desc: "A shameless micro library for auto-correcting variable types and possibly fail.",
        link: "https://www.npmjs.com/package/shaml",
        tags: ["Data Validation", "CLI", "Node.js", "Archived"],
        icon: "",
        archived: true
    },
    { 
        title: "TheLostPath",
        desc: "An experimental 2D maze game made with HTML5 canvas and JavaScript.",
        link: "https://github.com/wrksp8/TheLostPath",
        tags: ["Game", "Canvas", "JavaScript", "Archived"],
        icon: "",
        archived: true
    },
];
