import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const getRelativeDate = (date) => {
  const nowaday = dayjs()
  const pastday = dayjs(date)
  return nowaday.from(pastday)
}

export default getRelativeDate
