/**
 * Consistent page padding + max width for every section.
 * The page-level enter/exit transition is handled by the Shell.
 */
export default function Page({ children, wide = false }) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${wide ? 'max-w-[1500px]' : 'max-w-[1240px]'}`}>
      <div className="py-10 sm:py-14 lg:py-20">{children}</div>
    </div>
  )
}
