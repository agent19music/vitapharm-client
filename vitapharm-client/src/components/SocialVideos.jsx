import { InstagramEmbed } from 'react-social-media-embed';

export default function SocialVideos() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 rounded-none">
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg">
        <InstagramEmbed url="https://www.instagram.com/p/C6OlMFGq0Ht/" width={328} hideCaption={true} />
      </div>
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg">
        <InstagramEmbed url="https://www.instagram.com/p/C6L8Mx-M5rX/" width={328} hideCaption={true} />
      </div>
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg">
        <InstagramEmbed url="https://www.instagram.com/p/Ct1dmi9LwDV/" width={328} hideCaption={true} />
      </div>
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg">
        <InstagramEmbed url="https://www.instagram.com/p/C53AOV9MMEs/" width={328} hideCaption={true} />
      </div>
    </div>
  );
}
