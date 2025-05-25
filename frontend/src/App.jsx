import { useState } from 'react'
import axios from 'axios';


function App() {
  
  const [language, setLanguage] = useState('');
  const [framework, setFramework] = useState('');
  const [dockerfile, setDockerfile] = useState('');
  const [lint, setLint] = useState('');

  const handleGenerate = async () => {
    const res = await axios.post('http://localhost:8000/generate', { language, framework });
    setDockerfile(res.data.dockerfile);
    setLint(res.data.lint);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold">AI Dockerfile Generator</h1>
      <input 
        className="block my-2 border p-2 w-full" 
        placeholder='Language' 
        value={language} 
        onChange={e => setLanguage(e.target.value)}
      />

      <input 
        className="block my-2 border p-2 w-full"
        placeholder='Framework'
        value={framework}
        onChange={e => setFramework(e.target.value)}
      />

      <button className="bg-green-600 text-white px-4 py-2 my-2" onClick={handleGenerate}>Generate</button>
    
      {dockerfile && (
        <div className="mt-4">
          <h2 className='font-semibold'>Dockerfile</h2>
          <pre className='bg-gray-900 p-4 whitespace-pre-wrap'>{dockerfile}</pre>
          <button className="bg-gray-500 text-white px-3 py-1 mt-2" onClick={() => navigator.clipboard.writeText(dockerfile)}>Copy</button>
        </div>
      )}

      {lint && (
        <div className='mt-4'>
          <h2 className='font semi-bold'>Hadolint Feedback</h2>
          <pre className='bg-gray-900 p-4 whitespace-pre-wrap'>{lint}</pre>
        </div>
      )}
    
    
    </div>


  )
}

export default App;
