<template>
<div class="points">
    <div v-if="pointData">
        <div v-if="big" class="big icon"  
            :style="`background-image: url(${url}); background-position: -${coords.x}px -${coords.y}px;`"></div>
        <div v-else class="icon"  
            :style="`background:url(${url}) -${coords.x * 0.75 / 2}px -${coords.y * 0.75 / 2}px; background-size: 800% 800%;`"></div>
        <span class="pts" v-if="!hideText"><span v-if="amount">{{ amount | thousands }} </span><span v-if="!hideName">{{ pointData.name }}</span></span>
        <div class="point-tooltip" v-if="!noTip">
            <h2>
                <div class="icon"  
                    :style="`background:url(${url}) -${coords.x * 0.75 / 2}px -${coords.y * 0.75 / 2}px; background-size: 800% 800%;`"></div>
                {{ pointData.name }}
            </h2>
            <div v-html="pointData.desc"></div>
        </div>
    </div>
    <div v-else-if="amount">
        <div v-if="big" class="big icon"></div>
        <div v-else class="icon"></div>
        <span class="pts" v-if="!hideText"><span v-if="amount">{{ amount | thousands }}</span></span>
    </div>
</div>
</template>

<script>
import Points from '@/old/api/points';
export default {
    props: ["pointId", "amount", "hideText", "hideName", "big", "noTip"],
    data: function() {
        return {
            pointData: null,
            coords: null,
            url: Points.getPointIconUrl(this.$store.state.regionCode)
        };
    },
    created() {
        this.fetchData();
    },
    watch: {
        pointId(to, from) {
            if (to != from) {
                this.fetchData();
            }
        },
    },
    methods: {
        fetchData() {
            Points.getPoint(this.pointId, this.$store.state.regionCode).then(
                (r) => {
                    this.coords = Points.getPointIconCoordinates(r.iconIndex);
                    this.pointData = r;
                },
                (e) => {
                    console.error(e);
                }
            );
        }
    }
}
</script>

<style lang="less">
@import "../../less/core.less";

.points {
    position: relative;
    display: inline-block;

    .icon {
        display: inline-block;
        transform: translateY(6px);
        width: 24px;
        height: 24px;

        &.big {
            width: 64px;
            height: 64px;
            transform: scale(0.8125);
        }
    }

    .pts {
        color: @dv-c-foreground;
    }
    
    .point-tooltip {
        position: absolute;
        bottom: 100%;
        .left(0);
        // transform: translateX(-50%);
        display: block;
        opacity: 0.0;
        .text-align(left);
        min-width: 100px;
        background: @dv-c-background;
        @supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
            background: fade(@dv-c-background, 80%);
            backdrop-filter: blur(8px);
        }
        z-index: 10;
        pointer-events: none;
        padding: 10px 16px;
        border: 1px solid @dv-c-foreground;
        box-shadow: 0 0 20px fade(black, 80%);
        max-width: 400px;
        min-width: 400px;
        transition: opacity 0.125s ease-in;

        h2 {
            font-size: 18px;
            padding: 0;
            margin: 0 0 8px 0;
        }
    }

    &:hover {
        .point-tooltip {
            display: block;
            opacity: 1.0;
        }
    }
}

</style>

