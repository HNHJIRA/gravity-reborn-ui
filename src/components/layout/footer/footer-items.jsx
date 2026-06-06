import { HeadingText } from "@/components/ui/text/heading-text";
import Link from "next/link";

export function FooterItems({ data, title }) {
  return (
    <>
      <div className="space-y-4">
        <HeadingText highlight={title} className="text-2xl! " />
        <ul className="space-y-4 text-sm text-muted-foreground">
          {data?.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span
                  className={`
                absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300
                group-hover:w-full
              `}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
