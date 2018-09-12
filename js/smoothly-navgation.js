!function () {
    var view = View('nav.meanu')
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.animate()
            this.bindEvents()
        },
        animate: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            requestAnimationFrame(animate);
        },
        bindEvents: function () {
            let aTags = this.view.querySelectorAll('ul>li>a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) => {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    this.scrollToModel(element)
                }
            }
        },
        scrollToModel: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let distance = targetTop - currentTop
            let t = Math.abs((distance / 100) * 300)
            if (t > 1000) {
                t = 1000
            }
            var coords = {y: currentTop};
            var tween = new TWEEN.Tween(coords)
                .to({y: targetTop}, t)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function () {
                    window.scrollTo(0, coords.y)
                })
                .start();
        },
    }
    controller.init(view)
}.call()

