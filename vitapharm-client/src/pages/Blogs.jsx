import React, { useEffect } from 'react';

export default function Blogs() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.iframe.ly/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div style={{ maxWidth: "640px" }}>
        <div style={{ left: 0, width: "100%", height: 0, position: "relative", paddingBottom: "100%" }}>
          <iframe 
            src="//cdn.iframe.ly/api/iframe?app=1&url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fp%2FYJZvVZMDhDpwYNdP%2F&key=e35360f26e0814c353599c6856750070" 
            style={{ top: 0, left: 0, width: "100%", height: "100%", position: "absolute", border: 0 }} 
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
