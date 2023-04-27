<template>
  <div v-if="playerType === 'player'">
    <b-card
      style="width: 300px; margin:auto"
    >

      <div>
        <div
          style="width: 100%; height: 270px; overflow:hidden; display: inline-flex;"
        >
          <div
            style="width: 86%; height: 270px; display: inline-flex; position: absolute; overflow:hidden;"
          >
            <div
              :ref="thumbnailDiv[0].id"
              class="previousThumbnail"
            >
              <img
                :ref="thumbnailImg[0].id"
                class="thumbnailImg"
                :src="imgPosi[0].src"
              >
            </div>
            <div
              :ref="thumbnailDiv[1].id"
              class="thumbnail"
            >
              <img
                :ref="thumbnailImg[1].id"
                class="thumbnailImg"
                :src="imgPosi[1].src"
              >
            </div>
            <div
              :ref="thumbnailDiv[2].id"
              class="nextThumbnail"
            >
              <img
                :ref="thumbnailImg[2].id"
                class="thumbnailImg"
                :src="imgPosi[2].src"
              >
            </div>
          </div>
        </div>
        <div>
          <h2 style="font-family: '카페24 써라운드'; color:#FFD9EC">
            {{ title }}
          </h2>
          <h4 style="font-family: '배달의민족 한나체 Air'; color:#EAEAEA">
            {{ singer }}
          </h4>
        </div>
        <div style="width: 100%; height: 30px;">
          <BIcon
            id="next-song"
            :icon="btnIcon[0].player.preBtn"
            style="width: 26%; margin-top: 15px;margin-left: 11%"
            scale="2"
            @click="previousSong"
            @mouseenter="changeIcon('player', 'preBtnFill')"
            @mouseleave="changeIcon('player', 'preBtn')"
          />
          <BIcon
            v-show="!isPlaying"
            id="play-pause"
            :icon="btnIcon[0].player.playBtn"
            style="width: 26%"
            scale="2.5"
            @click="playPause"
            @mouseenter="changeIcon('player', 'playBtnFill')"
            @mouseleave="changeIcon('player', 'playBtn')"
          />
          <BIcon
            v-show="isPlaying"
            id="play-pause"
            :icon="btnIcon[0].player.pauseBtn"
            style="width: 26%"
            scale="2.5"
            @click="playPause"
            @mouseenter="changeIcon('player', 'pauseBtnFill')"
            @mouseleave="changeIcon('player', 'pauseBtn')"
          />
          <BIcon
            id="previous-song"
            :icon="btnIcon[0].player.nextBtn"
            style="width: 26%; margin-right: 11%"
            scale="2"
            @click="nextSong"
            @mouseenter="changeIcon('player', 'nextBtnFill')"
            @mouseleave="changeIcon('player', 'nextBtn')"
          />
        </div>
      </div>

      <div style="margin-top:20px">

        <input
          ref="progressBar"
          v-model="progressBarValue"
          class="rangeStyle"
          style="width: 90%; margin: 0 5% 0 5%;"
          type="range"
          min="0"
          :max="progressBarMax"
          value="0"
          @click="changeProgressBar"
        >
        <b-row>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
            style="min-width: 1200px;"
          >
            <div>
              <h2
                style="font-size: 3px; color:lightgreen"
              >
                {{ duration }}
              </h2>
            </div>
            <div style="width:230px;">
              <h2
                style="font-size: 3px; float:right;"
              >
                {{ currentTime }}
              </h2>
            </div>
          </b-col>
        </b-row>
      </div>
      <div
        style="position: absolute; right:10px; bottom: 75px; width: 30px; height: 30px; "
      >
        <div
          style="z-index: 5; width: 30px; height: 30px; padding: 3px 0 0 5px;"
          @mouseenter="showVolumeRange"
        >
          <BIcon
            :icon="volumeControlIcon"
            scale="2"
            class="volumeControlIcon"
            style="z-index: 4;"
            @click="soundBreak"
          />
        </div>
        <div style="position: absolute; right:0px; bottom: 30px; width: 30px; height: 85px; padding: 3px 0 0 5px; overflow:hidden">
          <input
            id="customRange"
            ref="volumeRange"
            v-model="volumeRange"
            type="range"
            class="form-range"
            max="10"
            min="0"
          >
        </div>
      </div>
    </b-card>
  </div>
  <div v-else-if="playerType === 'bar'">
    <div style="width: 40px; height: 40px; padding: 10px 0 0 10px">
      <BIcon
        icon="BIconMusicNote"
        scale="1.7"
        :variant="playerBarColor"
        @click="showPlayerBar"
      />
    </div>
    <div
      ref="musicPlayerDiv"
      class="musicPlayerDiv"
    >
      <b-card
        ref="playerBar"
        class="playerBar"
        style="box-shadow: 2px 2px 6px 3px rgba(20, 20, 20, 0.5);"
      >
        <div style=" height: 145px;">
          <div>
            <div
              style="width: 50px; height: 270px; display: inline-flex; position: absolute; overflow:hidden;"
            >
              <div
                :ref="thumbnailDiv[0].id"
                class="previousThumbnail"
              >
                <img
                  :ref="thumbnailImg[0].id"
                  class="thumbnailImg"
                  :src="imgPosi[0].src"
                >
              </div>
              <div
                :ref="thumbnailDiv[1].id"
                class="thumbnail"
              >
                <img
                  :ref="thumbnailImg[1].id"
                  class="thumbnailImg"
                  :src="imgPosi[1].src"
                >
              </div>
              <div
                :ref="thumbnailDiv[2].id"
                class="nextThumbnail"
              >
                <img
                  :ref="thumbnailImg[2].id"
                  class="thumbnailImg"
                  :src="imgPosi[2].src"
                >
              </div>
            </div>

            <div style="padding-left: 60px; width: 240px">
              <h2 style="font-family: '카페24 써라운드'; color:#FFD9EC">
                {{ title }}
              </h2>
              <h4 style="font-family: '배달의민족 한나체 Air'; color:#EAEAEA">
                {{ singer }}
              </h4>
            </div>
            <div style="width: 100%; height: 40px;">
              <BIcon
                :icon="btnIcon[1].playerBar.preBtn"
                style="width: 40px; margin-top: 13px; margin-left: 30px; z-index: 9999"
                scale="1.7"
                @click="previousSong"
                @mouseenter="changeIcon('bar', 'preBtnFill')"
                @mouseleave="changeIcon('bar', 'preBtn')"
              />
              <BIcon
                v-show="!isPlaying"
                :icon="btnIcon[1].playerBar.playBtn"
                style="width: 20px"
                scale="1.7"
                @click="playPause"
                @mouseenter="changeIcon('bar', 'playBtnFill')"
                @mouseleave="changeIcon('bar', 'playBtn')"
              />
              <BIcon
                v-show="isPlaying"
                :icon="btnIcon[1].playerBar.pauseBtn"
                style="width: 20px;"
                scale="1.7"
                @click="playPause"
                @mouseenter="changeIcon('bar', 'pauseBtnFill')"
                @mouseleave="changeIcon('bar', 'pauseBtn')"
              />
              <BIcon
                :icon="btnIcon[1].playerBar.nextBtn"
                style="width: 40px;"
                scale="1.7"
                @click="nextSong"
                @mouseenter="changeIcon('bar', 'nextBtnFill')"
                @mouseleave="changeIcon('bar', 'nextBtn')"
              />
            </div>
          </div>

          <div>

            <input
              ref="progressBar"
              v-model="progressBarValue"
              class="rangeStyle"
              style="width: 231px; margin-left: 14px;"
              type="range"
              min="0"
              :max="progressBarMax"
              value="0"
              @click="changeProgressBar"
            >
            <b-row>
              <b-col
                cols="12"
                md="6"
                class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
              >
                <div>
                  <h2
                    style="font-size: 3px; color:lightgreen"
                  >
                    {{ duration }}
                  </h2>
                </div>
                <div style="width:230px;">
                  <h2
                    style="font-size: 3px; float:right; margin-left: 195px"
                  >
                    {{ currentTime }}
                  </h2>
                </div>
              </b-col>
            </b-row>
          </div>
          <div
            style="position: absolute; left:165px; top: 95px; width: 30px; height: 30px;"
          >
            <div
              style="z-index: 5; width: 30px; height: 30px; padding: 2px 0 0 5px;"
            >
              <BIcon
                :icon="volumeControlIcon"
                scale="1.7"
                class="volumeControlIcon"
                style="z-index: 4;"
                @click="soundBreak"
              />
              <input
                id="customRange"
                v-model="volumeRange"
                type="range"
                class="form-range"
                style="transform: none; top:10px; left:30px; width: 70px; height: 5px;"
                max="10"
                min="0"
              >
            </div>

          </div>
          <b-row>

            <div
              ref="playListBtn"
              class="playListBtn"
            >
              <BIcon
                icon="BIconGripHorizontal"
                scale="2"
                style="margin: 0 0 5px 43%;width: 50px"
                @click="showMusicList"
              />
            </div>
          </b-row>
          <div style=" display: inline-flex">
            <div
              ref="musicListDiv"
              class="musicListDiv scrollStyle"
            >
              <ol style="width: 250px;">
                <template v-for="item in musicList">
                  <li
                    style=" cursor: pointer"
                    @click="musicSelect($event)"
                  >
                    {{ item.title }}
                  </li>
                  <hr style="margin: 1px 0 1px 0;">
                </template>
              </ol>
            </div>
            <div class="center">
              <!--              <div class="outer button">
                <button>Hover Me</button>
                <span />
                <span />
              </div>-->
              <div class="outer circle">
                <button>
                  Made By<br>
                  <h2 style="font-style: italic">
                    GDW
                  </h2>
                </button>
                <span />
                <span />
              </div>
            </div>
          </div>
          <div
            style="position:absolute;
                left:270px;
                top:8px;
                width: 170px;"
          >
            <BIcon
              icon="BIconMusicNoteList"
              scale="1.5"
              @click="showCategory"
            />
            <div
              style="width: 130px; height: 145px; overflow:auto; float: right;"
              class="scrollStyle"
            >
              <ul
                class="list-group"
              >
                <BListGroupItem
                  v-for="item in category"
                  :key="item.value"
                  style="width: 100%; font-family: '배달의민족 도현'; "
                  @click="changeCategory($event)"
                >
                  {{ item.name }}
                </BListGroupItem>

              </ul>
            </div>

          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BIconSkipEndCircle, BNav,
} from 'bootstrap-vue'
import musicPllayerSCSS from '@/assets/scss/musicPlayer.scss'
import findMusicList from './musicList'
import musicList from './musicList'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BIconSkipEndCircle,
    BNav,
  },
  props: ['playerType'],
  data() {
    return {
      isPlaying: false,
      musicList: [],
      thumbnail: [],
      audio: '',
      songIndex: 0,
      songIndexLimit: 0,
      duration: '00:00',
      currentTime: '00:00',
      progressBarMax: 0,
      progressBarValue: 0,
      title: '',
      singer: '',
      pressBtn: '',
      thumbnailImg: [
        { id: 'preImg', num: 0 },
        { id: 'centerImg', num: 1 },
        { id: 'nextImg', num: 2 },
      ],
      imgPosi: [
        { src: '' },
        { src: '' },
        { src: '' },
      ],
      thumbnailDiv: [
        { id: 'previousThumbnail' },
        { id: 'thumbnail' },
        { id: 'nextThumbnail' },
      ],
      finish: true,
      btnIcon: [
        {
          player: {
            preBtn: 'BIconSkipBackward',
            nextBtn: 'BIconSkipForward',
            playBtn: 'BIconPlayCircle',
            pauseBtn: 'BIconPauseCircle',
          },
        },
        {
          playerBar:
                  {
                    preBtn: 'BIconSkipStart',
                    nextBtn: 'BIconSkipEnd',
                    playBtn: 'BIconPlay',
                    pauseBtn: 'BIconPause',
                  },
        },
      ],
      volumeControlIcon: 'BIconVolumeDown',
      volumeRange: 5,
      volumeRangeStatus: 'hidden',
      beforeMute: 0,
      playerBarStatus: 'hidden',
      playerBarColor: 'primary',
      category: [
        { name: '발라드', value: 'ballad' },
        { name: '케이팝', value: 'K-POP' },
        { name: '팝', value: 'POP' },
        { name: '락', value: 'Rock' },
        { name: '뉴에이지', value: 'Newage' },
        { name: '기타등등', value: 'etc' },
        { name: '니뽄', value: 'J-POP' },

      ],
      categoryStatus: 'hidden',
      musicListStatus: 'hidden',
    }
  },
  watch: {
    volumeRange() {
      this.audio.volume = this.volumeRange / 10
      if (this.volumeRange == 0) {
        this.volumeControlIcon = 'BIconVolumeMute'
        return
      }

      if (this.volumeRange >= 6) this.volumeControlIcon = 'BIconVolumeUp'
      else if (this.volumeRange >= 1) this.volumeControlIcon = 'BIconVolumeDown'
    },
  },
  created() {
    const audio = new Audio(require('@/assets/music/Ballad/서른 밤째.mp3'))
    this.audio = audio
    const musicData = findMusicList('ballad')
    this.songIndexLimit = musicData[0].musicList.length
    this.musicList = musicData[0].musicList
    this.thumbnail = musicData[1].thumbnail
    this.songIndex = 0
    this.title = this.musicList[0].title
    this.singer = this.musicList[0].singer
    this.thumbnailImg.filter(e => {
      if (e.id === 'centerImg') {
        this.imgPosi[e.num].src = this.thumbnail[0].link
      }
    })
    setInterval(this.updateProgressValue, 500)
  },
  beforeDestroy() {
    this.audio.pause()
  },
  methods: {
    playPause() {
      if (this.isPlaying) {
        this.audio.pause()
        this.isPlaying = false
      } else {
        this.audio.play()
        this.isPlaying = true
      }
    },
    nextSong() {
      if (this.finish === false) {
        return
      }
      this.finish = false
      this.songIndex++

      if (this.songIndex === this.songIndexLimit || this.songIndex > this.songIndexLimit) {
        this.songIndex = 0
      }

      this.audio.src = this.musicList[this.songIndex].link

      this.thumbnailImg.filter(e => {
        if (e.id === 'nextImg') {
          this.imgPosi[e.num].src = this.thumbnail[this.songIndex].link
        }
      })

      this.$refs.thumbnail.style.transitionProperty = 'all'
      this.$refs.nextThumbnail.style.transitionProperty = 'all'

      this.$refs.thumbnail.style.right = '100%'
      this.$refs.nextThumbnail.style.right = '0'

      this.title = this.musicList[this.songIndex].title
      this.singer = this.musicList[this.songIndex].singer
      this.pressBtn = 'next'
      setTimeout(this.thumbRestoration, 1000)
      this.isPlaying = false
      this.playPause()
    },
    previousSong() {
      if (this.finish === false) {
        return
      }
      this.finish = false

      this.songIndex++

      if (this.songIndex === this.songIndexLimit) {
        this.songIndex = 0
      }
      this.audio.src = this.musicList[this.songIndex].link

      this.thumbnailImg.filter(e => {
        if (e.id === 'preImg') {
          this.imgPosi[e.num].src = this.thumbnail[this.songIndex].link
        }
      })

      this.$refs.thumbnail.style.transitionProperty = 'all'
      this.$refs.previousThumbnail.style.transitionProperty = 'all'

      this.$refs.thumbnail.style.right = '-100%'
      this.$refs.previousThumbnail.style.right = '0'

      this.title = this.musicList[this.songIndex].title
      this.singer = this.musicList[this.songIndex].singer
      this.pressBtn = 'pre'
      setTimeout(this.thumbRestoration, 1000)
      this.isPlaying = false
      this.playPause()
    },
    musicSelect(event) {
      const selectedMusic = event.target.innerHTML.trim()
      let selectedMusicIndex = 0
      for (let index = 0; index > -1; index++) {
        const songData = this.musicList[index]
        if (songData.title === selectedMusic) { selectedMusicIndex = index; break }
      }
      if (selectedMusicIndex > this.songIndex) {
        this.songIndex = selectedMusicIndex - 1
        this.nextSong()
      } else if (selectedMusicIndex < this.songIndex) {
        this.songIndex = selectedMusicIndex + 1
        this.previousSong()
      } else if (selectedMusicIndex === this.songIndex) {
        this.songIndex--
        this.nextSong()
      }
    },
    thumbRestoration() {
      if (this.pressBtn === 'next') {
        this.$refs.thumbnail.style.transitionProperty = 'none'
        this.$refs.nextThumbnail.style.transitionProperty = 'none'

        this.$refs.thumbnail.style.right = '-100%'

        this.thumbnailDiv.map(e => {
          if (e.id === 'thumbnail') {
            e.id = 'nextThumbnail'
          } else if (e.id === 'nextThumbnail') {
            e.id = 'thumbnail'
          }
        })
        this.thumbnailImg.map(e => {
          if (e.id === 'centerImg') {
            e.id = 'nextImg'
          } else if (e.id === 'nextImg') {
            e.id = 'centerImg'
          }
        })
      } else if (this.pressBtn === 'pre') {
        this.$refs.thumbnail.style.transitionProperty = 'none'
        this.$refs.previousThumbnail.style.transitionProperty = 'none'

        this.$refs.thumbnail.style.right = '100%'

        this.thumbnailDiv.map(e => {
          if (e.id === 'thumbnail') {
            e.id = 'previousThumbnail'
          } else if (e.id === 'previousThumbnail') {
            e.id = 'thumbnail'
          }
        })
        this.thumbnailImg.map(e => {
          if (e.id === 'centerImg') {
            e.id = 'preImg'
          } else if (e.id === 'preImg') {
            e.id = 'centerImg'
          }
        })
      }
      this.finish = true
    },
    updateProgressValue() {
      this.progressBarMax = this.audio.duration
      this.progressBarValue = this.audio.currentTime
      this.currentTime = this.convertMinute(this.audio.duration).substr(0, 5)
      this.duration = this.convertMinute(this.audio.currentTime).substr(0, 5)
      if (this.duration === this.currentTime) {
        this.nextSong()
      }
    },

    changeProgressBar() {
      this.audio.currentTime = this.$refs.progressBar.value
    },
    convertMinute(value) {
      const minutes = parseInt((value % 3600) / 60) < 10 ? `0${parseInt((value % 3600) / 60)}` : parseInt((value % 3600) / 60)
      const seconds = value % 60 < 10 ? `0${value % 60}` : value % 60
      return `${minutes}:${seconds}`
    },
    changeIcon(e, val) {
      if (e === 'player') {
        if (val === 'preBtnFill') this.btnIcon[0].player.preBtn = 'BIconSkipBackwardFill'
        if (val === 'preBtn') this.btnIcon[0].player.preBtn = 'BIconSkipBackward'
        if (val === 'nextBtnFill') this.btnIcon[0].player.nextBtn = 'BIconSkipForwardFill'
        if (val === 'nextBtn') this.btnIcon[0].player.nextBtn = 'BIconSkipForward'
        if (val === 'playBtnFill') this.btnIcon[0].player.playBtn = 'BIconPlayCircleFill'
        if (val === 'playBtn') this.btnIcon[0].player.playBtn = 'BIconPlayCircle'
        if (val === 'pauseBtnFill') this.btnIcon[0].player.pauseBtn = 'BIconPauseCircleFill'
        if (val === 'pauseBtn') this.btnIcon[0].player.pauseBtn = 'BIconPauseCircle'
      } else if (e === 'bar') {
        if (val === 'preBtnFill') this.btnIcon[1].playerBar.preBtn = 'BIconSkipStartFill'
        if (val === 'preBtn') this.btnIcon[1].playerBar.preBtn = 'BIconSkipStart'
        if (val === 'nextBtnFill') this.btnIcon[1].playerBar.nextBtn = 'BIconSkipEndFill'
        if (val === 'nextBtn') this.btnIcon[1].playerBar.nextBtn = 'BIconSkipEnd'
        if (val === 'playBtnFill') this.btnIcon[1].playerBar.playBtn = 'BIconPlayFill'
        if (val === 'playBtn') this.btnIcon[1].playerBar.playBtn = 'BIconPlay'
        if (val === 'pauseBtnFill') this.btnIcon[1].playerBar.pauseBtn = 'BIconPauseFill'
        if (val === 'pauseBtn') this.btnIcon[1].playerBar.pauseBtn = 'BIconPause'
      }
    },
    showVolumeRange() {
      if (this.volumeRangeStatus === 'hidden') {
        this.volumeRangeStatus = 'show'
        this.$refs.volumeRange.style.bottom = '35px'
      } else if (this.volumeRangeStatus === 'show') {
        this.volumeRangeStatus = 'hidden'
        this.$refs.volumeRange.style.bottom = '-50px'
      }
    },
    soundBreak() {
      if (this.volumeControlIcon === 'BIconVolumeMute') {
        this.volumeRange = this.beforeMute
        return
      }
      this.beforeMute = this.volumeRange
      this.volumeRange = 0
      this.volumeControlIcon = 'BIconVolumeMute'
    },
    showPlayerBar() {
      if (this.playerBarStatus === 'hidden') {
        this.playerBarStatus = 'show'
        this.playerBarColor = 'success'
        if (this.musicListStatus === 'hidden') {
          this.$refs.musicPlayerDiv.style.height = '195px'
        } else if (this.musicListStatus === 'show') {
          this.$refs.musicPlayerDiv.style.height = '330px'
        }
        this.$refs.playerBar.style.top = '0px'
      } else if (this.playerBarStatus === 'show') {
        this.playerBarStatus = 'hidden'
        this.playerBarColor = 'primary'
        this.$refs.musicPlayerDiv.style.height = '0'
        this.$refs.playerBar.style.top = '-330px'
      }
    },
    showCategory() {
      if (this.categoryStatus === 'hidden') {
        console.log('show')
        console.log(musicPllayerSCSS)
        this.categoryStatus = 'show'
        musicPllayerSCSS.playerBarWidth = '450px'
        this.$refs.playerBar.style.width = musicPllayerSCSS.playerBarWidth
        this.$refs.playListBtn.style.width = musicPllayerSCSS.playerBarWidth
        this.$refs.musicPlayerDiv.style.width = '460px'
      } else if (this.categoryStatus === 'show') {
        this.categoryStatus = 'hidden'
        musicPllayerSCSS.playerBarWidth = '300px'
        this.$refs.playerBar.style.width = musicPllayerSCSS.playerBarWidth
        this.$refs.playListBtn.style.width = musicPllayerSCSS.playerBarWidth
        this.$refs.musicPlayerDiv.style.width = '310px'
      }
    },
    changeCategory(val) {
      this.category.filter(e => {
        if (e.name === val.target.innerHTML.trim()) {
          const musicData = findMusicList(e.value)
          console.log(this.musicList)
          console.log(this.thumbnail)
          this.songIndexLimit = musicData[0].musicList.length
          this.musicList = musicData[0].musicList
          this.thumbnail = musicData[1].thumbnail
          this.songIndex = 0
        }
      })
    },
    showMusicList() {
      if (this.musicListStatus === 'hidden') {
        this.musicListStatus = 'show'
        this.$refs.playerBar.style.height = '320px'
        this.$refs.musicPlayerDiv.style.height = '330px'
      } else if (this.musicListStatus === 'show') {
        this.musicListStatus = 'hidden'
        this.$refs.playerBar.style.height = '190px'
        this.$refs.musicPlayerDiv.style.height = '200px'
      }
    },
  },
}
</script>

<style lang="scss">
  @import '../../../assets/scss/scrollStyle';
  @import '../../../assets/scss/musicPlayer';

</style>
