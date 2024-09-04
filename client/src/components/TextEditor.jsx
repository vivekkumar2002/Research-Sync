import React, { useCallback, useEffect, useState, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { useParams, Link } from 'react-router-dom';
import { PDFDocument, rgb,StandardFonts } from 'pdf-lib'; // Import PDF generation library
import axios from "axios"


// import './editor.css'; 

// Import the custom CSS

const SAVE_INTERVAL = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ["custom-button-add"],
  ["custom-button-save"], // Add custom button here
];

const addCustomButtonHandler = (quill, logDocumentRef) => {
  const toolbar = quill.getModule('toolbar');
  toolbar.addHandler('custom-button-add', () => {
    console.log('Add button clicked!');
    // Add functionality for adding segments if needed
  });

  toolbar.addHandler('custom-button-save', () => {
    console.log('Save button clicked!');
    const logDocument = logDocumentRef.current;
    if (logDocument) {
      logDocument(); // Call logDocument function
    }
  });
};

const addCustomButtonToToolbar = () => {
  const toolbar = document.querySelector('.ql-toolbar');
  if (!toolbar) return;

  // Remove any previous custom buttons
  const existingAddButton = toolbar.querySelector('.ql-custom-button-add');
  if (existingAddButton) {
    existingAddButton.remove();
  }
  const existingSaveButton = toolbar.querySelector('.ql-custom-button-save');
  if (existingSaveButton) {
    existingSaveButton.remove();
  }

  // Add "Add" button
  const customButtonAdd = document.createElement('button');
  customButtonAdd.classList.add('ql-custom-button-add');
  customButtonAdd.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 5v14M5 12h14" />
  </svg>`;
  toolbar.appendChild(customButtonAdd);

  // Add "Save" button
  const customButtonSave = document.createElement('button');
  customButtonSave.classList.add('ql-custom-button-save');
  customButtonSave.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM12 12h6M12 16h6M6 8h6M6 12h6" />
  </svg>`;
  toolbar.appendChild(customButtonSave);
};


const mergeDocuments = async (documentId, socket) => {
  if (!socket) return;

  const splitDocumentId = (documentId) => {
    const parts = documentId.split(':');
    const baseDocumentId = parts[0];
    const lastSegment = parts[parts.length - 1];
    return {
      baseDocumentId,
      lastSegment,
    };
  };
  
  console.log('Merging documents...');
  const allContents = [];

  // Fetch content from all segments
  for (let i = 1; i <= 4; i++) {
    const { baseDocumentId } = splitDocumentId(documentId);
    socket.emit('get-document', `${baseDocumentId}:${i}`);
    console.log(`${baseDocumentId}:${i}`);
    const content = await new Promise((resolve) => {
      socket.once('load-document', resolve);
    });
    if (content && content.ops) {
      allContents.push(content);
      console.log("cs", content);
    } else {
      console.error(`Document ${i} content is not in the expected format:`, content);
    }
  }
  console.log("all contents:", allContents);

  // Combine all text content
  let combinedText = '';
  for (const doc of allContents) {
    if (doc && Array.isArray(doc.ops)) {
      const text = doc.ops.map(op => op.insert).filter(insert => insert).join('\n');
      combinedText += text + '\n\n'; // Add extra newline for separation
    } else {
      console.error('Document content is not in the expected format:', doc);
    }
  }

  // Open a new blank page
  const newWindow = window.open('', '_blank');
  
  if (newWindow) {
    // Include jsPDF library
    const jsPDFScript = document.createElement('script');
    jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    newWindow.document.head.appendChild(jsPDFScript);
    
    jsPDFScript.onload = () => {
      newWindow.document.open();
      newWindow.document.write('<html><head><title>Combined Document</title>');
      newWindow.document.write('<style>');
      newWindow.document.write('body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; }');
      newWindow.document.write('.container { width: 80%; max-width: 210mm; min-height:90vh; padding: 20px; box-sizing: border-box; border: 1px solid #ddd; background: #fff; margin: 0 auto; }');
      newWindow.document.write('#download-btn { position: fixed; bottom: 20px; left: 20px; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer; }');
      newWindow.document.write('#download-btn:hover { background-color: #0056b3; }');
      newWindow.document.write('#download-btn2 { position: fixed; top: 20px; left: 20px; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer; }');
      newWindow.document.write('#text-content { text-content: pre-wrap; white-space: pre-wrap; }');
      newWindow.document.write('</style>');
      newWindow.document.write('</head><body>');
      newWindow.document.write('<button id="download-btn2">Preview</button>');
      newWindow.document.write('<div  class="container">');
      newWindow.document.write('<pre id="text-content">' + combinedText + '</pre>');
      newWindow.document.write('</div>');
      newWindow.document.write('<button id="download-btn">Download PDF</button>');
      newWindow.document.write(`
        <script>
        const { jsPDF } = window.jspdf;
        
        document.getElementById("download-btn").addEventListener("click", () => {
            const doc = new jsPDF({ format: "a4" });
            
            // Create a temporary sizer element to get the text width
            const sizer = document.createElement('div');
            sizer.style.position = 'absolute';
            sizer.style.visibility = 'hidden';
            sizer.style.width = '80%';  // Mimic the CSS max-width
            sizer.style.whiteSpace = 'pre-wrap';  // Preserve whitespace and wrap text
            sizer.style.wordWrap = 'break-word';  // Break long words
            sizer.id = 'sizer';
            document.body.appendChild(sizer);
            
            const text = document.getElementById("text-content").innerText;
            
            // Set the text content to the sizer to get width
            sizer.innerText = text;
            const maxWidth = sizer.clientWidth;
            
            // Remove the sizer element after measurement
            document.body.removeChild(sizer);
            
            // Split text into lines that fit within the maxWidth
            const lines = doc.splitTextToSize(text, maxWidth);
            
            // Define margins for the PDF
            const margin = 10;
            
            // Add the text to the document
            doc.text(lines, margin, margin);
            
            // Save the PDF
            doc.save("combined_document.pdf");
        });
        </script>
        `);
              newWindow.document.write('</body></html>');
      newWindow.document.close();
    };
  } else {
    console.error('Failed to open a new window.');
  }
};


