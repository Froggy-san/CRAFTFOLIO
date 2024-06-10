import { Project } from "@/types/types";

import CardItem from "@/components/shared/CardItem";

const ProjectItem = ({ project }: { project: Project }) => {
  return (
    <CardItem  post={project} />

  );
};

export default ProjectItem;
