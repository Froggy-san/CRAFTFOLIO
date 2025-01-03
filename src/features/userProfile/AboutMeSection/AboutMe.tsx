import Collapse from "@/components/shared/Collapse";
import useAboutMe from "./useAboutMe";
import useEditAboutMe from "./useEditAboutMe";
import FullSnLoading from "@/components/shared/FullSnLoading";
import { defaultTextColor } from "@/utils/constants";
import AboutMeText from "./AboutMeText";

import AboutMeLinksTech, { ShowLinksAndTools } from "./AboutMeLinksTech";
import Heading from "@/components/shared/Heading";
interface aboutMeProps {
  isAuthenticated: boolean;
  userId: string;
}

interface dataTypes {
  created_at: string;
  aboutMe: string;
  id: number;
  links: string;
  toolsAndTech: string;
  arrowType: string;
  arrowColor: string;
  user_id: string;
}

const AboutMe = ({ isAuthenticated, userId }: aboutMeProps) => {
  const { isLoading, aboutMe } = useAboutMe();
  const { isEditting } = useEditAboutMe();
  const data: dataTypes | undefined = aboutMe?.[0];
  if (isLoading || isEditting) return <FullSnLoading />;
  const links = data && data.links ? JSON.parse(data.links) : [];
  const tools = data && data.toolsAndTech ? JSON.parse(data.toolsAndTech) : [];

  const arrowColor =
    data && data.arrowColor ? JSON.parse(data.arrowColor) : defaultTextColor;
  if (!isAuthenticated)
    // if the current vistor isn't the owner of the page return the text only.
    return (
      <div id="about" className="md:px-10">
        {data?.aboutMe && (
          <div>
            <Heading>About me</Heading>
            <Collapse textLenght={1200}>
              <Collapse.CollapseContant className="mt-16 text-lg">
                {data.aboutMe}
              </Collapse.CollapseContant>
              <Collapse.CollapseButton arrowPositionX="right" />
            </Collapse>
          </div>
        )}

        <ShowLinksAndTools
          isAuthenticated={isAuthenticated}
          links={links}
          tools={tools}
          arrowName={data?.arrowType}
          arrowColor={arrowColor}
        />
        {/* <div className=" mt-12 md:px-10  ">
          {linksValue ? (
            <HandleLinkIcons
              className=""
              links={data?.links.split(",") || []}
            />
          ) : null}
        </div> */}
      </div>
    );

  return (
    <div id="about">
      <AboutMeText aboutText={data?.aboutMe} userId={userId} />

      <AboutMeLinksTech
        userId={userId}
        isAuthenticated={isAuthenticated}
        linksAndtech={{
          links: data?.links,
          toolsAndTech: data?.toolsAndTech,
          arrowType: data?.arrowType,
          arrowColor: data?.arrowColor,
        }}
      />
      {/* <AboutMeFrom
        userId={userId}
        linksAndTech={{
          links: data?.links,
          toolsAndTech: data?.toolsAndTech,
          arrowType: data?.arrowType,
          arrowColor: data?.arrowColor,
        }}
      /> */}
    </div>
  );
};

export default AboutMe;
