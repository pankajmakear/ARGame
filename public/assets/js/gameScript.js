export const gameScriptComponent = {
  schema: {
    offsetRadius: {default: 10},
    interactionRadius: {default: 5},
    visibilityRadius: {default: 5},
  },

  init() {
    console.log('Initializing...')
    const couponContainer = document.querySelector('.coupon-container')
    const tryAgainContainer = document.querySelector('.try-again-container')
    const outerCircle = document.querySelector('.outer-circle')
    const scoreCard = document.querySelector('.score-card')
    const score = document.querySelector('.score')

    // Sounds
    const sound1 = document.getElementById('sound1')  // Full burger sound
    const sound2 = document.getElementById('sound2')  // Half burger sound
    const bombSound = document.getElementById('bombSound')
    const cokeSound = document.getElementById('cokeSound')
    const friesSound = document.getElementById('friesSound')
    const camera = document.querySelector('#camera')
    const tenPoints = document.querySelector('.ten-points')
    const tenPointsBg = document.querySelector('.ten-points-bg')
    const subtractedPoint = document.querySelector('.subtracted-point')
    const twoPoints = document.querySelector('.two-points')
    const onePoints = document.querySelector('.one-points')
    const minusTen = document.querySelector('.minus-ten')
    const minusTenBlast = document.querySelector('.minus-ten-blast')
    const radialGradient = document.querySelector('.radial-gradient')
    const oopsScoreValue = document.querySelector('.oops-score-value')
    const yourScoreValue = document.querySelector('.your-score-value')
    let value = 0  // Player's score
    const burgerCount = 2
    const maxBombCount = 1
    const maxCokeCount = 2
    const maxFriesCount = 2
    let gameActive = true

    function hideElement(element, time) {
      element.style.visibility = 'hidden'
      element.style.opacity = '0'

      if (time || time == 0) {
        setTimeout(() => {
          element.style.display = 'none'
        }, time)
      }
    }

    function showElement(element, time, displayType) {
      if (time || time == 0) {
        element.style.display = displayType || 'block'
      }

      setTimeout(() => {
        element.style.visibility = 'visible'
        element.style.opacity = '1'
      }, time || 0)
    }

    // let currentDeg = 360
    // let endDeg = 0
    // const duration = 60

    // const updateProgress = () => {
    //   const decrement = 360 / (duration * 30)
    //   const interval = setInterval(() => {
    //     currentDeg -= decrement

    //     outerCircle.style.background = `conic-gradient(#DB0007E5 ${currentDeg}deg, #FFBC0D 0deg)`

    //     if (currentDeg <= endDeg) {
    //       // couponContainer.style.display = 'block'
    //       // tryAgainContainer.style.display = 'block'
    //       scoreCard.style.display = 'none'

    //       clearInterval(interval)
    //       gameActive = false

    //       console.log('Time done')
    //       if (value >= 100) {
    //         showElement(couponContainer, 0)
    //       } else {
    //         showElement(tryAgainContainer, 0)
    //       }
    //     }
    //   }, 1000 / 30)
    // }

    // updateProgress()

    let currentDeg = 360
    let endDeg = 0
    const duration = 60
    const startTime = performance.now()

    const updateProgress = (timestamp) => {
      const elapsedTime = (timestamp - startTime) / 1000  // convert to seconds
      const progress = elapsedTime / duration  // progress fraction (0 to 1)
      currentDeg = 360 - (progress * 360)  // calculate degrees based on progress

      // Update the outer circle background gradient
      outerCircle.style.background = `conic-gradient(#DB0007E5 ${currentDeg}deg, #FFBC0D 0deg)`

      // If time is not up, continue the animation
      if (elapsedTime < duration) {
        requestAnimationFrame(updateProgress)
      } else {
        // Time is done, stop the game logic
        scoreCard.style.display = 'none'
        gameActive = false

        // Show the correct screen based on the score
        if (value >= 150) {
          yourScoreValue.textContent = value
          showElement(couponContainer, 0)
        } else {
          oopsScoreValue.textContent = value
          showElement(tryAgainContainer, 0)
        }
      }
    }
    requestAnimationFrame(updateProgress)

    function showOneTwoPoints(point) {
      showElement(point, 10)

      setTimeout(() => {
        hideElement(point, 300)
      }, 600)
    }

    function showTenPoints() {
      showElement(tenPointsBg, 0)
      showElement(tenPoints, 10)

      setTimeout(() => {
        hideElement(tenPointsBg, 300)
        hideElement(tenPoints, 300)
      }, 1000)
    }

    function showMinusTenPoints() {
      showElement(minusTen, 10)
      showElement(radialGradient, 10)
      showElement(minusTenBlast, 0)

      setTimeout(() => {
        hideElement(minusTen, 300)
        hideElement(radialGradient, 300)
        hideElement(minusTenBlast, 300)
      }, 1000)
    }
    // Using a Set to store stringified positions
    const spawnedPositionsSet = new Set()

    // Helper function to convert Vector3 position to a string
    const positionToString = pos => `${pos.x.toFixed(2)},${pos.y.toFixed(2)},${pos.z.toFixed(2)}`

    const getRandomPositionAroundCamera = (cameraPos, offsetRadius) => {
      const angle = Math.random() * Math.PI * 7.5
      const x = cameraPos.x + offsetRadius * Math.cos(angle)
      const z = cameraPos.z + offsetRadius * Math.sin(angle)
      const y = cameraPos.y + Math.random() * 7.5  // Random height variation (optional)
      return {x, y, z}
    }

    const calculateDistance = (pos1, pos2) => {
      const dx = pos1.x - pos2.x
      const dy = pos1.y - pos2.y
      const dz = pos1.z - pos2.z
      return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }

    // Check if the new position overlaps with any in the Set
    const isPositionOverlapping = (newPos) => {
      const minDistance = this.data.offsetRadius / 2
      for (const existingPosStr of spawnedPositionsSet) {
        const [x, y, z] = existingPosStr.split(',').map(Number)
        const existingPos = new THREE.Vector3(x, y, z)
        if (calculateDistance(existingPos, newPos) < minDistance) {
          return true
        }
      }
      return false
    }

    // Reposition the object
    const repositionObject = (entity) => {
      const cameraPos = new THREE.Vector3()
      camera.object3D.getWorldPosition(cameraPos)

      // Remove old position from the Set
      const oldPos = entity.object3D.position
      const oldPosStr = positionToString(oldPos)
      spawnedPositionsSet.delete(oldPosStr)  // O(1) deletion

      let newPos
      let isValidPosition = false

      // Loop until a valid position is found
      while (!isValidPosition) {
        newPos = getRandomPositionAroundCamera(cameraPos, this.data.offsetRadius)

        // Check if the new position doesn't overlap
        if (!isPositionOverlapping(newPos)) {
          isValidPosition = true
        }
      }

      entity.setAttribute('position', `${newPos.x} ${newPos.y} ${newPos.z}`)
      entity.setAttribute('visible', 'true')  // Ensure the entity is visible

      // Add the new position to the Set
      spawnedPositionsSet.add(positionToString(newPos))  // O(1) insertion
    }
    function triggerVibration(time) {
      if ('vibrate' in navigator) {
        // Trigger a simple vibration pattern: 500ms
        navigator.vibrate(time)
        console.log('is vibrate....')
      } else {
        console.log('Vibration API is not supported on your device.')
      }
    }
    const spawnChickenBurgerObject = (entityArr) => {
      const entity = document.createElement('a-entity')
      entity.setAttribute('position', '0 0 0')  // Will be repositioned later
      entity.setAttribute('look-at', '#camera')
      entity.setAttribute('visible', 'true')
      const image = document.createElement('a-image')
      image.setAttribute('src', '#full_burgerchicken_img')  // Initially full burger
      image.setAttribute('class', 'clickable')
      image.setAttribute('scale', '3 2 2')
      entity.appendChild(image)

      let burgerState = 'full'  // Track the state of the burger ('full' or 'half')

      entity.addEventListener('click', () => {
        if (!gameActive) return

        if (burgerState === 'full') {
          // Play sound1 for full burger, then change to half burger
          sound1.play()
          image.setAttribute('src', '#half_burgerchicken_img')
          burgerState = 'half'
        } else if (burgerState === 'half') {
          // Play sound2 for half burger, then add score, and reposition
          sound2.play()
          value += 10

          showTenPoints()
          triggerVibration(80)
          score.innerHTML = value
          image.setAttribute('src', '#full_burgerchicken_img')
          burgerState = 'full'
          repositionObject(entity)
        }
      })

      document.querySelector('a-scene').appendChild(entity)
      entityArr.push(entity)

      repositionObject(entity)  // Initial position assignment
    }

    const spawnBurgerObject = (entityArr) => {
      const entity = document.createElement('a-entity')
      entity.setAttribute('position', '0 0 0')  // Will be repositioned later
      entity.setAttribute('look-at', '#camera')
      entity.setAttribute('visible', 'true')
      const image = document.createElement('a-image')
      image.setAttribute('src', '#full_burger_img')  // Initially full burger
      image.setAttribute('class', 'clickable')
      image.setAttribute('scale', '2.5 2 2')
      entity.appendChild(image)

      let burgerState = 'full'  // Track the state of the burger ('full' or 'half')

      entity.addEventListener('click', () => {
        if (!gameActive) return

        triggerVibration(80)
        if (burgerState === 'full') {
          // Play sound1 for full burger, then change to half burger
          sound1.play()
          image.setAttribute('src', '#half_burger_img')
          burgerState = 'half'
        } else if (burgerState === 'half') {
          // Play sound2 for half burger, then add score, and reposition
          sound2.play()
          value += 10

          // showElement(tenPoints, 300, 'block')

          // setTimeout(() => {
          //   hideElement(tenPoints, 300)
          // }, 2000)

          showTenPoints()
          // showMinusTenPoints()

          score.innerHTML = value
          image.setAttribute('src', '#full_burger_img')
          burgerState = 'full'
          repositionObject(entity)
        }
      })

      document.querySelector('a-scene').appendChild(entity)
      entityArr.push(entity)

      repositionObject(entity)  // Initial position assignment
    }
    const spawnObject = (id, src, sound, points, scale, entityArr) => {
      const entity = document.createElement('a-entity')
      entity.setAttribute('position', '0 0 0')  // Will be repositioned later
      entity.setAttribute('look-at', '#camera')
      entity.setAttribute('visible', 'true')
      const image = document.createElement('a-image')
      image.setAttribute('src', src)
      image.setAttribute('class', 'clickable')
      image.setAttribute('scale', scale)  // Use the scale parameter here

      entity.appendChild(image)

      entity.addEventListener('click', () => {
        if (!gameActive) return

        if (id == 'bombEntity') {
          showMinusTenPoints()
          triggerVibration(1000)
        }

        if (id == 'friesEntity') {
          showOneTwoPoints(twoPoints)
          triggerVibration(80)
        }

        if (id == 'cokeEntity') {
          showOneTwoPoints(onePoints)
          triggerVibration(80)
        }

        sound.play()
        value += points
        score.innerHTML = value
        repositionObject(entity)
      })
      document.querySelector('a-scene').appendChild(entity)
      entityArr.push(entity)
      repositionObject(entity)  // Initial position assignment
    }

    const burgerEntities = []
    const ChickenburgerEntities = []

    const bombEntities = []
    const cokeEntities = []
    const friesEntities = []

    // Initial spawn
    for (let i = 0; i < burgerCount; i++) {
      spawnBurgerObject(burgerEntities)
      spawnChickenBurgerObject(ChickenburgerEntities)  // Use the burger spawn function
    }
    for (let i = 0; i < maxBombCount; i++) {
      spawnObject(
        'bombEntity',
        '#bomb_img',
        bombSound,
        -10,
        '2 3 2',
        bombEntities
      )
    }
    for (let i = 0; i < maxCokeCount; i++) {
      spawnObject(
        'cokeEntity',
        '#coke_img',
        cokeSound,
        1,
        '2 2 2',
        cokeEntities
      )
    }
    for (let i = 0; i < maxFriesCount; i++) {
      spawnObject(
        'friesEntity',
        '#fries_img',
        friesSound,
        2,
        '2 2 2',
        friesEntities
      )
    }
    // Function to reset the game
    this.resetGame = () => {
      gameActive = false  // Stop interactions
      const scene = document.querySelector('a-scene')

      // Destroy all burger entities
      burgerEntities.forEach((entity) => {
        scene.removeChild(entity)
      })
      burgerEntities.length = 0

      // Destroy all burger entities
      ChickenburgerEntities.forEach((entity) => {
        scene.removeChild(entity)
      })
      ChickenburgerEntities.length = 0

      // Destroy all bomb entities
      bombEntities.forEach((entity) => {
        scene.removeChild(entity)
      })
      bombEntities.length = 0

      // Destroy all coke entities
      cokeEntities.forEach((entity) => {
        scene.removeChild(entity)
      })
      cokeEntities.length = 0

      // Destroy all fries entities
      friesEntities.forEach((entity) => {
        scene.removeChild(entity)
      })
      friesEntities.length = 0
      // Clear all positions
      spawnedPositionsSet.clear()

      // Remove game script from the scene
      this.el.removeComponent('game-script')
    }

    // Event listener for resetting the game on button click
    const tryAgainBtn = document.querySelector('.try-again-btn')
    const tryAgainBtnAll = document.querySelectorAll('.retry-btn')
    if (tryAgainBtnAll) {
      [...tryAgainBtnAll].forEach((btn) => {
        btn.addEventListener('click', () => {
          tryAgainContainer.style.display = 'none'
          this.resetGame()
          value = 0
          score.innerHTML = value

          currentDeg = 360
          endDeg = 0
          outerCircle.style.background =
            'conic-gradient(#db0007e5 360deg, #ffbc0d 0deg)'
        })
      })
    }
  },
}
AFRAME.registerComponent('game-script', gameScriptComponent);