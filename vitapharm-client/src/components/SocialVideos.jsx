import { InstagramEmbed } from 'react-social-media-embed';

export default function SocialVideos() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 rounded-none">
      {[
        "https://www.instagram.com/p/C6OlMFGq0Ht/",
        "https://www.instagram.com/p/C6L8Mx-M5rX/",
        "https://www.instagram.com/p/Ct1dmi9LwDV/",
        "https://www.instagram.com/p/C53AOV9MMEs/",
      ].map((url) => (
        <div key={url} className="aspect-w-16 aspect-h-9" style={{ height: 600 }}>
          <InstagramEmbed url={url} width={328} hideCaption={true} />
        </div>
      ))}
    </div>
  );
}