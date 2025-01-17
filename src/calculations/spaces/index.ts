import Kitchen from './common area/kitchen'
import Canteen from './common area/canteen'
import Auditorium from './common area/auditorium'
import Course from './common area/course'
import Anteroom from './common area/anteroom'
import WorkTouchdown from './workspace/touchdown'
import SharedTouchdown from './coworking/touchdown'
import WorkDockin from './workspace/dockin'
import SharedDockin from './coworking/dockin'
import CellOffice from './workspace/celloffice'
import Landscape from './workspace/landscape'
import Projectroom from './workspace/projectroom'
import Focusroom from './workspace/focusroom'
import Quietzone from './workspace/quietzone'
import CoffeeStation from './workspace/coffeestation'
import MiniKitchenLounge from './workspace/minikitchenlounge'
import SharedSmallMeetingroom from './coworking/meetingroom_small'
import SharedMediumMeetingroom from './coworking/meetingroom_medium'
import SharedLargeMeetingroom from './coworking/meetingroom_large'
import WorkMiniMeetingroom from './workspace/meetingroom_mini'
import WorkSmallMeetingroom from './workspace/meetingroom_small'
import WorkMediumMeetingroom from './workspace/meetingroom_medium'
import WorkLargeMeetingroom from './workspace/meetingroom_large'
import SharedMultiroom from './coworking/multiroom'
import WorkMultiroom from './workspace/multiroom'
import WorkReception from './workspace/reception'
import SharedReception from './coworking/reception'
import WorkWaitingZone from './workspace/waitingzone'
import SharedWaitingZone from './coworking/waitingzone'
import CopyArchive from './workspace/copyarchive'
import Cleaning from './workspace/cleaning'
import WorkPersonalStorage from './workspace/personalstorage'
import SharedPersonalStorage from './coworking/personalstorage'
import WorkWardrobe from './workspace/wardrobe'
import SharedWardrobe from './coworking/wardrobe'
import SharedCopyArchive from './coworking/copyarchive'
import WorkToilet from './workspace/toilet'
import SharedToilet from './coworking/toilet'
import WorkHwc from './workspace/hwc'
import SharedHwc from './coworking/hwc'
import WorkSpecial from './workspace/special'
import CommonReception from './common area/reception'
import CommonWaitingZone from './common area/waitingzone'
import CommonCopyArchive from './common area/copyarchive'
import CommonCleaning from './common area/cleaning'
import CommonToilet from './common area/toilet'
import CommonHwc from './common area/hwc'
import CommonWardrobe from './common area/wardrobe'
import CommonExerciseRoom from './common area/exerciseroom'
import SharedSpecial from './coworking/special'
import CommonSpecial from './common area/special'
import SharedProjectroom from './coworking/projectroom'
import SharedLounge from './coworking/lounge'
import type MainSpace from './main_space_class'

/**
 * This function returns the correct space class based on the space name.
 * @param {string} spaceName - The name of the space
 */
const getSpace = (spaceName: string): typeof MainSpace => {
  if (spaceName === 'kitchen') return Kitchen
  if (spaceName === 'canteen') return Canteen
  if (spaceName === 'auditorium') return Auditorium
  if (spaceName === 'course') return Course
  if (spaceName === 'anteroom area') return Anteroom
  if (spaceName === 'touchdown – workspace') return WorkTouchdown
  if (spaceName === 'touchdown – coworking') return SharedTouchdown
  if (spaceName === 'dock in – workspace') return WorkDockin
  if (spaceName === 'dock in – coworking') return SharedDockin
  if (spaceName === 'cell office') return CellOffice
  if (spaceName === 'landscape') return Landscape
  if (spaceName === 'project room') return Projectroom
  if (spaceName === 'focus room') return Focusroom
  if (spaceName === 'quiet zone') return Quietzone
  if (spaceName === 'coffee station') return CoffeeStation
  if (spaceName === 'mini kitchen lounge') return MiniKitchenLounge
  if (spaceName === 'small meeting room – coworking') return SharedSmallMeetingroom
  if (spaceName === 'medium meeting room – coworking') return SharedMediumMeetingroom
  if (spaceName === 'large meeting room – coworking') return SharedLargeMeetingroom
  if (spaceName === 'mini meeting room – workspace') return WorkMiniMeetingroom
  if (spaceName === 'small meeting room – workspace') return WorkSmallMeetingroom
  if (spaceName === 'medium meeting room – workspace') return WorkMediumMeetingroom
  if (spaceName === 'large meeting room – workspace') return WorkLargeMeetingroom
  if (spaceName === 'multi room – coworking') return SharedMultiroom
  if (spaceName === 'multi room – workspace') return WorkMultiroom
  if (spaceName === 'reception – workspace') return WorkReception
  if (spaceName === 'reception – coworking') return SharedReception
  if (spaceName === 'waiting zone – workspace') return WorkWaitingZone
  if (spaceName === 'waiting zone – coworking') return SharedWaitingZone
  if (spaceName === 'copy & archive') return CopyArchive
  if (spaceName === 'cleaning') return Cleaning
  if (spaceName === 'personal storage – workspace') return WorkPersonalStorage
  if (spaceName === 'personal storage – coworking') return SharedPersonalStorage
  if (spaceName === 'wardrobe – workspace') return WorkWardrobe
  if (spaceName === 'wardrobe – coworking') return SharedWardrobe
  if (spaceName === 'toilet – workspace') return WorkToilet
  if (spaceName === 'toilet – coworking') return SharedToilet
  if (spaceName === 'hwc – workspace') return WorkHwc
  if (spaceName === 'hwc – coworking') return SharedHwc
  if (spaceName === 'special – workspace') return WorkSpecial
  if (spaceName === 'reception – common area') return CommonReception
  if (spaceName === 'waiting zone – common area') return CommonWaitingZone
  if (spaceName === 'copy & archive – common area') return CommonCopyArchive
  if (spaceName === 'copy & archive – coworking') return SharedCopyArchive
  if (spaceName === 'cleaning – common area') return CommonCleaning
  if (spaceName === 'toilet – common area') return CommonToilet
  if (spaceName === 'hwc – common area') return CommonHwc
  if (spaceName === 'wardrobe – common area') return CommonWardrobe
  if (spaceName === 'exercise room – common area') return CommonExerciseRoom
  if (spaceName === 'special – coworking') return SharedSpecial
  if (spaceName === 'special – common area') return CommonSpecial
  if (spaceName === 'project room – coworking') return SharedProjectroom
  if (spaceName === 'lounge area – coworking') return SharedLounge
  throw new Error(`Space ${spaceName} not found`)
}

export default getSpace
