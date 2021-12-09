import React, { useRef, useEffect } from "react";
import styles from "./preview.module.css";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
  <html>
  <head></head>
  <body>
    <div id="root" style="color:black;"></div>
    <script>
      const handleError = (e) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: black;"><h4>Runtime error</h4>'+ e + '</div>'
        throw e;
      }
      window.addEventListener('error', (event)=> {
        event.preventDefault();
        handleError(event.error)
      })
      window.addEventListener('message',(event)=>{
        try {
          eval(event.data);
        }
        catch(e) {
          handleError(e);
        }
      }, false)
    </script>
  </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ error, code }) => {
  const iFrame = useRef<any>();
  useEffect(() => {
    iFrame.current.srcdoc = html;
    setTimeout(() => {
      iFrame.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className={styles.PreviewWrapper}>
      <iframe
        className={styles.Preview}
        title="Code Preview"
        ref={iFrame}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {error && <div className={styles.Error}>{error}</div>}
    </div>
  );
};

export default Preview;
