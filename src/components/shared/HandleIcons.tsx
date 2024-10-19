import Fuse from "fuse.js";

import { FaReact, FaLaravel, FaDropbox } from "react-icons/fa6";
import {
  SiRecoil,
  SiMobx,
  SiReactquery,
  SiAstro,
  SiAppwrite,
  SiNetlify,
  SiStyledcomponents,
  SiCsswizardry,
  SiPython,
  SiRust,
  SiRuby,
  SiSwift,
  SiGnubash,
  SiJquery,
  SiAngular,
  SiVuedotjs,
  SiEmberdotjs,
  SiSvelte,
  SiNuxtdotjs,
  SiSpringboot,
  SiExpress,
  SiJasmine,
  SiJest,
  SiApachegroovy,
  SiCssmodules,
  //   SiShadcnui,
  SiMui,
  SiMocha,
  SiPuppeteer,
  SiCypress,
  SiPlaywright,
  SiSelenium,
  SiTailwindcss,
  SiRemix,
  SiFirebase,
  SiPostcss,
  SiReactrouter,
  SiReacthookform,
  SiZod,
  SiRadixui,
  SiCsharp,
  SiCplusplus,
  SiDotnet,
  SiRubyonrails,
  SiDjango,
  SiStackoverflow,
  // SiW3Schools,
  SiGitlab,
  SiGithub,
  SiSpringCreators,
  SiThreedotjs,
  SiLeaflet,
  SiLodash,
} from "react-icons/si";
// import { SiDrizzle } from "react-icons/si";

import { DiPerl } from "react-icons/di";
import { LiaJava } from "react-icons/lia";
import { FaNodeJs, FaGitAlt, FaDribbble } from "react-icons/fa";

import {
  RiGatsbyLine,
  RiJavascriptFill,
  RiSupabaseFill,
  RiHtml5Fill,
  RiBootstrapFill,
} from "react-icons/ri";
import {
  BiLogoTypescript,
  BiLogoPostgresql,
  BiLogoPhp,
  BiLogoSass,
} from "react-icons/bi";
import { CiInstagram } from "react-icons/ci";

import {
  TbBrandNextjs,
  TbSql,
  TbFileTypeXml,
  TbBrandFramerMotion,
  TbBrandRedux,
  TbBrandGolang,
} from "react-icons/tb";
import TooltipComp from "./TooltipComp";

const iconSize = 15;
const imageSize = " w-[20px] h-[20px]";

export const icons: { [key: string]: JSX.Element } = {
  netlify: <SiNetlify />,
  git: <FaGitAlt />,
  getHub: <SiGithub />,
  gitlab: <SiGitlab />,
  dropbox: <FaDropbox />,
  dribbble: <FaDribbble />,
  spring: <SiSpringCreators />,
  "three.js": <SiThreedotjs />,
  aceternity: (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  ),
  three: <SiThreedotjs />,
  // w3: <SiW3Schools  />,
  // w3school: <SiW3Schools  />,
  "stack over flow": <SiStackoverflow />,
  stackoverflow: <SiStackoverflow />,
  django: <SiDjango />,
  "ruby on rails": <SiRubyonrails />,
  rubyonrails: <SiRubyonrails />,
  rails: <SiRubyonrails />,
  go: <TbBrandGolang />,
  "go lang": <TbBrandGolang />,
  "styled css": <SiStyledcomponents />,
  "styled component": <SiStyledcomponents />,
  radix: <SiRadixui />,
  "react form hook": <SiReacthookform />,
  "react hook form": <SiReacthookform />,
  zod: <SiZod />,
  "react router": <SiReactrouter />,
  postcss: <SiPostcss />,
  "css modules": <SiCssmodules />,
  recoil: <SiRecoil />,
  "framer motion": <TbBrandFramerMotion />,
  instagram: <CiInstagram />,
  mobx: <SiMobx />,
  redux: <TbBrandRedux />,
  nextjs: <TbBrandNextjs />,
  gatsby: <RiGatsbyLine />,
  "react query": <SiReactquery />,
  astro: <SiAstro />,
  appwrite: <SiAppwrite />,
  css: <SiCsswizardry />,
  python: <SiPython />,
  rust: <SiRust />,
  swift: <SiSwift />,
  ruby: <SiRuby />,
  bash: <SiGnubash />,
  jquery: <SiJquery />,
  angular: <SiAngular />,
  vue: <SiVuedotjs />,
  vuejs: <SiVuedotjs />,
  ember: <SiEmberdotjs />,
  "ember js": <SiEmberdotjs />,
  svelte: <SiSvelte />,
  "nuxt js": <SiNuxtdotjs />,
  "spring boot": <SiSpringboot />,
  express: <SiExpress />,
  jasmine: <SiJasmine />,
  jest: <SiJest className="text-red-950" />,
  groovy: <SiApachegroovy />,
  apachegroovy: <SiApachegroovy />,
  //   shadcn: <SiShadcnui  />,
  "matrial ui": <SiMui />,
  mui: <SiMui />,
  "mocha js": <SiMocha />,
  puppeteer: <SiPuppeteer />,
  cypress: <SiCypress />,
  playwright: <SiPlaywright />,
  selenium: <SiSelenium />,
  //   drizzle: <SiDrizzle  />,
  perl: <DiPerl />,
  "remix js": <SiRemix />,
  java: <LiaJava />,
  javascript: <RiJavascriptFill />,
  js: <RiJavascriptFill />,
  supabase: <RiSupabaseFill className="text-green-700" />,
  firebase: <SiFirebase className="text-yellow-500" />,
  "node js": <FaNodeJs />,
  html: <RiHtml5Fill />,
  tailwindcss: <SiTailwindcss className="text-blue-500" />,
  bootstrap: <RiBootstrapFill />,
  typescript: <BiLogoTypescript />,
  postgresql: <BiLogoPostgresql />,
  php: <BiLogoPhp />,
  sass: <BiLogoSass />,
  sql: <TbSql />,
  xml: <TbFileTypeXml />,
  "react js": <FaReact />,
  react: <FaReact />,
  laravel: <FaLaravel />,
  "c#": <SiCsharp />,
  "c sharp": <SiCsharp />,
  ".net": <SiDotnet />,
  "dot net": <SiDotnet />,
  "c++": <SiCplusplus />,
  "c plus plus": <SiCplusplus />,
  leaflet: <SiLeaflet size={iconSize} />,
  lodash: <SiLodash size={iconSize} />,
  shadcn: (
    <img
      src="https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/defaultImages/139895814.png"
      className={`${imageSize} rounded-sm`}
    />
  ),
  vite: (
    <img
      src="https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/defaultImages/logo-with-shadow.png"
      className={`${imageSize} rounded-sm`}
    />
  ),
};

