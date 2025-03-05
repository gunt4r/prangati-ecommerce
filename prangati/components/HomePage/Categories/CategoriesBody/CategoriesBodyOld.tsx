// import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
// import classNames from "classnames";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { Link } from "@nextui-org/link";

// import style from "./styleCategoriesBody.module.css";

// import imageTablets from "@/public/imageCategoriesTablets.png";
// import imagePhones from "@/public/imageCategoriesPhone.png";
// import imagePhoto from "@/public/imageCategoriesPhoto.png";
// import imageGaming from "@/public/imageCategoriesControllers.png";
// import imagePC from "@/public/imageCategoriesPC.png";
// import imageGadget from "@/public/imageCategoriesGadgets.png";
// import imageAppliances from "@/public/imageCategoriesSpeaker.png";
// import { oswald } from "@/config/fonts";

// export default function CategoriesBody() {
//   return (
//     <div className="grid grid-cols-12 gap-8 px-8">
//       <Card
//         className={classNames(
//           "col-span-3 row-span-2 h-[400px]",
//           style["section-categories__card"],
//         )}
//       >
//         <div className={classNames(style["section-categories__card-wrapper"])}>
//           <Image
//             removeWrapper
//             alt="Card background"
//             className={classNames(
//               "z-0 object-cover",
//               style["section-categories__card-image"],
//             )}
//             src={imageTablets.src}
//           />
//           <CardFooter
//             className={classNames(
//               "absolute z-10 bottom-2 flex-col !items-start",
//             )}
//           >
//             <Link
//               className={classNames(style["section-categories__card-bottom"])}
//             >
//               <h4
//                 className={classNames(
//                   style["section-categories__card-category"],
//                   oswald.className,
//                 )}
//               >
//                 Laptops and tablets
//               </h4>
//               <MdKeyboardArrowRight
//                 className={classNames(style["section-categories__card-icon"])}
//               />
//             </Link>
//           </CardFooter>
//         </div>
//       </Card>
//       <Card
//         className={classNames(
//           "col-span-3 row-span-2 h-[400px]",
//           style["section-categories__card"],
//         )}
//       >
//         <div className={classNames(style["section-categories__card-wrapper"])}>
//           <Image
//             removeWrapper
//             alt="Card background"
//             className={classNames(
//               "z-0 object-cover",
//               style["section-categories__card-image"],
//             )}
//             src={imagePhones.src}
//           />
//           <CardFooter
//             className={classNames(
//               "absolute z-10 bottom-2 flex-col !items-start",
//             )}
//           >
//             <Link
//               className={classNames(style["section-categories__card-bottom"])}
//             >
//               <h4
//                 className={classNames(
//                   style["section-categories__card-category"],
//                   oswald.className,
//                 )}
//               >
//                 Mobile phones and accessories
//               </h4>
//               <MdKeyboardArrowRight
//                 className={classNames(style["section-categories__card-icon"])}
//               />
//             </Link>
//           </CardFooter>
//         </div>
//       </Card>

//       <div className="col-span-6  grid grid-rows-2 gap-4">
//         <Card
//           className={classNames(
//             "col-span-3 row-span-2 h-[190px]",
//             style["section-categories__card"],
//           )}
//         >
//           <div
//             className={classNames(style["section-categories__card-wrapper"])}
//           >
//             <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//               <h4
//                 className={classNames(
//                   style["section-categories__card-category__long"],
//                   oswald.className,
//                 )}
//               >
//                 Photo and video
//               </h4>
//             </CardHeader>
//             <Image
//               removeWrapper
//               alt="Card background"
//               className="z-0 w-full h-full object-cover"
//               src={imagePhoto.src}
//             />
//             <MdKeyboardArrowRight
//               className={classNames(
//                 style["section-categories__card-icon__long"],
//                 "absolute z-10 bottom-8 flex-col right-8 !items-start",
//               )}
//             />
//           </div>
//         </Card>

