export interface User {
  aud: string;
  email: string | undefined;
  id: string;
  avatar: string;
  phone: string;
  socials: string;
  speciality: string;
  username: string;
  created_at: string;
  role: string;
  resumeUrl: string;
}
export interface UserTagProps {
  userId: string | undefined;
  username: string | undefined;
  avatar: string | undefined;
}

export interface landingProps {
  id: number;
  avatarImage: string;
  landingImage: string;
  created_at: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  grainyTexture: boolean;
  blur: boolean;
  socials: string;
  user_id: string;
}

export interface createLandingProps {
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  socials: string;
  avatar: File[] | string;
  landingImage: File[] | string;
  grainyTexture: boolean;
  blur: boolean;
  user_id: string;
}

export interface editLandingProps {
  id: number;
  landingImage: File[] | string;
  avatar: File[] | string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  socials: string;
  user_id: string;
  grainyTexture: boolean;
  blur: boolean;
  avatarImageToDelete: string | null;
  landingImageToDelete: string | null;
}

export interface publicUser {
  userId: string;
  username: string;
  avatar: string;
}

export interface imageObject {
  id: number;
  project_id: number;
  imageUrl: string;
}

export interface Project {
  id: number;
  user_id: string;
  created_at: string;
  description: string;
  projectImages: imageObject[];
  type: string;
  technologies: string;
  startDate: string;
  endDate: string;
  name: string;
  links: string;
  contributors: string;
  publicUsers?: publicUser;
}

export interface createProjectProps {
  name: string;
  type: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  technologies: string;
  contributors: string;
  links: string;
  description: string;
  projectImages: File[] | "";
  user_id: string;
}

export interface editProjectProps {
  name: string;
  type: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  technologies: string;
  contributors: string;
  links: string;
  description: string;
  projectImages: File[];
}

export interface editProps {
  postToEdit: editProjectProps;
  imagesToDelete: string[];
  postId: number;
}

// shadcn button types
export type variant =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | null
  | undefined;

// button types

export type buttonType = "button" | "submit" | "reset" | undefined;