// Fuzzy search options
const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.3, // Adjust this threshold to your needs
};
const fuse = new Fuse(Object.keys(icons), options);

export const getIconForTool = (toolName: string, showTheIconOnly?: boolean) => {
  const results = fuse.search(toolName);
  if (results.length > 0) {
    // Sort the results by score in ascending order (lowest score first)
    results.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
    // Return the icon for the best match (lowest score)
    return icons[results[0].item];
  } else {
    // If no match, return a default icon or the misspelled tool name
    return showTheIconOnly ? null : toolName; // Replace with your default icon
  }
};

const HandleIcons = ({
  toolName,
  showTheIconOnly,
  className,
}: {
  toolName: string;
  showTheIconOnly?: boolean;
  className?: string;
}) => {
  const getIconForTool = () => {
    const results = fuse.search(toolName);
    if (results.length > 0) {
      // Sort the results by score in ascending order (lowest score first)
      results.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
      // Return the icon for the best match (lowest score)
      return icons[results[0].item];
    } else {
      // If no match, return a default icon or the misspelled tool name
      return showTheIconOnly ? null : toolName; // Replace with your default icon
    }
  };

  const icon = getIconForTool();
  return icon ? <span className={className || ""}>{icon}</span> : null;
};

export default HandleIcons;

/*


const HandleIcons = ({
  toolsArr,
  showTheIconOnly,
}: {
  toolsArr: string[];
  showTheIconOnly?: boolean;
}) => {
  const getIconForTool = (toolName: string) => {
    const results = fuse.search(toolName);
    if (results.length > 0) {
      // Sort the results by score in ascending order (lowest score first)
      results.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
      // Return the icon for the best match (lowest score)
      return icons[results[0].item];
    } else {
      // If no match, return a default icon or the misspelled tool name
      return toolName; // Replace with your default icon
    }
  };

  if (!toolsArr.filter((el) => el !== "").length)
    return (
      <div className=" flex items-center flex-wrap  h-[25px] overflow-hidden">
        Tools: ~
      </div>
    );

  return (
    <div className=" flex items-center flex-wrap  h-[25px] overflow-hidden">
      Tools: <span className=" text-lg  pb-[2px]">[</span>{" "}
      {toolsArr.map((tool, i: number) => {
        const lastITem = i + 1 === toolsArr.length;
        return (
          <TooltipComp key={i} toolTipText={tool}>
            <span className=" h-full flex justify-center items-center  ">
              {getIconForTool(tool)}
              {!lastITem ? (
                <span className=" font-semibold text-[12px] mx-1"> , </span>
              ) : null}
            </span>
          </TooltipComp>
        );
      })}
      <span className=" text-lg  pb-[2px]"> ]</span>
    </div>
  );
};

export default HandleIcons;

 */
