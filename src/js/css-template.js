
export const generateKeyframe = animation => {
  const frameStr = animation.frames.map(generateFrame)
    .join('\n  ')
  return `@keyframes ${animation.name} {
  ${frameStr}
}`
}

function generateFrame({ per, properties }) {
  const propertiesStr = Object.keys(properties)
    .map(key => `${key}: ${properties[key]};`)
    .join('\n    ')
  return `${per}% {
    ${propertiesStr}
  }`
}



// TODO: get timing function
export const generateAnimation = animation => {
  const {
    name,
    selector,
    duration,
    delay,
    func = 'linear'
  } = animation
  return `${selector} {
  animation: ${name} ${func} ${duration}s ${delay}s infinite;
}`
}