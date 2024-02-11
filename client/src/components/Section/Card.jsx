import { motion } from "framer-motion"; // Import framer motion

const Card = (props) => {
  // Use the props to pass the data for the card
  const { image, title, description } = props;

  // Define the variants for the card animations
  const variants = {
    normal: {
      scale: 1,
    //   rotate: 0,
    },
    hover: {
      scale: 1.1,
    //   rotate: 10,
    },
    tap: {
      scale: 0.9,
    //   rotate: -10,
    },
  };

  return (
    // Use the motion component and the variants prop to animate the card
      <motion.div
          variants={variants}
      whileHover="hover"
              whileTap="tap"
      className="flex flex-col w-full mx-auto md:w-[26vw] h-[60vh] border border-zinc-500 rounded-xl overflow-hidden"
      
    >
          <motion.img
              
              src={image} alt={title} className="w-full h-2/3 object-cover" />
      <div className="flex flex-col p-4">
        <h3 className="text-2xl font-bold text-zinc-700">{title}</h3>
        <p className="text-lg text-zinc-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default Card;
