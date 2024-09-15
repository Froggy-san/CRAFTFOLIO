import CopyClipboard from "@/components/shared/CopyClipboard";
import { extractDomain, icons } from "@/components/shared/HandleLinkIcons";
import Heading from "@/components/shared/Heading";
import { isCloseMatch } from "@/utils/helper";
import { MdOutlinePreview } from "react-icons/md";

const Links = ({
  links,
  isOwner,
}: {
  links: string | undefined;
  isOwner: boolean;
}) => {
  const linksArr: { description: string; url: string }[] = links
    ? JSON.parse(links)
    : [];

  if (!isOwner && !linksArr.length) return null;

  return (
    <div>
      <Heading Text="Links:" as="h3" className="text-lg font-semibold" />
      <div className="mt-5 flex flex-col flex-wrap justify-center gap-x-3 sm:flex-row">
        {linksArr.map((link, i) => {
          const icon = isCloseMatch(link.description, "preview") ? (
            <MdOutlinePreview size={20} />
          ) : (
            icons[extractDomain(link.url, false) as string]
          );

          return (
            <div
              key={i}
              className="my-4 flex min-w-[48%] max-w-[100%] flex-1 flex-col gap-1"
            >
              <div className="flex items-center text-sm font-semibold">
                {icon && <span className="mr-2">{icon}</span>}{" "}
                {link.description}
              </div>
              <CopyClipboard
                className="mt-5 h-9 w-full text-sm"
                text={link.url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Links;
