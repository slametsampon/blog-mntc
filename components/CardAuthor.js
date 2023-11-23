import Image from './Image'

const CardAuthor = ({ author }) => (
  <div className="mt-5 flex flex-col gap-5 divide-x md:flex-row">
    <div
      className={`${
        author.avatar && 'h-full'
      } min-w-min overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {author.avatar && (
        <Image
          alt={author.name}
          src={author.avatar}
          width={544}
          height={306}
          className="object-cover object-center"
        />
      )}
    </div>
    <div>
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{author.name}</h2>
        <h3 className="mb-3 text-xl font-bold leading-8 tracking-tight">{author.occupation}</h3>
        <h4 className="mb-3 text-xl font-bold leading-8 tracking-tight">{author.company}</h4>
        <h4 className="mb-3 text-xl font-bold leading-8 tracking-tight">{author.email}</h4>
        <p className="prose mb-3 max-w-none font-bold text-gray-500 dark:text-gray-400">
          {author.bio}
        </p>
      </div>
    </div>
  </div>
)

export default CardAuthor
