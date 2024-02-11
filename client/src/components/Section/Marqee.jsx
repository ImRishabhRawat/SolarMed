import { motion } from 'framer-motion'

const Marquee = () => {
  
  return (
    <div
      // data-scroll data-scroll-section data-scroll-speed=".2"
      className='w-full py-20 rounded-tl-3xl rounded-tr-3xl bg-blue-200'>
          <div className="text text-zinc-800 border-t-2 border-b-2 border-zinc-400 flex whitespace-nowrap  overflow-hidden">
              <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{repeat: Infinity ,ease: "linear", duration:20}} className="text-[10vw] tracking-wide leading-none  font-normal uppercase pr-10">
                 Making Healthcare Accessible and Affordable
              </motion.h1>
              <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{repeat: Infinity ,ease: "linear", duration:20}} className="text-[10vw] tracking-wide leading-none font-normal uppercase pr-10">
                 Making Healthcare Accessible and Affordable
              </motion.h1>
      </div>
    </div>
  )
}

export default Marquee