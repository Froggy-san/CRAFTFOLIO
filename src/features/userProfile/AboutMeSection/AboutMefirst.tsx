// // import CopyClipboard from "@/components/shared/CopyClipboard";
// // import Heading from "@/components/shared/Heading";
// // import IconButton from "@/components/shared/IconButton";

// import { Textarea } from "@/components/ui/textarea";
// import { useEffect, useRef, useState } from "react";

// import Collapse from "@/components/shared/Collapse";
// import useAboutMe from "../useAboutMe";
// import useEditAboutMe from "../useEditAboutMe";
// import FullSnLoading from "@/components/shared/FullSnLoading";
// // import { Link } from "react-router-dom";
// // import EditAboutMe from "./EditAboutMe";
// import HandleLinkIcons from "@/components/shared/HandleLinkIcons";
// import { Badge } from "@/components/ui/badge";
// // import { FaLink } from "react-icons/fa6";
// import { handleText } from "@/utils/helper";

// const defaultText = `            Tech-savvy and eager, the Junior React Developer combines web
// fundamentals with a love for React, a UI-building library. They
// write clean code and navigate the web's blueprint. Their React
// skills shine, crafting reusable components and managing data flow.
// Always learning, they explore React's ecosystem. From
// collaborating on projects to crafting UIs, each challenge paves
// their path to becoming a web development force. Tech-savvy and
// eager, the Junior React Developer combines web fundamentals with a
// love for React, a UI-building library. They write clean code and
// navigate the web's blueprint. Their React skills shine, crafting
// reusable components and managing data flow. Always learning, they
// explore React's ecosystem. From collaborating on projects to
// crafting UIs, each challenge paves their path to becoming a web
// development force.Tech-savvy and eager, the Junior React Developer
// combines web fundamentals with a love for React, a UI-building
// library. They write clean code and navigate the web's blueprint.
// Their React skills shine, crafting reusable components and
// managing data flow. Always learning, they explore React's
// ecosystem. From collaborating on projects to crafting UIs, each
// challenge paves their path to becoming a web development
// force.Tech-savvy and eager, the Junior React Developer combines
// web fundamentals with a love for React, a UI-building library.
// They write clean code and navigate the web's blueprint. Their
// React skills shine, crafting reusable components and managing data
// flow. Always learning, they explore React's ecosystem. From
// collaborating on projects to crafting UIs, each challenge paves
// their path to becoming a web development force.Tech-savvy and
// eager, the Junior React Developer combines web fundamentals with a
// love for React, a UI-building library. They write clean code and
// navigate the web's blueprint. Their React skills shine, crafting
// reusable components and managing data flow. Always learning, they
// explore React's ecosystem. From collaborating on projects to
// crafting UIs, each challenge paves their path to becoming a web
// development force. explore React's ecosystem. From collaborating
// on projects to crafting UIs, each challenge paves their path to
// becoming a web development force. explore React's ecosystem. From
// collaborating on projects to crafting UIs, each challenge paves
// their path to becoming a web development force. explore React's
// ecosystem. From collaborating on projects to crafting UIs, each
// challenge paves their path to becoming a web development force.`;

// interface aboutMeProps {
//   isAuthenticated: boolean;
//   userId: string;
// }

// const AboutMe = ({ isAuthenticated, userId }: aboutMeProps) => {
//   const { isLoading, aboutMe } = useAboutMe();
//   const { isEditting, editAboutMe } = useEditAboutMe();
//   const [clickCount, setClickCount] = useState(0);
//   const [isEdittingLinks, setIsEdittingLinks] = useState(false);
//   const [linksValue, setLinksValue] = useState("");
//   const [aboutMeValue, setAboutMeValue] = useState("");
//   const text = useRef({ text: "", links: "" });

//   const data = aboutMe?.[0];

//   function handleEditting() {
//     if (clickCount === 2) return;
//     setClickCount((count) => count + 1);
//   }

