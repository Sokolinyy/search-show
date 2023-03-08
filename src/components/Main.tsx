import React from 'react'

type Props = {
  data?: {
    id: number;
    name: string;
}[]
}


const Main = ({ data }: Props) => {
  const isEmpty = () => {
    if (data?.length === 0) {
      return <li>Not found</li>
    }
  }

  return (
    <main className='main'>
      <ul>
        {data ? (
          data.map(item => <li key={item.id}>{item.name}</li>)
        ) : (
          isEmpty()
        )}
      </ul>
    </main>
  )
}

export default Main