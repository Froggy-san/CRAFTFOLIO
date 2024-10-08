// import { formatDistance, parseISO } from "date-fns";
// import { differenceInDays } from "date-fns/esm";

import supabase from "@/services/supabase";
import { formatDistance, parseISO, subDays } from "date-fns";

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
    value,
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

// export function isValidUrl(urlString: string): boolean {
//   try {
//     // Try creating a URL object first
//     new URL(urlString);
//     return true;
//   } catch (error) {
//     // Basic regex for initial filtering
//     const regex =
//       /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[]@!$&'()*,;=.]+$/i;
//     return regex.test(urlString);
//   }
// }

export function isValidUrl(
  urlString: string,
  allowedProtocols: string[] = ["http", "https", "ftp", "mailto"],
): boolean {
  try {
    const url = new URL(urlString);
    return allowedProtocols.includes(url.protocol.replace(":", ""));
  } catch (error) {
    return false;
  }
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

// export function calcHowManyDaysAgo(date: string) {
//   if (!date) {
//     console.warn("You didn't put a date!");
//     return "";
//   }
//   return formatDistance(date, new Date(), { addSuffix: true });
//   //=> "3 days ago"
// }

export function calcHowManyDaysAgo(date: string | undefined) {
  if (!date) {
    console.warn("You didn't put a date!");
    return "";
  } else {
    const dateToCompare = parseISO(date);
    return formatDistance(dateToCompare, new Date(), { addSuffix: true });
    //=> "3 days ago"
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

function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function isCloseMatch(input: string, target: string): boolean {
  const distance = getLevenshteinDistance(
    input.toLowerCase(),
    target.toLowerCase(),
  );
  return distance <= 2; // Adjust the threshold as needed
}
