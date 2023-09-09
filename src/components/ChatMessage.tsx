const episodes = [
  {
    url: "https://www.youtube.com/embed/IAbhei16pL8?si=7DbJKKeB4UKNl4DX",
    name: "Applications of Generative AI with Jim Fan, Amjad Masad, and Michele Catasta"
  },
  {
    url: "https://www.youtube.com/embed/ByhMpN2iSbc?si=3r8NVKgEWv5budUE",
    name: "Unleashing LLMs in Production: Challenges & Opportunities. Chip Huyen, Amjad Masad & Michele Catasta"
  },
  {
    url: "https://www.youtube.com/embed/B-szEQsQ9yI?si=DDoI4pvCXBfSKpwa",
    name: "The Next Generation of LLMs with MosaicML"
  },
  {
    url: "https://www.youtube.com/embed/iyYYVuNzZeI?si=Dm9V9IVoRAvFQeHw",
    name: "Replit AI Podcast: Replit x Bard with Paige Bailey"
  },
]

export default function ChatMessage(props: {
  message: string;
  role: 'system' | 'user' | 'assistant' | 'function'
}) {
  const { message, role } = props

  if (role === 'system') return null
  if (role === 'user') {
    return (
      <div className="px-5 lg:px-20 py-5 text-gray-100 bg-neutral-900">
        <p className="max-w-3xl mx-auto">
          {message}
        </p>
      </div>
    )
  }
  if (role === 'assistant') {
    const split = message.split('<ts-delim>')
    const userFacing = split[0]
    const timestamps = split[1]?.trim().split('\n')

    return (
      <div className="px-5 lg:px-20 py-5">
        <div className="text-gray-200 max-w-3xl mx-auto">
          {userFacing}
        </div>
        {((timestamps && timestamps.length === 1 && timestamps[0].split(' ').length === 2) || (timestamps && timestamps.length === 2 && timestamps[0].split(' ').length === 2 && timestamps[1].split(' ').length === 2))
          ? (
            <div className="my-8 flex overflow-x-auto space-x-5">
              {timestamps.map((ts, idx) => (
                <iframe 
                  key={idx}
                  width="560"
                  height="315"
                  src={`${episodes[parseInt(ts.split(' ')[1].split('_')[0]) - 1].url}&amp;start=${Math.floor(parseFloat(ts.split(' ')[0])) - 5}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ))}
            </div>
          ) : null}
      </div>
    )
  }
}
