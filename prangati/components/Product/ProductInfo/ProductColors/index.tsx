import "./styleProductColors.scss";

type Color = {
  id: string;
  name: string;
  hexCode: string;
};
export default function ProductColors({
  color,
  isSelected,
  handleClick,
}: {
  color: Color;
  isSelected: boolean;
  handleClick: (name: string) => void;
}) {
  return (
    <div
      key={color.id}
      className={`section-product__info--colors--container--color ${
        isSelected ? "selected" : ""
      }`}
      role="button"
      style={{ backgroundColor: color.hexCode }}
      tabIndex={0}
      onClick={() => handleClick(color.name)}
      onKeyDown={() => handleClick(color.name)}
    >
      {isSelected && <div className="selected-indicator" />}
    </div>
  );
}
