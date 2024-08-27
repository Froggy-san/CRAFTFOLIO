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
  resume,
  className,
}: {
  userSocials: string;
  userEmail: string;
  userPhone: string;
  resume: string;
  isTheOwnerOfPage: boolean;
  postOwnerId?: string;
  className?: string;
}) => {
  const { isLoading, data } = useUserFooter(postOwnerId);

  const userFooter: UserFooterProps | undefined =
    data && data.length ? data[0] : undefined;

  if (isLoading) return <FullSnLoading />;

  return (
    <div id="contact" className="mt-24">
      {isTheOwnerOfPage && <FooterDiaDrawer footerData={userFooter} />}
      <div
        id="footer-container"
        className={`relative flex h-[86vh] flex-col items-center justify-center gap-10 text-center antialiased md:h-[90vh] ${
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
          className="max-w-[600px] tracking-wide text-foreground/70"
        />
        <EmailButton
          text={userFooter?.emailBtnText}
          copiableText={userFooter?.copyText || userEmail}
        />

        <Links
          resume={resume}
          userPhone={userPhone}
          userEmail={userEmail}
          userSocials={userSocials}
        />
      </div>
    </div>
  );
};

export default Footer;
