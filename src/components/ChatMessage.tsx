import { episodes } from "@/utils/utils";

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
