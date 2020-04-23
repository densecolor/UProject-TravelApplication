import dayjs from 'dayjs'

const getRelativeDate = (date) => {
  const nowaday = dayjs()
  const futureday = dayjs(date)
  return futureday.diff(nowaday, 'day')
}

export default getRelativeDate
