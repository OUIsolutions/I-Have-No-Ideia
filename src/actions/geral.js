


/**@param {HTMLElement} current_element
 */
function tag23_start(current_element){
    current_element.style.display = TAG_23_SHOW;
}


/**@param {HTMLElement || HTMLInputElement} current_element
 */
function tag23_value(current_element){

    if(current_element.getAttribute(TAG_23_SET_VALUE)){
        return;
    }
    if(current_element.getAttribute(TAG_23_EVALUATED)){
        return;
    }

    let tag_data = current_element.getAttribute(TAG_23_VALUE);
    current_element.value = tag23get_evaluation_result(tag_data);
    current_element.setAttribute(TAG_23_EVALUATED,'true');

}

/**@param {HTMLInputElement} current_element
 */
function tag23_set_value(current_element){

    let name_of_var = current_element.getAttribute(TAG_23_SET_VALUE);

    if(document.activeElement === current_element){
        eval(`${name_of_var} = current_element.value`);
    }

    if(document.activeElement !== current_element){

        try {
            let value = tag23get_evaluation_result(name_of_var);
            if(value !== undefined || value !== null){
                current_element.value = value;
            }
        }catch (error){}

    }


}


/**@param {HTMLElement} current_element
 */
function tag23_content(current_element){
    let text = current_element.getAttribute(TAG_23_PUT);
    current_element.innerHTML = tag23get_evaluation_result(text);

}

