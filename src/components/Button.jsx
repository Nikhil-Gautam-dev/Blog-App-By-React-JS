import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`py-2 px-4 rounded-lg ${bgColor} ${className} ${textColor}`}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
