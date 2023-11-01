import Kitchen from './common area/kitchen'
import Canteen from './common area/canteen'
import Auditorium from './common area/auditorium'
import Course from './common area/course'
import Lobby from './common area/lobby'
import WorkTouchdown from './work related area/touchdown'
import SharedTouchdown from './shared area/touchdown'
import WorkDockin from './work related area/dockin'
import SharedDockin from './shared area/dockin'
import CellOffice from './work related area/celloffice'
import Landscape from './work related area/landscape'
import Projectroom from './work related area/projectroom'
import Focusroom from './work related area/focusroom'
import Quietzone from './work related area/quietzone'
import CoffeeStation from './work related area/coffeestation'
import MiniKitchenLounge from './work related area/minikitchenlounge'
import SharedSmallMeetingroom from './shared area/meetingroom_small'
import SharedMediumMeetingroom from './shared area/meetingroom_medium'
import SharedLargeMeetingroom from './shared area/meetingroom_large'
import WorkMiniMeetingroom from './work related area/meetingroom_mini'
import WorkSmallMeetingroom from './work related area/meetingroom_small'
import WorkMediumMeetingroom from './work related area/meetingroom_medium'
import WorkLargeMeetingroom from './work related area/meetingroom_large'
import SharedMultiroom from './shared area/multiroom'
import WorkMultiroom from './work related area/multiroom'
import WorkReception from './work related area/reception'
import SharedReception from './shared area/reception'
import WorkWaitingZone from './work related area/waitingzone'
import SharedWaitingZone from './shared area/waitingzone'
import CopyArchive from './work related area/copyarchive'
import Cleaning from './work related area/cleaning'
import WorkPersonalStorage from './work related area/personalstorage'
import SharedPersonalStorage from './shared area/personalstorage'
import WorkWardrobe from './work related area/wardrobe'
import SharedWardrobe from './shared area/wardrobe'
import WorkToilet from './work related area/toilet'
import SharedToilet from './shared area/toilet'
import WorkHwc from './work related area/hwc'
import SharedHwc from './shared area/hwc'
import WorkSpecial from './work related area/special'
import CommonReception from './common area/reception'
import CommonWaitingZone from './common area/waitingzone'
import CommonStockArchive from './common area/stockarchive'
import CommonCleaning from './common area/cleaning'
import CommonToilet from './common area/toilet'
import CommonHwc from './common area/hwc'
import CommonWardrobe from './common area/wardrobe'
import CommonExerciseRoom from './common area/exerciseroom'
import SharedSpecial from './shared area/special'
import CommonSpecial from './common area/special'
import SharedProjectroom from './shared area/projectroom'
import SharedLounge from './shared area/lounge'

/**
 * This function returns the correct space class based on the space name.
 * @param {string} spaceName - The name of the space
 * @returns {any}
 */
const getSpace = (spaceName: string): any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (spaceName === 'kitchen') return Kitchen
  else if (spaceName === 'canteen') return Canteen
  else if (spaceName === 'auditorium') return Auditorium
  else if (spaceName === 'course') return Course
  else if (spaceName === 'lobby') return Lobby
  else if (spaceName === 'touchdown – work related area') return WorkTouchdown
  else if (spaceName === 'touchdown – shared area') return SharedTouchdown
  else if (spaceName === 'dock in – work related area') return WorkDockin
  else if (spaceName === 'dock in – shared area') return SharedDockin
  else if (spaceName === 'cell office') return CellOffice
  else if (spaceName === 'landscape') return Landscape
  else if (spaceName === 'project room') return Projectroom
  else if (spaceName === 'focus room') return Focusroom
  else if (spaceName === 'quiet zone') return Quietzone
  else if (spaceName === 'coffee station') return CoffeeStation
  else if (spaceName === 'mini kitchen lounge') return MiniKitchenLounge
  else if (spaceName === 'small meeting room – shared area') return SharedSmallMeetingroom
  else if (spaceName === 'medium meeting room – shared area') return SharedMediumMeetingroom
  else if (spaceName === 'large meeting room – shared area') return SharedLargeMeetingroom
  else if (spaceName === 'mini meeting room – work related area') return WorkMiniMeetingroom
  else if (spaceName === 'small meeting room – work related area') return WorkSmallMeetingroom
  else if (spaceName === 'medium meeting room – work related area') return WorkMediumMeetingroom
  else if (spaceName === 'large meeting room – work related area') return WorkLargeMeetingroom
  else if (spaceName === 'multi room – shared area') return SharedMultiroom
  else if (spaceName === 'multi room – work related area') return WorkMultiroom
  else if (spaceName === 'reception – work related area') return WorkReception
  else if (spaceName === 'reception – shared area') return SharedReception
  else if (spaceName === 'waiting zone – work related area') return WorkWaitingZone
  else if (spaceName === 'waiting zone – shared area') return SharedWaitingZone
  else if (spaceName === 'copy archive') return CopyArchive
  else if (spaceName === 'cleaning') return Cleaning
  else if (spaceName === 'personal storage – work related area') return WorkPersonalStorage
  else if (spaceName === 'personal storage – shared area') return SharedPersonalStorage
  else if (spaceName === 'wardrobe – work related area') return WorkWardrobe
  else if (spaceName === 'wardrobe – shared area') return SharedWardrobe
  else if (spaceName === 'toilet – work related area') return WorkToilet
  else if (spaceName === 'toilet – shared area') return SharedToilet
  else if (spaceName === 'hwc – work related area') return WorkHwc
  else if (spaceName === 'hwc – shared area') return SharedHwc
  else if (spaceName === 'special – work related area') return WorkSpecial
  else if (spaceName === 'reception – common area') return CommonReception
  else if (spaceName === 'waiting zone – common area') return CommonWaitingZone
  else if (spaceName === 'stock archive – common area') return CommonStockArchive
  else if (spaceName === 'cleaning – common area') return CommonCleaning
  else if (spaceName === 'toilet – common area') return CommonToilet
  else if (spaceName === 'hwc – common area') return CommonHwc
  else if (spaceName === 'wardrobe – common area') return CommonWardrobe
  else if (spaceName === 'exercise room – common area') return CommonExerciseRoom
  else if (spaceName === 'special – shared area') return SharedSpecial
  else if (spaceName === 'special – common area') return CommonSpecial
  else if (spaceName === 'project room – shared area') return SharedProjectroom
  else if (spaceName === 'lounge area – shared area') return SharedLounge
  else throw new Error(`Space ${spaceName} not found`)
}

export default getSpace
