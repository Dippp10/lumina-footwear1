
import React, { useState } from 'react';
import { syncToGithub, GithubFile } from '../services/githubService';

interface GithubSyncProps {
  isOpen: boolean;
  onClose: () => void;
  projectFiles: GithubFile[];
}

const GithubSync: React.FC<GithubSyncProps> = ({ isOpen, onClose, projectFiles }) => {
  const [token, setToken] = useState('');
  const [repoName, setRepoName] = useState('lumina-footwear');
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  if (!isOpen) return null;

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Token is required');
      return;
    }
    
    setStatus('syncing');
    setError('');

    try {
      const url = await syncToGithub(token, repoName, projectFiles);
      setRepoUrl(url);
      setStatus('success');
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold">Sync & Deploy</h2>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === 'success' ? (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1">Code Synced Successfully</h3>
                <p className="text-stone-500 text-sm">Now, let's make your brand live for free.</p>
              </div>

              <div className="bg-stone-50 rounded-xl p-5 mb-8 border border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4 flex items-center">
                  <span className="w-5 h-5 bg-stone-900 text-white rounded-full flex items-center justify-center text-[10px] mr-2 italic">i</span>
                  Free Deployment Steps:
                </h4>
                <ol className="text-xs text-stone-600 space-y-3 list-decimal ml-4 pr-2">
                  <li>Open your repo (button below).</li>
                  <li>Go to <strong>Settings</strong> tab, then <strong>Pages</strong> in the sidebar.</li>
                  <li>Under <b>"Build and deployment"</b>, look for <b>"Branch"</b>.</li>
                  <li>Select <strong>main</strong> and click <strong>Save</strong>.</li>
                  <li><span className="text-stone-400 italic font-normal">Note: Ignore the "Custom Domain" section, it is optional.</span></li>
                </ol>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={onClose}
                  className="px-6 py-3 border border-stone-200 rounded-xl font-medium text-sm hover:bg-stone-50 transition-colors"
                >
                  Later
                </button>
                <a 
                  href={repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-stone-900 text-white px-6 py-3 rounded-xl font-medium text-sm text-center hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200"
                >
                  Deploy on GitHub
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSync} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Personal Access Token</label>
                <input 
                  type="password" 
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
                <p className="mt-2 text-[10px] text-stone-400 leading-relaxed">
                  Go to GitHub Settings &gt; Developer &gt; Tokens (classic). Create one with <b>'repo'</b> scope.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Repository Name</label>
                <input 
                  type="text" 
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'syncing'}
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 disabled:opacity-50"
              >
                {status === 'syncing' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Synchronizing...
                  </span>
                ) : 'Sync & Prepare Deployment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GithubSync;
