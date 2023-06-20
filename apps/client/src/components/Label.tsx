export function Label({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className='my-1 hidden text-xs text-slate-400'>
      {children}
    </label>
  )
}
