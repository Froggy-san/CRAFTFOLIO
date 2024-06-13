import Fuse from "fuse.js";

import { FaReact, FaLaravel } from "react-icons/fa6";
import {
  SiRecoil,
  SiMobx,
  SiReactquery,
  SiAstro,
  SiAppwrite,
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
} from "react-icons/si";
// import { SiDrizzle } from "react-icons/si";

import { DiPerl } from "react-icons/di";
import { LiaJava } from "react-icons/lia";
import { FaNodeJs, FaGitAlt } from "react-icons/fa";

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

const icons: { [key: string]: JSX.Element } = {
  git: <FaGitAlt size={iconSize} />,
  getHub: <SiGithub size={iconSize} />,
  gitlab: <SiGitlab size={iconSize} />,
  // w3: <SiW3Schools size={iconSize} />,
  // w3school: <SiW3Schools size={iconSize} />,
  "stack over flow": <SiStackoverflow size={iconSize} />,
  stackoverflow: <SiStackoverflow size={iconSize} />,
  django: <SiDjango size={iconSize} />,
  "ruby on rails": <SiRubyonrails size={iconSize} />,
  rubyonrails: <SiRubyonrails size={iconSize} />,
  rails: <SiRubyonrails size={iconSize} />,
  go: <TbBrandGolang size={iconSize} />,
  "go lang": <TbBrandGolang size={iconSize} />,
  "styled css": <SiStyledcomponents size={iconSize} />,
  radix: <SiRadixui size={iconSize} />,
  "react form hook": <SiReacthookform size={iconSize} />,
  zod: <SiZod size={iconSize} />,
  "react router": <SiReactrouter size={iconSize} />,
  postcss: <SiPostcss size={iconSize} />,
  "css modules": <SiCssmodules size={iconSize} />,
  recoil: <SiRecoil size={iconSize} />,
  "framer motion": <TbBrandFramerMotion size={iconSize} />,
  mobx: <SiMobx size={iconSize} />,
  redux: <TbBrandRedux size={iconSize} />,
  nextjs: <TbBrandNextjs size={iconSize} />,
  gatsby: <RiGatsbyLine size={iconSize} />,
  "react query": <SiReactquery size={iconSize} />,
  astro: <SiAstro size={iconSize} />,
  appwrite: <SiAppwrite size={iconSize} />,
  css: <SiCsswizardry size={iconSize} />,
  python: <SiPython size={iconSize} />,
  rust: <SiRust size={iconSize} />,
  swift: <SiSwift size={iconSize} />,
  ruby: <SiRuby size={iconSize} />,
  bash: <SiGnubash size={iconSize} />,
  jquery: <SiJquery size={iconSize} />,
  angular: <SiAngular size={iconSize} />,
  vue: <SiVuedotjs size={iconSize} />,
  vuejs: <SiVuedotjs size={iconSize} />,
  ember: <SiEmberdotjs size={iconSize} />,
  "ember js": <SiEmberdotjs size={iconSize} />,
  svelte: <SiSvelte size={iconSize} />,
  "nuxt js": <SiNuxtdotjs size={iconSize} />,
  "spring boot": <SiSpringboot size={iconSize} />,
  express: <SiExpress size={iconSize} />,
  jasmine: <SiJasmine size={iconSize} />,
  jest: <SiJest size={iconSize} className=" text-red-950" />,
  groovy: <SiApachegroovy size={iconSize} />,
  apachegroovy: <SiApachegroovy size={iconSize} />,
  //   shadcn: <SiShadcnui size={iconSize} />,
  "matrial ui": <SiMui size={iconSize} />,
  mui: <SiMui size={iconSize} />,
  "mocha js": <SiMocha size={iconSize} />,
  puppeteer: <SiPuppeteer size={iconSize} />,
  cypress: <SiCypress size={iconSize} />,
  playwright: <SiPlaywright size={iconSize} />,
  selenium: <SiSelenium size={iconSize} />,
  //   drizzle: <SiDrizzle size={iconSize} />,
  perl: <DiPerl size={iconSize} />,
  "remix js": <SiRemix size={iconSize} />,
  java: <LiaJava size={iconSize} />,
  javascript: <RiJavascriptFill size={iconSize} />,
  js: <RiJavascriptFill size={iconSize} />,
  supabase: <RiSupabaseFill size={iconSize} className=" text-green-700" />,
  firebase: <SiFirebase size={iconSize} className=" text-yellow-500" />,
  "node js": <FaNodeJs size={iconSize} />,
  html: <RiHtml5Fill size={iconSize} />,
  tailwindcss: <SiTailwindcss size={iconSize} className=" text-blue-500" />,
  bootstrap: <RiBootstrapFill size={iconSize} />,
  typescript: <BiLogoTypescript size={iconSize} />,
  postgresql: <BiLogoPostgresql size={iconSize} />,
  php: <BiLogoPhp size={iconSize} />,
  sass: <BiLogoSass size={iconSize} />,
  sql: <TbSql size={iconSize} />,
  xml: <TbFileTypeXml size={iconSize} />,
  "react js": <FaReact size={iconSize} />,
  react: <FaReact size={iconSize} />,
  laravel: <FaLaravel size={iconSize} />,
  "c#": <SiCsharp size={iconSize} />,
  "c sharp": <SiCsharp size={iconSize} />,
  ".net": <SiDotnet size={iconSize} />,
  "dot net": <SiDotnet size={iconSize} />,
  "c++": <SiCplusplus />,
  "c plus plus": <SiCplusplus />,
  shadcn: (
    <img
      src="https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/landingImages/139895814.png"
      className={`${imageSize} rounded-sm`}
    />
  ),
  vite: (
    <img
      src="https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/landingImages/logo-with-shadow.png?t=2024-05-23T19%3A47%3A44.023ZZ"
      className={`${imageSize} rounded-sm`}
    />
  ),
};

// Fuzzy search options
const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.25, // Adjust this threshold to your needs
};
const fuse = new Fuse(Object.keys(icons), options);

const HandleIcons = ({ toolsArr }: { toolsArr: string[] }) => {
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
