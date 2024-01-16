
function tag23_get_old_elements(father,index,iterator){
    let elements = [];
    for(let i = 0;i< father.children.length;i++){
        let point = i+index+1;
        let current = father.children[point];
        if(!current){
            break;
        }

        if(!current.hasAttribute(TAG_23_INDEX)){
            let name = current.getAttribute(TAG_23_IN);
            if(name !== iterator){
                break;
            }
        }


        elements.push({
            index: parseInt(current.getAttribute(TAG_23_INDEX)),
            order:i,
            element:current
        });
    }
    return elements;
}



/**@param {Tag23LoopProps} loop_props
 */
function tag23_for(loop_props){
    loop_props.skip = true;
    let current = loop_props.current_element;
    current.style.display = TAG_23_HIDE;

    let value_as = current.getAttribute(TAG_23_FOR);
    if(!value_as){
        console.log("for value not provided")
        return;
    }
    let index_name = `${value_as}_${TAG_23_INDEX}`
    let destroy_name = `${value_as}_${TAG_23_DESTROY}`
    let array_name =   current.getAttribute(TAG_23_IN);
    if(!array_name){
        console.log("in not provided")
        return;
    }
    /**@type {Array<any>}*/
    let array_value = tag23get_evaluation_result(current,array_name);
    if(!array_value){
        return;
    }
    //iterated over the brothers of child
    let father = current.parentNode;
    let elements = tag23_get_old_elements(father,loop_props.index,array_name);



    for(let j=0;j<array_value.length;j++){
        //verify if j its not present on elements
        let found = false;
        for(let k=0;k<elements.length;k++){
            if(elements[k].index === j){
                found = true;
                break;
            }
        }
        if(found){
            continue;
        }

        let created = current.cloneNode(true);
        created.style.display = TAG_23_SHOW;
        //remove attribute for
        created.removeAttribute(TAG_23_FOR);

        set_value_recursively_in_element(created,value_as,()=>{
            return array_value[j];
        })

        set_value_recursively_in_element(created,index_name,()=>{
            return j;
        })

        set_value_recursively_in_element(created,destroy_name,()=>{
            array_value.splice(j,1);
        })


        created.setAttribute(TAG_23_INDEX,j);
        elements.push({
            index:j,
            element:created
        });
    }



    //sort elements by index
    elements.sort((a,b)=>a.index-b.index);
    let its_all_correct = true;
    for(let j=0;j<elements.length;j++){
        if(elements[j].order !== j){
            its_all_correct = false;
            break;
        }
    }

    if(its_all_correct && elements.length === array_value.length){
        return;
    }

    //console.log(elements);
    //console.log(array_value);


    let fragment = document.createDocumentFragment();
    for(let j=0;j<elements.length;j++){
        //verify if j its not present on elements
        let current = elements[j];



        if(current.element.parentNode === father){
            current.element = father.removeChild(current.element);
        }
        if(current.index <= array_value.length -1){
            fragment.appendChild(current.element);
        }

    }
    father.insertBefore(fragment,current.nextSibling);



}


