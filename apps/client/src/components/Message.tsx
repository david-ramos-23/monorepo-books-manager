export function Message({
  message,
  className,
}: {
  message: string
  className: string
}) {
  return <p className={className}>{message}</p>
}