//         <Card
//           className={classNames(
//             "col-span-3 row-span-2 h-[190px]",
//             style["section-categories__card"],
//           )}
//         >
//           <div
//             className={classNames(
//               style["section-categories__card-wrapper__gaming"],
//             )}
//           >
//             <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//               <h4
//                 className={classNames(
//                   style["section-categories__gaming-category__long"],
//                   oswald.className,
//                 )}
//               >
//                 Gaming
//               </h4>
//             </CardHeader>
//             <Image
//               removeWrapper
//               alt="Card example background"
//               className={classNames(
//                 "z-0 w-full h-full scale-125 -translate-y-6 object-cover",
//                 style["section-category__gaming-image"],
//               )}
//               src={imageGaming.src}
//             />
//             <MdKeyboardArrowRight
//               className={classNames(
//                 style["section-categories__gaming-icon__long"],
//                 "absolute z-10 bottom-8 flex-col right-8 !items-start",
//               )}
//             />
//           </div>
//         </Card>
//       </div>

//       <div className="grid grid-cols-3 gap-8 col-span-12">
//         <Card
//           className={classNames(
//             "h-[300px] w-[400px]",
//             style["section-categories__card-three"],
//           )}
//         >
//           <div
//             className={classNames(style["section-categories__card-wrapper"])}
//           >
//             <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//               <h4
//                 className={classNames(
//                   style["section-categories__card-category__long"],
//                   oswald.className,
//                 )}
//               >
//                 PC components
//               </h4>
//             </CardHeader>
//             <Image
//               removeWrapper
//               alt="Card background"
//               className={classNames(
//                 "z-0 w-full h-full object-cover",
//                 style["section-categories__card-three-image"],
//               )}
//               src={imagePC.src}
//             />
//             <MdKeyboardArrowRight
//               className={classNames(
//                 style["section-categories__card-icon__long"],
//                 "absolute z-10 bottom-8 flex-col right-8 !items-start",
//               )}
//             />
//           </div>
//         </Card>

//         <Card
//           className={classNames(
//             "h-[300px] w-[400px]",
//             style["section-categories__card-three"],
//           )}
//         >
//           <div
//             className={classNames(style["section-categories__card-wrapper"])}
//           >
//             <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//               <h4
//                 className={classNames(
//                   style["section-categories__card-category__long"],
//                   oswald.className,
//                 )}
//               >
//                 Smart gadgets
//               </h4>
//             </CardHeader>
//             <Image
//               removeWrapper
//               alt="Card background"
//               className={classNames(
//                 "z-0 w-full h-full object-cover",
//                 style["section-categories__card-three-image"],
//                 style["section-category__gadget-image"],
//               )}
//               src={imageGadget.src}
//             />
//             <MdKeyboardArrowRight
//               className={classNames(
//                 style["section-categories__gadget-icon__long"],
//                 "absolute z-10 bottom-8 flex-col right-8 !items-start",
//               )}
//             />
//           </div>
//         </Card>

//         <Card
//           className={classNames(
//             "h-[300px] w-[400px]",
//             style["section-categories__card-three"],
//           )}
//         >
//           <div
//             className={classNames(style["section-categories__card-wrapper"])}
//           >
//             <CardHeader className="absolute z-10 top-1 flex-col !items-start">
//               <h4
//                 className={classNames(
//                   style["section-categories__card-category__long"],
//                   oswald.className,
//                 )}
//               >
//                 Small appliances
//               </h4>
//             </CardHeader>
//             <Image
//               removeWrapper
//               alt="Card background"
//               className={classNames(
//                 "z-0 w-full h-full object-cover",
//                 style["section-categories__card-three-image"],
//               )}
//               src={imageAppliances.src}
//             />
//             <MdKeyboardArrowRight
//               className={classNames(
//                 style["section-categories__card-icon__long"],
//                 "absolute z-10 bottom-8 flex-col right-8 !items-start",
//               )}
//             />
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
