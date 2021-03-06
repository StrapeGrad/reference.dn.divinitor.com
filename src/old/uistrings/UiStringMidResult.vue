<template>
<div>
    <div class="results" v-if="result">
        <div class="col rich">
            <ui-string 
                :message-data="uiHtmlMsg" 
                :format="'html'" />
            <div v-html="result.html" ref="htmlArea" class="invisible"></div>
            <div class="foot">
                <span v-on:click="copyHtml">{{ copyText }}</span>
                <!-- <span v-on:click="googleTranslate">Open in Google Translate</span> -->
            </div>
            <textarea class="hidden" v-model="result.html" ref="htmltext"></textarea>
        </div>
        <!-- <div class="col strip" v-html="result.strip">
        </div> -->
        <div class="col raw">
            <textarea v-model="result.raw" readonly @click="selectText" ref="rawtext">
            </textarea>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import IUiStringMessage from '@/models/uistring/IUiStringMessage';
import UiString from "@/components/uistring/UiString.vue";

const COPY_TEXT = "Copy HTML Source";
const COPIED_TEXT = "Copied!";

export default Vue.extend({
    name: 'uistring-midresult',
    props: {
        result: {
            type: Object as () => any,
        },
        mid: {
            type: Object as () => any,
        },
    },
    components: {
        UiString,
    },
    data: function() {
        return {
            copyText: COPY_TEXT
        }
    },
    computed: {
        uiHtmlMsg(): IUiStringMessage {
            const ret: IUiStringMessage = {
                id: Number(this.mid),
                message: String(this.result.html),
            };

            return ret;
        }
    },
    methods: {
        copyHtml() {
            // @ts-ignore
            appInsights.trackEvent(`interaction.uistrings.result.html.copy`, {
                mid: this.mid,
                region: this.$store.state.regionCode
            });

            let hiddenArea = this.$refs.htmltext as HTMLInputElement;
            hiddenArea.focus();
            hiddenArea.select();
            let success = document.execCommand('copy');
            if (success) {
                this.copyText = COPIED_TEXT;
                setTimeout(() => this.copyText = COPY_TEXT, 1000);
            } else {
                // console.log("KO");
            }
        },
        googleTranslate() {
            //  TODO get working
            let div = this.$refs.htmlArea as HTMLElement;
            let text = div.textContent;
            let url = `https://translate.google.com/#ko/en/${(text)}`;
            window.open(url);
        },
        selectText() {
            // @ts-ignore
            appInsights.trackEvent(`interaction.uistrings.result.raw.select`, {
                mid: this.mid,
                region: this.$store.state.regionCode
            });
            
            const entity = this.$refs.rawtext as HTMLInputElement;

            entity.focus();
            entity.select();
        }
    }
});
</script>

<style lang="less" scoped>
@import "../../less/core.less";

.results {
    
    display: flex;

    .invisible {
        position: absolute;
        top: 0;
        .left(0);
        width: 0;
        height: 0;
        opacity: 0.0;
    }

    .col {
        position: relative;
        display: flex;
        flex: 1;
        padding: 1em 1em 2em 1em;
        border: 1px solid @dv-c-accent-1;
        background-color: rgba(0, 0, 0, 0.25);
        transition: background-color ease-in 0.125s;
        margin: 0;

        &:first-child {
            .border-right(none);
        }

        &:hover {
            background-color: rgba(0, 0, 0, 0.75);
        }

    }

    .rich::before {
        content: "HTML";
        position: absolute;
        font-size: 12px;
        top: 0.1em;
        .left(0.4em);
        color: @dv-c-idle;
    }

    .raw::before {
        content: "RAW";
        position: absolute;
        font-size: 12px;
        top: 0.1em;
        .left(0.4em);
        color: @dv-c-idle;
    }

    .foot {
        position: absolute;
        bottom: -1.5em;
        .left(0);
        font-size: 12px;
        color: @dv-c-accent-1;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        transition: color ease-in 0.125s;
        cursor: pointer;

        &:hover {
            color: @dv-c-foreground;
        }
    }

    textarea {
        color: @dv-c-body;
        font-size: 14px;
        font-family: @dv-f-lato;
        resize: none;
        background: none;
        border: none;
        width: 100%;

        &.hidden {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
        }
    }

    .no-results {
        margin-top: 2em;
        text-align: center;
        background: rgba(0, 0, 0, 0.75);
        padding-bottom: 1em;
        border: 1px solid @dv-c-red;
        .icon {
            font-size: 144px;
            color: @dv-c-red;
        }
        .head {
            font-family: @dv-f-lato;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 24px;
            color: @dv-c-red;
        }
        p {
            font-size: 18px;
        }
    }
}

</style>