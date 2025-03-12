export const frontendScriptComponent = {
  init() {
    const nextBtn = document.querySelector('.next-btn')
    const landingPage = document.querySelector('.landing-page')
    const gameScreen = document.querySelector('.game-screen')
    const outerCircle = document.querySelector('.outer-circle')
    const closeBnt = document.querySelector('.close-btn')
    const instructionContainer = document.querySelector('.instruction-container')
    const fullBurger = document.querySelector('.full-burger-img')
    const eatenBurger = document.querySelector('.eaten-burger-img')

    const mobileSubmitBtn = document.getElementById('submit-mobile-btn')
    const mobileNumberInput = document.getElementById('mobile-number')
    const errorMessage = document.getElementById('error-message')
    const mobileInputWrapper = document.querySelector('.mobile-input-footer')
    const couponWrapper = document.querySelector('.coupon-footer')
    const couponContainer = document.querySelector('.coupon-container')
    const tryAgainContainer = document.querySelector('.try-again-container')
    const scoreCard = document.querySelector('.score-card')
    const scene = document.getElementById('scene')

    const crunchSound = document.querySelector('#crunchSound')
    const lookAroundImg = document.querySelector('.look-around')

    const gameSound = document.getElementById('gameSound')
    const tryAgainBtn = document.querySelector('.try-again-btn')
    const tryAgainBtnAll = document.querySelectorAll('.retry-btn')
    const redeemBtn = document.querySelector('.redeem-now-btn')
    const redeemHeroImg = document.querySelector('.redeem-now-hero-img')
    const couponHeroImg = document.querySelector('.coupon-hero-img')

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

    nextBtn.addEventListener('click', () => {
    // landingPage.style.display = "none"
      // gameScreen.style.display = "flex"

      showElement(eatenBurger)
      hideElement(fullBurger)

      crunchSound.play()

      nextBtn.style.animation = 'scaleDown 300ms ease-in-out forwards'

      setTimeout(() => {
        showElement(instructionContainer, 0)
        hideElement(landingPage, 300)
        showElement(gameScreen, 300, 'flex')
      }, 2000)
    })

    fullBurger.addEventListener('click', () => {
    // landingPage.style.display = "none"
      // gameScreen.style.display = "flex"

      showElement(eatenBurger)
      hideElement(fullBurger)

      crunchSound.play()

      // nextBtn.style.animation = 'scaleDown 300ms ease-in-out forwards'

      setTimeout(() => {
        hideElement(landingPage, 300)
        showElement(gameScreen, 300, 'flex')
      }, 2000)
    })

    // let currentDeg = 360
    // let endDeg = 0
    // const duration = 60

    // const updateProgress = () => {
    //   console.log('updateProgress')
    //   const decrement = 360 / (duration * 30)
    //   const interval = setInterval(() => {
    //     currentDeg -= decrement

    //     outerCircle.style.background = `conic-gradient(#DB0007E5 ${currentDeg}deg, #FFBC0D 0deg)`

    //     if (currentDeg <= endDeg) {
    //       // couponContainer.style.display = 'block'
    //       // tryAgainContainer.style.display = 'block'
    //       scoreCard.style.display = 'none'
    //       clearInterval(interval)
    //       console.log('Time done')
    //     }
    //   }, 1000 / 30)
    // }

    closeBnt.addEventListener('click', () => {
      showElement(instructionContainer, 0)
      instructionContainer.style.animation = 'hide-modal 300ms both'
      scene.setAttribute('game-script', '')
      console.log('Clicked cross')
      // updateProgress()
      gameSound.play()
      showElement(lookAroundImg, 300, 'block')

      setTimeout(() => {
        hideElement(lookAroundImg, 300)
      }, 3000)
      setTimeout(() => {
        hideElement(instructionContainer, 0)
        instructionContainer.style.display = 'none'
      }, 1000)
    })

    mobileNumberInput.addEventListener('input', () => {
      const mobileNumber = mobileNumberInput.value.trim()

      const containsNonDigit = /\D/.test(mobileNumber)

      if (containsNonDigit || mobileNumber.length > 10) {
        errorMessage.style.display = 'block'
      } else {
        errorMessage.style.display = 'none'
      }
    })

    mobileSubmitBtn.addEventListener('click', (event) => {
      event.preventDefault()
      const mobileNumber = mobileNumberInput.value.trim()

      if (mobileNumber.length === 10 && /^[0-9]+$/.test(mobileNumber)) {
        errorMessage.style.display = 'none'

        redeemHeroImg.style.display = 'unset'
        couponHeroImg.style.display = 'none'

        mobileInputWrapper.style.display = 'none'
        couponWrapper.style.display = 'flex'

        // fetch('/submit-mobile', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ mobile: mobileNumber })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.success) {
        //             alert('Mobile number submitted successfully!');
        //         } else {
        //             alert('Failed to submit mobile number. Please try again.');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         alert('An error occurred. Please try again later.');
        //     });
      } else {
        errorMessage.style.display = 'block'
      }

      mobileNumberInput.value = ''
      mobileNumberInput.focus()
    })

    redeemBtn.addEventListener('click', () => {
      window.open('https://smart.link/xeqs9xq5t51yk', '_blank')
    })

    // document.getElementById('downloadBtn').addEventListener('click', () => {
    //   const phoneText = document.querySelector('.phone-submitted-text')
    //   const greenTick = document.querySelector('.tick')
    //   const downloadBtn = document.querySelector('.download-coupon-btn')
    //   const tryAgainBtn = document.querySelector('.coupon-container .try-again-btn')

    //   phoneText.style.visibility = 'hidden'
    //   greenTick.style.visibility = 'hidden'
    //   downloadBtn.style.visibility = 'hidden'
    //   tryAgainBtn.style.visibility = 'hidden'

    //   html2canvas(document.getElementById('couponContainer')).then((canvas) => {
    //     const link = document.createElement('a')
    //     link.href = canvas.toDataURL('image/png')
    //     link.download = 'coupon_snapshot.png'
    //     link.click()

    //     phoneText.style.visibility = ''
    //     greenTick.style.visibility = ''
    //     downloadBtn.style.visibility = ''
    //     tryAgainBtn.style.visibility = ''
    //   })
    // })

    function resetUI() {
      hideElement(tryAgainContainer)
      showElement(landingPage, 0)
      hideElement(gameScreen, 0)
      showElement(fullBurger)
      hideElement(eatenBurger)
      nextBtn.style.animation = ''
      nextBtn.style.animation = 'breathe 2s infinite ease-in-out'
      showElement(scoreCard, 100, 'flex')
      instructionContainer.style.animation = 'show-modal 500ms 300ms both'
      hideElement(instructionContainer, 0)
      hideElement(tryAgainContainer, 0)
      hideElement(couponContainer, 0)

      mobileInputWrapper.style.display = 'unset'
      couponWrapper.style.display = 'none'

      // currentDeg = 360
      // endDeg = 0
      // outerCircle.style.background = 'conic-gradient(#db0007e5 360deg, #ffbc0d 0deg)'

      redeemHeroImg.style.display = 'none'
      couponHeroImg.style.display = 'unset'
      gameSound.pause()
      gameSound.currentTime = 0
    }

    [...tryAgainBtnAll].forEach((btn) => {
      btn.addEventListener('click', () => {
        resetUI()
        scene.removeAttribute('game-script')
      })
    })
  },
}
