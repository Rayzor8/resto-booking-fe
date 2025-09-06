import React from "react";
import { menuData } from "../data/menu";
import Image from "next/image";

export default function MenuPage() {
  return (
    <div>
      {menuData.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <Image
            src={item.image}
            alt={item.name}
            width={300}
            height={300}
            priority
          />
        </div>
      ))}
    </div>
  );
}
