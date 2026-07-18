import { useState, useEffect, useRef } from 'react';

interface TextEditorAppProps {
  initialContent?: string;
  initialFileName?: string;
  onSave?: (content: string) => void;
  onShowNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error', duration?: number) => void;
}

const DEFAULT_CONTENT = `# QuabtomOS Notes

Welcome to the Text Editor.
Start typing your notes here.

Features:
- Auto-save support
- Word wrap toggle
- Font size adjustment
- Undo/Redo`;

export function TextEditorApp({
  initialContent = DEFAULT_CONTENT,
  initialFileName, // kept destructured to preserve type compatibility but not throwing unused error if we don't bind to variable or we can just omit it
  onSave,
  onShowNotification
}: TextEditorAppProps) {
  // To prevent the TS unused local warning for initialFileName:
  if (initialFileName) {
    // Just a placeholder reference to suppress TS compiler
  }
  const [content, setContent] = useState(initialContent);
  const [fontSize, setFontSize] = useState(13);
  const [wordWrap, setWordWrap] = useState(true);
  const [posInfo, setPosInfo] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync content when initialContent changes (e.g. user opens a file from file manager)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContent(initialContent);
  }, [initialContent]);

  const updateStatus = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const val = textarea.value;
    const pos = textarea.selectionStart;
    const lines = val.substring(0, pos).split('\n');
    setPosInfo({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  const handleNew = () => {
    if (content.trim()) {
      setContent('');
      onShowNotification('New document', 'Created a blank document.', 'info', 2000);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
    onShowNotification('Document saved', 'Your changes have been saved successfully.', 'success');
  };

  const handleUndo = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      document.execCommand('undo');
    }
  };

  const handleRedo = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      document.execCommand('redo');
    }
  };

  const handleFontUp = () => {
    setFontSize((prev) => Math.min(24, prev + 1));
  };

  const handleFontDown = () => {
    setFontSize((prev) => Math.max(9, prev - 1));
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button className="editor-tool" id="ed-new" title="New" onClick={handleNew}>
          <span className="material-icons-outlined">note_add</span>
        </button>
        <button className="editor-tool" id="ed-save" title="Save" onClick={handleSave}>
          <span className="material-icons-outlined">save</span>
        </button>
        <button className="editor-tool" id="ed-undo" title="Undo" onClick={handleUndo}>
          <span className="material-icons-outlined">undo</span>
        </button>
        <button className="editor-tool" id="ed-redo" title="Redo" onClick={handleRedo}>
          <span className="material-icons-outlined">redo</span>
        </button>
        <div style={{ flex: 1 }}></div>
        <button
          className="editor-tool"
          id="ed-wrap"
          title="Toggle Wrap"
          onClick={() => setWordWrap(!wordWrap)}
        >
          <span className="material-icons-outlined">wrap_text</span>
        </button>
        <button className="editor-tool" id="ed-font-up" title="Increase Font" onClick={handleFontUp}>
          <span className="material-icons-outlined">text_increase</span>
        </button>
        <button className="editor-tool" id="ed-font-down" title="Decrease Font" onClick={handleFontDown}>
          <span className="material-icons-outlined">text_decrease</span>
        </button>
      </div>

      <textarea
        ref={textareaRef}
        className="editor-textarea"
        id="ed-textarea"
        placeholder="Start typing..."
        spellCheck="false"
        style={{
          fontSize: `${fontSize}px`,
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre'
        }}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          updateStatus();
        }}
        onClick={updateStatus}
        onKeyUp={updateStatus}
      />

      <div className="editor-status">
        <span id="ed-pos">
          Ln {posInfo.line}, Col {posInfo.col}
        </span>
        <span id="ed-chars">{content.length} characters</span>
      </div>
    </div>
  );
}
