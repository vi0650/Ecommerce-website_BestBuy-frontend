import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import IconButton from "@mui/material/IconButton";

const Quantity = ({ quantity, inc, dec, theme }) => {
  return (
    <div className="flex last:rounded-tr-lg last:rounded-br-lg first:rounded-tl-lg first:rounded-bl-lg overflow-hidden">
      <IconButton
        aria-label="login"
        className="flex flex-col gap-1.5 h-14 w-14"
      >
        <span
          className={`flex m-4 cursor-pointer ${
            theme === "indigo" && "bg-indigo-600 text-white"
          }`}
          onClick={inc}
        >
          <PlusOutlined />
        </span>
      </IconButton>

      <span className="flex m-4 flex items-center justify-center font-medium ">
        {quantity}
      </span>
      
      <IconButton
        aria-label="login"
        className="flex flex-col gap-1.5 h-14 w-14"
      >
        <span
          className={`flex m-4 cursor-pointer ${
            theme === "indigo" && "bg-indigo-600 text-white"
          }`}
          onClick={dec}
        >
          <MinusOutlined />
        </span>
      </IconButton>
    </div>
  );
};

export default Quantity;
