
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
function main(){
    hendlModal();
    hendlModalFormAuth()
    
    var submenumobile= new hendlSubMenuMobile();
    submenumobile.run()
    
    
}