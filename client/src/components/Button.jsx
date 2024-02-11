
const Button = (props ) => {
  return (
      <button className='flex items-center gap-x-2 px-4 py-2 border-2 border-zinc-400 rounded-full'>
          {props.text} 
          {props.icon }
    </button>
  )
}

export default Button
