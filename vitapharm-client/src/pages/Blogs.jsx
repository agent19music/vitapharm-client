import { FacebookEmbed } from 'react-social-media-embed'; import Header from '../components/Header';
import Footer from '../components/ModernFooter';

export default function SocialPosts() {
  const facebookPostUrls = [
    "https://www.facebook.com/vitapharmpharmacyandcosmetics/posts/pfbid022DWgYQbWsNyi32tnDeQGNztrMo6G3rQmPEbbvg93CDbhbDbCdLsjkepJVsxyEV5jl"   



];

  return (
    <>
      <Header />
      <>
      <div className="flex flex-wrap justify-center gap-4 p-4 sm:max-w- desktop-blog">
        {facebookPostUrls.map((url, index) => (
          <div key={index}>
            <FacebookEmbed 
              url={url} 
              width={600}
            />
          </div>
        ))}
      </div>
        <div className="flex flex-wrap justify-center gap-4 p-4 sm:max-w- mobile-blog">
        {facebookPostUrls.map((url, index) => (
          <div key={index}>
            <FacebookEmbed 
              url={url} 
              width={300}
            />
          </div>
        ))}
      </div>
      </>
      <Footer />
    </>
  );
}
