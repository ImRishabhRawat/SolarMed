const Button = ({ text, icon }) => {
  return (
    <button
      className="flex items-center gap-x-2 px-4 py-2 border-2 border-zinc-400 rounded-full ">
      {text}
      {icon}
    </button>
  );
};

export default Button;
