import {
  FaGithub,
  FaLinkedin,
  FaRedditAlien,
  FaTwitter,
} from "react-icons/fa6";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { SiIndeed, SiGlassdoor } from "react-icons/si";
import { PiOfficeChairFill } from "react-icons/pi";
import { BiLogoDiscord } from "react-icons/bi";
import { Link } from "react-router-dom";

const wuzzuf =
  "https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/defaultImages/17177931064d0fb05e3afb.png";
const iconSize = 20;

const icons: { [key: string]: JSX.Element } = {
  "github.com": <FaGithub size={iconSize} />,
  "github.co": <FaGithub size={iconSize} />,
  "github.net": <FaGithub size={iconSize} />,
  "linkedin.com": <FaLinkedin size={iconSize} />,
  "linkedin.co": <FaLinkedin size={iconSize} />,
  "linkedin.net": <FaLinkedin size={iconSize} />,
  "facebook.com": <FaFacebookF size={iconSize} />,
  "facebook.co": <FaFacebookF size={iconSize} />,
  "facebook.net": <FaFacebookF size={iconSize} />,
  "twitter.com": <FaTwitter size={iconSize} />,
  "twitter.co": <FaTwitter size={iconSize} />,
  "twitter.net": <FaTwitter size={iconSize} />,
  "reddit.com": <FaRedditAlien size={iconSize} />,
  "reddit.co": <FaRedditAlien size={iconSize} />,
  "reddit.net": <FaRedditAlien size={iconSize} />,
  "glassdoor.com": <SiGlassdoor size={iconSize} />,
  "glassdoor.co": <SiGlassdoor size={iconSize} />,
  "glassdoor.net": <SiGlassdoor size={iconSize} />,
  "indeed.com": <SiIndeed size={iconSize} />,
  "indeed.co": <SiIndeed size={iconSize} />,
  "indeed.cnet": <SiIndeed size={iconSize} />,
  "ziprecruiter.com": <PiOfficeChairFill size={iconSize} />,
  "ziprecruiter.co": <PiOfficeChairFill size={iconSize} />,
  "ziprecruiter.net": <PiOfficeChairFill size={iconSize} />,
  "wuzzuf.net": (
    <img src={wuzzuf} alt="wuzzuf image" className="  w-[20px] h-[20px]" />
  ),
  "wuzzuf.co": (
    <img src={wuzzuf} alt="wuzzuf image" className="  w-[20px] h-[20px]" />
  ),
  "wuzzuf.com": (
    <img src={wuzzuf} alt="wuzzuf image" className="  w-[20px] h-[20px]" />
  ),
  "youtube.com": <FaYoutube size={iconSize} />,
  "youtube.co": <FaYoutube size={iconSize} />,
  "youtube.net": <FaYoutube size={iconSize} />,
  "discord.com": <BiLogoDiscord size={iconSize} />,
  "discord.co": <BiLogoDiscord size={iconSize} />,
  "discord.net": <BiLogoDiscord size={iconSize} />,
};

const HandleLinkIcons = ({
  links,
  className,
  errorMessage,
}: {
  links: string[];
  className?: string;
  errorMessage?: string;
}) => {
  const urls = links && links.filter((el) => el !== ""); // we are filtering it because the links we are getting always has an empty string which gives us an error every time this function is called.

  const extractDomain = (url: string) => {
    try {
      // Create a URL object from the input URL
      const parsedUrl = new URL(url);
      // Return the hostname (domain) from the URL object
      return parsedUrl.hostname.startsWith("www.")
        ? parsedUrl.hostname.split("w.")[1]
        : parsedUrl.hostname;
    } catch (error) {
      // Handle any errors that might occur during parsing
      console.error("Invalid URL:", url);
      return null;
    }
  };

  const iconLinks = urls.length
    ? urls
        .map((url) => extractDomain(url))
        .filter((el) => typeof el === "string")
    : [];

  return (
    <div className={`flex item-center gap-3 ${className}`}>
      {iconLinks.length
        ? iconLinks.map((link, i: number) => {
            return (
              <Link key={i} target="_blank" to={links[i]}>
                {icons[link as string]}
              </Link>
            );
          })
        : <p className=" w-full text-center">{errorMessage}</p> || null}
    </div>
  );
};
export default HandleLinkIcons;
