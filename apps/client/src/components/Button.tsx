export function Button({
  children,
  onClick,
  className,
  ...buttonProps
}: React.ComponentProps<'button'>) {
  return (
    <button onClick={onClick} className={className} {...buttonProps}>
      {children}
    </button>
  )
}
