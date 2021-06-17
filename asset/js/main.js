
function hendlOverlay(overlayEle){
    this.overlayEle=overlayEle ;
    this.overlayDisplay=()=>{
        this.overlayEle.classList.add('modal-overlay--active')
        
    },
    this.overlayHidden=()=>{
        this.overlayEle.classList.remove('modal-overlay--active')
    }
}
function hendlModal(){
   
    var modalActiveName;
    var modalActive;
    var overlayEle= document.querySelector('.modal-overlay');
    const hendlOverlayObj= new hendlOverlay(overlayEle);
   
    var headerGroupBtnEles=document.querySelectorAll('.btn-modal-active');
    var modalCloseEles=document.querySelectorAll('.modal-close');

    overlayEle.onclick=modalHide();

    if(modalCloseEles.length>0){
        modalCloseEles.forEach((modalCloseEle)=>{
            modalCloseEle.onclick=modalHide();
        })
    }

    if(headerGroupBtnEles.length>0){
        headerGroupBtnEles.forEach((headerGroupBtnEle)=>{
            headerGroupBtnEle.onclick=modalDisplay(headerGroupBtnEle);
        });
    }
    function modalDisplay(headerGroupBtnEle){
        var modalName=headerGroupBtnEle.getAttribute('data-modal');
        var modalSetActive=document.querySelector('.modal-'+modalName);
        return ()=>{
            if(modalSetActive){
                if(modalActive){
                    modalActive.classList.remove('modal-'+modalActiveName+'--active');
                }
                modalSetActive.classList.add('modal-'+modalName+'--active');
                modalActiveName=modalName;
                modalActive=modalSetActive;
            }
            hendlOverlayObj.overlayDisplay();
        }
    }
    function modalHide(){
        return()=>{
            if(modalActive){
                modalActive.classList.remove('modal-'+modalActiveName+'--active');
            }
            hendlOverlayObj.overlayHidden();
            modalActiveName=undefined;
            modalActive=undefined;
        }
    }
}
function hendlModalFormAuth(){
    var formAuthActive=document.querySelector('.modal-auth__form--active');
    var fromAuthBtnList=document.querySelectorAll('.modal-auth__form-support-link');
    fromAuthBtnList.forEach((fromAuthBtn)=>{
        fromAuthBtn.onclick=formAuthDisplay(fromAuthBtn);
    })

    function formAuthDisplay(fromAuthBtn){

        return ()=>{
            var formAuthName=fromAuthBtn.getAttribute('data-form');
           
            if(formAuthName){
                var formAuthSetActive=document.querySelector('.modal-auth__form-'+formAuthName);
                if(formAuthActive){
                    formAuthHidden();
                }
                formAuthSetActive.classList.add('modal-auth__form--active');
                formAuthActive=formAuthSetActive;
            }
        }
    }
    function formAuthHidden(){
        formAuthActive.classList.remove('modal-auth__form--active');
    }
}
function hendlSubMenuMobile(){
    var isActive;
    this.subMenuIconPlus= document.querySelector('.modal-menu-mobile__list-items-icon-plus')
    this.subMenuIconMinus= document.querySelector('.modal-menu-mobile__list-items-icon-minus');
    this.subMenuCheckbox=document.getElementById('modal-menu-mobile__submenu-checkbox');
    this.listMenu=document.querySelector('.modal-menu-mobile__submenu-list');
    this.subMenuMobileDisplay=()=>{
        return ()=>{
            this.isActive=document.getElementById('modal-menu-mobile__submenu-checkbox').checked;
           
            if(this.isActive){
                this.subMenuIconPlus.style.display="none";
                this.subMenuIconMinus.style.display="block";
                this.listMenuDisplay();
            }
            else{
                this.subMenuIconPlus.style.display="block";
                this.subMenuIconMinus.style.display="none";
                this.listMenuHidden();
            }
        }
    }
    this.run=()=>{
       
        if(this.subMenuCheckbox){
            this.subMenuCheckbox.onchange=this.subMenuMobileDisplay()
            
        }
    }
    this.listMenuDisplay=()=>{
        this.listMenu.style.display="block";
    }
    this.listMenuHidden=()=>{
        this.listMenu.style.display="none";
    }
}
function hendlSlideShow(nameSlideShow,autoPlay){
    this.currentIndex=1;
    this.slideShowEle=document.querySelector(nameSlideShow);
    var listSlidesEles;
    var listDotEles;
    var nextEle;
    var prevEle;
    var timer;
    var startClientX;
    var endClientX;

    this.autoPlay=autoPlay;
    this.start=()=>{
        if(this.slideShowEle){
            this.listSlidesEles=this.slideShowEle.querySelectorAll('.slideshow-content__slides');
            this.listDotEles=this.slideShowEle.querySelectorAll('.slideshow__control-dot');
            this.nextEle=this.slideShowEle.querySelector('.slideshow__control-next');
            this.prevEle=this.slideShowEle.querySelector('.slideshow__control-prev');
           
            if(this.listSlidesEles.length>0){
                this.listSlidesEles[this.currentIndex-1].style.left='0';
                this.slideShowEle.onmousedown=(e)=>{
                    if(this.autoPlay){
                        clearInterval(this.timer);
                    }
                    this.startClientX=e.clientX;
                }
                this.slideShowEle.onmouseup=(e)=>{
                    this.endClientX=e.clientX;
                    if(this.startClientX-this.endClientX>0){
                        this.next();
                    }
                    else if(this.startClientX-this.endClientX<0){
                        this.prev();
                    }
                }
                this.slideShowEle.ontouchstart=(e)=>{
                    if(this.autoPlay){
                        clearInterval(this.timer);
                    }
                    this.startClientX=e.touches[0].clientX;
                }
                this.slideShowEle.ontouchend=(e)=>{
                    this.endClientX=e.changedTouches[0].clientX;
                    if(this.startClientX-this.endClientX>0){
                        this.next();
                    }
                    else if(this.startClientX-this.endClientX<0){
                        this.prev();
                    }
                }
                if(this.listDotEles.length>0){
                    this.listDotEles[this.currentIndex-1].classList.add('slideshow__control-dot--active')
                }
            }
            return true;
        }
        return false;
    }
    this.next=()=>{
        if(this.listSlidesEles ){
            var nextIndex=1;
            if( this.currentIndex!=this.listSlidesEles.length){
                nextIndex=this.currentIndex+1;
            }
            this.listSlidesEles[this.currentIndex-1].classList.remove('slideshow-content__slides-in-right',
            'slideshow-content__slides-in-left','slideshow-content__slides-out-right');
            this.listSlidesEles[this.currentIndex-1].style.left='100%';
            this.listSlidesEles[this.currentIndex-1].classList.add('slideshow-content__slides-out-left')
            
            if(this.listDotEles.length>0){
                this.listDotEles[this.currentIndex-1].classList.remove('slideshow__control-dot--active');
                this.listDotEles[nextIndex-1].classList.add('slideshow__control-dot--active');
            }

            this.listSlidesEles[nextIndex-1].classList.remove('slideshow-content__slides-out-right',
            'slideshow-content__slides-in-left','slideshow-content__slides-out-left')
            this.listSlidesEles[nextIndex-1].style.left='0';
            this.listSlidesEles[nextIndex-1].classList.add('slideshow-content__slides-in-right');
            if(this.timer){
                clearInterval(this.timer);
                this.auto();
            }
            this.currentIndex=nextIndex;
        }
    }
    this.prev=()=>{
        if(this.listSlidesEles ){
            var prevIndex=this.listSlidesEles.length;
            if( this.currentIndex!=1){
                prevIndex=this.currentIndex-1;
            }
            this.listSlidesEles[this.currentIndex-1].classList.remove('slideshow-content__slides-in-right',
            'slideshow-content__slides-in-left','slideshow-content__slides-out-right','slideshow-content__slides-out-left');
            this.listSlidesEles[this.currentIndex-1].style.left='100%';
            this.listSlidesEles[this.currentIndex-1].classList.add('slideshow-content__slides-out-right')
            
            if(this.listDotEles.length>0){
                this.listDotEles[this.currentIndex-1].classList.remove('slideshow__control-dot--active');
                this.listDotEles[prevIndex-1].classList.add('slideshow__control-dot--active');
            }

            this.listSlidesEles[prevIndex-1].classList.remove('slideshow-content__slides-out-right',
            'slideshow-content__slides-in-left','slideshow-content__slides-out-left','slideshow-content__slides-in-right')
            this.listSlidesEles[prevIndex-1].style.left='0';
            this.listSlidesEles[prevIndex-1].classList.add('slideshow-content__slides-in-left');
            if(this.timer){
                clearInterval(this.timer);
                this.auto();
            }
            this.currentIndex=prevIndex;
        }
    }
    this.dot=()=>{
        if(this.listDotEles){
            this.listDotEles.forEach((dot)=>{
                dot.onclick=(e)=>{
                    var dotSpecified=e.target;
                    var indexSpecified =dotSpecified.getAttribute('data-index')
                    if(indexSpecified && Number(indexSpecified))
                    {
                        if(parseInt(indexSpecified)>this.currentIndex ){
                            this.listSlidesEles[this.currentIndex-1].classList.remove('slideshow-content__slides-in-right',
                            'slideshow-content__slides-in-left','slideshow-content__slides-out-right');
                            this.listSlidesEles[this.currentIndex-1].style.left='100%';
                            this.listSlidesEles[this.currentIndex-1].classList.add('slideshow-content__slides-out-left')
                            this.listDotEles[this.currentIndex-1].classList.remove('slideshow__control-dot--active');

                            this.listDotEles[parseInt(indexSpecified)-1].classList.add('slideshow__control-dot--active');
                            this.listSlidesEles[parseInt(indexSpecified)-1].classList.remove('slideshow-content__slides-out-right',
                            'slideshow-content__slides-in-left','slideshow-content__slides-out-left')
                            this.listSlidesEles[parseInt(indexSpecified)-1].style.left='0';
                            this.listSlidesEles[parseInt(indexSpecified)-1].classList.add('slideshow-content__slides-in-right');
                            
                        }
                        else if(parseInt(indexSpecified)<this.currentIndex){
                            this.listSlidesEles[this.currentIndex-1].classList.remove('slideshow-content__slides-in-right',
                            'slideshow-content__slides-in-left','slideshow-content__slides-out-right','slideshow-content__slides-out-left');
                            this.listSlidesEles[this.currentIndex-1].style.left='100%';
                            this.listSlidesEles[this.currentIndex-1].classList.add('slideshow-content__slides-out-right')
                            this.listDotEles[this.currentIndex-1].classList.remove('slideshow__control-dot--active');
                            
                            this.listDotEles[parseInt(indexSpecified)-1].classList.add('slideshow__control-dot--active');
                            this.listSlidesEles[parseInt(indexSpecified)-1].classList.remove('slideshow-content__slides-out-right',
                            'slideshow-content__slides-in-left','slideshow-content__slides-out-left','slideshow-content__slides-in-right')
                            this.listSlidesEles[parseInt(indexSpecified)-1].style.left='0';
                            this.listSlidesEles[parseInt(indexSpecified)-1].classList.add('slideshow-content__slides-in-left');
                        }
                        if(this.timer){
                            clearInterval(this.timer);
                            this.auto();
                        }
                        this.currentIndex=parseInt(indexSpecified);
                    }
                }
            })
        }
    }
    this.auto=()=>{
        this.timer= setInterval(()=>{
            this.next();
        }
        ,5000)
    }
    this.run=()=>{
        if(this.start()){
            if(this.nextEle){
                this.nextEle.onclick=this.next;
            }
            if(this.prevEle){
                this.prevEle.onclick=this.prev;
            }
            this.dot();
            if(this.autoPlay){
                this.auto();
            }
        }
    }
}
function main(){
    
    const slideShowMain= new hendlSlideShow('.app-slideshow',true);
    const quickViewSlide= new hendlSlideShow('.modal-quickview-slide',false);
    const submenumobile= new hendlSubMenuMobile();
    slideShowMain.run();
    submenumobile.run();
    quickViewSlide.run();
    hendlModal();
    hendlModalFormAuth();
}