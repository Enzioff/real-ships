<template>
    <div @mouseenter="buttonTrue" @mouseleave="buttonFalse" class="t-video">
        <template v-if="video.type === 'file'">
            <video :poster="posterLink" :id="id" :[autoplay]="true" loop playsinline :preload="preload" :[isMute]="true" :data-video="video.id">
                <source :src="video.src" type="video/mp4">
                <source :src="video.src" type="video/webm">
            </video>
            <div @click="playPauseVideo" class="t-video__controls" :class="{'js-opacity': !playError && isActive && autoplay || !isShow }">
                <button class="t-video__controls-play" :class="{'_cursor-none': !isMobile && !autoplay}" type="button">
                    <svg :class="{'_none': !isActive}" width="34" height="44" viewBox="-6 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 42V2L26 22L1 42Z" stroke="#022855" stroke-width="2.8"/>
                    </svg>
                    <svg :class="{'_none': isActive}" width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0V40" stroke="#022855" stroke-width="3"/>
                        <path d="M18 0V40" stroke="#022855" stroke-width="3"/>
                    </svg>
                </button>
            </div>
            <button
                class="t-video__controls-mute _cursor" 
                :class="{'js-opacity': isActive && autoplay || !isShow}" 
                type="button" 
                @click="muteChange"
            >
                <svg :class="{'_none': isMute}" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6.828C14.4644 7.29231 14.8328 7.84356 15.0842 8.45028C15.3356 9.05699 15.4649 9.70728 15.4649 10.364C15.4649 11.0207 15.3356 11.671 15.0842 12.2777C14.8328 12.8844 14.4644 13.4357 14 13.9M16.828 4C17.6637 4.83573 18.3267 5.82789 18.779 6.91982C19.2313 8.01176 19.4641 9.18209 19.4641 10.364C19.4641 11.5459 19.2313 12.7162 18.779 13.8082C18.3267 14.9001 17.6637 15.8923 16.828 16.728" stroke="#022855" stroke-width="2"/>
                    <path d="M3.66667 6H3.97514L4.23 5.82623L10 1.89214L10 18.1079L4.23 14.1738L3.97514 14H3.66667H1L1 10V6H3.66667Z" stroke="#022855" stroke-width="2"/>
                </svg>
                <svg :class="{'_none': !isMute}" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.66667 6H3.97514L4.23 5.82623L10 1.89214L10 18.1079L4.23 14.1738L3.97514 14H3.66667H1L1 10V6H3.66667Z" stroke="#022855" stroke-width="2"/>
                    <path d="M14 13L17 10M17 10L20 7M17 10L14 7M17 10L20 13" stroke="#022855" stroke-width="2" stroke-linejoin="round"/>
                </svg>
            </button>
        </template>
        <template v-else-if="video.type === 'youtube'">
            <youtube :video-id="videoLink" :player-vars="playerVars" @ended="ended" ref="youtube"></youtube>
            <div v-if="video.type == 'youtube'" class="t-youtube_curtain">
                <img src="../../../../assets/img/youtube-img.png"/>
            </div>
            <div @click="playPauseYoutube" class="t-video__controls" :class="{'js-opacity': isActive && autoplay || !isShow}">
                <button class="t-video__controls-play _cursor" type="button">
                    <svg :class="{'_none': !isActive}" width="34" height="44" viewBox="-6 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 42V2L26 22L1 42Z" stroke="#022855" stroke-width="2.8"/>
                    </svg>
                    <svg :class="{'_none': isActive}" width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0V40" stroke="#022855" stroke-width="3"/>
                        <path d="M18 0V40" stroke="#022855" stroke-width="3"/>
                    </svg>
                </button>
            </div>
            <button 
                class="t-video__controls-mute _cursor" 
                :class="{'js-opacity': isActive && autoplay || !isShow}" 
                type="button" 
                @click="muteYoutube()"
            >
                <svg :class="{'_none': isMute}" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6.828C14.4644 7.29231 14.8328 7.84356 15.0842 8.45028C15.3356 9.05699 15.4649 9.70728 15.4649 10.364C15.4649 11.0207 15.3356 11.671 15.0842 12.2777C14.8328 12.8844 14.4644 13.4357 14 13.9M16.828 4C17.6637 4.83573 18.3267 5.82789 18.779 6.91982C19.2313 8.01176 19.4641 9.18209 19.4641 10.364C19.4641 11.5459 19.2313 12.7162 18.779 13.8082C18.3267 14.9001 17.6637 15.8923 16.828 16.728" stroke="#022855" stroke-width="2"/>
                    <path d="M3.66667 6H3.97514L4.23 5.82623L10 1.89214L10 18.1079L4.23 14.1738L3.97514 14H3.66667H1L1 10V6H3.66667Z" stroke="#022855" stroke-width="2"/>
                </svg>
                <svg :class="{'_none': !isMute}" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.66667 6H3.97514L4.23 5.82623L10 1.89214L10 18.1079L4.23 14.1738L3.97514 14H3.66667H1L1 10V6H3.66667Z" stroke="#022855" stroke-width="2"/>
                    <path d="M14 13L17 10M17 10L20 7M17 10L14 7M17 10L20 13" stroke="#022855" stroke-width="2" stroke-linejoin="round"/>
                </svg>
            </button>
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        props: {
            autoplay: {
                type: String,
                default: null
            },
            video: {
                type: Object,
                default: () => {}
            },
            id: {
                type: String,
                default: ''
            },
            mute: {
                type: String,
                default: ''
            },
            preload: {
                type: String,
                default: 'auto'
            },
        },
        // props: ['autoplay', 'video', 'id', 'mute', 'preload'],
        name: "video-cmp",
        data() {
            return {
                playError: false,
                videoLink: null,
                isActive: true,
                isShow: true,
                isMute: null,
                buttons: false,
                playerVars: {
                    fs: 0,
                    rel: 0,
                    controls: 0, 
                    showinfo: 0
                }
            }
        },

        methods: {
            buttonTrue() {
                this.isShow = true
            },
            buttonFalse() {
                if (!this.isActive) {
                    this.isShow = false
                }
            },
            autoPlay() {
                // if (this.isMobile) {return 'autoplay'} else {return 'null'}

                // if (this.autoplayProp) {
                //     this.autoplay = 'autoplay'
                //     return this.autoplay
                // } else {
                //     return 'null'
                // }
            },
            playPauseVideo() {
                const videoElem = document.getElementById(this.id)
                if (this.isActive) {
                    videoElem
                        .play()
                        .then(() => {
                            this.isActive = false
                            this.isShow = false
                        })
                        .catch(() => {
                            this.isActive = true;
                            this.isShow = true;
                        })
                } else if (!this.isActive) {
                    if(this.isMobile) {
                        if (this.isShow) {
                            videoElem.pause()
                            this.isActive = true
                        }
                        this.isShow = true
                        
                        setTimeout(() => {
                            if (!this.isActive) {
                                this.isShow = false
                            }
                        }, 1500);
                    } else {
                        videoElem.pause()
                        this.isActive = true
                        this.isShow = true
                    }
                }
            },
            playPauseYoutube() {
                if (this.isActive) {
                    this.player.playVideo();
                    document.querySelector('.t-youtube_curtain').style.opacity = '0';
                    this.isActive = false;
                    this.isShow = false
                } else if (!this.isActive) {
                    if(this.isMobile) {
                        if (this.isShow) {
                            this.player.pauseVideo();
                            this.isActive = true;
                            document.querySelector('.t-youtube_curtain').style.opacity = '1';
                        }
                        this.isShow = true
                        
                        setTimeout(() => {
                            if (!this.isActive) {
                                this.isShow = false
                            }
                        }, 1500);
                    } else {
                        this.player.pauseVideo();
                        document.querySelector('.t-youtube_curtain').style.opacity = '1';
                        this.isActive = true;
                        this.isShow = true
                    }
                }
            },
            muteChange() {
                this.isMute ? this.isMute = null : this.isMute = 'muted'
            },
            muteYoutube() {
                if(this.isMute) {
                    this.player.unMute();
                } else {
                    this.player.mute();
                }
                this.isMute = !this.isMute
            },
            ended() {
                document.querySelector('.t-youtube_curtain').style.opacity = '1'
                this.isActive = false
            }

        },

        computed:  {
            ...mapState('mobile', ['isMobile']),
            player() {
                return this.$refs.youtube.player
            },
            posterLink() {
                if (this.autoplay !== 'autoplay' || this.playError) {return '../dist/assets/img/youtube-img.png'}
            }
        },

        created() {
            let video_link = null;
            if (this.video.src.indexOf('?v=') >= 0) {
                video_link = this.video.src.split('?v=')[1];
                video_link = video_link.split('&')[0];
            } else if(this.video.src.indexOf('youtu') >= 0){
                video_link = this.video.src.split('/')[3];
            }
            if (this.video.src.indexOf('vimeo') >= 0) {
                const index = this.video.src.lastIndexOf('/') + 1;
                video_link = this.video.src.substring(index, this.video.src.length);
            }

            this.videoLink = video_link;
            
            if(this.autoplay) {
                this.playerVars['autoplay'] = 1
            }             
            if(this.mute) {
                this.playerVars['mute'] = 1
                this.isMute = 'muted'
            } 
        },
        updated() {
            const videoElem = document.getElementById(this.id)
            if (videoElem && this.autoplay) {
                videoElem
                    .play()
                    .then(() => {
                        this.playError = false;
                        this.isActive = false;
                        this.isShow = false;
                        videoElem.closest('.t-video').style.pointerEvents = 'none';
                    })
                    .catch(() => {
                        this.isActive = true;
                        this.isShow = true;
                        this.playError = true;

                        videoElem.closest('.t-video').style.pointerEvents = 'auto';
                    });
            }
        },
    }
</script>

<style>

</style>