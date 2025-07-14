export type Category = {
  id: string;
  name: string;
  cardType: "tall" | "wide" | "normal";
  image: {
    path: string;
    originalName: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
};
