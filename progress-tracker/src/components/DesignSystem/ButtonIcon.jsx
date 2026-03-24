const getClassByVariant = (variant) => {
  const commonClass = "border p-1 rounded-full cursor-pointer";
  let variableClass = "";
  switch (variant) {
    case "danger":
      variableClass = "text-red-500 border-red-500";
      break;
    case "info":
      variableClass = "text-blue-500 border-blue-500";
      break;
    case "warning":
      variableClass = "text-yellow-500 border-yellow-500";
      break;
    default:
      variableClass = "text-blue-500 border-blue-500";
  }

  return commonClass + " " + variableClass;
}
const  ButtonIcon = ({ Icon, varint, onClick, className, style }) => {
  return (
    <Icon
      onClick={onClick}
      className={getClassByVariant(varint) + " " + className}
      style={style}
    />
  );
};

export default ButtonIcon;
