<template>
    <div id="wrap" class="wrap not-app">
        <div style="height: 80vh; background-color: #ccc;"></div>
        <div id="ui-lottie" class="ui-lottie" style="height: 100%;width: 100%;">
            
        </div>
    </div>
</template>

<script>

//  "userId": "1tutcv2w5e9VakyxE4xJkH",

export default {


    mounted() {
        (function() {
            const url = 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js';
            const script = document.createElement('script');
            const lottieElement = document.getElementById('ui-lottie');
            // let animation = null;
            const json_url = 'https://stg-cerebrasnet-staging.kinsta.cloud/wp-content/uploads/2024/08/Inference-Speed_Graphs_Lottie-V2_082624.json';


            script.src = url;
            script.async = true;
            script.onload = () => {
                const animation = bodymovin.loadAnimation({
                    // container: lottieElement,
                    path: json_url,
                    animationData: json,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                })

            

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animation.play();
                            observer.unobserve(lottieElement);
                        }
                    });
                }, {
                    threshold: 0.5 // Adjust this value as needed
                });

                observer.observe(lottieElement);
            };
            document.head.appendChild(script);
        }());

    },
}
</script>

<style>
#modal-ai-box .inner-box {
    padding-top: 4.8rem;
}

#modal-ai-box .inner-box,
.ai-menus {
    height: calc(100vh - 4.8rem);
}

.ai-header {
    height: 1.7rem;
    box-sizing: content-box;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.2);
    width: 100%;
    background: #12252B;
    position: absolute;
    left: 0;
    top: 0;
}

.ai-header .logo-item a {
    display: block;
    cursor: pointer;
    width: 8rem;
    height: 2rem;
    position: relative;
}

.ai-header .logo-item a::before {
    content: 'AI';
    position: absolute;
    bottom: -2px;
    left: 100%;
    color: #fff;
    opacity: 1;
    font-weight: bold;
    margin-left: .5rem;
}

.ai-header .logo-item a svg {
    width: 100%;
    height: 100%;
    display: block;
    opacity: .5;
}

.ai-header .logo-item a:hover svg {
    opacity: 1;
}

.ai-header .logo-item a svg .one {
    fill: #fff;
}

.ai-header .logo-item a svg .tu {
    fill: #fff;
}

.ai-header .logo-item a svg .cn {
    fill: #fff;
}

.ai-loading {
    color: white;
    background: rgba(0, 0, 0, 0.5) !important;
}

.ai-loading .loading-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.ai-loading .progress {
    width: 20rem;
    height: .5rem;
    margin-bottom: 1rem;
    overflow: hidden;
    background: rgba(255, 255, 255,.2);
    border-radius: .3rem;
    position: relative;
}

.ai-loading .progress-bar {
    width: 0;
    height: 100%;
    background: #d88264;
    position: absolute;
    border: none;
    top: 0;
    left: 0;
    transition: width .3s;
}

#modal-ai-box .ai-loading span {
    position: static;
    width: auto;
    height: auto;
}

.upload-item {
    display: none;
}

#modal-ai-box.type-bgRemover .ai-menus .item.upload-item {
    display: block;
}

.ai-menus .item.upload-item li {
    position: relative;
    overflow: hidden;
}

.ai-menus .item.upload-item li input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
}

.ai-menus .item.upload-item li canvas {
    visibility: hidden;
    position: absolute;
}

#modal-ai-box .inner-box {
    display: flex;
    width: 100%;
    background: #20373f;
    position: relative;
}

#modal-ai-box.type-bgRemover .ai-menus .item {
    display: none;
}


#modal-ai-box.type-bgRemover .ai-menus .item.image-item {
    display: block;
    padding-top: 1.5rem;
}

.ai-menus .image-item img {
    max-width: 100%;
    height: 10rem;
}

.ai-navi {
    background: #12252B;
    position: relative;
    border-right: 1px solid rgba(255,255,255,.2);

}

.ai-navi li {
    padding: 1rem;
    cursor: pointer;
    opacity: .5;
    margin: .5rem;
    border-radius: .3rem;
    background-color: rgba(255,255,255,.08);
    border: 2px solid rgba(255,255,255,.08);

}

.ai-menus .item li:hover {
    background: rgba(255,255,255,.08);
    border-color: 1px solid rgba(255,255,255,0.2);
}

.ai-menus .item li.js-ratio-item {
    width: calc(20% - 1rem);
}

.ai-navi li.current {
    /* background: #20373f; */
    opacity: 1;
    border: 2px solid #d88264;
}

.ai-navi li.current span {
    color: #d88264 !important;
}

.ai-navi li.current svg {
    fill: #d88264;
}

.ai-menus .item li.current {
    border-color: #d88264;

}

.ai-navi li:hover {
    opacity: 1;
}

.ai-navi li span {
    color: #fff;
    display: block;
    text-align: center;
    font-size: .95rem;
    white-space: nowrap;
}

.ai-navi li span:hover {
    color: #fff;
}

.ai-navi li svg {
    fill: #fff;
    height: 2rem;
    width: 2rem;
    display: block;
    margin: 0 auto .85rem;

}



.ai-menus .item ul li.hide i {
    display: none !important;
}

.ai-menus .item label span:nth-child(2) {
    opacity: 0;
}

.ai-menus .range-wrap {
    padding-top: 6px;
    position: relative;
}

.ai-menus .range-wrap input {
    z-index: 3;
    position: relative;
    background-color: rgba(255,255,255,0.2);;
}

.ai-menus .range-wrap i {
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 8px;
    margin-top: 0;
    opacity: 1;
    font-style: normal;
    position: absolute;
    pointer-events: none;
    text-align: center;
    text-indent: -9999px;
    width: 1px;
    background-color: rgba(255,255,255,0.2);
    color: transparent;
    z-index: 1;
}

.ai-menus .range-wrap i:nth-child(1) {
    left: 3px;
}

.ai-menus .range-wrap i:nth-child(2) {
    left: 25%;
}

.ai-menus .range-wrap i:nth-child(3) {
    left: 50.5%;
}

.ai-menus .range-wrap i:nth-child(4) {
    left: 75%;
}

.ai-menus .range-wrap i:nth-child(5) {
    right: 0;
}

.ai-show .images {
    position: relative;
}


#js-ai-image-2 {
    display: none;
}

/* #modal-ai-box.type-text2image.image-number-2 #js-ai-image-0 {
    position: absolute;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: none;
    width: auto;
    height: auto;
    margin: 0;
    left: .5rem;
    margin-top: -.3rem;
    overflow: hidden;
    transform: translateY(-100%);
    
} */

/* #modal-ai-box.type-text2image.image-number-2 #js-ai-image-0 img {
    max-width: 10rem;
    max-height: 10rem;
} */

#modal-ai-box.type-text2image.image-number-2 #js-ai-image-2 {
    display: block;
}
</style>
