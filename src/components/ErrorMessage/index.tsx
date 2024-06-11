export const ErrorMessage = ({
  children
}: {
  children: JSX.Element | string
}) => {
  return (
    <p className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm'>
      {children}
    </p>
  )
}
