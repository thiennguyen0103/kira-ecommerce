import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="logo" data-text="Awesome">
      <span className="actual-text">K-Shop</span>
      <span aria-hidden="true" className="front-text">
        K-Shop
      </span>
    </Link>
  );
};

export default Logo;
