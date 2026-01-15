// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有可放大的图片
    const zoomImgs = document.querySelectorAll('.zoom-img');
    // 获取遮罩层、大图容器、关闭按钮
    const mask = document.createElement('div');
    const bigImgContainer = document.createElement('div');
    const closeBtn = document.createElement('span');
    const bigImg = document.createElement('img');

    // 遮罩层样式
    mask.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.85);
        z-index: 999;
        display: none;
        justify-content: center;
        align-items: center;
    `;

    // 大图容器样式
    bigImgContainer.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

    // 关闭按钮样式
    closeBtn.style.cssText = `
        position: absolute;
        top: -35px;
        right: -35px;
        width: 30px;
        height: 30px;
        color: #fff;
        font-size: 28px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        user-select: none;
    `;
    closeBtn.innerHTML = '&times;';

    // 大图样式
    bigImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
    `;

    // 组装DOM结构
    bigImgContainer.appendChild(bigImg);
    bigImgContainer.appendChild(closeBtn);
    mask.appendChild(bigImgContainer);
    document.body.appendChild(mask);

    // 存储当前图片索引
    let currentIndex = 0;

    // 为每个图片添加点击事件
    zoomImgs.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            currentIndex = index;
            bigImg.src = this.src;
            mask.style.display = 'flex';
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭功能
    function closeZoom() {
        mask.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeZoom);
    mask.addEventListener('click', function(e) {
        if (e.target === mask) closeZoom();
    });

    // 滚轮切换图片
    mask.addEventListener('wheel', function(e) {
        e.preventDefault();
        // 滚轮向上：上一张；向下：下一张
        if (e.wheelDelta > 0 || e.detail < 0) {
            currentIndex = (currentIndex - 1 + zoomImgs.length) % zoomImgs.length;
        } else {
            currentIndex = (currentIndex + 1) % zoomImgs.length;
        }
        bigImg.src = zoomImgs[currentIndex].src;
    });
});



        // 轮播逻辑
        document.addEventListener('DOMContentLoaded', function() {
            const slide = document.querySelector('.banner-slide');
            const items = document.querySelectorAll('.banner-item');
            const dots = document.querySelectorAll('.dot');
            const leftArrow = document.querySelector('.arrow-left');
            const rightArrow = document.querySelector('.arrow-right');
            const itemWidth = items[0].offsetWidth;
            let currentIndex = 0;
            const itemLength = items.length;

            // 小圆点切换
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentIndex = index;
                    updateSlide();
                });
            });

            // 箭头切换
            leftArrow.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + itemLength) % itemLength;
                updateSlide();
            });
            rightArrow.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % itemLength;
                updateSlide();
            });

            // 自动轮播
            let autoPlay = setInterval(function() {
                currentIndex = (currentIndex + 1) % itemLength;
                updateSlide();
            }, 3000);

            // 鼠标悬停暂停轮播
            document.querySelector('.banner').addEventListener('mouseenter', function() {
                clearInterval(autoPlay);
            });
            document.querySelector('.banner').addEventListener('mouseleave', function() {
                autoPlay = setInterval(function() {
                    currentIndex = (currentIndex + 1) % itemLength;
                    updateSlide();
                }, 3000);
            });

            // 更新轮播位置和小圆点状态
            function updateSlide() {
                slide.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        });