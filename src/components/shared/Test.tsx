// import React, { useState } from "react";

// const LinkInputForm = () => {
//   const [links, setLinks] = useState([{ url: "", description: "" }]);

//   const handleLinkChange = (index: number, e) => {
//     const newLinks = [...links];
//     newLinks[index][e.target.name] = e.target.value;
//     setLinks(newLinks);
//   };

//   const handleAddLink = () => {
//     setLinks([...links, { url: "", description: "" }]);
//   };

//   const handleRemoveLink = (index) => {
//     const newLinks = [...links];
//     newLinks.splice(index, 1);
//     setLinks(newLinks);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Process the links (e.g., send to the backend or state management)
//     console.log(links);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {links.map((link, index) => (
//         <div key={index}>
//           <input
//             type="url"
//             name="url"
//             value={link.url}
//             onChange={(e) => handleLinkChange(index, e)}
//             placeholder="Enter the link"
//             required
//           />
//           <input
//             type="text"
//             name="description"
//             value={link.description}
//             onChange={(e) => handleLinkChange(index, e)}
//             placeholder="Enter the link description"
//             required
//           />
//           <button type="button" onClick={() => handleRemoveLink(index)}>
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddLink}>
//         Add Another Link
//       </button>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default LinkInputForm;
