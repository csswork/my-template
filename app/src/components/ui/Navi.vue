<template>
    <nav class="ui-navi">
        <ul>
            <li v-for="(item, key) in menu" :key="key"
                :class="[
                    'menu-item-' + strToSlug(item.text), 
                    item.show === false && 'menu-item-hide',
                ]">
                <router-link v-if="type === 0" :to="item.to" :class="{'router-link-active': $route.meta.menu_meta && item.meta && $route.meta.menu_meta === item.meta}">
                    <span v-html="item.text"></span>
                </router-link>
                <div v-else class="link" :class="{ 'link-selected': selected_index === key , 'menu-item-hide': item.show === false }" @click="selectIndex(key)">
                    <span v-html="item.text"></span>
                </div>
            </li>
        </ul>
    </nav>
</template>


<script>
//從Anchor搬過來，有需要再改成Setup script
export default {
    name: 'Navi',
    emits: ['selected-tab'],
    props: {
        type: { //0: link; 1: tab
            default: 0,
            type: Number,
        },
        menu: {
            default: [],
            type: Array,
        },
        type_one_index: {
            default: 0,
            type: Number,
        }
    },

    data() {
        return {
            selected_index: 0,
        }
    },

    methods: {
        selectIndex(index) {
            this.selected_index = index;
            this.$emit('selected-tab', index);
        },

        strToSlug(str) {
            str = str ?str.replace(/[^\w\s]/g, ''):'';
            return str.replace(/\s+/g, '-').toLowerCase();
        },
    },

    mounted() {
        if (this.type === 1) {
            this.selected_index = 0;
        }

        if (this.type_one_index) {
            this.selected_index = this.type_one_index;
        }
    },
}
</script>
<style lang="scss">
.ui-navi {
    color: var(--Black-50);
    flex: 1;

    ul {
        display: flex;
    }

    ul li a,
    .link {
        color: var(--Black-40);
        display: flex;
        align-items: center;
        height: 40px;
        font: var(--medium-14);
        margin: 0 8px;
        position: relative;
        cursor: pointer;

        svg {
            height: 20px;
            width: 20px;
            margin-right: 8px;
        }

        .svg-icon--analytics,
        .svg-icon--help {
            height: 18px;
            width: 18px;
            position: relative;
            left: 1px;

            &+span {
                position: relative;
                left: 2px;
            }

        }

        .svg-icon--setting {
            height: 26px;
            width: 26px;

            &+span {
                position: relative;
                left: -3px;
            }
        }

        &:hover {
            color: var(--Black-75);
        }

        &.router-link-active,
        &.router-link-exact-active,
        &.link-selected {
            background: rgba(255, 255, 255, 0.15);
            color: var(--Black-75);

            &::before {
                height: 3px;
                position: absolute;
                bottom: 0;
                content: '';
                background-color: var(--PB-100);
                width: 100%;
                left: 0;
                border-radius: 2px;
            }
        }
    }

    ul li:first-child a,
    ul li:first-child .link {
        margin-left: 0;

    }

    .menu-item-hide{
        display: none;
    }
}
</style>
