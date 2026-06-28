import React from 'react';

interface CodeTrackerProps {
  codeString: string;
  activeLine: number;
}

const highlightSyntax = (line: string) => {
  // Simple syntax highlighting for pseudocode
  return line.split(/(\bfunction\b|\bif\b|\belse\b|\breturn\b|\bfor\b|\bbreak\b|<=|>=|===|!==|==|!=|=|\b\d+\b|'.*?'|".*?")/g).map((part, i) => {
    if (['function', 'if', 'else', 'return', 'for', 'break'].includes(part)) {
      return <span key={i} style={{ color: '#569cd6', fontWeight: 'bold' }}>{part}</span>;
    }
    if (['<=', '>=', '===', '!==', '==', '!=', '='].includes(part)) {
      return <span key={i} style={{ color: '#d4d4d4' }}>{part}</span>;
    }
    if (!isNaN(Number(part)) && part.trim() !== '') {
      return <span key={i} style={{ color: '#b5cea8' }}>{part}</span>;
    }
    if (part.startsWith("'") || part.startsWith('"')) {
      return <span key={i} style={{ color: '#ce9178' }}>{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
};

export const CodeTracker: React.FC<CodeTrackerProps> = ({ codeString, activeLine }) => {
  const lines = codeString.split('\n');

  return (
    <div className="card h-full" style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', fontFamily: 'monospace', fontSize: '0.875rem', maxHeight: '450px', overflowY: 'auto', overflowX: 'auto' }}>
      <h3 style={{ color: '#fff', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', position: 'sticky', top: 0, backgroundColor: '#1e1e1e', zIndex: 10 }}>Algorithm Trace</h3>
      <div className="flex flex-col" style={{ minWidth: 'max-content' }}>
        {lines.map((line, index) => {
          const lineNumber = index + 1; // 1-indexed based on my code string
          const isActive = activeLine === lineNumber;
          
          return (
            <div 
              key={index} 
              style={{
                backgroundColor: isActive ? 'rgba(86, 156, 214, 0.2)' : 'transparent',
                borderLeft: isActive ? '4px solid #569cd6' : '4px solid transparent',
                padding: '2px 8px',
                whiteSpace: 'pre',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span style={{ color: '#858585', marginRight: '1rem', width: '24px', textAlign: 'right', userSelect: 'none' }}>{lineNumber}</span>
              <span>{highlightSyntax(line)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
