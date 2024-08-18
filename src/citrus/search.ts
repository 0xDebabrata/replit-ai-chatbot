const citrusHost = 'https://sgp2gcssi7.execute-api.us-west-2.amazonaws.com/prod'
const citrusAPIKey = process.env.CITRUS_API_KEY || ''

export async function vectorSearch(index: string, queryVector: number[], topK = 10) {
  const response = await fetch(citrusHost + '/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': citrusAPIKey,
    },
    body: JSON.stringify({
      index_name: index,
      query_vectors: [queryVector],
      top_k: topK,
      include: ['document']
    })
  })

  const data = await response.json()
  console.log(topK)

  if (!response.ok) {
    console.error(data)
    return []
  }

  return data.results[0]
}
