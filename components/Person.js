import Link from 'next/link'

const Person = ({ person }) => {
  return (
    <Link href="/person/[id]" as={`/person/${person.id}`}>
      <a>{person.name}</a>
    </Link>
  )
}

export default Person
