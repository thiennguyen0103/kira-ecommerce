import { Icons } from "@/components/icons";
import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/configs/site.config";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "./newsletter";

const Footer = () => {
  return (
    <footer className="h-full space-y-10 border-t bg-[#f0f0f0] py-8">
      <Newsletter />
      <div className="container space-y-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-5">
          <div className="col-span-2 sm:col-span-4 md:col-span-1">
            <div className="mb-4 md:mb-6">
              <Logo />
            </div>
            <p className="mb-4 text-sm leading-6 text-black/60 md:mb-9">
              Chúng tôi có những bộ quần áo phù hợp với phong cách của bạn và
              bạn tự hào khi mặc chúng. Từ phụ nữ đến nam giới.
            </p>
            <div className="flex items-center gap-2">
              <Link href={"/"}>
                <Icons.facebook className="h-7 w-7" />
              </Link>
              <Link href={"/"}>
                <Icons.instagram className="h-7 w-7" />
              </Link>
              <Link href={"/"}>
                <Icons.zalo className="h-7 w-7" />
              </Link>
              <Link href={"/"}>
                <Icons.twitter className="h-7 w-7" />
              </Link>
            </div>
          </div>
          {siteConfig.footer.map((list) => (
            <div className="space-y-3 md:space-y-8" key={list.id}>
              <h1 className="cursor-default font-medium uppercase">
                {list.name}
              </h1>
              <ul className="space-y-3">
                {list.children.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className="block capitalize text-black/60 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="bg-black/10" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-sm text-black/60">
            © Bản quyền thuộc về <b>Kira Company</b> | Cung cấp bởi <b>Kira</b>
          </span>
          <div className="flex items-center">
            <Image src="/imgs/visa.png" alt="Visa" width={50} height={30} />
            <Image
              src="/imgs/master-card.png"
              alt="Master Card"
              width={50}
              height={30}
            />
            <Image src="/imgs/paypal.png" alt="Paypal" width={50} height={30} />
            <Image
              src="/imgs/apple-pay.png"
              alt="Apple Pay"
              width={50}
              height={30}
            />
            <Image
              src="/imgs/google-pay.png"
              alt="Google Pay"
              width={50}
              height={30}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
