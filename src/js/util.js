export const availableKeyframe = ({ name, duration, frames }) => {
  return name && duration > 0 && frames.length > 0
}