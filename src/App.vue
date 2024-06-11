<template>
    <div id="wrap" class="wrap not-app">
        <div class="wrap-box" id="modal-ai-box">
            <div class="inner-box">
                <div class="ai-menus">
                    <div class="col scrollbar-content">
                        <div class="item logo-item">
                            <a href="/">
                                <svg viewBox="0 0 688 166.4">
                                    <polygon points="62.5 0 0 29.7 0 48.3 45.2 27.7 45.2 166.4 62.4 166.4 62.5 0" class="one"></polygon>
                                    <polyline points="0 77.7 19 69 19 166.4 36.2 166.4 36.2 41.3 0 58.6" class="one">
                                    </polyline>
                                    <g class="tu">
                                        <polygon points="209.6 0 88.8 0 82.2 0 82.2 8.4 82.2 8.8 82.2 17.2 88.8 17.2 209.6 17.2 215 17.2 215 8.8 215 8.4 215 0 209.6 0">
                                        </polygon>
                                        <path d="M143.5,166.4H126.3V45.2h-44V28h61.2Z"></path>
                                        <path d="M153.8,166.4H171V45.2h44V28H153.8Z"></path>
                                        <path d="M299,138c21.7,0,35.9-17.8,35.9-39.6V0H317.5V98.4c0,12.3-6.4,22.3-18.5,22.3s-18.5-10-18.5-22.3V0H263.1V98.4C263.2,120.2,277.3,138,299,138Z">
                                        </path>
                                        <path d="M345.4,0V94.9c0,30-18.9,54.5-46.4,54.5s-46.4-24.4-46.4-54.5V0h-17V94.9c0,28.4,13.7,52.9,35.2,64.5a58.2,58.2,0,0,0,28.1,7.1h.3c36.9,0,63.5-32.1,63.5-71.5V0Z">
                                        </path>
                                    </g>
                                    <g class="cn">
                                        <polygon points="574.5 110.4 574.5 94.4 636.2 94.4 638.4 90.8 660.6 90.8 647.6 110.4 574.5 110.4">
                                        </polygon>
                                        <polygon points="574.5 133.9 574.5 117.9 636.2 117.9 638.4 114.3 660.6 114.3 647.6 133.9 574.5 133.9">
                                        </polygon>
                                        <polygon points="603.9 52.5 618.8 62.8 644.1 45.1 597.6 45.1 594.5 49.1 574.5 49.1 591.3 25 610.2 25 606.6 29.2 660.6 29.2 660.6 52.5 635.3 67.2 660.6 73 660.6 87.2 617.8 77.3 574.5 87.2 574.5 72.6 599.6 67.2 574.5 52.5 603.9 52.5">
                                        </polygon>
                                        <path d="M547.1.6V158.3H688V.6ZM670.9,141.2H564.2V17.8H670.9Z"></path>
                                        <path d="M490.2,143v-9.9h24.5V91.5H408.6v41.6h25.5V143H392.4v15.4H531.8V143Zm-65.5-36.6h73.8v11.2H424.7Zm24.8,26.7h25.3V143H449.5Z">
                                        </path>
                                        <path d="M531.9,46.4H392.3v35h16.9v5.2H515V81.4h16.9ZM516.5,71H407.8V61.9H516.5Z">
                                        </path>
                                        <polygon points="531.9 21.2 532 5.7 469.8 5.7 469.8 0.2 454.4 0.2 454.4 5.7 392.3 5.7 392.3 21.2 454.4 21.2 454.4 26 401.8 26 401.8 41.5 522.4 41.5 522.4 26 469.8 26 469.8 21.2 531.9 21.2">
                                        </polygon>
                                    </g>
                                </svg>
                            </a>
                        </div>
                        
                        <div class="item keyword">
                            <ul id="js-ai-input-menu">
                                <li class="current" data-input="title">标题</li>
                                <li data-input="keyword">关键词</li>
                                
                            </ul>
                            <div class="input">
                                <textarea id="js-ai-input" class="hidden" placeholder="请输入创意描述，最多200个字。" maxlength="400">春天里的戴帽子女孩</textarea>
                            </div>
                        </div>

                        <div class="item">
                            <label><span>相似度</span><span id="js-current-vlaue">50%</span></label>
                            <div class="range-wrap">
                                <input id="js-ai-range" type="range" min="0" max="100" step="1" value="50">
                            </div>
                        </div>
                        <div class="item">
                            <label>风格</label>
                            <ul>
                                <li class="js-key-item image "><figure><img></figure><span data-key="portrait">肖像</span></li>
                                <li id="js-ai-anime" class="js-key-item image current"><figure></figure><span data-key="anime">卡通</span></li>
                                
                            </ul>
                        </div>

                        <div class="item">
                            <label>模仿特征</label>
                            <ul>
                                <li class="js-mode-item current"><span data-key="">不指定</span></li>
                                <li class="js-mode-item"><span data-key="canny">物体边界线</span></li>
                                <li class="js-mode-item"><span data-key="softedge">物体轮廓</span></li>
                                <li class="js-mode-item"><span data-key="openpose">姿势识别</span></li>
                                


                                <li class="js-mode-item"><span data-key="hed">边缘检测</span></li>
                                <li class="js-mode-item"><span data-key="shuffle">风格计称</span></li>



                            </ul>
                        </div>


                        
                        <div class="item">
                            <label>尺寸比例</label>
                            <ul>
                                <li class="js-ratio-item current"><span data-ratio="1:1"><i></i>1:1</span></li>
                                <li class="js-ratio-item"><span data-ratio="4:3"><i></i>4:3</span></li>
                                <li class="js-ratio-item"><span data-ratio="9:16"><i></i>9:16</span></li>
                                <li class="js-ratio-item"><span data-ratio="16:9"><i></i>16:9</span></li>
                            </ul>
                        </div>

                        <div class="item">
                            <label>尺寸大小</label>
                            <ul>
                                <li class="js-size-item current"><span data-size="640">小尺寸</span></li>
                                <li class="js-size-item"><span data-size="1024">中尺寸</span></li>
                                <li class="js-size-item"><span data-size="1024">大尺寸</span></li>
                                <li class="js-size-item"><span data-size="1024">超大尺寸</span></li>
                            </ul>
                        </div>

                        <div class="item">
                            <label>数量</label>
                            <ul>
                                <li class="js-number-item current"><span data-number="1">1张</span></li>
                                <li class="js-number-item"><span data-number="2">2张</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="submit">
                        <span id="js-get-ai-images" class="btn">开始生成</span>
                    </div>
                </div>
                <div class="ai-show">
                    <div class="images">
                        <figure id="js-ai-image-0"><img :src="img" alt="photo" id="pthumb2"></figure>
                        <figure></figure>
                    </div>

                </div>
                <div id="js-ai-loading" class="ai-loading">
                    <span>请稍等，正在创建图片中。</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

