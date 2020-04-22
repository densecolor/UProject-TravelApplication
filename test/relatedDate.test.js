import dayjs from 'dayjs'
import relativeDate from "../src/client/utils/relativeDate.js";

it("in 7 days", () => {
  // mock date 7 days before now
  const pastday = dayjs().subtract(7, 'day')
  const res = relativeDate(pastday)
  // assert
  expect(res).toEqual(
    'in 7 days'
  )
})
