const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json()); 

// Utility function to parse GitHub URLs
function parseGitHubUrl(url) {
  try {
    // Remove trailing slashes and .git
    const cleanUrl = url.replace(/\/$/, '').replace(/\.git$/, '');
    
    // Handle different GitHub URL formats
    const patterns = [
      /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)/,
      /^github\.com\/([^\/]+)\/([^\/]+)/,
      /^([^\/]+)\/([^\/]+)$/
    ];
    
    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2]
        };
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

// New endpoint to fetch GitHub README
app.post('/github/readme', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ 
        error: 'GitHub URL is required',
        message: 'Please provide a GitHub repository URL in the request body'
      });
    }
    
    // Parse the GitHub URL
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      return res.status(400).json({ 
        error: 'Invalid GitHub URL',
        message: 'Please provide a valid GitHub repository URL (e.g., https://github.com/owner/repo)'
      });
    }
    
    const { owner, repo } = parsed;
    
    // Fetch README from GitHub API (try multiple approaches)
    let readmeContent = '';
    let filename = 'README.md';
    let size = 0;
    
    try {
      // First try GitHub API
      const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
      const response = await axios.get(readmeUrl, {
        headers: {
          'User-Agent': 'GitHub-README-Fetcher/1.0.0'
        }
      });
      
      readmeContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
      filename = response.data.name;
      size = response.data.size;
    } catch (apiError) {
      // If API fails, try raw content approach
      const readmeFormats = ['README.md', 'README.MD', 'readme.md', 'README.txt', 'README.rst', 'README'];
      
      for (const format of readmeFormats) {
        try {
          const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${format}`;
          const response = await axios.get(rawUrl, {
            headers: {
              'User-Agent': 'GitHub-README-Fetcher/1.0.0'
            }
          });
          
          readmeContent = response.data;
          filename = format;
          size = readmeContent.length;
          break;
        } catch (rawError) {
          // Try master branch if main fails
          try {
            const masterUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${format}`;
            const masterResponse = await axios.get(masterUrl, {
              headers: {
                'User-Agent': 'GitHub-README-Fetcher/1.0.0'
              }
            });
            
            readmeContent = masterResponse.data;
            filename = format;
            size = readmeContent.length;
            break;
          } catch (masterError) {
            continue;
          }
        }
      }
      
      if (!readmeContent) {
        throw new Error('README not found in repository');
      }
    }
    
    res.json({
      repository: `${owner}/${repo}`,
      url: url,
      readme: readmeContent,
      filename: filename,
      size: size
    });
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ 
        error: 'Repository or README not found',
        message: 'The repository does not exist or does not have a README file'
      });
    }
    
    console.error('Error fetching README:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch README content'
    });
  }
});

// Step 1: In-memory "database"
let books = [
  { id: 1, title: "DSA", author: "XYZ" },
  { id: 2, title: "OOP", author: "ABC" },
  { id: 3, title: "DEVELOPMENT", author: "DEF" },
  
];

// Step 2: GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Step 3: POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Step 4: PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// Step 5: DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(` Book API running at http://localhost:${3000}`);
});
