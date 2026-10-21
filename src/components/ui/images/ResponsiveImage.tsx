import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {}

export default function ResponsiveImage(props: Props) {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <Image
          {...props}
          alt={props.alt || "Image"}
          className={props.className}
        />
      </div>
    </div>
  );
}
