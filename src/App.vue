<template>
    <div id="wrap" class="wrap not-app">
        <div class="wrap-box" id="modal-ai-box">
            <div class="inner-box">
                <navi class="ai-navi">
                    <!-- https://www.figma.com/design/QjMaAjIASzU5qdVCI969C4/AI.icons-%7C-AI-art-generation-icon-set-(Community)?node-id=12-30&t=5eeg1gmpVKRI7G7q-0 -->
                    <ul id="js-ai-input-navi">
                        <li class="current" data-type="text2image">
                            <i>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.68064 19.681L5.28928 21.2896C5.79727 21.7976 6.51692 22.094 7.19424 22.094C7.87156 22.094 8.59121 21.7976 9.0992 21.2896L19.0754 11.3135L19.5834 6.48752C19.668 5.89486 19.2024 5.38687 18.6097 5.38687C18.5674 5.38687 18.5251 5.38687 18.4827 5.38687L13.6568 5.89486L3.68064 15.871C2.62233 16.9294 2.62233 18.6227 3.68064 19.681ZM14.5881 7.84217L17.4244 7.54584L17.1281 10.3821L12.3165 15.236L11.0042 16.5484L8.42188 13.9661L9.73419 12.6537L14.5881 7.84217ZM5.11995 17.3104L6.98258 15.4054L9.56486 17.9877L7.6599 19.8503C7.49057 20.0197 7.2789 20.062 7.19424 20.062C7.10957 20.062 6.89791 20.0197 6.72858 19.8503L5.11995 18.2417C4.86595 17.9877 4.86595 17.5644 5.11995 17.3104Z"/>
                                <path d="M4.34738 1.51328C4.51333 0.828906 5.48667 0.828906 5.65262 1.51328L6.10924 3.39639C6.16849 3.64073 6.35927 3.83151 6.60361 3.89075L8.48672 4.34738C9.17109 4.51333 9.17109 5.48667 8.48672 5.65262L6.60361 6.10924C6.35927 6.16849 6.16849 6.35927 6.10924 6.60361L5.65262 8.48672C5.48667 9.17109 4.51333 9.17109 4.34738 8.48672L3.89076 6.60361C3.83151 6.35927 3.64073 6.16849 3.39639 6.10924L1.51328 5.65262C0.828906 5.48667 0.828906 4.51333 1.51328 4.34738L3.39639 3.89076C3.64073 3.83151 3.83151 3.64073 3.89075 3.39639L4.34738 1.51328Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 2.24146L4.6739 3.58629C4.54355 4.12384 4.12384 4.54355 3.58629 4.6739L2.24146 5L3.58629 5.3261C4.12384 5.45645 4.54355 5.87616 4.6739 6.41371L5 7.75854L5.3261 6.41371C5.45645 5.87616 5.87616 5.45645 6.41371 5.3261L7.75854 5L6.41371 4.6739C5.87616 4.54355 5.45645 4.12384 5.3261 3.58629L5 2.24146ZM5.65262 1.51328C5.48667 0.828906 4.51333 0.828906 4.34738 1.51328L3.89075 3.39639C3.83151 3.64073 3.64073 3.83151 3.39639 3.89076L1.51328 4.34738C0.828906 4.51333 0.828906 5.48667 1.51328 5.65262L3.39639 6.10924C3.64073 6.16849 3.83151 6.35927 3.89076 6.60361L4.34738 8.48672C4.51333 9.17109 5.48667 9.17109 5.65262 8.48672L6.10924 6.60361C6.16849 6.35927 6.35927 6.16849 6.60361 6.10924L8.48672 5.65262C9.17109 5.48667 9.17109 4.51333 8.48672 4.34738L6.60361 3.89075C6.35927 3.83151 6.16849 3.64073 6.10924 3.39639L5.65262 1.51328Z"/>
                                <path d="M19.5105 17.385C19.635 16.8717 20.365 16.8717 20.4895 17.385L20.8319 18.7973C20.8764 18.9805 21.0195 19.1236 21.2027 19.1681L22.615 19.5105C23.1283 19.635 23.1283 20.365 22.615 20.4895L21.2027 20.8319C21.0195 20.8764 20.8764 21.0195 20.8319 21.2027L20.4895 22.615C20.365 23.1283 19.635 23.1283 19.5105 22.615L19.1681 21.2027C19.1236 21.0195 18.9805 20.8764 18.7973 20.8319L17.385 20.4895C16.8717 20.365 16.8717 19.635 17.385 19.5105L18.7973 19.1681C18.9805 19.1236 19.1236 18.9805 19.1681 18.7973L19.5105 17.385Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 17.9311L19.7554 18.9397C19.6577 19.3429 19.3429 19.6577 18.9397 19.7554L17.9311 20L18.9397 20.2446C19.3429 20.3423 19.6577 20.6571 19.7554 21.0603L20 22.0689L20.2446 21.0603C20.3423 20.6571 20.6571 20.3423 21.0603 20.2446L22.0689 20L21.0603 19.7554C20.6571 19.6577 20.3423 19.3429 20.2446 18.9397L20 17.9311ZM20.4895 17.385C20.365 16.8717 19.635 16.8717 19.5105 17.385L19.1681 18.7973C19.1236 18.9805 18.9805 19.1236 18.7973 19.1681L17.385 19.5105C16.8717 19.635 16.8717 20.365 17.385 20.4895L18.7973 20.8319C18.9805 20.8764 19.1236 21.0195 19.1681 21.2027L19.5105 22.615C19.635 23.1283 20.365 23.1283 20.4895 22.615L20.8319 21.2027C20.8764 21.0195 21.0195 20.8764 21.2027 20.8319L22.615 20.4895C23.1283 20.365 23.1283 19.635 22.615 19.5105L21.2027 19.1681C21.0195 19.1236 20.8764 18.9805 20.8319 18.7973L20.4895 17.385Z"/>
                                <path d="M23 2C23 2.55228 22.5523 3 22 3C21.4477 3 21 2.55228 21 2C21 1.44772 21.4477 1 22 1C22.5523 1 23 1.44772 23 2Z"/>
                                <path d="M13 2C13 2.55228 12.5523 3 12 3C11.4477 3 11 2.55228 11 2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2Z"/>
                                <path d="M4 12C4 12.5523 3.55228 13 3 13C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12Z"/>
                                </svg>
                            </i>
                            <span>AI绘画</span>
                        </li>
                        <li data-type="bgRemover">
                            <i>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5755 4.82764C13.072 3.32411 10.6343 3.32412 9.13076 4.82764L5.47948 8.47892L5.4845 8.48394C4.69148 9.34269 4.19188 10.2358 4.08466 11.1994C3.96495 12.2754 4.35257 13.2694 5.02017 14.1967C5.08119 14.2814 5.10428 14.3938 5.08186 14.5023C5.06007 14.6077 5.00355 14.6767 4.93573 14.7125C3.96874 15.223 2.82141 15.9735 2.22056 16.9761C1.90416 17.5041 1.72233 18.131 1.83215 18.8228C1.94041 19.5047 2.31519 20.1431 2.90895 20.7368C3.5121 21.34 4.16053 21.7166 4.84968 21.8394C5.54424 21.9632 6.18685 21.8124 6.74248 21.5264C7.8068 20.9786 8.6398 19.8904 9.21413 18.9686C9.25213 18.9076 9.32114 18.8552 9.43071 18.836C9.54467 18.816 9.67046 18.8397 9.7703 18.9046C10.6139 19.4527 11.5495 19.7386 12.565 19.5713C13.4653 19.423 14.3244 18.935 15.1619 18.1613L15.1668 18.1663L18.8181 14.515C20.3216 13.0115 20.3216 10.5738 18.8181 9.07028L14.5755 4.82764ZM13.9586 16.9581L6.68773 9.68717C6.07793 10.3606 5.82666 10.9162 5.77424 11.3874C5.71663 11.9052 5.88152 12.4835 6.3998 13.2034C7.091 14.1634 6.85705 15.6206 5.72936 16.2159C4.80322 16.7048 4.02368 17.2745 3.67874 17.85C3.52225 18.1111 3.47645 18.3378 3.51113 18.5562C3.54737 18.7845 3.68921 19.1129 4.11103 19.5347C4.53583 19.9595 4.88459 20.1189 5.14791 20.1658C5.40583 20.2117 5.67098 20.166 5.96443 20.0149C6.59826 19.6887 7.22868 18.9405 7.77127 18.0697C8.42141 17.0262 9.78753 16.8885 10.6965 17.479C11.2775 17.8565 11.7891 17.9762 12.2886 17.8939C12.7487 17.8181 13.301 17.5541 13.9586 16.9581ZM10.3328 6.02972C11.1725 5.19009 12.5338 5.19009 13.3734 6.02972L17.616 10.2724C18.4557 11.112 18.4557 12.4733 17.616 13.3129L15.1668 15.7621L7.88364 8.47892L10.3328 6.02972Z"/>
                                <path d="M19.5105 1.38496C19.635 0.87168 20.365 0.871679 20.4895 1.38496L20.8319 2.79729C20.8764 2.98055 21.0195 3.12363 21.2027 3.16807L22.615 3.51054C23.1283 3.635 23.1283 4.365 22.615 4.48946L21.2027 4.83193C21.0195 4.87637 20.8764 5.01945 20.8319 5.20271L20.4895 6.61504C20.365 7.12832 19.635 7.12832 19.5105 6.61504L19.1681 5.20271C19.1236 5.01945 18.9805 4.87637 18.7973 4.83193L17.385 4.48946C16.8717 4.365 16.8717 3.635 17.385 3.51054L18.7973 3.16807C18.9805 3.12363 19.1236 2.98055 19.1681 2.79729L19.5105 1.38496Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 1.93109L19.7554 2.93972C19.6577 3.34288 19.3429 3.65766 18.9397 3.75542L17.9311 4L18.9397 4.24458C19.3429 4.34234 19.6577 4.65712 19.7554 5.06029L20 6.06891L20.2446 5.06029C20.3423 4.65712 20.6571 4.34234 21.0603 4.24458L22.0689 4L21.0603 3.75542C20.6571 3.65766 20.3423 3.34288 20.2446 2.93972L20 1.93109ZM20.4895 1.38496C20.365 0.871679 19.635 0.87168 19.5105 1.38496L19.1681 2.79729C19.1236 2.98055 18.9805 3.12363 18.7973 3.16807L17.385 3.51054C16.8717 3.635 16.8717 4.365 17.385 4.48946L18.7973 4.83193C18.9805 4.87637 19.1236 5.01945 19.1681 5.20271L19.5105 6.61504C19.635 7.12832 20.365 7.12832 20.4895 6.61504L20.8319 5.20271C20.8764 5.01945 21.0195 4.87637 21.2027 4.83193L22.615 4.48946C23.1283 4.365 23.1283 3.635 22.615 3.51054L21.2027 3.16807C21.0195 3.12363 20.8764 2.98055 20.8319 2.79729L20.4895 1.38496Z"/>
                                <path d="M3 5C3 5.55228 2.55228 6 2 6C1.44772 6 1 5.55228 1 5C1 4.44772 1.44772 4 2 4C2.55228 4 3 4.44772 3 5Z"/>
                                <path d="M7 2C7 2.55228 6.55228 3 6 3C5.44772 3 5 2.55228 5 2C5 1.44772 5.44772 1 6 1C6.55228 1 7 1.44772 7 2Z"/>
                                <path d="M20.0921 18.3208C20.1958 17.8931 20.8042 17.8931 20.9079 18.3208L21.1933 19.4977C21.2303 19.6505 21.3495 19.7697 21.5023 19.8067L22.6792 20.0921C23.1069 20.1958 23.1069 20.8042 22.6792 20.9079L21.5023 21.1933C21.3495 21.2303 21.2303 21.3495 21.1933 21.5023L20.9079 22.6792C20.8042 23.1069 20.1958 23.1069 20.0921 22.6792L19.8067 21.5023C19.7697 21.3495 19.6505 21.2303 19.4977 21.1933L18.3208 20.9079C17.8931 20.8042 17.8931 20.1958 18.3208 20.0921L19.4977 19.8067C19.6505 19.7697 19.7697 19.6505 19.8067 19.4977L20.0921 18.3208Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 18.7759L20.2962 19.6164C20.2147 19.9524 19.9524 20.2147 19.6164 20.2962L18.7759 20.5L19.6164 20.7038C19.9524 20.7853 20.2147 21.0476 20.2962 21.3836L20.5 22.2241L20.7038 21.3836C20.7853 21.0476 21.0476 20.7853 21.3836 20.7038L22.2241 20.5L21.3836 20.2962C21.0476 20.2147 20.7853 19.9524 20.7038 19.6164L20.5 18.7759ZM20.9079 18.3208C20.8042 17.8931 20.1958 17.8931 20.0921 18.3208L19.8067 19.4977C19.7697 19.6505 19.6505 19.7697 19.4977 19.8067L18.3208 20.0921C17.8931 20.1958 17.8931 20.8042 18.3208 20.9079L19.4977 21.1933C19.6505 21.2303 19.7697 21.3495 19.8067 21.5023L20.0921 22.6792C20.1958 23.1069 20.8042 23.1069 20.9079 22.6792L21.1933 21.5023C21.2303 21.3495 21.3495 21.2303 21.5023 21.1933L22.6792 20.9079C23.1069 20.8042 23.1069 20.1958 22.6792 20.0921L21.5023 19.8067C21.3495 19.7697 21.2303 19.6505 21.1933 19.4977L20.9079 18.3208Z"/>
                                </svg>
                            </i>
                            <span>智能抠图</span>
                        </li>
                    </ul>
                </navi>
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
                                <li class="js-key-item image "><figure><img></figure><span data-key="general">肖像</span></li>
                                <li id="js-ai-anime" class="js-key-item image current"><figure></figure><span data-key="anime">卡通</span></li>
                                
                            </ul>
                        </div>

                        <div class="item">
                            <label>模仿特征</label>
                            <ul>
                                <!-- <li class="js-mode-item current"><span data-key="canny">不指定</span></li> -->
                                <li class="js-mode-item current"><span data-key="canny">边缘检测</span></li>
                                <!-- <li class="js-mode-item"><span data-key="softedge">物体轮廓</span></li> -->
                                <li class="js-mode-item"><span data-key="openpose">姿势识别</span></li>
                                <li class="js-mode-item"><span data-key="depth">深度</span></li>
                                <li class="js-mode-item"><span data-key="lineart">草图</span></li>
                                <!-- <li class="js-mode-item"><span data-key="hed">边缘检测</span></li> -->
                                <!-- <li class="js-mode-item"><span data-key="shuffle">风格计称</span></li> -->

                                <!-- lineart:
                                openpose:
                                depth:
                                canny: -->
                                <!-- SJ_controlNet_lineart_0
                                SJ_controlNet_openpose_0
                                SJ_controlNet_depth_0
                                SJ_controlNet_canny_0 -->
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
                                <li class="js-size-item"><span data-size="640">小尺寸</span></li>
                                <li class="js-size-item"><span data-size="800">中尺寸</span></li>
                                <li class="js-size-item current"><span data-size="1024">大尺寸</span></li>
                                <li class="js-size-item"><span data-size="2048">超大尺寸</span></li>
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
                        <figure id="js-ai-image-0"><img src="https://soujpg-images-1307121509.cos.ap-shanghai.myqcloud.com/souJpg/images/cSyqyvEY3mZzoKCzQZLD64.webp" alt="photo" id="pthumb2"></figure>
                        <figure id="js-ai-image-1"></figure>
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
const api_url = 'https://www.soujpg.com:8006/rest/image-search';
const api_key = '1tutcv2w5e9VakyxE4xJkH';

