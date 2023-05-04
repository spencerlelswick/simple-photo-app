import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from '../context'

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`
const Gallery = () => {
  const { searchValue } = useGlobalContext()

  const response = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchValue}`)
      return result.data
    },
  })

  console.log(response)

  if (response.isLoading) {
    return (
      <section className='image-container'>
        <h4>loading</h4>
      </section>
    )
  }

  if (response.isError) {
    return (
      <section className='image-container'>
        <h4>error</h4>
      </section>
    )
  }

  const results = response.data.results

  if (results.length < 1) {
    return (
      <section className='image-container'>
        <h4>no results</h4>
      </section>
    )
  }

  return (
    <section className='image-container'>
      {results.map((image) => {
        const url = image?.urls?.regular
        return <img src={url} key={image.id} alt={image.alt_description} />
      })}
    </section>
  )
}

export default Gallery
