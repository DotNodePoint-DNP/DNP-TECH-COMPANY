import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  size?: "small" | "medium" | "large";
};

export default function BrandLogo({ size = "medium" }: BrandLogoProps) {
  const imageSize =
    size === "small" ? "h-10" : size === "large" ? "h-16" : "h-14";

  const titleSize =
    size === "small" ? "text-lg" : size === "large" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className="flex items-center gap-3 bg-transparent">
      <Image
        src="/images/logo.png"
        alt="DotNode Point Logo"
        width={180}
        height={60}
        priority
        className={`${imageSize} w-auto bg-transparent object-contain`}
      />

      <div>
        <div className={`${titleSize} font-bold leading-tight`}>
          <span className="text-green-400">DotNode</span>{" "}
          <span className="text-green-200">Point</span>
        </div>

        <p className="text-[10px] leading-tight text-white">
          Software & Web Services
        </p>
      </div>
    </Link>
  );
}
