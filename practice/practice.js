
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { isWeekend as isSatSun } from './weekend.js'
const date = dayjs().subtract(2,'month').format('dddd')

console.log(isSatSun(date))