const Segment = ({ id, documentId, content, isEditable }) => {

  const handlePdf = async()=>{
    await axios.get("http://localhost:4000/api/v1/send")
  }
  
  
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const logDocumentRef = useRef();
  const [mssg,setMssg] = useState('');

  useEffect(() => {
    const s = io('http://localhost:4000');
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;

    console.log(`Loading document with ID: ${documentId}`);

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit('get-document', documentId);
    console.log("did", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (!socket || !quill) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta) => quill.updateContents(delta);
    socket.on('receive-changes', handler);

    return () => socket.off('receive-changes', handler);
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);
    return () => quill.off('text-change', handler);
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;
    wrapper.innerHTML = '';

    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
    logDocumentRef.current = () => {
      if (!quill) return;

      const promptData = prompt("Enter commit message");

      const logDetails = {
        promptMssg: promptData,
        data: quill.getContents(),
      };

      console.log('Logging document:', logDetails); // Debugging log
      socket.emit('log-document', logDetails);
    };
    addCustomButtonHandler(q, logDocumentRef); // Pass logDocumentRef to handler
    q.disable();
    q.setContents(content);
    setQuill(q);

    // Call this function to add custom button to toolbar
    addCustomButtonToToolbar();
  }, [content, socket]);


  const logDocument = () => {
    const promptData = prompt("Enter commit message");

    setMssg(promptData)
    const logDetails = {
      promptMssg:promptData,
      data: quill.getContents(), // or any other details you want to include
    };
    console.log("logDetails",logDetails)
    socket.emit('log-document', logDetails);
  };

  return (
    <div className={`segment ${isEditable ? 'editable' : 'locked'}`}>
      <div className="container" style={{ minWidth: '100%' }} ref={wrapperRef}></div>
      <div>
        {/* change here */}
        <button  className="px-5 py-2 mr-2 rounded-lg bg-slate-600" onClick={logDocument} type = "button">
          Log Document
        </button>
        <button
          className="px-5 py-2 rounded-lg bg-slate-600"
          onClick={() => mergeDocuments(documentId, socket)} // Pass socket to mergeDocuments
        >
          Merge and Download PDF
        </button>
        <Link to={`/logbook/${id}`} className="px-5 py-2 ml-3 rounded-lg bg-slate-600">
          Display Log Book
        </Link>
      </div>
    </div>
  );
};

const TextEditor = () => {
  const { id: documentId } = useParams();

  const sampleDocumentContent = `
    Segment 1 content
    Segment 2 content
    Segment 3 content
    Segment 4 content
  `;

  const contentSegments = sampleDocumentContent.split('\n').filter((segment) => segment.trim() !== '');

  return (
    <div>
      {contentSegments.map((segmentContent, index) => (
        <Segment
          key={index + 1} // Use sequential IDs starting from 1
          id={index + 1} // Use sequential IDs starting from 1
          documentId={`${documentId}:${index + 1}`} // Generate sequential documentId
          content={segmentContent}
          isEditable={true}
        />
      ))}
    </div>
  );
};

export default TextEditor;
