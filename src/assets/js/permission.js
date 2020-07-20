import store from '@/store'
//用来控制按钮的显示与否
export function hasBtnPermission(permission){
    let myBtns = store.getters.buttons;
    const buttonAuthList = [];
    if ("" != myBtns && undefined != myBtns) {
        JSON.parse(myBtns).forEach(item => {
            item.children.forEach(item2 => {
                item2.children.forEach(item3 => {
                    if (item3.alias) {
                        buttonAuthList.push(item3.alias)
                    }
                })
            })
        })
      } else {
        this.buttonAuthList = [];
      }

    

    // for(let item in myBtns){
    //     if(item.perm === permission){
    //         return true;
    //     }
    // }
    // return false;
  
    return buttonAuthList.indexOf(permission) > -1
}