const BUCKET_NAME = 'soujpg-private1-1307121509';
const REGION_NAME = 'ap-beijing';
const FILE_NAME_PREFIX = 'ai-image/';
const PARAMS = {
    'serviceMethod': 'text2Image',
    // 'styleName': '1tu-anime',
    // 'prompts': 'a dog',
    'numInferenceSteps': 8,
    // 'batchSize': 2,
    'framework': 'SJ_framework_1',
    'userId': api_key,
    'returnType': 'imageName',
    'asyncRequest': true,
    // 'width': 800,
    // 'height': 400,
    'controlNetInfoList': [
        {
            // 'modelName': 'SJ_controlNet_canny_0',
            // 'controlMode': 'canny',
            'controlnetConditioningScale': 0.5,
            // 'url': img_url,
        }
    ]
};

let TYPE = 'text2image';
let IMAGE_NUMBER = 1;
let IMAGE_SRC = '';
let TIMER = null;

class TencentCos {
    constructor(
        bucketName = BUCKET_NAME,
        regionName = REGION_NAME,
        fileNamePrefix = FILE_NAME_PREFIX
    ) {
        this.cos = new COS({
            getAuthorization: function (options, callback) {
                fetch(api_url, {
                    method: 'POST',
                    body: JSON.stringify({
                        params: {
                            serviceMethod: 'tencentCosSts',
                            bucketName: `${regionName}_${bucketName}`
                        }
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    const credentials = data?.credentials?.credentials ?? {};
                    callback({
                        TmpSecretId: credentials.tmpSecretId,
                        TmpSecretKey: credentials.tmpSecretKey,
                        SecurityToken: credentials.sessionToken,
                        ExpiredTime: data?.credentials?.expiredTime
                    });
                }).catch((err) => {
                    console.log(err.message);
                });
            }
        });
        this.bucketName = bucketName;
        this.regionName = regionName;
        this.fileNamePrefix = fileNamePrefix;
    }

    uploadImage(imageData, imageIdKey, func, onProgress) {
        const url = null;

        this.cos.putObject({
            Bucket: this.bucketName,
            Region: this.regionName,

            Key: this.fileNamePrefix + imageIdKey,
            Body: imageData,
            onProgress
        },func);

        return url;
    }

    downloadImage(fileName, func, onProgress = () => {}, fileNamePrefix) {
        this.cos.getObject({
            Bucket: this.bucketName,
            Region: this.regionName,
            Key: (fileNamePrefix || this.fileNamePrefix) + fileName,
            DataType: 'blob',
            onProgress
        },func);
    }
}

const cos = new TencentCos();

const getRandomPrompts = () => {
    const params = {
        serviceMethod: 'getRandomPrompts',
        userId: api_key,
        batchSize: 1,
    }; 

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params: params }),
    }).then(response => response.json());
};

