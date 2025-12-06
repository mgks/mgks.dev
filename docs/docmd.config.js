// config.js: basic config for docmd
module.exports = {
  // Core Site Metadata
  siteTitle: 'Documentation for mgks.dev Projects and Packages', // Title of your site
  siteDescription: 'Explore open-source projects and packages by Ghazi Khan, including Docmd, SmartWebView, GitHub Tree, and more.', // Description of your site
  // Define a base URL for your site, crucial for SEO and absolute paths
  // No trailing slash
  siteUrl: 'https://mgks.dev/docs', // Replace with your actual deployed URL

  // Logo Configuration
  logo: {
    light: '/assets/images/logo.png', // Path relative to outputDir root
    dark: '/assets/images/logo.png',  // Path relative to outputDir root
    alt: 'mgks.dev logo',              // Alt text for the logo
    href: '/',                         // Link for the logo, defaults to site root
  },

  // Directory Configuration
  srcDir: 'docs',       // Source directory for Markdown files
  outputDir: 'site',    // Directory for generated static site
  copyCode: true,

  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },

  // Theme Configuration
  theme: {
    name: 'sky',            // Themes: 'default', 'sky'
    defaultMode: 'dark',   // Initial color mode: 'light' or 'dark'
    enableModeToggle: true, // Show UI button to toggle light/dark modes
    positionMode: 'top',
    customCss: [            // Array of paths to custom CSS files
      '/assets/css/custom.css', // Custom TOC styles
    ]
  },

  // Custom JavaScript Files
  customJs: [  // Array of paths to custom JS files, loaded at end of body
    // '/assets/js/custom-script.js', // Paths relative to outputDir root
  ],

  // Plugins Configuration
  // Plugins are configured here. docmd will look for these keys.
  plugins: {
    // SEO Plugin Configuration
    // Most SEO data is pulled from page frontmatter (title, description, image, etc.)
    // These are fallbacks or site-wide settings.
    seo: {
      // Default meta description if a page doesn't have one in its frontmatter
      defaultDescription: 'Explore open-source projects by Ghazi Khan, including Smart WebView, GitHub Tree, and more.',
      openGraph: { // For Facebook, LinkedIn, etc.
        // siteName: 'docmd Documentation', // Optional, defaults to config.siteTitle
        // Default image for og:image if not specified in page frontmatter
        // Path relative to outputDir root
        defaultImage: '/assets/images/docmd-preview.png',
      },
      twitter: { // For Twitter Cards
        cardType: 'summary_large_image',     // 'summary', 'summary_large_image'
        // siteUsername: '@docmd_handle',    // Your site's Twitter handle (optional)
        // creatorUsername: '@your_handle',  // Default author handle (optional, can be overridden in frontmatter)
      }
    },
    // Analytics Plugin Configuration
    analytics: {
      // Google Analytics 4 (GA4)
      googleV4: {
        measurementId: 'G-DTYS057VRC' // Replace with your actual GA4 Measurement ID
      }
    },
    // Enable Sitemap plugin
    sitemap: {
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8
    }
    // Add other future plugin configurations here by their key
  },

  // Navigation Structure (Sidebar)
  // Icons are kebab-case names from Lucide Icons (https://lucide.dev/)
  navigation: [
      { title: 'Back to mgks.dev', path: '../', icon: 'arrow-left'},
      // { title: 'Memoryblock', path: 'https://docs.memoryblock.io', icon: 'box', external: true },
      { title: 'Projects',
        path: '/projects/',
        icon: 'folder-git',
        expanded: true,
        children: [
          { title: 'docmd', path: 'https://docmd.mgks.dev', icon: 'feather', external: true },
          { title: 'GitHubTree', path: '/projects/githubtree', icon: 'tree-pine'},
          { title: 'NotesMigrator', path: '/projects/notesmigrator', icon: 'notebook'},
        ]
      },
      { title: 'Packages',
        path: '/packages/',
        icon: 'package-open',
        expanded: true,
        children: [
          { title: 'genctx', path: '/packages/genctx', icon: 'package'},
          { title: 'shaml', path: '/packages/shaml', icon: 'package'},
        ]
      },
      { title: 'GitHub (@mgks)', path: 'https://github.com/mgks', icon: 'github', external: true },
      /*{ title: 'Notes Migrator',
        path: '/notes-migrator/',
        icon: 'notebook',
        children: [
          { title: 'Migration', path: '/notes-migrator/migration', icon: 'arrow-right-from-line'},
        ]
      },
      { title: 'GitHub Tree',
        path: '/github-tree/',
        icon: 'tree-pine',
        children: [
          { title: 'Usage', path: '/github-tree/usage', icon: 'chart-pie'},
          { title: 'Private Repo', path: '/github-tree/private-repo', icon: 'lock'},
        ]
      },*/
  ],

  // Footer Configuration
  // Markdown is supported here.
  footer: '© ' + new Date().getFullYear() + ' Project.',

  // Favicon Configuration
  // Path relative to outputDir root
  favicon: '/assets/favicon.png',
};
