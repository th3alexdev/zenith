
    const button = document.getElementById('btn-toggle')
    const navMenu = document.getElementById('nav-menu')
    const links = document.querySelectorAll('.header__nav-link')
    const header = document.getElementById('header')

    /* Funcionalidades del NavBar */
    button.addEventListener('click', () => {
        navMenu.classList.toggle('nav-menu_visible')
        for(let i = 0; i < 3; i++){
            links[i].addEventListener('click', () => {
                navMenu.classList.remove('nav-menu_visible')
            })
        }
    })
    /* =================== */



    /* Botón que indica que debe bajar o debe subir */
    const goButton = document.getElementById('go-btn')
    const iconArrow = document.getElementById('i-arrow')
    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 650){
            goButton.classList.remove('go-down-arrow')
            goButton.classList.add('go-up-arrow')
            
            iconArrow.classList.remove('fa-chevron-down')
            iconArrow.classList.add('fa-chevron-up')
            goButton.hash = '#principal';
        }
        else {
            goButton.classList.remove('go-up-arrow')
            goButton.classList.add('go-down-arrow')

            iconArrow.classList.remove('fa-chevron-up')
            iconArrow.classList.add('fa-chevron-down')
            goButton.hash = '#services';
        }
    })
    /* =================== */



    /* Evalúa el ancho del viewport para saber si se trata de móvil o pantalla de escritorio, para saber que header debe colocar */
    let clientWidth = document.documentElement.clientWidth
    if(clientWidth > 1290 && clientWidth < 2380){
        window.addEventListener('scroll', () => {
            header.classList.toggle('header-secondary',  window.scrollY > 0)
        })
    }
    /* =================== */



    /* Preguntamos todo nuevamente en caso de que se haya re-dimensionado la página */
    window.addEventListener('resize', () => {
        clientWidth = document.documentElement.clientWidth
        if(clientWidth > 2379){
            header.classList.add('header-secondary')
        }

        if(clientWidth > 1290 && clientWidth < 2380){
            header.classList.toggle('header-secondary',  window.scrollY > 0)
        }
    })


    if(clientWidth > 2400){
        header.classList.remove('header-principal')
        header.classList.add('header-secondary')
        console.log('mayor a 2400')
    } 
    /* =================== */




    /* Preguntamos cuánto scroll ha hecho el usuario para marcar los links en el header */ 
    const sections = document.querySelectorAll('.section-ob')
    const observer = new IntersectionObserver( (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const id = '#' + entry.target.id;
                history.pushState({}, entry.target.innetText, id)

                links.forEach(link => {
                    link.classList.remove('nav-link__focused')
                    const href = link.attributes.href.nodeValue;
                    // console.log(href)

                    if(href === id){
                        link.classList.add('nav-link__focused')
                    } 
                })
            }
        })
    }, {
        threshold: .3,
        rootMargin: '0px 0px -50% 0px'
    });

    sections.forEach(section => {
        observer.observe(section)
    })