const bgRemover = (imageData) => {
    //https://gitee.com/jasstionzyf/sou-jpg-web-api-doc/blob/master/imageSearch/bgRemover.md
    const params = {
        serviceMethod: 'imageBgRemove',
        userId: api_key,
        asyncRequest: true,
        returnType: 'imageName',
        // imageBase64Str: imageData,
        url: 'https://imgs.1tu.com/images/47/16/68/24/6005466582.jpg-450h.jpg',
        /*
        type: if portrait cutout
        default: false
        */
        // ifHuman: false,

        // 64561737: 通用
        // 71067617: 人像
        // 34589458: 通用
        // 64561737: 通用效果最好，默认
        // modelId: 64561737,
    };

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params: params }),
    }).then(response => response.json());
};

const generateImage = () => {
    PARAMS.controlNetInfoList[0].url = IMAGE_SRC;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params: PARAMS }),
    }).then(response => response.json());
    
}


const getAsyncRequest = (requestId) => {
    const params = {
        serviceMethod: 'fetchAsyncRequestStatus',
        userId: api_key,
        // opName: 'image-search_' + opName,
        asyncRequestId: requestId,
    };

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params: params }),
    }).then(response => response.json());
};

const Pool = (requestId) => {
    TIMER = setTimeout(() => {
        getAsyncRequest(requestId).then(res => {
            if (res.error || res.errorCode) {
                alert(res.error || res.errorCode);
                clearTimeout(TIMER);
                document.getElementById('js-ai-loading').style.display = 'none';
            } else if (res.imageNameList) {
                // console.log(res);
                clearTimeout(TIMER);
                document.getElementById('js-ai-loading').style.display = 'none';

                cos.downloadImage(res.imageNameList[0], (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        document.getElementById('js-ai-image-1').innerHTML = `
                            <img src="${URL.createObjectURL(data.Body)}" alt="photo" id="pthumb2">
                        `;
                    }
                });

                if (IMAGE_NUMBER === 2) {
                    cos.downloadImage(res.imageNameList[1], (err, data) => {
                        if (err) {
                            console.error(err);
                        } else {
                            document.getElementById('js-ai-image-0').innerHTML = `
                                <img src="${URL.createObjectURL(data.Body)}" alt="photo" id="pthumb1">
                            `;
                        }
                    });
                }

                
            } else {
                Pool(requestId);
            }
        });
    }, 3000);
};



