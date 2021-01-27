const generateKey = () => {
    let patriciakey= "pat_privkey-"
    let char = ''
    let charset = 'abcdefghijklmnopqrstuvwxyz'
    let time = new Date().getTime()
    for (let i = 0; i < 7; i++)
      char += charset.charAt(Math.floor(Math.random() * charset.length))
    return patriciakey + char + time
  }

exports.generateKey=generateKey;