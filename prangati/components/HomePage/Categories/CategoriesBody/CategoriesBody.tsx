import { Card, CardFooter, Image } from "@heroui/react";
import classNames from "classnames";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "@heroui/link";
import { useEffect, useState } from "react";
import axios from "axios";

import style from "./styleCategoriesBody.module.css";

import { archivo } from "@/config/fonts";

interface Category {
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
}

export default function CategoriesBody() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}categories`,
      );

      setCategories(data);
    }
    getCategories();
  }, []);

  const tallCategories = categories.filter((cat) => cat.cardType === "tall");
  const wideCategories = categories.filter((cat) => cat.cardType === "wide");
  const normalCategories = categories.filter(
    (cat) => cat.cardType === "normal",
  );

  return (
    <div className="grid grid-cols-12 gap-8 px-8">
      {tallCategories.map((category) => (
        <Card
          key={category.id}
          className={classNames(
            "col-span-3 row-span-2 h-[400px]",
            style["section-categories__card"],
          )}
        >
          <div
            className={classNames(style["section-categories__card-wrapper"])}
          >
            <Image
              removeWrapper
              alt={category.name}
              className={classNames(
                "z-0 object-cover",
                style["section-categories__card-image"],
              )}
              src={category.image.path}
            />
            <CardFooter className="absolute z-10 bottom-2 flex-col !items-start">
              <Link
                className={classNames(style["section-categories__card-bottom"])}
              >
                <h4
                  className={classNames(
                    style["section-categories__card-category"],
                    archivo.className,
                  )}
                >
                  {category.name}
                </h4>
                <MdKeyboardArrowRight
                  className={classNames(style["section-categories__card-icon"])}
                />
              </Link>
            </CardFooter>
          </div>
        </Card>
      ))}

      <div className="col-span-6 grid grid-rows-2 gap-4">
        {wideCategories.map((category) => (
          <Card
            key={category.id}
            className={classNames(
              "col-span-3 row-span-2 h-[190px]",
              style["section-categories__card"],
            )}
          >
            <div
              className={classNames(style["section-categories__card-wrapper"])}
            >
              <Image
                removeWrapper
                alt={category.name}
                className={classNames(
                  "z-0 object-cover w-full h-full",
                  style["section-categories__card-image--wide"],
                )}
                src={category.image.path}
              />
              <CardFooter
                className={classNames(
                  "absolute z-10 bottom-2 flex-col !items-start",
                  style["section-categories__card-bottom-wrapper--wide"],
                )}
              >
                <Link
                  className={classNames(
                    style["section-categories__card-bottom"],
                    style["section-categories__card-bottom--wide"],
                  )}
                >
                  <h4
                    className={classNames(
                      style["section-categories__card-category"],
                      style["section-categories__card-category--wide"],

                      archivo.className,
                    )}
                  >
                    {category.name}
                  </h4>
                  <MdKeyboardArrowRight
                    className={classNames(
                      style["section-categories__card-icon"],
                      style["section-categories__card-icon--wide"],
                    )}
                  />
                </Link>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 col-span-12">
        {normalCategories.map((category) => (
          <Card
            key={category.id}
            className={classNames(
              "h-[300px] w-[400px]",
              style["section-categories__card"],
            )}
          >
            <div
              className={classNames(style["section-categories__card-wrapper"])}
            >
              <CardFooter className="absolute z-10 top-1 flex-col !items-start">
                <h4
                  className={classNames(
                    style["section-categories__card-category__long"],
                    archivo.className,
                  )}
                >
                  {category.name}
                </h4>
              </CardFooter>
              <Image
                removeWrapper
                alt={category.name}
                className={classNames(
                  "z-0 w-full h-full object-cover",
                  style["section-categories__card-three-image"],
                )}
                src={category.image.path}
              />
              <CardFooter
                className={classNames(
                  "absolute z-10 bottom-8 flex-col right-8 !items-start",
                  style["section-categories__card-icon__normal"],
                )}
              >
                <MdKeyboardArrowRight
                  className={classNames(
                    style["section-categories__card-icon__long"],
                  )}
                />
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