//  "userId": "1tutcv2w5e9VakyxE4xJkH",



export default {
    data() {
        return {
            img: 'https://imgs.1tu.com/images/47/16/14/14/6004777819.jpg-900w.jpg',
        }
    },

    mounted() {
        const ai_range_el = document.querySelector('#js-ai-range');
        const ai_currwnt_value_el = document.querySelector('#js-current-vlaue');
        const ai_submit_btn = document.querySelector('#js-get-ai-images');
        const ai_key_els = document.querySelectorAll('.js-key-item');
        const ai_mode_els = document.querySelectorAll('.js-mode-item');
        const ai_number_els = document.querySelectorAll('.js-number-item');
        const ai_size_els = document.querySelectorAll('.js-size-item');
        const ai_ratio_els = document.querySelectorAll('.js-ratio-item');
        const ai_loading = document.querySelector('#js-ai-loading');
        const ai_input_el = document.querySelector('#js-ai-input');
        const ai_input_menu_els = document.querySelectorAll('#js-ai-input-menu li');
        const ai_input_navi_els = document.querySelectorAll('#js-ai-input-navi li');
        const close_ai_modal = document.querySelector('#modal-ai-box .close');

        ai_input_navi_els.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('current')) {
                    document.querySelector('#js-ai-input-navi li.current').classList.remove('current');
                    el.classList.add('current');
                    TYPE = el.dataset.type;
                    document.querySelector('#modal-ai-box').classList.remove('type-text2image');
                    document.querySelector('#modal-ai-box').classList.remove('type-bgRemover');
                    document.querySelector('#modal-ai-box').classList.add('type-' + TYPE);
                    
                }
            });
        });

        ai_input_menu_els.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('current')) {
                    document.querySelector('#js-ai-input-menu li.current').classList.remove('current');
                    el.classList.add('current');
                    ai_input_el.value = '';
                    // ai_pas.prompt = el.dataset.input;

                    

                    if (el.dataset.input === 'title') {
                        // ai_input_el.classList.add('hidden');
                        ai_input_el.value = '在公共火车上使用手机的商人 ';
                    } else if (el.dataset.input === 'keyword') {
                        // ai_input_el.classList.add('hidden');
                        ai_input_el.value = 'business,holding,person,travel,young,people,transport,transportation,male,man,city,urban,news,message,communication,mobile,phone,smart,lifestyle,businessman,looking,using,chinese,japanese,asian,china,passenger,watching,train,public,media,station,tourist,asia,social,japan,crowded,commute,railway,underground,metro,sms,commuter,smartphone,subway,entrepreneur,texting,Mobile Phone,social distancing';
                    }
                    
                }
            });
        });

        ai_mode_els.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('current')) {
                    document.querySelector('.js-mode-item.current').classList.remove('current');
                    el.classList.add('current');
                }
            });
        });

        ai_key_els.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('current')) {
                    document.querySelector('.js-key-item.current').classList.remove('current');
                    el.classList.add('current');
                }
            });
        });

        ai_ratio_els.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('current')) {
                    document.querySelector('.js-ratio-item.current').classList.remove('current');
                    el.classList.add('current');
                }
            });
        });

        ai_size_els.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('current')) {
                    document.querySelector('.js-size-item.current').classList.remove('current');
                    el.classList.add('current');
                }
            });
        });

        ai_number_els.forEach(el => {
            el.addEventListener('click', () => {
                if (!el.classList.contains('current')) {
                    document.querySelector('.js-number-item.current').classList.remove('current');
                    el.classList.add('current');

                    IMAGE_NUMBER = Number(el.querySelector('span').dataset.number);
                    PARAMS.batchSize = IMAGE_NUMBER;
                }
            });
        });

        ai_range_el.addEventListener('input', () => {
            // console.log(range_el.value)
            ai_currwnt_value_el.innerHTML = ai_range_el.value + '%';
        });

        ai_submit_btn.addEventListener('click', () => {
            if (!IMAGE_SRC) IMAGE_SRC = document.querySelector('#js-ai-image-0 img').src;

            PARAMS.styleName = '1tu-' + document.querySelector('.js-key-item.current span').dataset.key;
            PARAMS.controlNetInfoList[0].modelName = `SJ_controlNet_${document.querySelector('.js-mode-item.current span').dataset.key}_0`;
            PARAMS.controlNetInfoList[0].controlMode = document.querySelector('.js-mode-item.current span').dataset.key;
            PARAMS.controlNetInfoList[0].controlnetConditioningScale = (Number(ai_range_el.value)/100);
            PARAMS.prompts = ai_input_el.value;
            // alert(PARAMS.prompts); return;

            const ratio = Number(document.querySelector('.js-ratio-item.current span').dataset.ratio.split(':')[0])/Number(document.querySelector('.js-ratio-item.current span').dataset.ratio.split(':')[1]);
            const size = Number(document.querySelector('.js-size-item.current span').dataset.size);

            if (ratio > 1) {
                PARAMS.width = size;
                PARAMS.height = size / ratio;
            } else {
                PARAMS.width = size * ratio;
                PARAMS.height = size;
            }


            // console.log(PARAMS)
            ai_loading.style.display = 'block';

            if (TYPE === 'text2image') {
                generateImage().then(res => {
                    // console.log(res);
                    Pool(res.asyncRequestId);
                });
            } else if (TYPE === 'bgRemover') {
                bgRemover().then(res => {
                    Pool(res.asyncRequestId);
                });
            }
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

#modal-ai-box.type-bgRemover .ai-menus .item {
    display: none;
}

#modal-ai-box.type-bgRemover .ai-menus .item.logo-item {
    display: block;
}

.ai-navi {
    background: #12252B;
    position: relative;
}

.ai-navi li {
    padding: 1.5rem;
    cursor: pointer;
    opacity: .5;
}

.ai-navi li.current {
    background: #20373f;
    opacity: 1;
}

.ai-navi li:hover {
    opacity: 1;
}

.ai-navi li span {
    color: #fff;
    display: block;
    text-align: center;
    font-size: 1rem;
    white-space: nowrap;
}

.ai-navi li span:hover {
    color: #fff;
}

.ai-navi li svg {
    fill: #fff;
    height: 2.4rem;
    width: 2.4rem;
    display: block;
    margin: 0 auto .85rem;

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