const api_url = 'https://www.soujpg.com:8006/rest/image-search';
const api_key = '1tutcv2w5e9VakyxE4xJkH';

const getRandomPrompts = () => {
    const params = {
        serviceMethod: 'getRandomPrompts',
        userId: api_key,
        batchSize: 1,
    }; 

    return axios.post(api_url, {
        params: params,
    });
};

//  "userId": "1tutcv2w5e9VakyxE4xJkH",



export default {
    data() {
        return {
            img: require('@/assets/images/img1.jpg'),
        }
    },

    mounted() {
        const btn = document.getElementById('js-get-ai-images');
        const input = document.getElementById('js-ai-input');
        const range = document.getElementById('js-ai-range');
        const current = document.getElementById('js-current-vlaue');
        const anime = document.getElementById('js-ai-anime');
        const aiImage = document.getElementById('js-ai-image-0');
        const loading = document.getElementById('js-ai-loading');

        btn.addEventListener('click', () => {
            loading.style.display = 'block';
            getRandomPrompts().then(res => {
                console.log(res);
                loading.style.display = 'none';
                aiImage.src = res.data[0].url;
            });
        });
    },
}
</script>

<style>

#modal-ai-box .inner-box {
    display: flex;
    height: 100vh;
    width: 100%;
    background: #20373f;
    position: relative;
}

.ai-menus .item.logo-item a {
    display: block;
    cursor: pointer;
    width: 6.8rem;
    height: 1.7rem;
    position: relative;
}

.ai-menus .item.logo-item a::before {
    content: 'AI';
    position: absolute;
    bottom: -2px;
    left: 100%;
    color: #fff;
    opacity: 1;
    font-weight: bold;
    margin-left: .5rem;
}

.ai-menus .item.logo-item a svg {
    width: 100%;
    height: 100%;
    display: block;
    opacity: .5;
}

.ai-menus .item.logo-item a:hover svg {
    opacity: 1;
}

.ai-menus .item.logo-item a svg .one {
    fill: #fff;
}

.ai-menus .item.logo-item a svg .tu {
    fill: #fff;
}

.ai-menus .item.logo-item a svg .cn {
    fill: #fff;
}
</style>
