import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    installation: '',
    usage: '',
    license: 'MIT',
    contributing: ''
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
    contributing: 'Pull requests are welcome. Please open an issue first to discuss what you would like to change.'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Auto clear error if valid data is entered
    if (name === 'projectName' && value.trim() && error === 'Please enter your project name.') {
      setError('');
    }
    if (name === 'description' && value.trim() && error === 'Please add a short project description.') {
      setError('');
    }
  };

  const handleGenerate = () => {
    if (!formData.projectName.trim()) {
      setError('Please enter your project name.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please add a short project description.');
      return;
    }
    setError('');

    const content = `# ${formData.projectName}

${formData.description}

## Installation

\`\`\`bash
${formData.installation || 'npm install'}
\`\`\`

## Usage

\`\`\`bash
${formData.usage || 'npm start'}
\`\`\`

## Contributing

${formData.contributing || 'Contributions are always welcome!'}

## License

This project is licensed under the ${formData.license} License.
`;
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
      contributing: ''
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
            <label htmlFor="description">Description <span className="required">*</span></label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A short and catchy description of your project..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="installation">Installation</label>
            <textarea
              id="installation"
              name="installation"
              value={formData.installation}
              onChange={handleChange}
              placeholder="e.g., npm install my-awesome-app"
              rows="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usage">Usage</label>
            <textarea
              id="usage"
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              placeholder="e.g., npm start"
              rows="2"
            />
          </div>

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
