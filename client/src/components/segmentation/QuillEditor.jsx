import React, { useEffect, useRef, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const MyQuillEditor = () => {
  // Use callback ref to preserve the Quill instance across renders
  const quillRef = useCallback(node => {
    if (node !== null) {
      const quill = new Quill(node, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        },
      });

      // Set the initial content of the editor
      const initialContent = `
        <div data-segment="title"><h1>Title</h1></div>
        <div data-segment="abstract"><p>Abstract</p></div>
        <div data-segment="introduction"><p>Introduction</p></div>
        <div data-segment="summary"><p>Summary</p></div>
        <div data-segment="conclusion"><p>Conclusion</p></div>
      `;
      quill.clipboard.dangerouslyPasteHTML(initialContent);

      // Save the Quill instance to the ref
      quillRef.current = quill;
    }
  }, []);

  const extractFullDocument = () => {
    if (quillRef.current) {
      const editor = quillRef.current;
      const fullDocument = editor.root.innerHTML;
      console.log('Extracted Full Document:', fullDocument);
    }
  };
  

  return (
    <div>
      <div ref={quillRef} style={{ height: '400px' }}></div>
      <button onClick={extractFullDocument}>Extract Full Document</button>
    </div>
  );
};

export default MyQuillEditor;
