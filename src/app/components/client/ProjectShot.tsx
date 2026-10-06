"use client";

import Image, { type ImageProps } from "next/image";
import { slideLoader } from "../../lib/cloudinary";

// 16:9 Cloudinary screenshot. A client wrapper because a loader function can't
// be passed to next/image from a server component.
export default function ProjectShot(props: Omit<ImageProps, "loader">) {
  return <Image loader={slideLoader} {...props} alt={props.alt} />;
}
