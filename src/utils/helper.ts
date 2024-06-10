// import { formatDistance, parseISO } from "date-fns";
// import { differenceInDays } from "date-fns/esm";

import supabase from "@/services/supabase";

// // We want to make this function work for both Date objects and strings (which come from Supabase)
// export const subtractDates = (dateStr1, dateStr2) =>
//   differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// export const formatDistanceFromNow = (dateStr) =>
//   formatDistance(parseISO(dateStr), new Date(), {
//     addSuffix: true,
//   })
//     .replace("about ", "")
//     .replace("in", "In");

// // Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
// export const getToday = function (options = {}) {
//   const today = new Date();

//   // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
//   if (options?.end)
//     // Set to the last second of the day
//     today.setUTCHours(23, 59, 59, 999);
//   else today.setUTCHours(0, 0, 0, 0);
//   return today.toISOString();
// };

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "egp" }).format(
    value
  );

export const formatText = (value: string) => {
  return value.trim().toLocaleLowerCase();
};

export function randomYear(min: number, max: number): number {
  // Generate a random number between 0 and 1
  const random = Math.random();
  // Multiply it by the difference between the maximum and minimum year, and add the minimum year
  let year = random * (max - min) + min;
  // Round down the result to an integer
  year = Math.floor(year);
  // Return the random year
  return year;
}

const clothKeywords = [
  "shirt",
  "pants",
  "dress",
  "skirt",
  "jacket",
  "cloth",
  "clothing",
  "coat",
  "sweater",
  "hat",
  "scarf",
  "gloves",
  "socks",
  "shoes",
  "boots",
  "belt",
  "tie",
  "jeans",
  "t-shirt",
  "hoodie",
  "blouse",
  "shorts",
];

// Define a function that takes a string as a parameter and returns a boolean
export function hasClothKeywords(str: string): boolean {
  // Use the some method to check if any of the keywords are included in the string
  return clothKeywords.some((keyword) => str.includes(keyword));
}

const electronicKeywords = [
  "laptop",
  "phone",
  "tablet",
  "camera",
  "TV",
  "monitor",
  "keyboard",
  "mouse",
  "printer",
  "speaker",
  "headphone",
  "charger",
  "battery",
  "USB",
  "HDMI",
  "Bluetooth",
  "WiFi",
  "LED",
  "LCD",
  "RAM",
  "CPU",
  "GPU",
];

// Define a function that takes a product object as a parameter and returns a boolean
export function isItElectronic(str: string): boolean {
  // Use the some method to check if any of the keywords are included in the string
  return electronicKeywords.some((keyword) => str.includes(keyword));
}

export function validateEgyptianPhoneNumber(phoneNumber: string) {
  // define the regex
  const regex = /^01[0125][0-9]{8}$/;
  // test the string against the regex
  if (regex.test(phoneNumber)) {
    // return true if it matches
    return true;
  } else {
    // return false if it doesn't
    return false;
  }
}

export function scrollToTheTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function removeAllSpacesFrom(str: string, toUpperCase?: boolean) {
  const updatedStr = str
    // remove all spaces.
    .replace(/\s+/g, "")
    .split(",")
    .filter((el) => el !== "")
    .join(",");

  return toUpperCase ? updatedStr.toLocaleUpperCase() : updatedStr;
}

interface deleteFromStorageProps {
  storageName: string;
  imagesToDelete: string[];
}

export async function deleteImgFromStrage({
  storageName,
  imagesToDelete,
}: deleteFromStorageProps) {
  if (!imagesToDelete.length) return;
  const { error } = await supabase.storage
    .from(storageName)
    .remove([...imagesToDelete]);
  if (error) throw new Error(error.message);
}

export async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    // Fallback for browsers that don't support the Clipboard API
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }
}

export function handleText(text: string) {
  return text
    .split(",")
    .map((el) => el.trim())
    .filter((el) => el !== "")
    .join(",");
}

// Function to calculate the Levenshtein distance
//   const levenshteinDistance = (a, b) => {
//     const matrix = [];

//     for (let i = 0; i <= b.length; i++) {
//       matrix[i] = [i];
//     }

//     for (let j = 0; j <= a.length; j++) {
//       matrix[0][j] = j;
//     }

//     for (let i = 1; i <= b.length; i++) {
//       for (let j = 1; j <= a.length; j++) {
//         if (b.charAt(i - 1) === a.charAt(j - 1)) {
//           matrix[i][j] = matrix[i - 1][j - 1];
//         } else {
//           matrix[i][j] = Math.min(
//             matrix[i - 1][j - 1] + 1, // substitution
//             Math.min(
//               matrix[i][j - 1] + 1, // insertion
//               matrix[i - 1][j] + 1 // deletion
//             )
//           );
//         }
//       }
//     }

//     return matrix[b.length][a.length];
//   };

//   // Function to find the closest match to "preview:"
//   const findPreviewLink = (links, target) => {
//     return links.split(",").find((link) => {
//       const distance = levenshteinDistance(link.trim().toLowerCase(), target);
//       return distance < 3; // Threshold for matching, can be adjusted
//     });
//   };

//   const previewLink = findPreviewLink(post.links, "preview:");
//   console.log(previewLink, "Link");
// };

// Regex to match 'preview:' with potential misspellings
const previewRegex = /pre[av]iew:/i;

// Function to find the preview link
export const findPreviewLink = (links: string) => {
  return links.split(",").find((link) => previewRegex.test(link.trim()));
};
