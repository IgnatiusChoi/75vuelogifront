export default findMusicList

let musicData = []
let musicList = null
let thumbnailImg = null

function findMusicList(category) {
  musicData = []
  console.log(category)
  if (category === 'ballad') getBallad()
  if (category === 'K-POP') getKPOP()
  if (category === 'POP') getPOP()

  if (category === 'Rock') getRock()
  if (category === 'Newage') getNewage()
  if (category === 'etc') getEtc()
  if (category === 'J-POP') getJPOP()

  musicData.push(musicList)
  musicData.push(thumbnailImg)
  console.log(musicData)
  return musicData
}
function getBallad() {
  console.log('ballad')

  musicList = {
    musicList: [
      {
        title: '서른 밤째',
        singer: '윤하',
        link: require('@/assets/music/Ballad/서른 밤째.mp3'),
      },
      {
        title: '취기를 빌려',
        singer: '산들',
        link: require('@/assets/music/Ballad/취기를 빌려.mp3'),
      },
      {
        title: '내 마음이 움찔했던 순간',
        singer: '규현',
        link: require('@/assets/music/Ballad/내 마음이 움찔했던 순간.mp3'),
      },
      {
        title: '광화문에서',
        singer: '규현',
        link: require('@/assets/music/Ballad/광화문에서.mp3'),
      },
      {
        title: '첫눈처럼 너에게 가겠다',
        singer: '에일리',
        link: require('@/assets/music/Ballad/첫눈처럼 너에게 가겠다.mp3'),
      },
      {
        title: '거리에서',
        singer: '성시경',
        link: require('@/assets/music/Ballad/성시경 - 거리에서.mp3'),
      },
      {
        title: '너의 모든 순간 [별에서 온 그대 OST Part 7]',
        singer: '성시경',
        link: require('@/assets/music/Ballad/성시경 - 너의 모든 순간 [별에서 온 그대 OST Part 7] .mp3'),
      },
      {
        title: '가시',
        singer: '버즈',
        link: require('@/assets/music/Ballad/버즈 - 가시.mp3'),
      },
      {
        title: '응급실',
        singer: 'IZI',
        link: require('@/assets/music/Ballad/IZI - 응급실.mp3'),
      },
      {
        title: '기다릴게',
        singer: '하동균, 봉구',
        link: require('@/assets/music/Ballad/하동균, 봉구 - 기다릴게.mp3'),
      },
      {
        title: '너, 너',
        singer: '휘인',
        link: require('@/assets/music/Ballad/휘인 - 너, 너 (N번째 연애 X 휘인).mp3'),
      },
      {
        title: '겁쟁이',
        singer: '버즈',
        link: require('@/assets/music/Ballad/버즈 - 겁쟁이.mp3'),
      },
      {
        title: '편한가봐',
        singer: '윤하',
        link: require('@/assets/music/Ballad/윤하 - 편한가봐.mp3'),
      },

    ],
  }
  thumbnailImg = {
    thumbnail: [
      {
        link: require('@/assets/images/musicBackgroundImg/서른 밤째.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/취기를 빌려.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/내 마음이 움찔했던 순간.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/광화문에서.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/첫눈처럼 너에게 가겠다.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/성시경 - 거리에서.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/성시경 - 너의 모든 순간.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Buzz - 가시.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/IZI - 응급실.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/하동균, 봉구 - 기다릴게.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/휘인 - 너, 너.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Buzz - 가시.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/윤하3rd.jpg'),
      },
    ],
  }
}
function getPOP() {
  console.log('pop')

  musicList = {
    musicList: [
      {
        title: 'High and Dry',
        singer: 'RadioHead',
        link: require('@/assets/music/POP/Radiohead - High and Dry.mp3'),
      },
      {
        title: 'Creep (Acoustic)',
        singer: 'RadioHead',
        link: require('@/assets/music/POP/Radiohead - Creep (Acoustic).mp3'),
      },
    ],
  }
  thumbnailImg = {
    thumbnail: [
      {
        link: require('@/assets/images/musicBackgroundImg/RadioHead_-_High_and_Dry.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/라디오헤드 - Creep.jpg'),
      },
    ],
  }
}
function getKPOP() {
  console.log('kpop')
  musicList = {
    musicList: [
      {
        title: '하루하루',
        singer: 'Big Bang',
        link: require('@/assets/music/K-POP/Big Bang - 하루하루.mp3'),
      },
      {
        title: '봄날',
        singer: 'BTS',
        link: require('@/assets/music/K-POP/BTS - 봄날.mp3'),
      },
      {
        title: 'Butter',
        singer: 'BTS',
        link: require('@/assets/music/K-POP/BTS - Butter.mp3'),
      },
      {
        title: 'Dynamite',
        singer: 'BTS',
        link: require('@/assets/music/K-POP/BTS - Dynamite.mp3'),
      },
      {
        title: '사랑을 했다',
        singer: 'IKON',
        link: require('@/assets/music/K-POP/IKON - 사랑을 했다.mp3'),
      },
    ],
  }
  thumbnailImg = {
    thumbnail: [
      {
        link: require('@/assets/images/musicBackgroundImg/BIGBANG.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/BTS - 봄날.png'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/BTS - Butter.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/BTS - Dynamite.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/IKON - 사랑을했다.jpg'),
      },
    ],
  }
}
function getRock() {
  console.log('rock')

  musicList = {
    musicList: [
      {
        title: '이미 슬픈 사랑',
        singer: '야다',

        link: require('@/assets/music/Rock/야다 - 이미슬픈사랑.mp3'),
      },
      {
        title: "Don't Cry",
        singer: 'The Cross',
        link: require("@/assets/music/Rock/The Cross - Don't Cry.mp3"),
      },
      {
        title: '당신을 위하여',
        singer: 'The Cross',
        link: require('@/assets/music/Rock/The Cross - 당신을 위하여.mp3'),
      },
      {
        title: 'Never Ending Story',
        singer: '부활',
        link: require('@/assets/music/Rock/부활 - 네버엔딩스토리.mp3'),
      },
      {
        title: '먼지가 되어',
        singer: '로이킴, 정준영',
        link: require('@/assets/music/Rock/로이킴, 정준영 - 먼지가 되어.mp3'),
      },
      {
        title: '혜성',
        singer: '윤하',
        link: require('@/assets/music/Rock/윤하 - 혜성.mp3'),
      },
      {
        title: '스물다섯, 스물하나',
        singer: '자우림',
        link: require('@/assets/music/Rock/자우림 - 스물다섯, 스물하나.mp3'),
      },
      {
        title: '영원히 영원히',
        singer: '자우림',
        link: require('@/assets/music/Rock/자우림 - 영원히 영원히.mp3'),
      },
      {
        title: '심',
        singer: '얀',
        link: require('@/assets/music/Rock/얀 - 심(心).mp3'),
      },
    ],
  }
  thumbnailImg = {
    thumbnail: [
      {
        link: require('@/assets/images/musicBackgroundImg/야다.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/The Cross.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/The Cross.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/부활.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/로이킴, 정준영 - 먼지가 되어.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/윤하3rd.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/자우림 - 스물다섯, 스물하나.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/자우림 - 김윤아.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/얀.jpg'),
      },
    ],
  }
}
function getEtc() {
  console.log('etc')

  musicList = {
    musicList: [
      {
        title: '너에게 닿기를',
        singer: '10cm',
        link: require('@/assets/music/etc/10cm - 너에게 닿기를.mp3'),
      },
      {
        title: '호랑수월가',
        singer: '탑현',
        link: require('@/assets/music/etc/탑현 - 호랑수월가.mp3'),
      },
    ],
  }
  thumbnailImg = {
    thumbnail: [
      {
        link: require('@/assets/images/musicBackgroundImg/10cm - 너에게 닿기를.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/탑현 - 호랑수월가.jpg'),
      },
    ],
  }
}
function getNewage() {
  console.log('newage')

  musicList = {
    musicList: [
      {
        title: '새벽 별과 소년의 노래',
        singer: 'Sereno',
        link: require('@/assets/music/Newage/Sereno - 새벽 별과 소년의 노래.mp3'),
      },
      {
        title: '북극성의 기억',
        singer: 'Sereno',
        link: require('@/assets/music/Newage/Sereno - 북극성의 기억.mp3'),
      },
      {
        title: 'Our Moments Never End',
        singer: 'Sereno',
        link: require('@/assets/music/Newage/Sereno - Our Moments Never End.mp3'),
      },
      {
        title: '나서'
            + 'ᆫ의 달',
        singer: 'Sereno',
        link: require('@/assets/music/Newage/Sereno - 나선의 달.mp3'),
      },
    ],
  }
  thumbnailImg = {
    thumbnail: [
      {
        link: require('@/assets/images/musicBackgroundImg/Sereno - 새벽 별과 소년의 노래.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Sereno - 북극성의 기억.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Sereno - our moments never end.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Sereno - 나선의 달.jpg'),
      },
    ],
  }
}
function getJPOP() {
  console.log('jpop')

  musicList = {
    musicList: [
      {
        title: '쏘아올린 불꽃',
        singer: '다즈비',
        link: require('@/assets/music/J-POP/打上花火 -acoustic arrange- _ ダズビー×ゐづ×模.mp3'),
      },
      {
        title: 'Lemon',
        singer: '다즈비',
        link: require('@/assets/music/J-POP/Lemon (米津玄師) ／ダズビー COVER.mp3'),
      },
      {
        title: '아이네클라이네',
        singer: '다즈비',
        link: require('@/assets/music/J-POP/アイネクライネ (米津玄師) acoustic arrange ver.／ダズビー COVER.mp3'),
      },
      {
        title: 'Departures',
        singer: '다즈비',
        link: require('@/assets/music/J-POP/Departures 〜あなたにおくるアイの歌〜 ／ダズビー COVER.mp3'),
      },
      {
        title: '내가 죽으려고 생각한것은',
        singer: '다즈비',
        link: require('@/assets/music/J-POP/僕が死のうと思ったのは (amazarashi ; 中島美嘉) ／ダズビー COVER.mp3'),
      },
      {
        title: '목소리',
        singer: '다즈비',
        link: require('@/assets/music/J-POP/声 (HarryP) ／ダズビー COVER.mp3'),
      },
    ],
  }
  thumbnailImg = {
    thumbnail: [
      {
        link: require('@/assets/images/musicBackgroundImg/Dazbee - 쏘아올린 불꽃.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Dazbee - Lemon.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Dazbee - 아이네클라이네.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Dazbee - Departures.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Dazbee - 내가 죽으려고 생각한 것은.jpg'),
      },
      {
        link: require('@/assets/images/musicBackgroundImg/Dazbee - 목소리.jpg'),
      },
    ],
  }
}
