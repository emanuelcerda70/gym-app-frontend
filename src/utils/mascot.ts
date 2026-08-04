export const getMascotAvatar = (racha: number): string => {
  if (racha >= 100) return "/mascots/lvl100.png"
  if (racha >= 60) return "/mascots/lvl60.png"
  if (racha >= 25) return "/mascots/lvl25.png"
  if (racha >= 10) return "/mascots/lvl10.png"
  return "/mascots/lvl1.png"
}
