import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    installation: '',
    usage: '',
    license: 'MIT',
    contributing: '',
    features: '',
    techStack: '',
    folderStructure: '',
    futureEnhancements: '',
    author: '',
    whyUseful: '',
    exampleUsage: ''
  });
  const [readmeContent, setReadmeContent] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const exampleData = {
    projectName: 'Awesome Project',
    description: 'A fantastic tool to solve everyday problems efficiently.',
    installation: 'npm install',
    usage: 'npm run start',
    license: 'MIT',
    contributing: 'Pull requests are welcome. Please open an issue first to discuss what you would like to change.',
    features: '- Fast performance\n- Easy to use\n- Great documentation',
    techStack: '- React\n- Node.js\n- Vite',
    folderStructure: 'src/\n├── components/\n├── assets/\n└── App.jsx',
    futureEnhancements: '- Add dark mode\n- Support more languages',
    author: 'Jane Doe',
    whyUseful: 'It saves 10 hours a week for developers.',
    exampleUsage: 'import { awesome } from "awesome-project";\n\nawesome();'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Auto clear error if valid data is entered
    if (name === 'projectName' && value.trim() && error === 'Please enter your project name.') {
      setError('');
    }
    if (name === 'description' && value.trim() && (error === 'Please add a short project description.' || error === 'Please enter what this project does.')) {
      setError('');
    }
  };

  const handleGenerate = () => {
    if (!formData.projectName.trim()) {
      setError('Please enter your project name.');
      return;
    }
    if (!formData.description.trim()) {
      setError(selectedTemplate === 'beginner' ? 'Please enter what this project does.' : 'Please add a short project description.');
      return;
    }
    setError('');

    let content = '';

    if (selectedTemplate === 'minimal') {
      content = `# ${formData.projectName}

${formData.description}

## Installation

\`\`\`bash
${formData.installation || 'npm install'}
\`\`\`

## Usage

\`\`\`bash
${formData.usage || 'npm start'}
\`\`\`
`;
    } else if (selectedTemplate === 'professional') {
      content = `# ${formData.projectName}

${formData.description}

## Features

${formData.features || '- Feature 1\n- Feature 2\n- Feature 3'}

## Tech Stack

${formData.techStack || '- Technology 1\n- Technology 2'}

## Installation

\`\`\`bash
${formData.installation || 'npm install'}
\`\`\`

## Usage

\`\`\`bash
${formData.usage || 'npm start'}
\`\`\`

## Folder Structure

\`\`\`
${formData.folderStructure || 'src/\n├── index.js\n└── styles.css'}
\`\`\`

## Future Enhancements

${formData.futureEnhancements || '- Planned feature 1\n- Planned feature 2'}

## License

This project is licensed under the ${formData.license} License.
`;
    } else if (selectedTemplate === 'opensource') {
      content = `# ${formData.projectName}

${formData.description}

## Features

${formData.features || '- Feature 1\n- Feature 2\n- Feature 3'}

## Tech Stack

${formData.techStack || '- Technology 1\n- Technology 2'}

## Installation

\`\`\`bash
${formData.installation || 'npm install'}
\`\`\`

## Usage

\`\`\`bash
${formData.usage || 'npm start'}
\`\`\`

## Contributing

${formData.contributing || 'Contributions are always welcome! Please read the contribution guidelines first.'}

## License

This project is licensed under the ${formData.license} License.

## Author

**${formData.author || 'Your Name'}**
`;
    } else if (selectedTemplate === 'beginner') {
      content = `# ${formData.projectName}

## What this project does

${formData.description}

## Why it is useful

${formData.whyUseful || 'It helps solve a common problem easily without complex setup.'}

## How to install

\`\`\`bash
${formData.installation || 'npm install'}
\`\`\`

## How to run

\`\`\`bash
${formData.usage || 'npm start'}
\`\`\`

## Example usage

\`\`\`javascript
${formData.exampleUsage || '// write your example code here\nconsole.log("Hello World");'}
\`\`\`

## Future improvements

${formData.futureEnhancements || '- Make it even simpler\n- Add more tutorials'}
`;
    }

    setReadmeContent(content);
    setCopied(false);
  };

  const handleClear = () => {
    setFormData({
      projectName: '',
      description: '',
      installation: '',
      usage: '',
      license: 'MIT',
      contributing: '',
      features: '',
      techStack: '',
      folderStructure: '',
      futureEnhancements: '',
      author: '',
      whyUseful: '',
      exampleUsage: ''
    });
    setReadmeContent('');
    setError('');
    setCopied(false);
  };

  const handleUseExample = () => {
    setFormData(exampleData);
    setError('');
  };

  const handleCopy = () => {
    if (!readmeContent) return;
    navigator.clipboard.writeText(readmeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!readmeContent) return;
    const blob = new Blob([readmeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const showFeatures = selectedTemplate === 'professional' || selectedTemplate === 'opensource';
  const showTechStack = selectedTemplate === 'professional' || selectedTemplate === 'opensource';
  const showFolderStructure = selectedTemplate === 'professional';
  const showFutureEnhancements = selectedTemplate === 'professional' || selectedTemplate === 'beginner';
  const showLicense = selectedTemplate === 'professional' || selectedTemplate === 'opensource';
  const showContributing = selectedTemplate === 'opensource';
  const showAuthor = selectedTemplate === 'opensource';
  const showWhyUseful = selectedTemplate === 'beginner';
  const showExampleUsage = selectedTemplate === 'beginner';

  const descLabel = selectedTemplate === 'beginner' ? 'What this project does' : 'Description';
  const descPlaceholder = selectedTemplate === 'beginner' ? 'Explain simply what this project is...' : 'A short and catchy description of your project...';
  
  const instLabel = selectedTemplate === 'beginner' ? 'How to install' : 'Installation';
  const instPlaceholder = selectedTemplate === 'beginner' ? 'e.g., npm install' : 'e.g., npm install my-awesome-app';

  const usageLabel = selectedTemplate === 'beginner' ? 'How to run' : 'Usage';
  const usagePlaceholder = selectedTemplate === 'beginner' ? 'e.g., npm start' : 'e.g., npm start';

  const futureLabel = selectedTemplate === 'beginner' ? 'Future improvements' : 'Future Enhancements';

  return (
    <div className="app-container">
      <header className="header">
        <h1>README Auto-Generator</h1>
        <p>Create professional, GitHub-ready README files in seconds.</p>
      </header>

      <div className="main-content">
        <div className="editor-section">
          <div className="section-header">
            <h2>Project Details</h2>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={handleUseExample}>Use Example</button>
              <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
            </div>
          </div>

          {error && <div className="error-box">{error}</div>}

          <div className="form-group">
            <label htmlFor="templateSelector">Select Template</label>
            <select
              id="templateSelector"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="minimal">Minimal README</option>
              <option value="professional">Professional README</option>
              <option value="opensource">Open Source README</option>
              <option value="beginner">Beginner Friendly README</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="projectName">Project Name <span className="required">*</span></label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="e.g., My Awesome App"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">{descLabel} <span className="required">*</span></label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={descPlaceholder}
              rows="3"
            />
          </div>

          {showWhyUseful && (
            <div className="form-group">
              <label htmlFor="whyUseful">Why it is useful</label>
              <textarea
                id="whyUseful"
                name="whyUseful"
                value={formData.whyUseful}
                onChange={handleChange}
                placeholder="e.g., It helps solve a common problem easily without complex setup."
                rows="3"
              />
            </div>
          )}

          {showFeatures && (
            <div className="form-group">
              <label htmlFor="features">Features</label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="- Feature 1&#10;- Feature 2"
                rows="3"
              />
            </div>
          )}

          {showTechStack && (
            <div className="form-group">
              <label htmlFor="techStack">Tech Stack</label>
              <textarea
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                placeholder="- React&#10;- Node.js"
                rows="3"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="installation">{instLabel}</label>
            <textarea
              id="installation"
              name="installation"
              value={formData.installation}
              onChange={handleChange}
              placeholder={instPlaceholder}
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usage">{usageLabel}</label>
            <textarea
              id="usage"
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              placeholder={usagePlaceholder}
              rows="2"
            />
          </div>

          {showExampleUsage && (
            <div className="form-group">
              <label htmlFor="exampleUsage">Example usage</label>
              <textarea
                id="exampleUsage"
                name="exampleUsage"
                value={formData.exampleUsage}
                onChange={handleChange}
                placeholder="import { feature } from 'app';&#10;feature();"
                rows="3"
              />
            </div>
          )}

          {showFolderStructure && (
            <div className="form-group">
              <label htmlFor="folderStructure">Folder Structure</label>
              <textarea
                id="folderStructure"
                name="folderStructure"
                value={formData.folderStructure}
                onChange={handleChange}
                placeholder="src/&#10;├── components/&#10;└── utils/"
                rows="3"
              />
            </div>
          )}

          {showFutureEnhancements && (
            <div className="form-group">
              <label htmlFor="futureEnhancements">{futureLabel}</label>
              <textarea
                id="futureEnhancements"
                name="futureEnhancements"
                value={formData.futureEnhancements}
                onChange={handleChange}
                placeholder="- Planned feature 1&#10;- Planned feature 2"
                rows="3"
              />
            </div>
          )}

          {showContributing && (
            <div className="form-group">
              <label htmlFor="contributing">Contributing Guidelines</label>
              <textarea
                id="contributing"
                name="contributing"
                value={formData.contributing}
                onChange={handleChange}
                placeholder="How can others contribute to your project?"
                rows="2"
              />
            </div>
          )}

          {showAuthor && (
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g., John Doe"
              />
            </div>
          )}

          {showLicense && (
            <div className="form-group">
              <label htmlFor="license">License</label>
              <select
                id="license"
                name="license"
                value={formData.license}
                onChange={handleChange}
              >
                <option value="MIT">MIT</option>
                <option value="Apache 2.0">Apache 2.0</option>
                <option value="GPLv3">GPLv3</option>
                <option value="ISC">ISC</option>
                <option value="None">None</option>
              </select>
            </div>
          )}

          <button className="btn btn-primary generate-btn" onClick={handleGenerate}>
            Generate README
          </button>
        </div>

        <div className="preview-section">
          <div className="section-header">
            <h2>Preview</h2>
            <div className="header-actions">
              <button 
                className={`btn btn-secondary ${!readmeContent ? 'disabled' : ''}`}
                onClick={handleCopy}
                disabled={!readmeContent}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button 
                className={`btn btn-secondary ${!readmeContent ? 'disabled' : ''}`}
                onClick={handleDownload}
                disabled={!readmeContent}
              >
                Download
              </button>
            </div>
          </div>
          
          <div className="preview-content">
            {readmeContent ? (
              <pre><code>{readmeContent}</code></pre>
            ) : (
              <div className="empty-preview">
                <p>Your generated README will appear here.</p>
                <p className="hint">Fill out the form and click "Generate README".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
