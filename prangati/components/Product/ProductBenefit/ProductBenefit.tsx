import "./styleProductBenefit.scss";
import { poppins } from "@/config/fonts";
export default function ProductBenefit({
  children,
  style,
  icon,
  title,
}: {
  children: React.ReactNode;
  style?: { [key: string]: string };
  icon: JSX.Element;
  title: string;
}) {
  return (
    <div className="section-product__benefit" style={{ ...style }}>
      <div className="section-product__benefit-icon">{icon}</div>
      <div className="section-product__benefit-content">
        <p className={`section-product__benefit-title ${poppins.className}`}>{title}</p>
        {children}
      </div>
    </div>
  );
}
