import dayjs from 'dayjs'
import relativeDate from "../src/client/utils/relativeDate.js";

it("6 days left", () => {
  // mock date 7 days before now
  const futureday = dayjs().add(7, 'day').format('YYYY-MM-DD')
  const res = relativeDate(futureday)
  // assert
  expect(res).toEqual(6)
})
