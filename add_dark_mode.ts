import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src/components', (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    
    // Add dark mode classes
    newContent = newContent.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
    newContent = newContent.replace(/text-slate-800/g, 'text-slate-800 dark:text-slate-200');
    newContent = newContent.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-300');
    newContent = newContent.replace(/text-slate-600/g, 'text-slate-600 dark:text-slate-400');
    newContent = newContent.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
    newContent = newContent.replace(/text-slate-400/g, 'text-slate-400 dark:text-slate-500');

    // Prevent double classes if already added
    newContent = newContent.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
    newContent = newContent.replace(/dark:text-slate-200 dark:text-slate-200/g, 'dark:text-slate-200');
    newContent = newContent.replace(/dark:text-slate-300 dark:text-slate-300/g, 'dark:text-slate-300');
    newContent = newContent.replace(/dark:text-slate-400 dark:text-slate-400/g, 'dark:text-slate-400');
    newContent = newContent.replace(/dark:text-slate-500 dark:text-slate-500/g, 'dark:text-slate-500');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
