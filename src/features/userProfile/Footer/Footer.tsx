import useUserFooter from "./useUserFooter";
import EmailButton from "./EmailButton";
import Heading from "@/components/shared/Heading";
import FooterDiaDrawer from "./FooterDiaDrawer";
import { UserFooterProps } from "@/types/types";
import FullSnLoading from "@/components/shared/FullSnLoading";
import Links from "./Links";

const Footer = ({
  isTheOwnerOfPage,
  userSocials,
  userEmail,
  userPhone,
  postOwnerId,
  className,
}: {
  userSocials: string;
  userEmail: string;
  userPhone: string;
  isTheOwnerOfPage: boolean;
  postOwnerId?: string;
  className?: string;
}) => {
  const { isLoading, data } = useUserFooter(postOwnerId);

  const userFooter: UserFooterProps | undefined =
    data && data.length ? data[0] : undefined;

  if (isLoading) return <FullSnLoading />;

  if (!userFooter) return null;
  return (
    <div>
      {isTheOwnerOfPage && <FooterDiaDrawer footerData={userFooter} />}
      <div
        id="footer-container"
        className={` h-[70vh] md:h-[93vh] gap-10  flex flex-col items-center justify-center relative  antialiased text-center ${
          className || ""
        }`}
      >
        {/* <BackgroundBeams className="" /> */}
        <Heading
          as="h1"
          ariaLabel=""
          Text={userFooter?.heading || "Get in touch"}
          style={{
            fontSize: "clamp(40px, 5vw, 60px)",
            lineHeight: 1.1,
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        />

        <Heading
          as="h3"
          ariaLabel="get in touch"
          Text={
            userFooter?.additionalText ||
            "Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!"
          }
          className="  tracking-wide max-w-[600px] text-foreground/70"
        />
        <EmailButton
          text={userFooter?.emailBtnText}
          copiableText={userFooter?.copyText}
        />
        <Links
          userPhone={userPhone}
          userEmail={userEmail}
          userSocials={userSocials}
        />
      </div>
    </div>
  );
};

export default Footer;
