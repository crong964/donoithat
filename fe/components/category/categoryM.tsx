"use client";
import { Menu } from "antd";
import { MenuItem } from "@/components/ui/menu";
import { iMainCateGory } from "./interface";

export default function CategoryM({
  categoryChidlren,
  id,
  nameCategory,
  slug,
  categoryId,
  categoryImage,
}: iMainCateGory) {
  const item: MenuItem[] = [
    {
      label: nameCategory,
      key: id,
      children: categoryChidlren.map(
        ({ nameCategory, id, slug, categoryId, categoryImage }) => {
          return {
            label: (
              <a className="text-text-shop font-normal" href="#">
                {nameCategory}
              </a>
            ),
            key: id,
          };
        }
      ),
    },
  ];
  return (
    <Menu
      mode="inline"
      items={item}
      inlineIndent={0}
      forceSubMenuRender={true}
    />
  );
}