//   useEffect(() => {
//     setAboutMeValue(data?.aboutMe || "");
//     setLinksValue(data?.links || "");
//     if (text.current) {
//       text.current.text = data?.aboutMe || "";
//       text.current.links = data?.links || "";
//     }
//   }, [aboutMe]);

//   useEffect(() => {
//     if (clickCount > 0 && clickCount < 2) {
//       const resetCount = setTimeout(() => {
//         setClickCount(0);
//       }, 500);

//       return () => clearTimeout(resetCount);
//     }
//   }, [clickCount]);

//   if (isLoading || isEditting) return <FullSnLoading />;

//   if (!isAuthenticated)
//     // if the current vistor isn't the owner of the page return the text only.
//     return (
//       <div className=" ">
//         <Collapse textLenght={1200}>
//           <Collapse.CollapseContant className="md:px-10 text-lg mt-16">
//             {data?.aboutMe || defaultText}
//           </Collapse.CollapseContant>
//           <Collapse.CollapseButton arrowPositionX="right" />
//         </Collapse>

//         <div className=" mt-12 md:px-10  ">
//           {linksValue ? (
//             <HandleLinkIcons
//               className=""
//               links={data?.links.split(",") || []}
//             />
//           ) : null}
//         </div>
//       </div>
//     );

//   return (
//     <div className=" ">
//       {/* About me section start */}
//       <div className="">
//         {clickCount === 2 ? (
//           <div className=" space-y-4 my-5">
//             <h1 className=" leading-none font-medium">About me</h1>
//             <Textarea
//               value={aboutMeValue}
//               className=" h-48"
//               autoFocus
//               onChange={(e) => {
//                 setAboutMeValue(e.target.value);
//               }}
//               onBlur={() => {
//                 setClickCount(0);
//                 if (
//                   text.current &&
//                   text.current.text.length === aboutMeValue.length
//                 )
//                   return;
//                 editAboutMe({ aboutMe: aboutMeValue, userId });
//               }}
//             />
//           </div>
//         ) : (
//           <>
//             <Collapse textLenght={1200}>
//               <Collapse.CollapseContant
//                 onClick={handleEditting}
//                 className="md:px-10 text-lg mt-16  break-words"
//                 style={{ whiteSpace: "pre-wrap" }}
//               >
//                 {aboutMeValue || defaultText}
//               </Collapse.CollapseContant>
//               <Collapse.CollapseButton arrowPositionX="right" />
//             </Collapse>
//           </>
//         )}
//       </div>
//       {/* About me section end */}

//       <div className=" mt-12 md:px-10 ">
//         {isEdittingLinks ? (
//           <div className=" space-y-4 my-5">
//             <h1 className=" leading-none font-medium">Links</h1>
//             <Textarea
//               value={linksValue}
//               className=" h-48"
//               autoFocus
//               onChange={(e) => {
//                 setLinksValue(e.target.value);
//               }}
//               onBlur={() => {
//                 setIsEdittingLinks(false);
//                 // console.log(text.current.links, linksValue, " TESXTT");
//                 if (
//                   text.current &&
//                   handleText(text.current.links).length ===
//                     handleText(linksValue).length
//                 )
//                   return;
//                 // const links = handleText(linksValue);
//                 editAboutMe({ links: handleText(linksValue), userId });
//               }}
//             />
//           </div>
//         ) : (
//           <div className=" relative  ">
//             {linksValue ? (
//               <HandleLinkIcons
//                 errorMessage="The links you have provided are invaild"
//                 className=""
//                 links={data?.links.split(",") || []}
//               />
//             ) : (
//               <h1 className=" text-center font-semibold border py-3 rounded-md ">
//                 Add related links
//               </h1>
//             )}
//             <Badge
//               onClick={() => setIsEdittingLinks(true)}
//               className=" cursor-pointer absolute right-0 bottom-[-50px]"
//             >
//               {linksValue ? "Edit links" : "Add links"}
//             </Badge>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AboutMe;
